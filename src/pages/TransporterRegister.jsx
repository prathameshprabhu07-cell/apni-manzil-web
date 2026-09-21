import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Phone,
  MapPin,
  Truck,
  Package,
  Route,
  Clock3,
  IndianRupee,
  FileText,
  CreditCard,
  ShieldCheck,
  Plus,
  Trash2,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ==========================================================
// n8n WEBHOOK
// ==========================================================
const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook/Transporter";

const initialFormData = {
  companyName: "",
  contactPerson: "",
  mobile: "",
  whatsapp: "",
  email: "",
  alternateContact: "",
  yearStarted: "",

  businessType: "",
  gstRegistered: "",
  gstNumber: "",
  panNumber: "",
  companyRegistration: "",

  fullAddress: "",
  city: "",
  state: "",
  pincode: "",

  ownTrucks: "",
  attachedTrucks: "",
  fleetSize: "",

  ftl: false,
  ptl: false,
  dedicatedTransportation: false,
  generalTransportation: false,
  expressTransportation: false,
  contractLogistics: false,
  returnLoad: false,
  multimodalTransportation: false,

  generalGoods: false,
  industrialGoods: false,
  fmcg: false,
  machinery: false,
  furniture: false,
  constructionMaterial: false,
  agriculturalGoods: false,
  ecommerce: false,
  otherGoods: "",

  localDelivery: false,
  withinCity: false,
  maharashtra: false,
  interstate: false,
  panIndia: false,

  pickupCities: "",
  deliveryCities: "",
  preferredRoutes: "",

  immediateLoad: false,
  advanceBooking: false,
  returnLoadAvailable: false,
  support247: false,
  minimumNoticePeriod: "",
  preferredPickupTime: "",
  workingDays: "",

  loading: false,
  unloading: false,
  labour: false,
  doorToDoor: false,
  gpsTracking: false,
  epod: false,
  insuranceAssistance: false,
  warehousing: false,
  equipment: false,

  rateType: "",
  minimumTripCharge: "",
  minimumKm: "",
  tollIncluded: "",
  driverAllowanceIncluded: "",
  loadingIncluded: "",
  unloadingIncluded: "",

  accountHolder: "",
  bankName: "",
  accountNumber: "",
  ifsc: "",
  upi: "",

  googleBusinessProfile: "",
  website: "",
  additionalInformation: "",

  emergencyName: "",
  emergencyRelationship: "",
  emergencyMobile: "",

  declaration: false,
  termsAccepted: false,
};

const emptyVehicle = {
  vehicleType: "",
  count: "",
  capacity: "",
  bodyType: "",
};

export default function TransporterRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [vehicles, setVehicles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [documents, setDocuments] = useState({
    panCard: null,
    gstCertificate: null,
    businessProof: null,
    cancelledCheque: null,
    officePhoto: null,
    fleetPhotos: null,
  });

  const totalFleet = useMemo(() => {
    return (
      Number(formData.ownTrucks || 0) +
      Number(formData.attachedTrucks || 0)
    );
  }, [formData.ownTrucks, formData.attachedTrucks]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDocumentChange = (e) => {
    const { name, files } = e.target;

    setDocuments((prev) => ({
      ...prev,
      [name]: files?.[0] || null,
    }));
  };

  const addVehicleCategory = () => {
    setVehicles((prev) => [...prev, { ...emptyVehicle }]);
  };

  const updateVehicle = (index, field, value) => {
    setVehicles((prev) =>
      prev.map((vehicle, i) =>
        i === index ? { ...vehicle, [field]: value } : vehicle
      )
    );
  };

  const removeVehicle = (index) => {
    setVehicles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      alert("Please enter Company Name.");
      return;
    }

    if (!formData.contactPerson.trim()) {
      alert("Please enter Contact Person.");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please enter Mobile Number.");
      return;
    }

    if (!formData.city.trim() || !formData.state.trim()) {
      alert("Please enter City and State.");
      return;
    }

    if (!formData.declaration || !formData.termsAccepted) {
      alert("Please accept the declaration and terms.");
      return;
    }

    const payload = {
      ...formData,

      serviceCategory: "Truck Transport",
      partnerType: "Transporter / Logistics Company",
      requestSource: "Apni Manzil",

      fleetSummary: {
        ownTrucks: Number(formData.ownTrucks || 0),
        attachedTrucks: Number(formData.attachedTrucks || 0),
        totalFleetSize: totalFleet,
      },

      vehicleCategories: vehicles.map((vehicle) => ({
        vehicleType: vehicle.vehicleType || "",
        count: Number(vehicle.count || 0),
        capacity: vehicle.capacity || "",
        bodyType: vehicle.bodyType || "",
      })),

      documents: {
        panCard: documents.panCard?.name || "",
        gstCertificate: documents.gstCertificate?.name || "",
        businessProof: documents.businessProof?.name || "",
        cancelledCheque: documents.cancelledCheque?.name || "",
        officePhoto: documents.officePhoto?.name || "",
        fleetPhotos: documents.fleetPhotos?.name || "",
      },

      partnerStatus: "Pending Verification",
      verificationStatus: "Pending",

      submittedAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);

      console.log(
        "TRANSPORTER PARTNER PAYLOAD:",
        payload
      );

      // ======================================================
      // SEND DATA TO n8n
      // ======================================================

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let result = null;

      try {
        result = responseText
          ? JSON.parse(responseText)
          : null;
      } catch {
        result = responseText;
      }

      console.log("n8n Status:", response.status);
      console.log("n8n Response:", result);

      if (!response.ok) {
        throw new Error(
          `n8n webhook failed with status ${response.status}`
        );
      }

      alert(
        "Transporter registration submitted successfully! Your application is pending verification."
      );

      navigate("/vendor-landing");
    } catch (error) {
      console.error("TRANSPORTER REGISTRATION ERROR:", error);

      alert(
        "Registration failed. Please make sure n8n is running and the Transporter webhook is active."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionTitle = ({ icon: Icon, title, subtitle }) => (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
        <Icon size={22} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-[#002D5E]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const Input = ({
    label,
    name,
    type = "text",
    placeholder = "",
    required = false,
  }) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );

  const Select = ({
    label,
    name,
    options,
    required = false,
  }) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        required={required}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const Textarea = ({
    label,
    name,
    placeholder = "",
  }) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <textarea
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />
    </div>
  );

  const Checkbox = ({ name, label }) => (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-orange-300">
      <input
        type="checkbox"
        name={name}
        checked={!!formData[name]}
        onChange={handleChange}
        className="h-4 w-4 accent-orange-500"
      />

      <span className="text-sm font-medium text-gray-700">
        {label}
      </span>
    </label>
  );

  const DocumentUpload = ({
    name,
    label,
    required = false,
  }) => (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type="file"
        name={name}
        onChange={handleDocumentChange}
        accept=".pdf,.jpg,.jpeg,.png"
        className="w-full text-sm text-gray-600"
      />

      {documents[name] && (
        <p className="mt-2 text-xs text-green-600">
          ✓ {documents[name].name}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-[#002D5E] transition hover:text-orange-500"
          >
            <ArrowLeft size={19} />
            Back
          </button>

          <div className="text-center">
            <h1 className="text-lg font-extrabold text-[#002D5E] sm:text-xl">
              APNI MANZIL
            </h1>

            <p className="text-[10px] font-semibold tracking-widest text-orange-500 sm:text-xs">
              GLOBAL LOGISTICS NETWORK
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-600 sm:flex">
            <Truck size={15} />
            Transport Partner
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#002D5E] px-4 py-10 text-white sm:py-14">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 shadow-lg">
            <Building2 size={32} />
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Transporter / Logistics Company
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Join Apni Manzil as a Transport Partner and receive transportation
            opportunities from businesses and customers across India.
          </p>
        </div>
      </section>

      {/* Form */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Building2}
              title="Company & Contact Details"
              subtitle="Tell us about your transportation company."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Company / Transport Name"
                name="companyName"
                placeholder="ABC Logistics Pvt. Ltd."
                required
              />

              <Input
                label="Contact Person"
                name="contactPerson"
                placeholder="Full Name"
                required
              />

              <Input
                label="Mobile Number"
                name="mobile"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                required
              />

              <Input
                label="WhatsApp Number"
                name="whatsapp"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="company@example.com"
              />

              <Input
                label="Alternate Contact"
                name="alternateContact"
                type="tel"
                placeholder="Alternate mobile number"
              />

              <Input
                label="Year Started"
                name="yearStarted"
                type="number"
                placeholder="2018"
              />
            </div>
          </section>

          {/* Business */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={FileText}
              title="Business Details"
              subtitle="Business registration and tax information."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="Business Type"
                name="businessType"
                options={[
                  "Proprietorship",
                  "Partnership",
                  "Private Limited",
                  "LLP",
                  "Public Limited",
                  "Other",
                ]}
                required
              />

              <Select
                label="GST Registered?"
                name="gstRegistered"
                options={["Yes", "No"]}
              />

              <Input
                label="GST Number"
                name="gstNumber"
                placeholder="22AAAAA0000A1Z5"
              />

              <Input
                label="PAN Number"
                name="panNumber"
                placeholder="ABCDE1234F"
              />

              <Input
                label="Company Registration Number"
                name="companyRegistration"
                placeholder="Registration number"
              />
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={MapPin}
              title="Office Address"
              subtitle="Your registered or operating office location."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Textarea
                  label="Full Office Address"
                  name="fullAddress"
                  placeholder="Enter complete office address"
                />
              </div>

              <Input
                label="City"
                name="city"
                placeholder="Mumbai"
                required
              />

              <Input
                label="State"
                name="state"
                placeholder="Maharashtra"
                required
              />

              <Input
                label="Pincode"
                name="pincode"
                placeholder="400001"
              />
            </div>
          </section>

          {/* Fleet */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Truck}
              title="Fleet & Vehicle Network"
              subtitle="Give us an overview of your own and attached fleet."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Own Trucks"
                name="ownTrucks"
                type="number"
                placeholder="0"
              />

              <Input
                label="Attached Trucks"
                name="attachedTrucks"
                type="number"
                placeholder="0"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Total Fleet
                </label>

                <div className="flex h-[48px] items-center rounded-xl border border-orange-200 bg-orange-50 px-4 font-bold text-orange-600">
                  {totalFleet} Vehicles
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-[#002D5E]">
                  Vehicle Categories
                </h3>

                <p className="text-xs text-gray-500">
                  Add the major vehicle types available in your network.
                </p>
              </div>

              <button
                type="button"
                onClick={addVehicleCategory}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                <Plus size={18} />
                Add Vehicle Type
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {vehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-[#002D5E]">
                      Vehicle Category #{index + 1}
                    </h4>

                    <button
                      type="button"
                      onClick={() => removeVehicle(index)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <select
                      value={vehicle.vehicleType}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "vehicleType",
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
                    >
                      <option value="">Vehicle Type</option>
                      <option>Mini Truck</option>
                      <option>Pickup</option>
                      <option>LCV</option>
                      <option>7 Ft</option>
                      <option>10 Ft</option>
                      <option>12 Ft</option>
                      <option>14 Ft</option>
                      <option>16 Ft</option>
                      <option>17 Ft</option>
                      <option>20 Ft</option>
                      <option>24 Ft</option>
                      <option>32 Ft</option>
                      <option>Trailer</option>
                      <option>Container</option>
                      <option>Other</option>
                    </select>

                    <input
                      type="number"
                      placeholder="No. of Vehicles"
                      value={vehicle.count}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "count",
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
                    />

                    <input
                      type="text"
                      placeholder="Capacity e.g. 10 Ton"
                      value={vehicle.capacity}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "capacity",
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
                    />

                    <input
                      type="text"
                      placeholder="Body Type"
                      value={vehicle.bodyType}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "bodyType",
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Transportation Services */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Route}
              title="Transportation Services"
              subtitle="Select all services your company provides."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Checkbox name="ftl" label="Full Truck Load (FTL)" />
              <Checkbox name="ptl" label="Part Truck Load (PTL)" />

              <Checkbox
                name="dedicatedTransportation"
                label="Dedicated Transportation"
              />

              <Checkbox
                name="generalTransportation"
                label="General Transportation"
              />

              <Checkbox
                name="expressTransportation"
                label="Express Transportation"
              />

              <Checkbox
                name="contractLogistics"
                label="Contract Logistics"
              />

              <Checkbox
                name="returnLoad"
                label="Return Load"
              />

              <Checkbox
                name="multimodalTransportation"
                label="Multimodal Transportation"
              />
            </div>
          </section>

          {/* Goods */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Package}
              title="Goods Handled"
              subtitle="What types of goods can you transport?"
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Checkbox name="generalGoods" label="General Goods" />
              <Checkbox name="industrialGoods" label="Industrial Goods" />
              <Checkbox name="fmcg" label="FMCG" />
              <Checkbox name="machinery" label="Machinery" />
              <Checkbox name="furniture" label="Furniture" />

              <Checkbox
                name="constructionMaterial"
                label="Construction Material"
              />

              <Checkbox
                name="agriculturalGoods"
                label="Agricultural Goods"
              />

              <Checkbox name="ecommerce" label="E-commerce" />
            </div>

            <div className="mt-4">
              <Input
                label="Other Goods"
                name="otherGoods"
                placeholder="Mention any other goods"
              />
            </div>
          </section>

          {/* Operating Area */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Globe}
              title="Operating Area & Routes"
              subtitle="Tell us where your network operates."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Checkbox
                name="localDelivery"
                label="Local Delivery"
              />

              <Checkbox
                name="withinCity"
                label="Within City"
              />

              <Checkbox
                name="maharashtra"
                label="Maharashtra"
              />

              <Checkbox
                name="interstate"
                label="Inter-State"
              />

              <Checkbox
                name="panIndia"
                label="Pan India"
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Textarea
                label="Preferred Pickup Cities"
                name="pickupCities"
                placeholder="Mumbai, Pune, Nashik..."
              />

              <Textarea
                label="Preferred Delivery Cities"
                name="deliveryCities"
                placeholder="Delhi, Bengaluru, Hyderabad..."
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Preferred Routes"
                  name="preferredRoutes"
                  placeholder="Mumbai → Pune, Mumbai → Delhi, Pune → Bengaluru..."
                />
              </div>
            </div>
          </section>

          {/* Operations */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Clock3}
              title="Operations & Availability"
              subtitle="Help us understand your operating capacity."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Checkbox
                name="immediateLoad"
                label="Immediate Load"
              />

              <Checkbox
                name="advanceBooking"
                label="Advance Booking"
              />

              <Checkbox
                name="returnLoadAvailable"
                label="Return Load Available"
              />

              <Checkbox
                name="support247"
                label="24/7 Operations"
              />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <Input
                label="Minimum Notice Period"
                name="minimumNoticePeriod"
                placeholder="e.g. 4 Hours"
              />

              <Input
                label="Preferred Pickup Time"
                name="preferredPickupTime"
                placeholder="e.g. 8 AM - 8 PM"
              />

              <Input
                label="Working Days"
                name="workingDays"
                placeholder="Mon-Sat / All Days"
              />
            </div>
          </section>

          {/* Additional Services */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={ShieldCheck}
              title="Additional Services"
              subtitle="Select additional services available from your company."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Checkbox name="loading" label="Loading" />
              <Checkbox name="unloading" label="Unloading" />
              <Checkbox name="labour" label="Labour" />
              <Checkbox name="doorToDoor" label="Door-to-Door" />
              <Checkbox name="gpsTracking" label="GPS Tracking" />
              <Checkbox name="epod" label="E-POD / POD" />

              <Checkbox
                name="insuranceAssistance"
                label="Insurance Assistance"
              />

              <Checkbox
                name="warehousing"
                label="Warehousing"
              />

              <Checkbox
                name="equipment"
                label="Loading / Unloading Equipment"
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={IndianRupee}
              title="Pricing Information"
              subtitle="Basic rate information for future quotation matching."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="Rate Type"
                name="rateType"
                options={[
                  "Per KM",
                  "Per Trip",
                  "Per Ton",
                  "Per Vehicle",
                  "Negotiable",
                ]}
              />

              <Input
                label="Minimum Trip Charge"
                name="minimumTripCharge"
                type="number"
                placeholder="₹"
              />

              <Input
                label="Minimum KM"
                name="minimumKm"
                type="number"
                placeholder="e.g. 100"
              />

              <Select
                label="Toll Included?"
                name="tollIncluded"
                options={["Yes", "No", "Negotiable"]}
              />

              <Select
                label="Driver Allowance Included?"
                name="driverAllowanceIncluded"
                options={["Yes", "No", "Negotiable"]}
              />

              <Select
                label="Loading Included?"
                name="loadingIncluded"
                options={["Yes", "No", "Negotiable"]}
              />

              <Select
                label="Unloading Included?"
                name="unloadingIncluded"
                options={["Yes", "No", "Negotiable"]}
              />
            </div>
          </section>

          {/* Documents */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={FileText}
              title="Business Documents"
              subtitle="Upload documents for partner verification."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <DocumentUpload
                name="panCard"
                label="PAN Card"
              />

              <DocumentUpload
                name="gstCertificate"
                label="GST Certificate"
              />

              <DocumentUpload
                name="businessProof"
                label="Business Proof"
              />

              <DocumentUpload
                name="cancelledCheque"
                label="Cancelled Cheque"
              />

              <DocumentUpload
                name="officePhoto"
                label="Office / Business Photo"
              />

              <DocumentUpload
                name="fleetPhotos"
                label="Fleet Photos"
              />
            </div>

            <div className="mt-4 flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
              <AlertCircle
                className="mt-0.5 shrink-0"
                size={18}
              />

              <p>
                Documents will be used for Apni Manzil partner verification.
              </p>
            </div>
          </section>

          {/* Bank */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={CreditCard}
              title="Bank & Payment Details"
              subtitle="Payment details for future partner settlements."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Account Holder Name"
                name="accountHolder"
                placeholder="Account holder"
              />

              <Input
                label="Bank Name"
                name="bankName"
                placeholder="Bank name"
              />

              <Input
                label="Account Number"
                name="accountNumber"
                placeholder="Bank account number"
              />

              <Input
                label="IFSC Code"
                name="ifsc"
                placeholder="ABCD0123456"
              />

              <Input
                label="UPI ID"
                name="upi"
                placeholder="company@upi"
              />
            </div>
          </section>

          {/* Profile */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Globe}
              title="Business Profile"
              subtitle="Online presence and additional information."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Google Business Profile Link"
                name="googleBusinessProfile"
                placeholder="https://..."
              />

              <Input
                label="Website"
                name="website"
                placeholder="https://..."
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Additional Information"
                  name="additionalInformation"
                  placeholder="Tell us anything else about your company, routes, fleet or services."
                />
              </div>
            </div>
          </section>

          {/* Emergency */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={Phone}
              title="Emergency / Operations Contact"
              subtitle="Alternative person we can contact when required."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Name"
                name="emergencyName"
                placeholder="Full Name"
              />

              <Input
                label="Relationship / Role"
                name="emergencyRelationship"
                placeholder="Operations Manager"
              />

              <Input
                label="Mobile"
                name="emergencyMobile"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </section>

          {/* Declaration */}
          <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8">
            <SectionTitle
              icon={CheckCircle2}
              title="Declaration & Terms"
              subtitle="Please confirm before submitting your application."
            />

            <div className="space-y-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-gray-50 p-4">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-orange-500"
                />

                <span className="text-sm leading-6 text-gray-700">
                  I confirm that the information provided by me is correct and
                  belongs to my company/business.
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-gray-50 p-4">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-orange-500"
                />

                <span className="text-sm leading-6 text-gray-700">
                  I agree to Apni Manzil partner terms, verification process,
                  lead allocation process and applicable policies.
                </span>
              </label>
            </div>
          </section>

          {/* Submit */}
          <div className="rounded-2xl bg-[#002D5E] p-5 text-white shadow-lg sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  Ready to Join Apni Manzil?
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  Submit your company details for verification.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={19} />
                    Submit Partner Registration
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}