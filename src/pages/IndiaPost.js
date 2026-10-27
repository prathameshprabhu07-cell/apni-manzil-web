import React, { useState } from "react";
import "./IndiaPost.css";

const WEBHOOK_URL =
  "https://copper-focus-leading-thereby.trycloudflare.com/webhook/india-post-booking-request";

const initialForm = {
  serviceType: "Domestic Parcel",
  senderName: "",
  senderMobile: "",
  senderEmail: "",
  pickupAddress: "",
  pickupCity: "",
  pickupState: "",
  pickupPincode: "",
  receiverName: "",
  receiverMobile: "",
  receiverEmail: "",
  deliveryAddress: "",
  deliveryCity: "",
  deliveryState: "",
  deliveryPincode: "",
  parcelWeight: "",
  parcelLength: "",
  parcelWidth: "",
  parcelHeight: "",
  parcelContents: "",
  parcelValue: "",
  paymentMethod: "Online Payment",
  instructions: "",
  declarationAccepted: false,
};

function IndiaPost() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [rateLoading, setRateLoading] = useState(false);
  const [rateResult, setRateResult] = useState(null);
  const [rateMessage, setRateMessage] = useState("");
  const [rateMessageType, setRateMessageType] = useState("");

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    const rateFields = [
      "pickupPincode",
      "deliveryPincode",
      "parcelWeight",
      "serviceType",
      "parcelLength",
      "parcelWidth",
      "parcelHeight",
    ];

    if (rateFields.includes(name)) {
      setRateResult(null);
      setRateMessage("");
      setRateMessageType("");
    }
  };

  // Extract the actual amount from the n8n response.
  const getRateAmount = (data) => {
    const candidates = [
      data?.amount,
      data?.rate,
      data?.price,
      data?.totalAmount,
      data?.postage,
      data?.postageAmount,
      data?.total,

      data?.data?.amount,
      data?.data?.rate,
      data?.data?.price,
      data?.data?.totalAmount,
      data?.data?.postage,
      data?.data?.postageAmount,
      data?.data?.total,

      data?.result?.amount,
      data?.result?.rate,
      data?.result?.price,
      data?.result?.totalAmount,
    ];

    for (const candidate of candidates) {
      const amount = Number(candidate);

      if (
        candidate !== null &&
        candidate !== undefined &&
        candidate !== "" &&
        Number.isFinite(amount) &&
        amount >= 0
      ) {
        return amount;
      }
    }

    return null;
  };

  // ==========================================
  // CHECK PARCEL RATE - SAME WEBHOOK
  // ==========================================
  const handleCheckRate = async () => {
    setRateResult(null);
    setRateMessage("");
    setRateMessageType("");

    const pinRegex = /^[1-9][0-9]{5}$/;
    const weight = Number(form.parcelWeight);

    if (
      !pinRegex.test(form.pickupPincode) ||
      !pinRegex.test(form.deliveryPincode)
    ) {
      setRateMessage(
        "Please enter valid 6-digit pickup and delivery PIN codes."
      );
      setRateMessageType("error");
      return;
    }

    if (
      !Number.isFinite(weight) ||
      weight < 0.501 ||
      weight > 35
    ) {
      setRateMessage(
        "Enter a parcel weight between 0.501 kg and 35 kg."
      );
      setRateMessageType("error");
      return;
    }

    setRateLoading(true);

    const ratePayload = {
      requestId: `AM-IP-RATE-${Date.now()}`,
      platform: "Apni Manzil",

      // IF node in n8n will use this field.
      requestType: "Parcel Rate Check",

      service: "India Post",
      serviceType: form.serviceType,

      originPincode: form.pickupPincode,
      destinationPincode: form.deliveryPincode,

      weightKg: weight,
      weightGrams: Math.round(weight * 1000),

      dimensionsCm: {
        length: Number(form.parcelLength || 0),
        width: Number(form.parcelWidth || 0),
        height: Number(form.parcelHeight || 0),
      },

      sender: {
        pincode: form.pickupPincode,
      },

      receiver: {
        pincode: form.deliveryPincode,
      },

      parcel: {
        serviceType: form.serviceType,
        weightKg: weight,
        lengthCm: Number(form.parcelLength || 0),
        widthCm: Number(form.parcelWidth || 0),
        heightCm: Number(form.parcelHeight || 0),
      },
    };

    try {
      // Rate Check uses the same webhook as Booking.
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratePayload),
      });

      const rawText = await response.text();

      let data;

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = {
          message: rawText,
        };
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Rate service returned HTTP ${response.status}.`
        );
      }

      if (
        data?.success === false ||
        data?.available === false ||
        data?.error
      ) {
        throw new Error(
          data?.message ||
            data?.error ||
            "A rate is not available for these parcel details."
        );
      }

      const amount = getRateAmount(data);

      if (amount === null) {
        throw new Error(
          "The rate service did not return a price. Check the n8n response format."
        );
      }

      setRateResult({
        amount,
        currency: data?.currency || data?.data?.currency || "INR",
        raw: data,
      });

      setRateMessage(
        `Rate received: ₹${amount.toFixed(
          2
        )}. This is a quote only and does not confirm booking.`
      );

      setRateMessageType("success");
    } catch (error) {
      console.error("India Post rate check failed:", error);

      setRateMessage(
        error?.message ||
          "Unable to fetch the rate. Check the connection and try again."
      );

      setRateMessageType("error");
    } finally {
      setRateLoading(false);
    }
  };

  // ==========================================
  // FORM VALIDATION
  // ==========================================
  const validateForm = () => {
    const pinRegex = /^[1-9][0-9]{5}$/;
    const mobileRegex = /^[6-9][0-9]{9}$/;

    if (!mobileRegex.test(form.senderMobile)) {
      return "Please enter a valid 10-digit sender mobile number.";
    }

    if (!mobileRegex.test(form.receiverMobile)) {
      return "Please enter a valid 10-digit receiver mobile number.";
    }

    if (!pinRegex.test(form.pickupPincode)) {
      return "Please enter a valid 6-digit pickup PIN code.";
    }

    if (!pinRegex.test(form.deliveryPincode)) {
      return "Please enter a valid 6-digit delivery PIN code.";
    }

    const weight = Number(form.parcelWeight);

    if (
      !Number.isFinite(weight) ||
      weight < 0.501 ||
      weight > 35
    ) {
      return "Parcel weight must be between 0.501 kg and 35 kg.";
    }

    if (
      Number(form.parcelLength) <= 0 ||
      Number(form.parcelWidth) <= 0 ||
      Number(form.parcelHeight) <= 0
    ) {
      return "Please enter valid parcel dimensions in centimetres.";
    }

    if (!form.declarationAccepted) {
      return "Please accept the parcel declaration before continuing.";
    }

    return "";
  };

  // ==========================================
  // SUBMIT PARCEL BOOKING REQUEST
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!rateResult) {
      setMessage(
        "Please check and receive a valid parcel rate before submitting the request."
      );
      setMessageType("error");
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      setMessageType("error");
      return;
    }

    setLoading(true);

    const requestId = `AM-IP-${Date.now()}`;

    const payload = {
      requestId,
      platform: "Apni Manzil",
      service: "India Post",

      // IF node in n8n will route this to the Booking branch.
      requestType: "Parcel Booking Request",

      quotedRateINR: rateResult.amount,
      rateCurrency: rateResult.currency,

      paymentMethod: "Online Payment",
      codEnabled: false,

      status: "booking_request_received",
      submittedAt: new Date().toISOString(),

      sender: {
        name: form.senderName,
        mobile: form.senderMobile,
        email: form.senderEmail,
        address: form.pickupAddress,
        city: form.pickupCity,
        state: form.pickupState,
        pincode: form.pickupPincode,
      },

      receiver: {
        name: form.receiverName,
        mobile: form.receiverMobile,
        email: form.receiverEmail,
        address: form.deliveryAddress,
        city: form.deliveryCity,
        state: form.deliveryState,
        pincode: form.deliveryPincode,
      },

      parcel: {
        serviceType: form.serviceType,
        weightKg: Number(form.parcelWeight),
        lengthCm: Number(form.parcelLength),
        widthCm: Number(form.parcelWidth),
        heightCm: Number(form.parcelHeight),
        contents: form.parcelContents,
        declaredValueINR: Number(form.parcelValue || 0),
        instructions: form.instructions,
      },

      declarationAccepted: form.declarationAccepted,
    };

    try {
      // Booking uses the same webhook as Rate Check.
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");

        console.error("India Post webhook response:", {
          status: response.status,
          statusText: response.statusText,
          body: responseText,
          url: WEBHOOK_URL,
        });

        throw new Error(
          response.status === 404
            ? "Webhook returned 404. Check that the n8n workflow is active and its Production Webhook path is india-post-booking-request."
            : `Webhook request failed (${response.status} ${response.statusText}).`
        );
      }

      setMessage(
        `Your parcel request has been submitted. Reference ID: ${requestId}. This is a request confirmation, not an official India Post booking confirmation.`
      );

      setMessageType("success");
      setForm(initialForm);
      setRateResult(null);
      setRateMessage("");
      setRateMessageType("");
    } catch (error) {
      console.error("India Post form submission error:", error);

      setMessage(
        error?.message ||
          "Unable to submit your request. Check your internet connection and webhook configuration, then try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE UI
  // ==========================================
  return (
    <main className="india-post-page">
      <section className="india-post-hero">
        <div className="india-post-hero-overlay">
          <div className="india-post-hero-content">
            <div className="india-post-brand">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/1/1a/India_Post_Logo.svg"
                alt="India Post logo"
                className="india-post-logo"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <span>APNI MANZIL</span>
              <span className="india-post-brand-divider">×</span>
              <span>INDIA POST</span>
            </div>

            <span className="india-post-eyebrow">
              YOUR PARCEL. OUR PRIORITY.
            </span>

            <h1>Send Parcels Across India</h1>

            <p>
              Create your parcel booking request through Apni Manzil.
              Enter your shipment details and submit your request online.
            </p>

            <div className="india-post-hero-features">
              <span>✓ Easy Booking Request</span>
              <span>✓ Online Payment Intended</span>
              <span>✓ No Cash on Delivery</span>
            </div>

            <a
              href="#india-post-booking"
              className="india-post-hero-button"
            >
              Create Parcel Request →
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="india-post-benefits">
        <div className="india-post-benefit">
          <span className="india-post-benefit-icon">📦</span>
          <h3>Parcel Details</h3>
          <p>Provide accurate weight and dimensions.</p>
        </div>

        <div className="india-post-benefit">
          <span className="india-post-benefit-icon">📍</span>
          <h3>Address Details</h3>
          <p>Enter sender and receiver information.</p>
        </div>

        <div className="india-post-benefit">
          <span className="india-post-benefit-icon">🔒</span>
          <h3>Secure Payment Flow</h3>
          <p>Payment must be completed through an approved gateway.</p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section
        className="india-post-booking-section"
        id="india-post-booking"
      >
        <div className="india-post-section-heading">
          <span>PARCEL BOOKING</span>
          <h2>Enter Your Shipment Details</h2>
          <p>
            Complete all required fields carefully before submitting your
            booking request.
          </p>
        </div>

        <form className="india-post-form" onSubmit={handleSubmit}>
          <div className="india-post-form-top">
            <div>
              <span className="india-post-form-label">
                SERVICE PROVIDER
              </span>
              <h3>India Post</h3>
            </div>

            <div className="india-post-request-badge">
              Booking Request
            </div>
          </div>

          {/* SERVICE TYPE */}
          <div className="india-post-form-section">
            <div className="india-post-form-section-title">
              <span>01</span>
              <div>
                <h3>Shipment Service</h3>
                <p>Select the service you want to request.</p>
              </div>
            </div>

            <div className="india-post-field">
              <label htmlFor="serviceType">Service Type *</label>

              <select
                id="serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={updateField}
                required
              >
                <option value="Domestic Parcel">Domestic Parcel</option>
                <option value="Speed Post">Speed Post</option>
                <option value="Business Parcel">Business Parcel</option>
              </select>

              <small>
                Actual availability and eligibility must be confirmed with
                India Post.
              </small>
            </div>
          </div>

          {/* SENDER INFORMATION */}
          <div className="india-post-form-section">
            <div className="india-post-form-section-title">
              <span>02</span>
              <div>
                <h3>Sender Information</h3>
                <p>Where is the parcel being sent from?</p>
              </div>
            </div>

            <div className="india-post-grid">
              <div className="india-post-field">
                <label htmlFor="senderName">Full Name *</label>
                <input
                  id="senderName"
                  name="senderName"
                  value={form.senderName}
                  onChange={updateField}
                  placeholder="Enter sender's full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="senderMobile">Mobile Number *</label>
                <input
                  id="senderMobile"
                  name="senderMobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength="10"
                  value={form.senderMobile}
                  onChange={updateField}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="senderEmail">Email Address</label>
                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  value={form.senderEmail}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="pickupPincode">Pickup PIN Code *</label>
                <input
                  id="pickupPincode"
                  name="pickupPincode"
                  inputMode="numeric"
                  pattern="[1-9][0-9]{5}"
                  maxLength="6"
                  value={form.pickupPincode}
                  onChange={updateField}
                  placeholder="6-digit PIN code"
                  required
                />
              </div>

              <div className="india-post-field india-post-full-width">
                <label htmlFor="pickupAddress">Pickup Address *</label>
                <textarea
                  id="pickupAddress"
                  name="pickupAddress"
                  value={form.pickupAddress}
                  onChange={updateField}
                  placeholder="House number, building, street, area"
                  rows="3"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="pickupCity">City *</label>
                <input
                  id="pickupCity"
                  name="pickupCity"
                  value={form.pickupCity}
                  onChange={updateField}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="pickupState">State *</label>
                <input
                  id="pickupState"
                  name="pickupState"
                  value={form.pickupState}
                  onChange={updateField}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>
          </div>

          {/* RECEIVER INFORMATION */}
          <div className="india-post-form-section">
            <div className="india-post-form-section-title">
              <span>03</span>
              <div>
                <h3>Receiver Information</h3>
                <p>Where should the parcel be delivered?</p>
              </div>
            </div>

            <div className="india-post-grid">
              <div className="india-post-field">
                <label htmlFor="receiverName">Full Name *</label>
                <input
                  id="receiverName"
                  name="receiverName"
                  value={form.receiverName}
                  onChange={updateField}
                  placeholder="Enter receiver's full name"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="receiverMobile">Mobile Number *</label>
                <input
                  id="receiverMobile"
                  name="receiverMobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength="10"
                  value={form.receiverMobile}
                  onChange={updateField}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="receiverEmail">Email Address</label>
                <input
                  id="receiverEmail"
                  name="receiverEmail"
                  type="email"
                  value={form.receiverEmail}
                  onChange={updateField}
                  placeholder="receiver@example.com"
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="deliveryPincode">Delivery PIN Code *</label>
                <input
                  id="deliveryPincode"
                  name="deliveryPincode"
                  inputMode="numeric"
                  pattern="[1-9][0-9]{5}"
                  maxLength="6"
                  value={form.deliveryPincode}
                  onChange={updateField}
                  placeholder="6-digit PIN code"
                  required
                />
              </div>

              <div className="india-post-field india-post-full-width">
                <label htmlFor="deliveryAddress">Delivery Address *</label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={form.deliveryAddress}
                  onChange={updateField}
                  placeholder="House number, building, street, area"
                  rows="3"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="deliveryCity">City *</label>
                <input
                  id="deliveryCity"
                  name="deliveryCity"
                  value={form.deliveryCity}
                  onChange={updateField}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="deliveryState">State *</label>
                <input
                  id="deliveryState"
                  name="deliveryState"
                  value={form.deliveryState}
                  onChange={updateField}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>
          </div>

          {/* PARCEL INFORMATION */}
          <div className="india-post-form-section">
            <div className="india-post-form-section-title">
              <span>04</span>
              <div>
                <h3>Parcel Information</h3>
                <p>Provide the physical details and contents.</p>
              </div>
            </div>

            <div className="india-post-grid">
              <div className="india-post-field">
                <label htmlFor="parcelWeight">Weight (kg) *</label>
                <input
                  id="parcelWeight"
                  name="parcelWeight"
                  type="number"
                  min="0.501"
                  max="35"
                  step="0.001"
                  value={form.parcelWeight}
                  onChange={updateField}
                  placeholder="e.g. 1.000"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="parcelValue">Declared Value (₹) *</label>
                <input
                  id="parcelValue"
                  name="parcelValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.parcelValue}
                  onChange={updateField}
                  placeholder="Enter parcel value"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="parcelLength">Length (cm) *</label>
                <input
                  id="parcelLength"
                  name="parcelLength"
                  type="number"
                  min="1"
                  step="0.1"
                  value={form.parcelLength}
                  onChange={updateField}
                  placeholder="Length in cm"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="parcelWidth">Width (cm) *</label>
                <input
                  id="parcelWidth"
                  name="parcelWidth"
                  type="number"
                  min="1"
                  step="0.1"
                  value={form.parcelWidth}
                  onChange={updateField}
                  placeholder="Width in cm"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="parcelHeight">Height (cm) *</label>
                <input
                  id="parcelHeight"
                  name="parcelHeight"
                  type="number"
                  min="1"
                  step="0.1"
                  value={form.parcelHeight}
                  onChange={updateField}
                  placeholder="Height in cm"
                  required
                />
              </div>

              <div className="india-post-field">
                <label htmlFor="parcelContents">Parcel Contents *</label>
                <input
                  id="parcelContents"
                  name="parcelContents"
                  value={form.parcelContents}
                  onChange={updateField}
                  placeholder="Describe the items"
                  required
                />
              </div>

              <div className="india-post-field india-post-full-width">
                <label htmlFor="instructions">
                  Additional Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={form.instructions}
                  onChange={updateField}
                  placeholder="Any special handling instructions?"
                  rows="3"
                />
              </div>
            </div>

            {/* RATE CHECK PANEL */}
            <div
              className="india-post-rate-check-panel"
              style={{
                marginTop: "20px",
                padding: "16px",
                border: "1px solid #d5dfeb",
                borderRadius: "12px",
                background: "#f7faff",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Check Parcel Rate</h3>

              <p>
                Check the connected rate service before submitting your
                parcel request. No estimated or made-up price will be shown.
              </p>

              <button
                type="button"
                className="india-post-submit"
                onClick={handleCheckRate}
                disabled={rateLoading || loading}
              >
                {rateLoading
                  ? "Checking Live Rate..."
                  : rateResult
                  ? "Check Rate Again ↻"
                  : "Check Live Parcel Rate →"}
              </button>

              {rateMessage && (
                <div
                  className={`india-post-message ${rateMessageType}`}
                  role="status"
                  aria-live="polite"
                  style={{ marginTop: "12px" }}
                >
                  {rateMessage}
                </div>
              )}

              {rateResult && (
                <div style={{ marginTop: "12px", fontWeight: 700 }}>
                  Rate quote: ₹{rateResult.amount.toFixed(2)}{" "}
                  {rateResult.currency}
                </div>
              )}
            </div>

            <div className="india-post-info-notice">
              <strong>Parcel declaration</strong>
              <p>
                The parcel must comply with applicable India Post packaging
                requirements. Prohibited or restricted items must not be
                submitted for shipment. Final acceptance is subject to
                India Post rules and verification.
              </p>
            </div>
          </div>

          {/* PAYMENT PREFERENCE */}
          <div className="india-post-form-section">
            <div className="india-post-form-section-title">
              <span>05</span>
              <div>
                <h3>Payment Preference</h3>
                <p>Cash on Delivery is not available through this form.</p>
              </div>
            </div>

            <div className="india-post-payment-option">
              <span className="india-post-payment-icon">💳</span>

              <div>
                <strong>Online Payment</strong>
                <p>
                  Payment will be enabled after the approved payment
                  gateway is integrated.
                </p>
              </div>

              <span className="india-post-payment-badge">ONLINE</span>
            </div>

            <p className="india-post-payment-warning">
              Submitting this form does not charge your card or UPI account.
              Do not treat the request as paid or booked until the payment
              gateway and booking systems confirm the transaction.
            </p>
          </div>

          {/* DECLARATION */}
          <div className="india-post-declaration">
            <label>
              <input
                type="checkbox"
                name="declarationAccepted"
                checked={form.declarationAccepted}
                onChange={updateField}
                required
              />

              <span>
                I confirm that the information provided is accurate and
                that the parcel contents comply with applicable postal
                regulations. *
              </span>
            </label>
          </div>

          {/* STATUS MESSAGE */}
          {message && (
            <div
              className={`india-post-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="india-post-submit"
            disabled={loading}
          >
            {loading
              ? "Submitting Request..."
              : "Submit Parcel Booking Request →"}
          </button>

          <p className="india-post-form-disclaimer">
            A live rate must be received before this request can be
            submitted. Apni Manzil is collecting a parcel booking request.
            This submission does not confirm India Post acceptance, postage
            payment, pickup, or shipment booking.
          </p>
        </form>
      </section>

      {/* THREE-PHOTO GALLERY */}
      <section
        className="india-post-photo-gallery"
        aria-labelledby="india-post-gallery-title"
      >
        <style>{`
          .india-post-photo-gallery {
            padding: 52px 20px 60px;
            background: #f5f8fc;
          }

          .india-post-photo-gallery-inner {
            max-width: 1150px;
            margin: 0 auto;
          }

          .india-post-photo-gallery-heading {
            text-align: center;
            margin: 0 auto 28px;
          }

          .india-post-photo-gallery-heading span {
            display: inline-block;
            color: #f47721;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1.8px;
            margin-bottom: 8px;
          }

          .india-post-photo-gallery-heading h2 {
            color: #002d5e;
            font-size: clamp(24px, 3vw, 34px);
            font-weight: 800;
            margin: 0 0 10px;
          }

          .india-post-photo-gallery-heading p {
            color: #5b6472;
            margin: 0;
          }

          .india-post-photo-gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
          }

          .india-post-photo-card {
            overflow: hidden;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 45, 94, 0.1);
          }

          .india-post-photo-card img {
            width: 100%;
            height: 250px;
            display: block;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .india-post-photo-card:hover img {
            transform: scale(1.04);
          }

          .india-post-photo-caption {
            padding: 15px 17px;
            color: #002d5e;
            font-weight: 700;
          }

          @media (max-width: 768px) {
            .india-post-photo-gallery-grid {
              grid-template-columns: 1fr;
            }

            .india-post-photo-card img {
              height: 230px;
            }

            .india-post-photo-gallery {
              padding: 38px 16px;
            }
          }
        `}</style>

        <div className="india-post-photo-gallery-inner">
          <div className="india-post-photo-gallery-heading">
            <span>POSTAL &amp; PARCEL SERVICES</span>
            <h2 id="india-post-gallery-title">India Post in Pictures</h2>
            <p>
              Parcel services and delivery — brought together by Apni Manzil.
            </p>
          </div>

          <div className="india-post-photo-gallery-grid">
            <article className="india-post-photo-card">
              <img
                src="/images/india-post/photo1.jpg"
                alt="India Post parcel service"
                loading="lazy"
              />
              <div className="india-post-photo-caption">
                Parcel Services
              </div>
            </article>

            <article className="india-post-photo-card">
              <img
                src="/images/india-post/photo2.jpg"
                alt="Parcel packaging and dispatch"
                loading="lazy"
              />
              <div className="india-post-photo-caption">
                Packaging &amp; Dispatch
              </div>
            </article>

            <article className="india-post-photo-card">
              <img
                src="/images/india-post/photo3.jpg"
                alt="Postal delivery and logistics"
                loading="lazy"
              />
              <div className="india-post-photo-caption">
                Delivery Network
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IndiaPost;