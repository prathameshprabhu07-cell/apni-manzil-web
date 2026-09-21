import React, { useState } from "react";
import {
  Truck,
  User,
  Building2,
  MapPin,
  Phone,
  FileText,
  CreditCard,
  ShieldCheck,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const TruckOwnerRegister = () => {
  // =========================================================
  // n8n WEBHOOK
  // =========================================================
  const N8N_WEBHOOK_URL =
    "http://localhost:5678/webhook/Truck-Owner";

  const [vehicles, setVehicles] = useState([
    {
      vehicleNumber: "",
      vehicleType: "",
      capacity: "",
      length: "",
      bodyType: "",
      ownership: "Own",
      rcNumber: "",
      insuranceValidTill: "",
      permitValidTill: "",
      fitnessValidTill: "",
      pucValidTill: "",
    },
  ]);

  const [formData, setFormData] = useState({
    partnerType: "Truck Owner / Fleet Owner",

    // Owner Details
    fullName: "",
    businessName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    password: "",
    alternateNumber: "",

    // Business
    businessType: "",
    gstRegistered: "No",
    gstNumber: "",
    panNumber: "",
    yearsInBusiness: "",

    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Fleet
    totalTrucksOwned: "",
    totalAttachedTrucks: "",

    // Services
    services: [],
    goodsTypes: [],

    // Routes
    operatingArea: [],
    pickupCities: "",
    deliveryCities: "",
    preferredRoutes: "",

    // Availability
    immediateLoad: "Yes",
    workingDays: [],
    pickupTime: "",
    advanceBooking: "No",
    noticePeriod: "",
    returnLoad: "No",

    // Driver
    driverAvailable: "Yes",
    numberOfDrivers: "",
    driverName: "",
    driverMobile: "",
    driverLicense: "",
    driverExperience: "",

    // Additional Services
    additionalServices: [],

    // Pricing
    rateType: "",
    minimumTripCharge: "",
    minimumKm: "",
    tollIncluded: "No",
    driverAllowanceIncluded: "No",
    loadingIncluded: "No",
    unloadingIncluded: "No",

    // Documents
    panDocument: [],
    gstDocument: [],
    businessProof: [],
    cancelledCheque: [],
    fleetPhotos: [],
    officePhoto: [],

    // Business Profile
    googleBusinessLink: "",
    website: "",
    additionalInformation: "",

    // Bank
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",

    // Emergency
    emergencyName: "",
    emergencyRelationship: "",
    emergencyMobile: "",

    // Declaration
    declaration: false,
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const vehicleTypes = [
    "Mini Truck",
    "Tata 407",
    "Pickup",
    "14 Ft",
    "17 Ft",
    "19 Ft",
    "20 Ft",
    "22 Ft",
    "24 Ft",
    "32 Ft",
    "Trailer",
    "Container",
    "Other",
  ];

  const bodyTypes = [
    "Open",
    "Closed",
    "Container",
    "Flatbed",
    "Trailer",
    "Refrigerated",
    "Other",
  ];

  const goodsTypes = [
    "General Goods",
    "Industrial Goods",
    "FMCG",
    "Machinery",
    "Furniture",
    "Construction Material",
    "Agricultural Goods",
    "E-commerce",
    "Other",
  ];

  const services = [
    "Full Truck Load (FTL)",
    "Part Truck Load (PTL)",
    "Dedicated Truck",
    "General Transportation",
  ];

  const additionalServices = [
    "Loading",
    "Unloading",
    "Labour",
    "Door-to-Door Transportation",
    "GPS Tracking",
    "E-POD / POD",
    "Insurance Assistance",
    "Loading / Unloading Equipment",
  ];

  const areas = [
    "Local Delivery",
    "Within City",
    "Maharashtra",
    "Inter-State",
    "Pan India",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const current = prev[field] || [];

      if (current.includes(value)) {
        return {
          ...prev,
          [field]: current.filter((item) => item !== value),
        };
      }

      return {
        ...prev,
        [field]: [...current, value],
      };
    });
  };

  const updateVehicle = (index, field, value) => {
    setVehicles((prev) =>
      prev.map((vehicle, i) =>
        i === index
          ? {
              ...vehicle,
              [field]: value,
            }
          : vehicle
      )
    );
  };

  const addVehicle = () => {
    setVehicles((prev) => [
      ...prev,
      {
        vehicleNumber: "",
        vehicleType: "",
        capacity: "",
        length: "",
        bodyType: "",
        ownership: "Own",
        rcNumber: "",
        insuranceValidTill: "",
        permitValidTill: "",
        fitnessValidTill: "",
        pucValidTill: "",
      },
    ]);
  };

  const removeVehicle = (index) => {
    if (vehicles.length === 1) return;

    setVehicles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e, documentType) => {
    const files = Array.from(e.target.files || []);

    setFormData((prev) => ({
      ...prev,
      [documentType]: files,
    }));
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  const labelClass =
    "block text-xs font-extrabold uppercase tracking-wide text-slate-600 mb-2";

  const sectionClass =
    "bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 lg:p-8";

  // =========================================================
  // SUBMIT
  // Firebase Account → n8n
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert("Please enter Full Name.");
      return;
    }

    if (!formData.mobileNumber.trim()) {
      alert("Please enter Mobile Number.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter Email Address.");
      return;
    }

    if (!formData.password) {
      alert("Please create a password.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (!formData.panNumber.trim()) {
      alert("Please enter PAN Number.");
      return;
    }

    if (
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please complete your business address.");
      return;
    }

    if (!formData.declaration || !formData.termsAccepted) {
      alert("Please accept the declaration and Terms & Conditions.");
      return;
    }

    // Vehicle validation
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];

      if (
        !vehicle.vehicleNumber.trim() ||
        !vehicle.vehicleType ||
        !vehicle.capacity
      ) {
        alert(
          `Please complete Vehicle ${i + 1}: Vehicle Number, Vehicle Type and Capacity are required.`
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // =====================================================
      // 1. CREATE FIREBASE AUTH ACCOUNT
      // =====================================================

      const email = formData.email.trim().toLowerCase();

      const firebaseResult =
        await createUserWithEmailAndPassword(
          auth,
          email,
          formData.password
        );

      const firebaseUser = firebaseResult.user;

      console.log(
        "FIREBASE ACCOUNT CREATED:",
        firebaseUser.uid
      );

      // =====================================================
      // 2. DOCUMENT METADATA
      // Actual files are NOT sent to n8n yet.
      // =====================================================

      const documentMetadata = {
        panDocument: (formData.panDocument || []).map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),

        gstDocument: (formData.gstDocument || []).map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),

        businessProof: (formData.businessProof || []).map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),

        cancelledCheque: (formData.cancelledCheque || []).map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),

        fleetPhotos: (formData.fleetPhotos || []).map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),

        officePhoto: (formData.officePhoto || []).map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      };

      // =====================================================
      // 3. FINAL PAYLOAD
      // Password is intentionally NOT included.
      // =====================================================

      const payload = {
        // Firebase Account
        Firebase_UID: firebaseUser.uid,
        accountEmail: email,
        accountProvider: "password",

        // Basic
        serviceCategory: "Truck Transport",
        partnerType: "Truck Owner / Fleet Owner",
        requestSource: "Apni Manzil",

        // Owner
        ownerDetails: {
          fullName: formData.fullName,
          businessName: formData.businessName,
          mobileNumber: formData.mobileNumber,
          whatsappNumber: formData.whatsappNumber,
          email: email,
          alternateNumber: formData.alternateNumber,
        },

        // Business
        businessDetails: {
          businessType: formData.businessType,
          gstRegistered: formData.gstRegistered,
          gstNumber: formData.gstNumber,
          panNumber: formData.panNumber,
          yearsInBusiness: formData.yearsInBusiness,
        },

        // Address
        businessAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },

        // Fleet
        fleetDetails: {
          totalTrucksOwned: Number(
            formData.totalTrucksOwned || 0
          ),

          totalAttachedTrucks: Number(
            formData.totalAttachedTrucks || 0
          ),

          totalFleetSize:
            Number(formData.totalTrucksOwned || 0) +
            Number(formData.totalAttachedTrucks || 0),
        },

        // Vehicles
        vehicles: vehicles.map((vehicle) => ({
          vehicleNumber:
            vehicle.vehicleNumber.toUpperCase(),

          vehicleType: vehicle.vehicleType,
          capacity: vehicle.capacity,
          length: vehicle.length,
          bodyType: vehicle.bodyType,
          ownership: vehicle.ownership,

          rcNumber: vehicle.rcNumber
            ? vehicle.rcNumber.toUpperCase()
            : "",

          insuranceValidTill:
            vehicle.insuranceValidTill,

          permitValidTill:
            vehicle.permitValidTill,

          fitnessValidTill:
            vehicle.fitnessValidTill,

          pucValidTill:
            vehicle.pucValidTill,
        })),

        // Services
        transportationServices: {
          services: formData.services,
          goodsTypes: formData.goodsTypes,
        },

        // Routes
        operatingArea: {
          areas: formData.operatingArea,
          pickupCities: formData.pickupCities,
          deliveryCities: formData.deliveryCities,
          preferredRoutes: formData.preferredRoutes,
        },

        // Availability
        availability: {
          immediateLoad: formData.immediateLoad,
          workingDays: formData.workingDays,
          pickupTime: formData.pickupTime,
          advanceBooking: formData.advanceBooking,
          noticePeriod: formData.noticePeriod,
          returnLoad: formData.returnLoad,
        },

        // Driver
        driverDetails: {
          driverAvailable:
            formData.driverAvailable,

          numberOfDrivers: Number(
            formData.numberOfDrivers || 0
          ),

          driverName: formData.driverName,
          driverMobile: formData.driverMobile,
          driverLicense: formData.driverLicense,
          driverExperience:
            formData.driverExperience,
        },

        // Additional Services
        additionalServices:
          formData.additionalServices,

        // Pricing
        pricing: {
          rateType: formData.rateType,
          minimumTripCharge:
            formData.minimumTripCharge,

          minimumKm: formData.minimumKm,
          tollIncluded: formData.tollIncluded,

          driverAllowanceIncluded:
            formData.driverAllowanceIncluded,

          loadingIncluded:
            formData.loadingIncluded,

          unloadingIncluded:
            formData.unloadingIncluded,
        },

        // Documents
        documents: documentMetadata,

        // Business Profile
        businessProfile: {
          googleBusinessLink:
            formData.googleBusinessLink,

          website: formData.website,

          additionalInformation:
            formData.additionalInformation,
        },

        // Bank
        bankDetails: {
          accountHolderName:
            formData.accountHolderName,

          bankName: formData.bankName,

          accountNumber:
            formData.accountNumber,

          ifsc: formData.ifsc,

          upiId: formData.upiId,
        },

        // Emergency
        emergencyContact: {
          name: formData.emergencyName,
          relationship:
            formData.emergencyRelationship,
          mobile: formData.emergencyMobile,
        },

        // Status
        partnerStatus: "Pending Verification",
        verificationStatus: "Pending",

        // Timestamp
        submittedAt: new Date().toISOString(),
      };

      console.log(
        "TRUCK OWNER → n8n PAYLOAD:",
        payload
      );

      // =====================================================
      // 4. SEND TO n8n
      // =====================================================

      const response = await fetch(
        N8N_WEBHOOK_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const responseText =
        await response.text();

      let responseData = null;

      try {
        responseData = responseText
          ? JSON.parse(responseText)
          : null;
      } catch {
        responseData = responseText;
      }

      console.log(
        "n8n HTTP STATUS:",
        response.status
      );

      console.log(
        "n8n RESPONSE:",
        responseData
      );

      if (!response.ok) {
        throw new Error(
          `n8n webhook failed with status ${response.status}`
        );
      }

      alert(
        "Registration submitted successfully! Your account has been created and your partner application is now pending verification."
      );

    } catch (error) {
      console.error(
        "TRUCK OWNER SUBMISSION ERROR:",
        error
      );

      if (
        error?.code ===
        "auth/email-already-in-use"
      ) {
        alert(
          "This email is already registered. Please use another email or login with your existing account."
        );
      } else if (
        error?.code === "auth/invalid-email"
      ) {
        alert(
          "Please enter a valid email address."
        );
      } else if (
        error?.code === "auth/weak-password"
      ) {
        alert(
          "Password must be at least 6 characters."
        );
      } else {
        alert(
          "Unable to submit registration. Please make sure Firebase and n8n are configured correctly."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-[#002D5E] rounded-[2rem] p-7 lg:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
                <Truck size={15} />
                Truck Transport Partner
              </div>

              <h1 className="text-3xl lg:text-5xl font-[950] italic uppercase tracking-tight">
                Truck Owner / Fleet Owner
              </h1>

              <p className="text-slate-300 text-sm font-medium mt-3 max-w-2xl leading-relaxed">
                Register your trucks with Apni Manzil and receive genuine
                transportation requirements from customers across India.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 min-w-[210px]">

              <p className="text-[10px] uppercase font-black text-slate-300">
                Partner Type
              </p>

              <div className="flex items-center gap-2 mt-2">

                <Truck
                  className="text-orange-400"
                  size={20}
                />

                <span className="font-extrabold text-sm">
                  Truck Owner / Fleet Owner
                </span>

              </div>
            </div>

          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          {/* 1 Owner Details */}
          <section className={sectionClass}>

            <SectionTitle
              number="01"
              icon={<User size={20} />}
              title="Owner / Contact Details"
              subtitle="Basic information about you and your business."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Field
                label="Full Name *"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />

              <Field
                label="Business / Fleet Name *"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter business or fleet name"
              />

              <Field
                label="Mobile Number *"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                type="tel"
              />

              <Field
                label="WhatsApp Number *"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="WhatsApp number"
                type="tel"
              />

              <Field
                label="Email Address *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                type="email"
                required
              />

              <Field
                label="Alternate Contact Number"
                name="alternateNumber"
                value={formData.alternateNumber}
                onChange={handleChange}
                placeholder="Alternate number"
                type="tel"
              />

            </div>
          </section>

          {/* 2 Business Details */}
          <section className={sectionClass}>

            <SectionTitle
              number="02"
              icon={<Building2 size={20} />}
              title="Business Details"
              subtitle="Tell us about your transportation business."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <SelectField
                label="Business Type"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                options={[
                  "Individual",
                  "Proprietorship",
                  "Partnership",
                  "Private Limited Company",
                  "LLP",
                  "Other",
                ]}
              />

              <SelectField
                label="GST Registered?"
                name="gstRegistered"
                value={formData.gstRegistered}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              {formData.gstRegistered === "Yes" && (
                <Field
                  label="GST Number"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="Enter GST number"
                />
              )}

              <Field
                label="PAN Number *"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="Enter PAN number"
              />

              <Field
                label="Years in Transportation Business"
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
                placeholder="Example: 5"
                type="number"
              />

            </div>
          </section>

          {/* 3 Address */}
          <section className={sectionClass}>

            <SectionTitle
              number="03"
              icon={<MapPin size={20} />}
              title="Business Address"
              subtitle="Your operating / registered business location."
            />

            <div className="space-y-5">

              <div>
                <label className={labelClass}>
                  Full Address *
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter complete business address"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <Field
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />

                <Field
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />

                <Field
                  label="Pincode *"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                />

              </div>
            </div>
          </section>

          {/* 4 Fleet */}
          <section className={sectionClass}>

            <SectionTitle
              number="04"
              icon={<Truck size={20} />}
              title="Fleet Details"
              subtitle="Tell us about your available fleet."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">

              <Field
                label="Total Trucks Owned *"
                name="totalTrucksOwned"
                value={formData.totalTrucksOwned}
                onChange={handleChange}
                placeholder="Example: 5"
                type="number"
              />

              <Field
                label="Total Attached Trucks"
                name="totalAttachedTrucks"
                value={formData.totalAttachedTrucks}
                onChange={handleChange}
                placeholder="Example: 3"
                type="number"
              />

            </div>

            <div className="flex items-center justify-between mb-5">

              <div>
                <h3 className="font-black text-[#002D5E] uppercase text-sm">
                  Your Vehicles
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Add every truck that you want to register.
                </p>
              </div>

              <button
                type="button"
                onClick={addVehicle}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-black text-xs uppercase transition"
              >
                <Plus size={16} />
                Add Vehicle
              </button>

            </div>

            <div className="space-y-6">

              {vehicles.map((vehicle, index) => (

                <div
                  key={index}
                  className="border border-slate-200 rounded-3xl p-5 bg-slate-50"
                >

                  <div className="flex items-center justify-between mb-5">

                    <h4 className="font-black text-[#002D5E]">
                      Vehicle {index + 1}
                    </h4>

                    {vehicles.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeVehicle(index)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    <VehicleField
                      label="Vehicle Number *"
                      value={vehicle.vehicleNumber}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "vehicleNumber",
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="MH 12 AB 1234"
                    />

                    <VehicleSelect
                      label="Vehicle Type *"
                      value={vehicle.vehicleType}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "vehicleType",
                          e.target.value
                        )
                      }
                      options={vehicleTypes}
                    />

                    <VehicleField
                      label="Capacity (Ton) *"
                      value={vehicle.capacity}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "capacity",
                          e.target.value
                        )
                      }
                      placeholder="Example: 10"
                      type="number"
                    />

                    <VehicleField
                      label="Vehicle Length / Size"
                      value={vehicle.length}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "length",
                          e.target.value
                        )
                      }
                      placeholder="Example: 17 Ft"
                    />

                    <VehicleSelect
                      label="Body Type"
                      value={vehicle.bodyType}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "bodyType",
                          e.target.value
                        )
                      }
                      options={bodyTypes}
                    />

                    <VehicleSelect
                      label="Ownership"
                      value={vehicle.ownership}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "ownership",
                          e.target.value
                        )
                      }
                      options={["Own", "Attached"]}
                    />

                    <VehicleField
                      label="RC Number"
                      value={vehicle.rcNumber}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "rcNumber",
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="RC number"
                    />

                    <VehicleField
                      label="Insurance Valid Till"
                      value={vehicle.insuranceValidTill}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "insuranceValidTill",
                          e.target.value
                        )
                      }
                      type="date"
                    />

                    <VehicleField
                      label="Permit Valid Till"
                      value={vehicle.permitValidTill}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "permitValidTill",
                          e.target.value
                        )
                      }
                      type="date"
                    />

                    <VehicleField
                      label="Fitness Valid Till"
                      value={vehicle.fitnessValidTill}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "fitnessValidTill",
                          e.target.value
                        )
                      }
                      type="date"
                    />

                    <VehicleField
                      label="PUC Valid Till"
                      value={vehicle.pucValidTill}
                      onChange={(e) =>
                        updateVehicle(
                          index,
                          "pucValidTill",
                          e.target.value
                        )
                      }
                      type="date"
                    />

                  </div>
                </div>

              ))}

            </div>
          </section>

          {/* 5 Services */}
          <section className={sectionClass}>

            <SectionTitle
              number="05"
              icon={<Truck size={20} />}
              title="Services You Provide"
              subtitle="Select all services and goods you can handle."
            />

            <CheckboxGrid
              title="Transportation Services"
              items={services}
              selected={formData.services}
              onChange={(value) =>
                handleMultiSelect(
                  "services",
                  value
                )
              }
            />

            <div className="mt-8">

              <CheckboxGrid
                title="Goods / Load Types"
                items={goodsTypes}
                selected={formData.goodsTypes}
                onChange={(value) =>
                  handleMultiSelect(
                    "goodsTypes",
                    value
                  )
                }
              />

            </div>
          </section>

          {/* 6 Operating Area */}
          <section className={sectionClass}>

            <SectionTitle
              number="06"
              icon={<MapPin size={20} />}
              title="Operating Area & Routes"
              subtitle="This helps Apni Manzil match the right customer requirements."
            />

            <CheckboxGrid
              title="Operating Area"
              items={areas}
              selected={formData.operatingArea}
              onChange={(value) =>
                handleMultiSelect(
                  "operatingArea",
                  value
                )
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">

              <Field
                label="Preferred Pickup Cities"
                name="pickupCities"
                value={formData.pickupCities}
                onChange={handleChange}
                placeholder="Mumbai, Pune, Nashik..."
              />

              <Field
                label="Preferred Delivery Cities"
                name="deliveryCities"
                value={formData.deliveryCities}
                onChange={handleChange}
                placeholder="Delhi, Bangalore..."
              />

              <Field
                label="Preferred Routes"
                name="preferredRoutes"
                value={formData.preferredRoutes}
                onChange={handleChange}
                placeholder="Mumbai → Delhi"
              />

            </div>
          </section>

          {/* 7 Availability */}
          <section className={sectionClass}>

            <SectionTitle
              number="07"
              icon={<CheckCircle2 size={20} />}
              title="Availability"
              subtitle="Tell customers when your trucks are available."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <SelectField
                label="Available for Immediate Load?"
                name="immediateLoad"
                value={formData.immediateLoad}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <SelectField
                label="Advance Booking Required?"
                name="advanceBooking"
                value={formData.advanceBooking}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <Field
                label="Minimum Notice Period"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder="Example: 1 Day"
              />

              <SelectField
                label="Return Load Available?"
                name="returnLoad"
                value={formData.returnLoad}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <SelectField
                label="Preferred Pickup Time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                options={[
                  "Any Time",
                  "Morning",
                  "Afternoon",
                  "Evening",
                  "Night",
                ]}
              />

            </div>

            <div className="mt-7">

              <CheckboxGrid
                title="Working Days"
                items={days}
                selected={formData.workingDays}
                onChange={(value) =>
                  handleMultiSelect(
                    "workingDays",
                    value
                  )
                }
              />

            </div>
          </section>

          {/* 8 Driver */}
          <section className={sectionClass}>

            <SectionTitle
              number="08"
              icon={<User size={20} />}
              title="Driver Details"
              subtitle="Basic information about your driver availability."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <SelectField
                label="Driver Available?"
                name="driverAvailable"
                value={formData.driverAvailable}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              {formData.driverAvailable === "Yes" && (
                <>
                  <Field
                    label="Number of Drivers"
                    name="numberOfDrivers"
                    value={formData.numberOfDrivers}
                    onChange={handleChange}
                    placeholder="Example: 5"
                    type="number"
                  />

                  <Field
                    label="Primary Driver Name"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    placeholder="Driver name"
                  />

                  <Field
                    label="Driver Mobile"
                    name="driverMobile"
                    value={formData.driverMobile}
                    onChange={handleChange}
                    placeholder="Driver mobile"
                    type="tel"
                  />

                  <Field
                    label="Driving License Number"
                    name="driverLicense"
                    value={formData.driverLicense}
                    onChange={handleChange}
                    placeholder="License number"
                  />

                  <Field
                    label="Driver Experience"
                    name="driverExperience"
                    value={formData.driverExperience}
                    onChange={handleChange}
                    placeholder="Example: 8 years"
                  />
                </>
              )}

            </div>
          </section>

          {/* 9 Additional Services */}
          <section className={sectionClass}>

            <SectionTitle
              number="09"
              icon={<ShieldCheck size={20} />}
              title="Additional Services"
              subtitle="Select additional facilities available with your trucks."
            />

            <CheckboxGrid
              title="Additional Services"
              items={additionalServices}
              selected={formData.additionalServices}
              onChange={(value) =>
                handleMultiSelect(
                  "additionalServices",
                  value
                )
              }
            />

          </section>

          {/* 10 Pricing */}
          <section className={sectionClass}>

            <SectionTitle
              number="10"
              icon={<CreditCard size={20} />}
              title="Pricing Information"
              subtitle="Give us your basic pricing structure. Final quotes can be negotiated per requirement."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              <SelectField
                label="Rate Type"
                name="rateType"
                value={formData.rateType}
                onChange={handleChange}
                options={[
                  "Per KM",
                  "Per Trip",
                  "Per Ton",
                  "Negotiable",
                ]}
              />

              <Field
                label="Minimum Trip Charge"
                name="minimumTripCharge"
                value={formData.minimumTripCharge}
                onChange={handleChange}
                placeholder="₹ Amount"
                type="number"
              />

              <Field
                label="Minimum KM"
                name="minimumKm"
                value={formData.minimumKm}
                onChange={handleChange}
                placeholder="Example: 100"
                type="number"
              />

              <SelectField
                label="Toll Included?"
                name="tollIncluded"
                value={formData.tollIncluded}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <SelectField
                label="Driver Allowance Included?"
                name="driverAllowanceIncluded"
                value={
                  formData.driverAllowanceIncluded
                }
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <SelectField
                label="Loading Included?"
                name="loadingIncluded"
                value={formData.loadingIncluded}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

              <SelectField
                label="Unloading Included?"
                name="unloadingIncluded"
                value={formData.unloadingIncluded}
                onChange={handleChange}
                options={["Yes", "No"]}
              />

            </div>
          </section>

          {/* 11 Documents */}
          <section className={sectionClass}>

            <SectionTitle
              number="11"
              icon={<FileText size={20} />}
              title="Documents"
              subtitle="Upload your business and vehicle documents for verification."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <DocumentUpload
                label="PAN Card *"
                name="panDocument"
                onChange={handleFileChange}
              />

              <DocumentUpload
                label="GST Certificate"
                name="gstDocument"
                onChange={handleFileChange}
              />

              <DocumentUpload
                label="Business Proof"
                name="businessProof"
                onChange={handleFileChange}
              />

              <DocumentUpload
                label="Cancelled Cheque"
                name="cancelledCheque"
                onChange={handleFileChange}
              />

              <DocumentUpload
                label="Fleet / Truck Photos"
                name="fleetPhotos"
                onChange={handleFileChange}
                multiple
              />

              <DocumentUpload
                label="Office / Business Photo"
                name="officePhoto"
                onChange={handleFileChange}
              />

            </div>

            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">

              <AlertCircle
                className="text-blue-600 shrink-0"
                size={19}
              />

              <p className="text-xs text-blue-800 font-medium leading-relaxed">
                Vehicle-specific RC, Insurance, Permit, Fitness and PUC
                documents can be uploaded during vehicle verification.
              </p>

            </div>
          </section>

          {/* 12 Bank */}
          <section className={sectionClass}>

            <SectionTitle
              number="12"
              icon={<CreditCard size={20} />}
              title="Bank / Payment Details"
              subtitle="Used for partner payments and settlements."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Field
                label="Account Holder Name *"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Account holder name"
              />

              <Field
                label="Bank Name *"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Bank name"
              />

              <Field
                label="Account Number *"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account number"
                type="password"
              />

              <Field
                label="IFSC Code *"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                placeholder="IFSC code"
              />

              <Field
                label="UPI ID"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="example@upi"
              />

            </div>
          </section>

          {/* 13 Profile */}
          <section className={sectionClass}>

            <SectionTitle
              number="13"
              icon={<Building2 size={20} />}
              title="Business Profile"
              subtitle="Optional information to help us understand your business."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Field
                label="Google Business Profile Link"
                name="googleBusinessLink"
                value={formData.googleBusinessLink}
                onChange={handleChange}
                placeholder="https://..."
              />

              <Field
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://..."
              />

            </div>

            <div className="mt-5">

              <label className={labelClass}>
                Additional Information
              </label>

              <textarea
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us anything else about your fleet or transportation service..."
                className={inputClass}
              />

            </div>
          </section>

          {/* 14 Emergency */}
          <section className={sectionClass}>

            <SectionTitle
              number="14"
              icon={<Phone size={20} />}
              title="Emergency Contact"
              subtitle="Provide an emergency contact for operational communication."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <Field
                label="Contact Name"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                placeholder="Name"
              />

              <Field
                label="Relationship"
                name="emergencyRelationship"
                value={
                  formData.emergencyRelationship
                }
                onChange={handleChange}
                placeholder="Relationship"
              />

              <Field
                label="Mobile Number"
                name="emergencyMobile"
                value={formData.emergencyMobile}
                onChange={handleChange}
                placeholder="Mobile number"
                type="tel"
              />

            </div>
          </section>

          {/* 15 Login Details */}
          <section className="bg-white rounded-[2rem] border-2 border-orange-200 shadow-sm p-6 lg:p-8">

            <SectionTitle
              number="15"
              icon={<Lock size={20} />}
              title="Partner Login Details"
              subtitle="Create your Apni Manzil Vendor Dashboard login account."
            />

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 flex gap-3">

              <ShieldCheck
                className="text-orange-500 shrink-0"
                size={20}
              />

              <p className="text-xs text-orange-800 font-medium leading-relaxed">
                Your password is securely handled by Firebase Authentication.
                It will never be sent to n8n, Google Sheets, or our partner
                database.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className={labelClass}>
                  Login Email *
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                </div>

              </div>

              <div>

                <label className={labelClass}>
                  Create Password *
                </label>

                <div className="relative">

                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

            </div>
          </section>

          {/* 16 Declaration */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 lg:p-8">

            <div className="flex items-start gap-3">

              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-orange-500"
              />

              <label className="text-sm text-slate-600 font-medium leading-relaxed">
                I confirm that the information provided by me is correct and
                belongs to my business / fleet.
              </label>

            </div>

            <div className="flex items-start gap-3 mt-5">

              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 w-5 h-5 accent-orange-500"
              />

              <label className="text-sm text-slate-600 font-medium leading-relaxed">
                I agree to the Apni Manzil Partner Terms & Conditions and
                understand that my application will be verified before
                activation.
              </label>

            </div>

          </section>

          {/* Submit */}
          <div className="bg-[#002D5E] rounded-[2rem] p-6 lg:p-8 shadow-xl">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div className="flex items-start gap-3 text-white">

                <ShieldCheck
                  className="text-orange-400 shrink-0 mt-1"
                  size={25}
                />

                <div>

                  <h3 className="font-black uppercase text-sm">
                    Partner Verification
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Your Firebase account will be created and your partner
                    application will be submitted for verification.
                  </p>

                </div>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full lg:w-auto min-w-[240px] bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-wider shadow-lg transition flex items-center justify-center gap-2"
              >

                {isSubmitting ? (
                  <>
                    <span className="animate-spin">
                      ⟳
                    </span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Register as Truck Owner
                  </>
                )}

              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

/* =========================
   REUSABLE COMPONENTS
========================= */

const SectionTitle = ({
  number,
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-start gap-4 mb-7">

      <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>

        <div className="flex items-center gap-2">

          <span className="text-[10px] font-black text-orange-500">
            {number}
          </span>

          <h2 className="text-xl lg:text-2xl font-[950] uppercase italic text-[#002D5E]">
            {title}
          </h2>

        </div>

        <p className="text-xs text-slate-500 font-medium mt-1">
          {subtitle}
        </p>

      </div>

    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => {
  return (
    <div>

      <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-600 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />

    </div>
  );
};

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>

      <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-600 mb-2">
        {label}
      </label>

      <div className="relative">

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        >

          <option value="">
            Select
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}

        </select>

        <ChevronDown
          size={17}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
        />

      </div>
    </div>
  );
};

const CheckboxGrid = ({
  title,
  items,
  selected,
  onChange,
}) => {
  return (
    <div>

      <h3 className="text-xs font-black uppercase tracking-wide text-slate-600 mb-3">
        {title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

        {items.map((item) => {

          const active =
            selected.includes(item);

          return (
            <button
              type="button"
              key={item}
              onClick={() => onChange(item)}
              className={`text-left px-4 py-3 rounded-xl border text-xs font-bold transition ${
                active
                  ? "bg-orange-50 border-orange-400 text-orange-700"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-orange-300"
              }`}
            >

              <span className="flex items-center gap-2">

                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    active
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {active && "✓"}
                </span>

                {item}

              </span>

            </button>
          );
        })}

      </div>
    </div>
  );
};

const VehicleField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div>

      <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-600 mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />

    </div>
  );
};

const VehicleSelect = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>

      <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-600 mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      >

        <option value="">
          Select
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
};

const DocumentUpload = ({
  label,
  name,
  onChange,
  multiple = false,
}) => {
  return (
    <label className="border-2 border-dashed border-slate-200 hover:border-orange-400 bg-slate-50 hover:bg-orange-50 rounded-2xl p-5 cursor-pointer transition">

      <div className="flex items-center gap-4">

        <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500">
          <Upload size={20} />
        </div>

        <div>

          <p className="text-xs font-black uppercase text-[#002D5E]">
            {label}
          </p>

          <p className="text-[10px] text-slate-500 mt-1">
            PDF, JPG or PNG
          </p>

        </div>

      </div>

      <input
        type="file"
        name={name}
        multiple={multiple}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) =>
          onChange(e, name)
        }
        className="hidden"
      />

    </label>
  );
};

export default TruckOwnerRegister;