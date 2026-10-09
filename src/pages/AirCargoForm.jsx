import React, { useMemo, useState } from "react";
import {
  Plane,
  MapPin,
  Package,
  User,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CalendarDays,
  Upload,
  Calculator,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import airFreightBanner from "../assets/air-freight-banner.png";

const AIR_CARGO_WEBHOOK =
  "https://pizza-yes-thomas-collectible.trycloudflare.com/webhook/Air-Cargo";

const emptyPackage = {
  pieces: 1,
  packageType: "Carton / Box",
  length: "",
  width: "",
  height: "",
  dimensionUnit: "cm",
  weight: "",
  weightUnit: "kg",
};

const initialForm = {
  // Shipment
  shipmentType: "Export",
  shipmentMode: "International",
  serviceType: "Door to Door",
  servicePriority: "Standard",

  // Origin
  originCountry: "India",
  originState: "",
  originCity: "",
  originPincode: "",
  originAirport: "",
  pickupAddress: "",

  // Destination
  destinationCountry: "",
  destinationState: "",
  destinationCity: "",
  destinationPincode: "",
  destinationAirport: "",
  deliveryAddress: "",

  // Shipper
  shipperName: "",
  shipperCompany: "",
  shipperMobile: "",
  shipperEmail: "",
  shipperAddress: "",
  shipperGSTIN: "",
  shipperIEC: "",
  shipperTaxId: "",

  // Consignee
  consigneeName: "",
  consigneeCompany: "",
  consigneeMobile: "",
  consigneeEmail: "",
  consigneeAddress: "",
  consigneeTaxId: "",

  // Cargo
  cargoDescription: "",
  hsCode: "",
  commodityType: "",
  countryOfOrigin: "",
  quantity: "",
  unitOfQuantity: "Pieces",

  // Commercial
  invoiceValue: "",
  currency: "INR",
  shipmentPurpose: "Commercial",
  incoterm: "",
  declaredValueForCustoms: "",
  declaredValueForCarriage: "",

  // Special Cargo
  dangerousGoods: "No",
  batteryIncluded: "No",
  perishable: "No",
  fragile: "No",
  liveAnimal: "No",
  temperatureControlled: "No",
  oversizedCargo: "No",

  // DG
  unNumber: "",
  dgClass: "",
  packingGroup: "",
  properShippingName: "",

  // Schedule
  readyDate: "",
  preferredDeliveryDate: "",

  // Insurance
  insuranceRequired: "No",
  insuranceValue: "",

  // Documents
  commercialInvoice: null,
  packingList: null,
  shippingBill: null,
  certificateOfOrigin: null,
  iecDocument: null,
  productCertificate: null,
  dgDeclaration: null,
  otherDocuments: null,

  // Customer
  customerName: "",
  customerCompany: "",
  customerMobile: "",
  customerEmail: "",

  // Other
  specialInstructions: "",

  // Packages
  packages: [{ ...emptyPackage }],
};

export default function AirFreight() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePackage = (index, field, value) => {
    setForm((prev) => {
      const packages = [...prev.packages];

      packages[index] = {
        ...packages[index],
        [field]: value,
      };

      return {
        ...prev,
        packages,
      };
    });
  };

  const addPackage = () => {
    setForm((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        {
          ...emptyPackage,
        },
      ],
    }));
  };

  const removePackage = (index) => {
    if (form.packages.length === 1) return;

    setForm((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleFile = (name, file) => {
    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  /*
   * Air freight volumetric weight.
   * Final provider/API chargeable weight may differ.
   */
  const volumetricWeight = useMemo(() => {
    let total = 0;

    form.packages.forEach((pkg) => {
      const l = Number(pkg.length);
      const w = Number(pkg.width);
      const h = Number(pkg.height);
      const pieces = Number(pkg.pieces) || 1;

      if (l > 0 && w > 0 && h > 0) {
        total += (l * w * h * pieces) / 6000;
      }
    });

    return total;
  }, [form.packages]);

  const actualWeight = useMemo(() => {
    return form.packages.reduce((total, pkg) => {
      const weight = Number(pkg.weight) || 0;
      const pieces = Number(pkg.pieces) || 1;

      return total + weight * pieces;
    }, 0);
  }, [form.packages]);

  const chargeableWeight = Math.max(
    actualWeight,
    volumetricWeight
  );

  const totalPieces = form.packages.reduce(
    (total, pkg) =>
      total + (Number(pkg.pieces) || 0),
    0
  );

  const totalVolumeM3 = useMemo(() => {
    let volume = 0;

    form.packages.forEach((pkg) => {
      const l = Number(pkg.length);
      const w = Number(pkg.width);
      const h = Number(pkg.height);
      const pieces = Number(pkg.pieces) || 1;

      if (l > 0 && w > 0 && h > 0) {
        volume +=
          (l * w * h * pieces) / 1000000;
      }
    });

    return volume;
  }, [form.packages]);

  /*
   * ================================
   * AIR CARGO N8N PRODUCTION WEBHOOK
   * ================================
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(false);
    setSubmitting(true);

    const payload = {
      ...form,

      calculated: {
        totalPieces,
        actualWeightKg: actualWeight,
        volumetricWeightKg: volumetricWeight,
        chargeableWeightKg: chargeableWeight,
        totalVolumeM3,
      },

      source: "Apni Manzil Air Cargo",
      requestType: "AIR_FREIGHT_RATE_REQUEST",
      submittedAt: new Date().toISOString(),
    };

    console.log(
      "AIR FREIGHT REQUEST:",
      payload
    );

    try {
      /*
       * Send Air Cargo request to n8n
       * Production Webhook
       */

      const response = await fetch(
        AIR_CARGO_WEBHOOK,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Webhook Error: ${response.status}`
        );
      }

      const result =
        await response
          .json()
          .catch(() => ({}));

      console.log(
        "AIR CARGO N8N RESPONSE:",
        result
      );

      setSubmitted(true);

    } catch (error) {
      console.error(
        "AIR CARGO N8N ERROR:",
        error
      );

      alert(
        "Air Freight request submit झाला नाही. कृपया पुन्हा try करा."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "form-control rounded-3 py-2";

  const selectClass =
    "form-select rounded-3 py-2";

  const sectionTitle =
    "fw-bold d-flex align-items-center gap-2 mb-3";

  return (
    <div className="container-fluid px-3 px-md-5 py-4">

      {/* ================= HERO ================= */}

      <div
        className="position-relative overflow-hidden rounded-4 mb-4"
        style={{
          minHeight: "260px",
          backgroundImage: `url(${airFreightBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,45,94,0.92), rgba(0,45,94,0.55), rgba(0,0,0,0.15))",
          }}
        />

        <div className="position-relative p-4 p-md-5 text-white">

          <div className="d-flex align-items-center gap-2 mb-3">
            <Plane size={32} />

            <span className="fw-semibold">
              APNI MANZIL AIR FREIGHT
            </span>
          </div>

          <h1 className="fw-bold display-6 mb-2">
            Global Air Cargo Shipping
          </h1>

          <p className="mb-0 fs-5">
            Get international air freight quotes,
            compare logistics providers and book
            your shipment.
          </p>

        </div>
      </div>

      {/* ================= FORM ================= */}

      <form onSubmit={handleSubmit}>

        {/* ================= 1 SHIPMENT ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <Plane size={22} />
              1. Shipment Details
            </h4>

            <div className="row g-3">

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Shipment Type *
                </label>

                <select
                  className={selectClass}
                  value={form.shipmentType}
                  onChange={(e) =>
                    updateField(
                      "shipmentType",
                      e.target.value
                    )
                  }
                >
                  <option>Export</option>
                  <option>Import</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Shipment Mode *
                </label>

                <select
                  className={selectClass}
                  value={form.shipmentMode}
                  onChange={(e) =>
                    updateField(
                      "shipmentMode",
                      e.target.value
                    )
                  }
                >
                  <option>International</option>
                  <option>Domestic</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Service Type *
                </label>

                <select
                  className={selectClass}
                  value={form.serviceType}
                  onChange={(e) =>
                    updateField(
                      "serviceType",
                      e.target.value
                    )
                  }
                >
                  <option>Door to Door</option>
                  <option>Door to Airport</option>
                  <option>Airport to Door</option>
                  <option>Airport to Airport</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  Priority
                </label>

                <select
                  className={selectClass}
                  value={form.servicePriority}
                  onChange={(e) =>
                    updateField(
                      "servicePriority",
                      e.target.value
                    )
                  }
                >
                  <option>Standard</option>
                  <option>Express</option>
                  <option>Urgent</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* ================= 2 ORIGIN ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <MapPin size={22} />
              2. Pickup / Origin Details
            </h4>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Country *
                </label>

                <input
                  className={inputClass}
                  value={form.originCountry}
                  onChange={(e) =>
                    updateField(
                      "originCountry",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  State
                </label>

                <input
                  className={inputClass}
                  value={form.originState}
                  onChange={(e) =>
                    updateField(
                      "originState",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  City *
                </label>

                <input
                  className={inputClass}
                  value={form.originCity}
                  onChange={(e) =>
                    updateField(
                      "originCity",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Pincode
                </label>

                <input
                  className={inputClass}
                  value={form.originPincode}
                  onChange={(e) =>
                    updateField(
                      "originPincode",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Origin Airport / IATA Code
                </label>

                <input
                  className={inputClass}
                  placeholder="e.g. BOM"
                  value={form.originAirport}
                  onChange={(e) =>
                    updateField(
                      "originAirport",
                      e.target.value.toUpperCase()
                    )
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Pickup Address
                </label>

                <textarea
                  className={inputClass}
                  rows="2"
                  value={form.pickupAddress}
                  onChange={(e) =>
                    updateField(
                      "pickupAddress",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 3 DESTINATION ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <MapPin size={22} />
              3. Destination Details
            </h4>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Country *
                </label>

                <input
                  className={inputClass}
                  value={form.destinationCountry}
                  onChange={(e) =>
                    updateField(
                      "destinationCountry",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  State / Province
                </label>

                <input
                  className={inputClass}
                  value={form.destinationState}
                  onChange={(e) =>
                    updateField(
                      "destinationState",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  City *
                </label>

                <input
                  className={inputClass}
                  value={form.destinationCity}
                  onChange={(e) =>
                    updateField(
                      "destinationCity",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Pincode / Postal Code
                </label>

                <input
                  className={inputClass}
                  value={form.destinationPincode}
                  onChange={(e) =>
                    updateField(
                      "destinationPincode",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Destination Airport / IATA Code
                </label>

                <input
                  className={inputClass}
                  placeholder="e.g. DXB"
                  value={form.destinationAirport}
                  onChange={(e) =>
                    updateField(
                      "destinationAirport",
                      e.target.value.toUpperCase()
                    )
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Delivery Address
                </label>

                <textarea
                  className={inputClass}
                  rows="2"
                  value={form.deliveryAddress}
                  onChange={(e) =>
                    updateField(
                      "deliveryAddress",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 4 SHIPPER ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <User size={22} />
              4. Shipper / Sender Details
            </h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Shipper Name *
                </label>

                <input
                  className={inputClass}
                  value={form.shipperName}
                  onChange={(e) =>
                    updateField(
                      "shipperName",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Company Name
                </label>

                <input
                  className={inputClass}
                  value={form.shipperCompany}
                  onChange={(e) =>
                    updateField(
                      "shipperCompany",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Mobile *
                </label>

                <input
                  className={inputClass}
                  value={form.shipperMobile}
                  onChange={(e) =>
                    updateField(
                      "shipperMobile",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className={inputClass}
                  value={form.shipperEmail}
                  onChange={(e) =>
                    updateField(
                      "shipperEmail",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  GSTIN
                </label>

                <input
                  className={inputClass}
                  value={form.shipperGSTIN}
                  onChange={(e) =>
                    updateField(
                      "shipperGSTIN",
                      e.target.value.toUpperCase()
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  IEC Number
                </label>

                <input
                  className={inputClass}
                  value={form.shipperIEC}
                  onChange={(e) =>
                    updateField(
                      "shipperIEC",
                      e.target.value.toUpperCase()
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Tax ID / Registration Number
                </label>

                <input
                  className={inputClass}
                  value={form.shipperTaxId}
                  onChange={(e) =>
                    updateField(
                      "shipperTaxId",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Shipper Address
                </label>

                <textarea
                  className={inputClass}
                  rows="2"
                  value={form.shipperAddress}
                  onChange={(e) =>
                    updateField(
                      "shipperAddress",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 5 CONSIGNEE ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <User size={22} />
              5. Consignee / Receiver Details
            </h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Consignee Name *
                </label>

                <input
                  className={inputClass}
                  value={form.consigneeName}
                  onChange={(e) =>
                    updateField(
                      "consigneeName",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Company Name
                </label>

                <input
                  className={inputClass}
                  value={form.consigneeCompany}
                  onChange={(e) =>
                    updateField(
                      "consigneeCompany",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Mobile
                </label>

                <input
                  className={inputClass}
                  value={form.consigneeMobile}
                  onChange={(e) =>
                    updateField(
                      "consigneeMobile",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className={inputClass}
                  value={form.consigneeEmail}
                  onChange={(e) =>
                    updateField(
                      "consigneeEmail",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Tax ID
                </label>

                <input
                  className={inputClass}
                  value={form.consigneeTaxId}
                  onChange={(e) =>
                    updateField(
                      "consigneeTaxId",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Consignee Address
                </label>

                <textarea
                  className={inputClass}
                  rows="2"
                  value={form.consigneeAddress}
                  onChange={(e) =>
                    updateField(
                      "consigneeAddress",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 6 CARGO ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <Package size={22} />
              6. Cargo / Commodity Details
            </h4>

            <div className="row g-3">

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Product / Cargo Description *
                </label>

                <textarea
                  className={inputClass}
                  rows="3"
                  placeholder="Clearly describe the goods being shipped"
                  value={form.cargoDescription}
                  onChange={(e) =>
                    updateField(
                      "cargoDescription",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  HS / HSN Code
                </label>

                <input
                  className={inputClass}
                  value={form.hsCode}
                  onChange={(e) =>
                    updateField(
                      "hsCode",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Commodity Type
                </label>

                <input
                  className={inputClass}
                  placeholder="e.g. Textile, Machinery"
                  value={form.commodityType}
                  onChange={(e) =>
                    updateField(
                      "commodityType",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Country of Origin
                </label>

                <input
                  className={inputClass}
                  value={form.countryOfOrigin}
                  onChange={(e) =>
                    updateField(
                      "countryOfOrigin",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Total Quantity
                </label>

                <input
                  type="number"
                  className={inputClass}
                  value={form.quantity}
                  onChange={(e) =>
                    updateField(
                      "quantity",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Quantity Unit
                </label>

                <select
                  className={selectClass}
                  value={form.unitOfQuantity}
                  onChange={(e) =>
                    updateField(
                      "unitOfQuantity",
                      e.target.value
                    )
                  }
                >
                  <option>Pieces</option>
                  <option>Units</option>
                  <option>Cartons</option>
                  <option>Boxes</option>
                  <option>Kg</option>
                  <option>Litres</option>
                  <option>Other</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* ================= 7 PACKAGES ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h4 className={sectionTitle + " mb-0"}>
                <Calculator size={22} />
                7. Package & Weight Details
              </h4>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addPackage}
              >
                + Add Package
              </button>

            </div>

            {form.packages.map(
              (pkg, index) => (

                <div
                  key={index}
                  className="border rounded-4 p-3 mb-3"
                >

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <h6 className="fw-bold mb-0">
                      Package {index + 1}
                    </h6>

                    {form.packages.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          removePackage(index)
                        }
                      >
                        Remove
                      </button>
                    )}

                  </div>

                  <div className="row g-3">

                    <div className="col-md-2">
                      <label className="form-label">
                        Pieces
                      </label>

                      <input
                        type="number"
                        min="1"
                        className={inputClass}
                        value={pkg.pieces}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "pieces",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Package Type
                      </label>

                      <select
                        className={selectClass}
                        value={pkg.packageType}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "packageType",
                            e.target.value
                          )
                        }
                      >
                        <option>Carton / Box</option>
                        <option>Pallet</option>
                        <option>Crate</option>
                        <option>Bag</option>
                        <option>Drum</option>
                        <option>Envelope</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Length
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        className={inputClass}
                        value={pkg.length}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "length",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Width
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        className={inputClass}
                        value={pkg.width}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "width",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Height
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        className={inputClass}
                        value={pkg.height}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "height",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">
                        Dimension Unit
                      </label>

                      <select
                        className={selectClass}
                        value={pkg.dimensionUnit}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "dimensionUnit",
                            e.target.value
                          )
                        }
                      >
                        <option>cm</option>
                        <option>inch</option>
                        <option>meter</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Weight per Piece
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        className={inputClass}
                        value={pkg.weight}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "weight",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Weight Unit
                      </label>

                      <select
                        className={selectClass}
                        value={pkg.weightUnit}
                        onChange={(e) =>
                          updatePackage(
                            index,
                            "weightUnit",
                            e.target.value
                          )
                        }
                      >
                        <option>kg</option>
                        <option>lb</option>
                      </select>
                    </div>

                  </div>

                </div>
              )
            )}

            {/* CALCULATED SUMMARY */}

            <div className="row g-3 mt-2">

              <div className="col-md-3">
                <div className="bg-light rounded-3 p-3">
                  <small className="text-muted">
                    Total Pieces
                  </small>

                  <h5 className="fw-bold mb-0">
                    {totalPieces}
                  </h5>
                </div>
              </div>

              <div className="col-md-3">
                <div className="bg-light rounded-3 p-3">
                  <small className="text-muted">
                    Actual Weight
                  </small>

                  <h5 className="fw-bold mb-0">
                    {actualWeight.toFixed(2)} kg
                  </h5>
                </div>
              </div>

              <div className="col-md-3">
                <div className="bg-light rounded-3 p-3">
                  <small className="text-muted">
                    Volumetric Weight
                  </small>

                  <h5 className="fw-bold mb-0">
                    {volumetricWeight.toFixed(2)} kg
                  </h5>
                </div>
              </div>

              <div className="col-md-3">
                <div className="bg-primary text-white rounded-3 p-3">
                  <small>
                    Chargeable Weight
                  </small>

                  <h5 className="fw-bold mb-0">
                    {chargeableWeight.toFixed(2)} kg
                  </h5>
                </div>
              </div>

            </div>

            <div className="mt-3 text-muted small">
              Total Volume:{" "}
              <strong>
                {totalVolumeM3.toFixed(4)} m³
              </strong>
            </div>

          </div>
        </div>

        {/* ================= 8 COMMERCIAL ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <FileText size={22} />
              8. Commercial & Customs Details
            </h4>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Invoice Value
                </label>

                <input
                  type="number"
                  className={inputClass}
                  value={form.invoiceValue}
                  onChange={(e) =>
                    updateField(
                      "invoiceValue",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Currency
                </label>

                <select
                  className={selectClass}
                  value={form.currency}
                  onChange={(e) =>
                    updateField(
                      "currency",
                      e.target.value
                    )
                  }
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>AED</option>
                  <option>SGD</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Shipment Purpose
                </label>

                <select
                  className={selectClass}
                  value={form.shipmentPurpose}
                  onChange={(e) =>
                    updateField(
                      "shipmentPurpose",
                      e.target.value
                    )
                  }
                >
                  <option>Commercial</option>
                  <option>Sample</option>
                  <option>Personal</option>
                  <option>Gift</option>
                  <option>Return</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Incoterm
                </label>

                <select
                  className={selectClass}
                  value={form.incoterm}
                  onChange={(e) =>
                    updateField(
                      "incoterm",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Incoterm
                  </option>
                  <option>EXW</option>
                  <option>FCA</option>
                  <option>FOB</option>
                  <option>CFR</option>
                  <option>CIF</option>
                  <option>CPT</option>
                  <option>CIP</option>
                  <option>DAP</option>
                  <option>DPU</option>
                  <option>DDP</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Declared Value for Customs
                </label>

                <input
                  type="number"
                  className={inputClass}
                  value={
                    form.declaredValueForCustoms
                  }
                  onChange={(e) =>
                    updateField(
                      "declaredValueForCustoms",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Declared Value for Carriage
                </label>

                <input
                  type="number"
                  className={inputClass}
                  value={
                    form.declaredValueForCarriage
                  }
                  onChange={(e) =>
                    updateField(
                      "declaredValueForCarriage",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 9 SPECIAL CARGO ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <AlertTriangle size={22} />
              9. Special Cargo & Handling
            </h4>

            <div className="row g-3">

              {[
                ["dangerousGoods", "Dangerous Goods?"],
                ["batteryIncluded", "Battery Included?"],
                ["perishable", "Perishable Cargo?"],
                ["fragile", "Fragile Cargo?"],
                ["liveAnimal", "Live Animal?"],
                [
                  "temperatureControlled",
                  "Temperature Controlled?",
                ],
                ["oversizedCargo", "Oversized Cargo?"],
              ].map(([name, label]) => (

                <div
                  className="col-md-3"
                  key={name}
                >

                  <label className="form-label fw-semibold">
                    {label}
                  </label>

                  <select
                    className={selectClass}
                    value={form[name]}
                    onChange={(e) =>
                      updateField(
                        name,
                        e.target.value
                      )
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>

                </div>

              ))}

            </div>

            {/* DG DETAILS */}

            {form.dangerousGoods === "Yes" && (
              <div className="border border-warning rounded-4 p-3 mt-4">

                <h6 className="fw-bold text-warning mb-3">
                  Dangerous Goods Information
                </h6>

                <div className="row g-3">

                  <div className="col-md-3">
                    <label className="form-label">
                      UN Number
                    </label>

                    <input
                      className={inputClass}
                      value={form.unNumber}
                      onChange={(e) =>
                        updateField(
                          "unNumber",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      DG Class
                    </label>

                    <input
                      className={inputClass}
                      value={form.dgClass}
                      onChange={(e) =>
                        updateField(
                          "dgClass",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Packing Group
                    </label>

                    <input
                      className={inputClass}
                      value={form.packingGroup}
                      onChange={(e) =>
                        updateField(
                          "packingGroup",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Proper Shipping Name
                    </label>

                    <input
                      className={inputClass}
                      value={
                        form.properShippingName
                      }
                      onChange={(e) =>
                        updateField(
                          "properShippingName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* ================= 10 SCHEDULE ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <CalendarDays size={22} />
              10. Shipment Schedule
            </h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Cargo Ready / Pickup Date
                </label>

                <input
                  type="date"
                  className={inputClass}
                  value={form.readyDate}
                  onChange={(e) =>
                    updateField(
                      "readyDate",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Preferred Delivery Date
                </label>

                <input
                  type="date"
                  className={inputClass}
                  value={
                    form.preferredDeliveryDate
                  }
                  onChange={(e) =>
                    updateField(
                      "preferredDeliveryDate",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 11 INSURANCE ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <ShieldCheck size={22} />
              11. Cargo Insurance
            </h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Insurance Required?
                </label>

                <select
                  className={selectClass}
                  value={form.insuranceRequired}
                  onChange={(e) =>
                    updateField(
                      "insuranceRequired",
                      e.target.value
                    )
                  }
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              {form.insuranceRequired ===
                "Yes" && (
                <div className="col-md-6">

                  <label className="form-label fw-semibold">
                    Insured Value
                  </label>

                  <input
                    type="number"
                    className={inputClass}
                    value={form.insuranceValue}
                    onChange={(e) =>
                      updateField(
                        "insuranceValue",
                        e.target.value
                      )
                    }
                  />

                </div>
              )}

            </div>
          </div>
        </div>

        {/* ================= 12 DOCUMENTS ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <Upload size={22} />
              12. Shipment Documents
            </h4>

            <p className="text-muted small">
              Upload documents applicable to your
              shipment. Additional documents may be
              required depending on commodity,
              destination and customs requirements.
            </p>

            <div className="row g-3">

              {[
                [
                  "commercialInvoice",
                  "Commercial Invoice",
                ],
                [
                  "packingList",
                  "Packing List",
                ],
                [
                  "shippingBill",
                  "Shipping Bill / Export Document",
                ],
                [
                  "certificateOfOrigin",
                  "Certificate of Origin",
                ],
                [
                  "iecDocument",
                  "IEC Document",
                ],
                [
                  "productCertificate",
                  "Product / Regulatory Certificate",
                ],
                [
                  "dgDeclaration",
                  "Dangerous Goods Declaration",
                ],
                [
                  "otherDocuments",
                  "Other Documents",
                ],
              ].map(([name, label]) => (

                <div
                  className="col-md-6"
                  key={name}
                >

                  <label className="form-label fw-semibold">
                    {label}
                  </label>

                  <input
                    type="file"
                    className={inputClass}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) =>
                      handleFile(
                        name,
                        e.target.files?.[0] ||
                          null
                      )
                    }
                  />

                </div>

              ))}

            </div>

          </div>
        </div>

        {/* ================= 13 CUSTOMER ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <User size={22} />
              13. Customer Contact Details
            </h4>

            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Customer Name *
                </label>

                <input
                  className={inputClass}
                  value={form.customerName}
                  onChange={(e) =>
                    updateField(
                      "customerName",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Company Name
                </label>

                <input
                  className={inputClass}
                  value={form.customerCompany}
                  onChange={(e) =>
                    updateField(
                      "customerCompany",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Mobile *
                </label>

                <input
                  type="tel"
                  className={inputClass}
                  value={form.customerMobile}
                  onChange={(e) =>
                    updateField(
                      "customerMobile",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className={inputClass}
                  value={form.customerEmail}
                  onChange={(e) =>
                    updateField(
                      "customerEmail",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

          </div>
        </div>

        {/* ================= 14 INSTRUCTIONS ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className={sectionTitle}>
              <FileText size={22} />
              14. Additional Instructions
            </h4>

            <textarea
              className={inputClass}
              rows="4"
              placeholder="Any special pickup, delivery, packaging or handling instructions..."
              value={form.specialInstructions}
              onChange={(e) =>
                updateField(
                  "specialInstructions",
                  e.target.value
                )
              }
            />

          </div>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">

            <h4 className="fw-bold mb-3">
              Shipment Summary
            </h4>

            <div className="row g-3">

              <div className="col-md-3">
                <div className="bg-light rounded-3 p-3">

                  <small className="text-muted">
                    Route
                  </small>

                  <div className="fw-bold">
                    {form.originAirport ||
                      "---"}
                    {" → "}
                    {form.destinationAirport ||
                      "---"}
                  </div>

                </div>
              </div>

              <div className="col-md-3">
                <div className="bg-light rounded-3 p-3">

                  <small className="text-muted">
                    Packages
                  </small>

                  <div className="fw-bold">
                    {totalPieces}
                  </div>

                </div>
              </div>

              <div className="col-md-3">
                <div className="bg-light rounded-3 p-3">

                  <small className="text-muted">
                    Actual Weight
                  </small>

                  <div className="fw-bold">
                    {actualWeight.toFixed(2)} kg
                  </div>

                </div>
              </div>

              <div className="col-md-3">
                <div className="bg-primary text-white rounded-3 p-3">

                  <small>
                    Chargeable Weight
                  </small>

                  <div className="fw-bold">
                    {chargeableWeight.toFixed(2)} kg
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ================= SUBMIT ================= */}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-lg w-100 rounded-3 py-3 fw-bold"
          style={{
            backgroundColor: "#002D5E",
            color: "white",
            opacity: submitting ? 0.7 : 1,
          }}
        >

          <span className="d-flex justify-content-center align-items-center gap-2">

            {submitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />

                Sending Air Cargo Request...
              </>
            ) : (
              <>
                <Plane size={22} />

                Get Air Freight Rates

                <ArrowRight size={22} />
              </>
            )}

          </span>

        </button>

        {submitted && (
          <div className="alert alert-success mt-3 rounded-3 d-flex align-items-center">

            <CheckCircle2
              size={20}
              className="me-2"
            />

            Air Freight request submitted
            successfully. Our logistics system is
            processing your request.

          </div>
        )}

      </form>

      {/* ================= BOTTOM LANDSCAPE IMAGE ================= */}

      <div className="mt-5 rounded-4 overflow-hidden">

        <img
          src={airFreightBanner}
          alt="Global Air Freight and Cargo"
          className="img-fluid w-100"
          style={{
            height: "280px",
            objectFit: "cover",
          }}
        />

      </div>

    </div>
  );
}