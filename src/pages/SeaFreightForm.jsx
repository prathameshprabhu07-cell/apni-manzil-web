import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Ship,
  ArrowLeft,
  ChevronRight,
  Upload,
  Anchor,
  Package,
  Globe2,
  FileCheck,
  ShieldCheck,
  Thermometer,
  AlertTriangle,
  Ruler,
} from "lucide-react";
import { sendWhatsAppNotification } from "../utils/whatsapp";

// Add your landscape ship image here:
// src/assets/sea-freight-ship.jpg
import seaFreightShip from "../assets/sea-freight-ship.jpg";

const SeaFreightForm = () => {
  const navigate = useNavigate();

  // Keep your existing n8n webhook flow
  const n8nUrl =
    "http://localhost:5678/webhook/apni-manzil-logistics";

  const [formData, setFormData] = useState({
    // 1. Customer
    customerType: "Business",
    companyName: "",
    contactPerson: "",
    mobileNumber: "",
    whatsappNumber: "",
    emailAddress: "",
    gstNumber: "",
    iecNumber: "",

    // 2. Shipment
    shipmentType: "Export",
    serviceRequired: "Door to Door",
    shipmentMode: "FCL",
    preferredShipmentDate: "",

    // 3. Shipper
    shipperCompany: "",
    shipperName: "",
    shipperPhone: "",
    shipperEmail: "",
    shipperAddress: "",
    shipperCity: "",
    shipperState: "",
    shipperCountry: "India",
    shipperZip: "",

    // 4. Consignee
    consigneeCompany: "",
    consigneeName: "",
    consigneePhone: "",
    consigneeEmail: "",
    consigneeAddress: "",
    consigneeCity: "",
    consigneeState: "",
    consigneeCountry: "",
    consigneeZip: "",

    // 5. Notify Party
    notifySameAsConsignee: true,
    notifyCompany: "",
    notifyName: "",
    notifyPhone: "",
    notifyEmail: "",
    notifyAddress: "",
    notifyCountry: "",

    // 6. Origin / Destination
    placeOfReceipt: "",
    pickupAddress: "",
    originPort: "Mumbai (JNPT)",
    destinationPort: "",
    destinationCountry: "",
    finalDestination: "",
    deliveryAddress: "",

    // 7. Cargo
    cargoType: "General Cargo",
    cargoDescription: "",
    hsCode: "",
    numberOfPackages: "",
    packageType: "Cartons",
    grossWeight: "",
    netWeight: "",
    cbm: "",

    // 8. Container
    containerQuantity: "1",
    containerType: "20 FT Dry Container",
    stuffingType: "Factory Stuffing",
    containerPickupRequired: false,
    containerPickupLocation: "",
    containerPickupDate: "",

    // 9. DG
    dangerousGoods: false,
    unNumber: "",
    properShippingName: "",
    imoClass: "",
    packingGroup: "",
    flashPoint: "",
    msdsAvailable: "No",

    // 10. Reefer
    reeferCargo: false,
    temperature: "",
    temperatureUnit: "°C",
    ventilationRequired: false,

    // 11. OOG / Project Cargo
    oogCargo: false,
    cargoLength: "",
    cargoWidth: "",
    cargoHeight: "",
    oogWeight: "",
    liftingRequirement: "",

    // 12. Customs
    customsClearanceRequired: "Yes",
    chaRequired: "Yes",
    ownCha: false,
    chaCompany: "",
    chaContact: "",

    // 13. Freight
    freightTerms: "Prepaid",
    quoteRequired: "Yes",
    preferredCurrency: "USD",
    preferredShippingLine: "No Preference",

    // 14. Insurance
    insuranceRequired: "No",
    cargoValue: "",
    cargoValueCurrency: "USD",

    // 15. VGM
    vgmStatus: "Will Provide Later",

    // 16. Documents / Instructions
    commercialInvoiceAvailable: "No",
    packingListAvailable: "No",
    certificateOfOriginAvailable: "No",
    specialInstructions: "",
  });

  const [files, setFiles] = useState({
    commercialInvoice: null,
    packingList: null,
    iecCertificate: null,
    msds: null,
    cargoPhotos: null,
    otherDocument: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    setFiles((prev) => ({
      ...prev,
      [name]: selectedFiles?.[0] || null,
    }));
  };

  const inputClass =
    "w-full p-4 rounded-2xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002D5E]/20 focus:border-[#002D5E] transition";

  const labelClass =
    "block text-sm font-bold text-slate-700 mb-2";

  const sectionClass =
    "bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm";

  const sectionTitle = (icon, number, title, subtitle) => (
    <div className="flex items-start gap-4 mb-6">
      <div className="bg-blue-50 text-[#002D5E] p-3 rounded-2xl">
        {icon}
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-black text-[#002D5E]">
          {number}. {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName || !formData.contactPerson) {
      alert("Please enter company/name and contact person.");
      return;
    }

    if (!formData.mobileNumber || !formData.emailAddress) {
      alert("Please enter mobile number and email.");
      return;
    }

    if (!formData.destinationCountry || !formData.destinationPort) {
      alert("Please enter destination country and destination port.");
      return;
    }

    if (!formData.cargoDescription) {
      alert("Please enter cargo description.");
      return;
    }

    setSubmitting(true);

    const orderId =
      "SEA-" + Math.floor(100000 + Math.random() * 900000);

    const payload = {
      action: "Sea_Freight_Booking",
      service: "Sea Freight",
      orderId,

      ...formData,

      uploadedDocuments: {
        commercialInvoice:
          files.commercialInvoice?.name || "",
        packingList:
          files.packingList?.name || "",
        iecCertificate:
          files.iecCertificate?.name || "",
        msds:
          files.msds?.name || "",
        cargoPhotos:
          files.cargoPhotos?.name || "",
        otherDocument:
          files.otherDocument?.name || "",
      },

      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(n8nUrl, payload);

      sendWhatsAppNotification(
        formData.whatsappNumber ||
          formData.mobileNumber ||
          "7378502356",
        formData.contactPerson || "Sea Freight Client",
        "Sea Freight Inquiry",
        orderId
      );

      alert(
        `Sea Freight inquiry successfully submitted!\n\nReference ID: ${orderId}`
      );

      navigate("/international-logistics");
    } catch (error) {
      console.error("Sea Freight n8n Error:", error);

      alert(
        "Your request could not be submitted right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-8 md:py-12 px-4 md:px-6">

      {/* Main Container */}
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-[#002D5E] mb-6 font-bold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">

            <div className="bg-blue-50 text-[#002D5E] p-4 rounded-2xl w-fit">
              <Ship size={40} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-orange-500 mb-1">
                <Anchor size={16} />
                INTERNATIONAL LOGISTICS
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-[#002D5E]">
                Sea Freight Inquiry
              </h1>

              <p className="text-slate-500 mt-2">
                Tell us about your cargo and shipment requirements.
                Our logistics team can arrange suitable sea freight options.
              </p>
            </div>

          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* 1 Customer */}
          <div className={sectionClass}>
            {sectionTitle(
              <Globe2 size={24} />,
              "1",
              "Customer Details",
              "Tell us who is requesting the shipment."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Customer Type
                </label>

                <select
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Business">Business</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Company / Full Name *
                </label>

                <input
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Company or full name"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Contact Person *
                </label>

                <input
                  required
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Contact person"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Mobile Number *
                </label>

                <input
                  required
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className={labelClass}>
                  WhatsApp Number
                </label>

                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="WhatsApp number"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Email Address *
                </label>

                <input
                  required
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="company@email.com"
                />
              </div>

              <div>
                <label className={labelClass}>
                  GSTIN
                </label>

                <input
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="GST Number"
                />
              </div>

              <div>
                <label className={labelClass}>
                  IEC Number
                </label>

                <input
                  name="iecNumber"
                  value={formData.iecNumber}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Import Export Code"
                />
              </div>

            </div>
          </div>

          {/* 2 Shipment */}
          <div className={sectionClass}>
            {sectionTitle(
              <Ship size={24} />,
              "2",
              "Shipment Details",
              "Select how your cargo needs to move."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Shipment Type
                </label>

                <select
                  name="shipmentType"
                  value={formData.shipmentType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Export">Export from India</option>
                  <option value="Import">Import to India</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Service Required
                </label>

                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Port to Port">Port to Port</option>
                  <option value="Door to Port">Door to Port</option>
                  <option value="Port to Door">Port to Door</option>
                  <option value="Door to Door">Door to Door</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Shipment Mode
                </label>

                <select
                  name="shipmentMode"
                  value={formData.shipmentMode}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="FCL">FCL - Full Container Load</option>
                  <option value="LCL">LCL - Less than Container Load</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Preferred Shipment Date
                </label>

                <input
                  type="date"
                  name="preferredShipmentDate"
                  value={formData.preferredShipmentDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

            </div>
          </div>

          {/* 3 Shipper */}
          <div className={sectionClass}>
            {sectionTitle(
              <Package size={24} />,
              "3",
              "Shipper / Exporter",
              "Pickup party or exporter information."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                name="shipperCompany"
                value={formData.shipperCompany}
                onChange={handleChange}
                className={inputClass}
                placeholder="Company Name"
              />

              <input
                name="shipperName"
                value={formData.shipperName}
                onChange={handleChange}
                className={inputClass}
                placeholder="Contact Person"
              />

              <input
                name="shipperPhone"
                value={formData.shipperPhone}
                onChange={handleChange}
                className={inputClass}
                placeholder="Phone"
              />

              <input
                type="email"
                name="shipperEmail"
                value={formData.shipperEmail}
                onChange={handleChange}
                className={inputClass}
                placeholder="Email"
              />

              <textarea
                name="shipperAddress"
                value={formData.shipperAddress}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2`}
                rows="3"
                placeholder="Complete address"
              />

              <input
                name="shipperCity"
                value={formData.shipperCity}
                onChange={handleChange}
                className={inputClass}
                placeholder="City"
              />

              <input
                name="shipperState"
                value={formData.shipperState}
                onChange={handleChange}
                className={inputClass}
                placeholder="State"
              />

              <input
                name="shipperCountry"
                value={formData.shipperCountry}
                onChange={handleChange}
                className={inputClass}
                placeholder="Country"
              />

              <input
                name="shipperZip"
                value={formData.shipperZip}
                onChange={handleChange}
                className={inputClass}
                placeholder="Postal Code"
              />

            </div>
          </div>

          {/* 4 Consignee */}
          <div className={sectionClass}>
            {sectionTitle(
              <Globe2 size={24} />,
              "4",
              "Consignee / Importer",
              "Destination party information."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                name="consigneeCompany"
                value={formData.consigneeCompany}
                onChange={handleChange}
                className={inputClass}
                placeholder="Company Name"
              />

              <input
                name="consigneeName"
                value={formData.consigneeName}
                onChange={handleChange}
                className={inputClass}
                placeholder="Contact Person"
              />

              <input
                name="consigneePhone"
                value={formData.consigneePhone}
                onChange={handleChange}
                className={inputClass}
                placeholder="Phone"
              />

              <input
                type="email"
                name="consigneeEmail"
                value={formData.consigneeEmail}
                onChange={handleChange}
                className={inputClass}
                placeholder="Email"
              />

              <textarea
                name="consigneeAddress"
                value={formData.consigneeAddress}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2`}
                rows="3"
                placeholder="Complete destination address"
              />

              <input
                name="consigneeCity"
                value={formData.consigneeCity}
                onChange={handleChange}
                className={inputClass}
                placeholder="City"
              />

              <input
                name="consigneeState"
                value={formData.consigneeState}
                onChange={handleChange}
                className={inputClass}
                placeholder="State / Province"
              />

              <input
                name="consigneeCountry"
                value={formData.consigneeCountry}
                onChange={handleChange}
                className={inputClass}
                placeholder="Country"
              />

              <input
                name="consigneeZip"
                value={formData.consigneeZip}
                onChange={handleChange}
                className={inputClass}
                placeholder="Postal Code"
              />

            </div>
          </div>

          {/* 5 Notify Party */}
          <div className={sectionClass}>
            {sectionTitle(
              <FileCheck size={24} />,
              "5",
              "Notify Party",
              "Who should be notified about the shipment?"
            )}

            <label className="flex items-center gap-3 font-semibold text-slate-700 mb-5 cursor-pointer">
              <input
                type="checkbox"
                name="notifySameAsConsignee"
                checked={formData.notifySameAsConsignee}
                onChange={handleChange}
                className="w-5 h-5 accent-[#002D5E]"
              />
              Same as Consignee
            </label>

            {!formData.notifySameAsConsignee && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  name="notifyCompany"
                  value={formData.notifyCompany}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Company"
                />

                <input
                  name="notifyName"
                  value={formData.notifyName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Contact Person"
                />

                <input
                  name="notifyPhone"
                  value={formData.notifyPhone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Phone"
                />

                <input
                  name="notifyEmail"
                  value={formData.notifyEmail}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Email"
                />

                <textarea
                  name="notifyAddress"
                  value={formData.notifyAddress}
                  onChange={handleChange}
                  className={`${inputClass} md:col-span-2`}
                  rows="3"
                  placeholder="Address"
                />

                <input
                  name="notifyCountry"
                  value={formData.notifyCountry}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Country"
                />

              </div>
            )}
          </div>

          {/* 6 Ports */}
          <div className={sectionClass}>
            {sectionTitle(
              <Anchor size={24} />,
              "6",
              "Origin & Destination",
              "Tell us where the cargo starts and where it needs to go."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Place of Receipt
                </label>

                <input
                  name="placeOfReceipt"
                  value={formData.placeOfReceipt}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="City / pickup point"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Port of Loading *
                </label>

                <select
                  required
                  name="originPort"
                  value={formData.originPort}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Mumbai (JNPT)">
                    Mumbai - JNPT
                  </option>
                  <option value="Mundra">
                    Mundra
                  </option>
                  <option value="Chennai">
                    Chennai
                  </option>
                  <option value="Kolkata">
                    Kolkata
                  </option>
                  <option value="Cochin">
                    Cochin
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Destination Country *
                </label>

                <input
                  required
                  name="destinationCountry"
                  value={formData.destinationCountry}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Destination country"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Port of Discharge *
                </label>

                <input
                  required
                  name="destinationPort"
                  value={formData.destinationPort}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Destination port"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Final Destination
                </label>

                <input
                  name="finalDestination"
                  value={formData.finalDestination}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="City / final delivery point"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Delivery Address
                </label>

                <input
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Final delivery address"
                />
              </div>

              <textarea
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                className={`${inputClass} md:col-span-2`}
                rows="2"
                placeholder="Pickup address"
              />

            </div>
          </div>

          {/* 7 Cargo */}
          <div className={sectionClass}>
            {sectionTitle(
              <Package size={24} />,
              "7",
              "Cargo Details",
              "Provide accurate cargo information for quotation and booking."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Cargo Type
                </label>

                <select
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>General Cargo</option>
                  <option>Machinery</option>
                  <option>Electronics</option>
                  <option>Textile</option>
                  <option>Food Products</option>
                  <option>Furniture</option>
                  <option>Automobile Parts</option>
                  <option>Chemicals</option>
                  <option>Pharmaceuticals</option>
                  <option>Agricultural Products</option>
                  <option>Metal</option>
                  <option>Project Cargo</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  HS Code
                </label>

                <input
                  name="hsCode"
                  value={formData.hsCode}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="HS Code"
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Detailed Cargo Description *
                </label>

                <textarea
                  required
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleChange}
                  className={inputClass}
                  rows="3"
                  placeholder="Example: Cotton Men's Shirts, 100% cotton..."
                />
              </div>

              <div>
                <label className={labelClass}>
                  Number of Packages
                </label>

                <input
                  type="number"
                  min="1"
                  name="numberOfPackages"
                  value={formData.numberOfPackages}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="100"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Package Type
                </label>

                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Cartons</option>
                  <option>Boxes</option>
                  <option>Pallets</option>
                  <option>Bags</option>
                  <option>Drums</option>
                  <option>Crates</option>
                  <option>Pieces</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Gross Weight (KG)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="grossWeight"
                  value={formData.grossWeight}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Gross weight"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Net Weight (KG)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="netWeight"
                  value={formData.netWeight}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Net weight"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Volume / CBM
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="cbm"
                  value={formData.cbm}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="CBM"
                />
              </div>

            </div>
          </div>

          {/* 8 Container */}
          <div className={sectionClass}>
            {sectionTitle(
              <Ship size={24} />,
              "8",
              "Container Details",
              "Container information for FCL or LCL movement."
            )}

            {formData.shipmentMode === "FCL" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className={labelClass}>
                    Container Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    name="containerQuantity"
                    value={formData.containerQuantity}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Container Type
                  </label>

                  <select
                    name="containerType"
                    value={formData.containerType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>20 FT Dry Container</option>
                    <option>40 FT Dry Container</option>
                    <option>40 HC Container</option>
                    <option>20 FT Reefer</option>
                    <option>40 FT Reefer</option>
                    <option>Open Top Container</option>
                    <option>Flat Rack Container</option>
                    <option>ISO Tank Container</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Stuffing Type
                  </label>

                  <select
                    name="stuffingType"
                    value={formData.stuffingType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Factory Stuffing</option>
                    <option>CFS Stuffing</option>
                    <option>Port Stuffing</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 font-semibold text-slate-700 cursor-pointer mt-4">
                  <input
                    type="checkbox"
                    name="containerPickupRequired"
                    checked={formData.containerPickupRequired}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#002D5E]"
                  />
                  Container pickup required
                </label>

                {formData.containerPickupRequired && (
                  <>
                    <input
                      name="containerPickupLocation"
                      value={formData.containerPickupLocation}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Container pickup location"
                    />

                    <input
                      type="date"
                      name="containerPickupDate"
                      value={formData.containerPickupDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </>
                )}

              </div>
            ) : (
              <div className="bg-blue-50 rounded-2xl p-5 text-sm text-blue-900">
                LCL selected. Package count, weight and CBM from the Cargo
                Details section will be used for the quotation request.
              </div>
            )}
          </div>

          {/* 9 Special Cargo */}
          <div className={sectionClass}>
            {sectionTitle(
              <AlertTriangle size={24} />,
              "9",
              "Special Cargo",
              "Select only if applicable."
            )}

            <div className="space-y-6">

              {/* DG */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <label className="flex items-center gap-3 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    name="dangerousGoods"
                    checked={formData.dangerousGoods}
                    onChange={handleChange}
                    className="w-5 h-5 accent-red-600"
                  />
                  Dangerous Goods (DG)
                </label>

                {formData.dangerousGoods && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                    <input
                      name="unNumber"
                      value={formData.unNumber}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="UN Number"
                    />

                    <input
                      name="properShippingName"
                      value={formData.properShippingName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Proper Shipping Name"
                    />

                    <input
                      name="imoClass"
                      value={formData.imoClass}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="IMO Class"
                    />

                    <input
                      name="packingGroup"
                      value={formData.packingGroup}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Packing Group"
                    />

                    <input
                      name="flashPoint"
                      value={formData.flashPoint}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Flash Point, if applicable"
                    />

                    <select
                      name="msdsAvailable"
                      value={formData.msdsAvailable}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Yes">MSDS Available</option>
                      <option value="No">MSDS Not Available</option>
                    </select>

                  </div>
                )}
              </div>

              {/* Reefer */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <label className="flex items-center gap-3 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    name="reeferCargo"
                    checked={formData.reeferCargo}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#002D5E]"
                  />
                  <Thermometer size={20} />
                  Temperature Controlled / Reefer Cargo
                </label>

                {formData.reeferCargo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Required temperature"
                    />

                    <select
                      name="temperatureUnit"
                      value={formData.temperatureUnit}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>°C</option>
                      <option>°F</option>
                    </select>

                    <label className="flex items-center gap-3 font-semibold text-slate-700">
                      <input
                        type="checkbox"
                        name="ventilationRequired"
                        checked={formData.ventilationRequired}
                        onChange={handleChange}
                        className="w-5 h-5 accent-[#002D5E]"
                      />
                      Ventilation Required
                    </label>

                  </div>
                )}
              </div>

              {/* OOG */}
              <div className="border border-slate-200 rounded-2xl p-5">

                <label className="flex items-center gap-3 font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    name="oogCargo"
                    checked={formData.oogCargo}
                    onChange={handleChange}
                    className="w-5 h-5 accent-orange-500"
                  />
                  <Ruler size={20} />
                  OOG / Project Cargo
                </label>

                {formData.oogCargo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                    <input
                      type="number"
                      name="cargoLength"
                      value={formData.cargoLength}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Length"
                    />

                    <input
                      type="number"
                      name="cargoWidth"
                      value={formData.cargoWidth}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Width"
                    />

                    <input
                      type="number"
                      name="cargoHeight"
                      value={formData.cargoHeight}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Height"
                    />

                    <input
                      type="number"
                      name="oogWeight"
                      value={formData.oogWeight}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Cargo Weight (KG)"
                    />

                    <textarea
                      name="liftingRequirement"
                      value={formData.liftingRequirement}
                      onChange={handleChange}
                      className={`${inputClass} md:col-span-2`}
                      rows="2"
                      placeholder="Lifting / handling requirements"
                    />

                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 10 Customs */}
          <div className={sectionClass}>
            {sectionTitle(
              <FileCheck size={24} />,
              "10",
              "Customs & Clearance",
              "Tell us whether customs assistance is required."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Customs Clearance
                </label>

                <select
                  name="customsClearanceRequired"
                  value={formData.customsClearanceRequired}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  CHA Required
                </label>

                <select
                  name="chaRequired"
                  value={formData.chaRequired}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              {formData.chaRequired === "Yes" && (
                <>
                  <label className="flex items-center gap-3 font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      name="ownCha"
                      checked={formData.ownCha}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#002D5E]"
                    />
                    We already have our own CHA
                  </label>

                  {!formData.ownCha && (
                    <div className="bg-orange-50 rounded-2xl p-4 text-sm text-orange-900">
                      Apni Manzil customs clearance assistance can be requested.
                    </div>
                  )}

                  {formData.ownCha && (
                    <>
                      <input
                        name="chaCompany"
                        value={formData.chaCompany}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="CHA Company"
                      />

                      <input
                        name="chaContact"
                        value={formData.chaContact}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="CHA Contact"
                      />
                    </>
                  )}
                </>
              )}

            </div>
          </div>

          {/* 11 Freight */}
          <div className={sectionClass}>
            {sectionTitle(
              <Globe2 size={24} />,
              "11",
              "Freight & Quote",
              "Information needed to prepare the freight quotation."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Freight Terms
                </label>

                <select
                  name="freightTerms"
                  value={formData.freightTerms}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Prepaid</option>
                  <option>Collect</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Preferred Currency
                </label>

                <select
                  name="preferredCurrency"
                  value={formData.preferredCurrency}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>USD</option>
                  <option>INR</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Preferred Shipping Line
                </label>

                <select
                  name="preferredShippingLine"
                  value={formData.preferredShippingLine}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>No Preference</option>
                  <option>Maersk</option>
                  <option>MSC</option>
                  <option>Hapag-Lloyd</option>
                  <option>CMA CGM</option>
                  <option>ONE</option>
                  <option>COSCO</option>
                  <option>Evergreen</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Quote Required
                </label>

                <select
                  name="quoteRequired"
                  value={formData.quoteRequired}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

            </div>
          </div>

          {/* 12 Insurance & VGM */}
          <div className={sectionClass}>
            {sectionTitle(
              <ShieldCheck size={24} />,
              "12",
              "Insurance & VGM",
              "Optional protection and container verification information."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className={labelClass}>
                  Cargo Insurance
                </label>

                <select
                  name="insuranceRequired"
                  value={formData.insuranceRequired}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              {formData.insuranceRequired === "Yes" && (
                <>
                  <input
                    type="number"
                    name="cargoValue"
                    value={formData.cargoValue}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Cargo Value"
                  />

                  <select
                    name="cargoValueCurrency"
                    value={formData.cargoValueCurrency}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>USD</option>
                    <option>INR</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </>
              )}

              <div>
                <label className={labelClass}>
                  VGM Status
                </label>

                <select
                  name="vgmStatus"
                  value={formData.vgmStatus}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Will Provide Later</option>
                  <option>Available</option>
                  <option>Need Assistance</option>
                </select>
              </div>

            </div>
          </div>

          {/* 13 Documents */}
          <div className={sectionClass}>
            {sectionTitle(
              <Upload size={24} />,
              "13",
              "Documents",
              "Upload documents if they are already available. You can also provide them later."
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>
                  Commercial Invoice
                </label>

                <input
                  type="file"
                  name="commercialInvoice"
                  onChange={handleFileChange}
                  className={inputClass}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Packing List
                </label>

                <input
                  type="file"
                  name="packingList"
                  onChange={handleFileChange}
                  className={inputClass}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              <div>
                <label className={labelClass}>
                  IEC Certificate
                </label>

                <input
                  type="file"
                  name="iecCertificate"
                  onChange={handleFileChange}
                  className={inputClass}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

              {formData.dangerousGoods && (
                <div>
                  <label className={labelClass}>
                    MSDS / DG Document
                  </label>

                  <input
                    type="file"
                    name="msds"
                    onChange={handleFileChange}
                    className={inputClass}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              )}

              {formData.oogCargo && (
                <div>
                  <label className={labelClass}>
                    Cargo Photos
                  </label>

                  <input
                    type="file"
                    name="cargoPhotos"
                    onChange={handleFileChange}
                    className={inputClass}
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>
                  Other Document
                </label>

                <input
                  type="file"
                  name="otherDocument"
                  onChange={handleFileChange}
                  className={inputClass}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>

            </div>
          </div>

          {/* 14 Instructions */}
          <div className={sectionClass}>
            {sectionTitle(
              <FileCheck size={24} />,
              "14",
              "Additional Requirements",
              "Anything else our logistics team should know."
            )}

            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              className={inputClass}
              rows="5"
              placeholder="Special handling, preferred sailing, delivery requirements, packing requirements, etc."
            />
          </div>

          {/* Terms */}
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">
            <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 w-5 h-5 accent-[#002D5E]"
              />

              <span>
                I confirm that the shipment information provided by me is
                accurate to the best of my knowledge and understand that final
                freight rates, schedules, space availability and carrier
                acceptance are subject to confirmation.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#002D5E] hover:bg-[#001f42] disabled:opacity-60 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition shadow-xl flex items-center justify-center gap-3"
          >
            {submitting
              ? "Submitting..."
              : "Request Sea Freight Quote"}

            {!submitting && <ChevronRight size={20} />}
          </button>

        </form>

        {/* LANDSCAPE SHIP IMAGE */}
        <div className="mt-8 overflow-hidden rounded-[2rem] shadow-xl border border-slate-100 bg-white">

          <img
            src={seaFreightShip}
            alt="Apni Manzil Sea Freight"
            className="w-full h-[220px] md:h-[360px] object-cover"
          />

          <div className="bg-[#002D5E] text-white p-6 md:p-8">

            <div className="flex items-center gap-3 mb-2">
              <Ship size={24} />
              <h3 className="text-xl font-black">
                Global Sea Freight Solutions
              </h3>
            </div>

            <p className="text-blue-100 text-sm md:text-base">
              FCL • LCL • Port-to-Port • Door-to-Door • Import • Export
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SeaFreightForm;