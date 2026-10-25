import React, { useState } from "react";
import {
  Plane,
  MapPin,
  Package,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

const WEBHOOK_URL =
  "https://cooked-adrian-grill-tommy.trycloudflare.com/webhook/Air-Cargo";

const initialForm = {
  originCountry: "India",
  originCity: "",
  destinationCountry: "",
  destinationCity: "",
  cargoType: "",
  weight: "",
  shipmentDate: "",
};

export default function AirCargoForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setResult("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setResult("");

    if (
      !form.originCity.trim() ||
      !form.destinationCountry.trim() ||
      !form.destinationCity.trim() ||
      !form.cargoType ||
      !form.weight ||
      Number(form.weight) <= 0 ||
      !form.shipmentDate
    ) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    const payload = {
      requestType: "availability_only",
      serviceType: "air_cargo",
      platform: "Apni Manzil",
      originCountry: form.originCountry.trim(),
      originCity: form.originCity.trim(),
      destinationCountry: form.destinationCountry.trim(),
      destinationCity: form.destinationCity.trim(),
      cargoType: form.cargoType,
      weightKg: Number(form.weight),
      shipmentDate: form.shipmentDate,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { message: responseText };
        }
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to submit your enquiry. Please try again."
        );
      }

      const responseData = Array.isArray(data)
        ? data[0] || {}
        : data;

      setResult(
        responseData.message ||
          responseData.response ||
          "Your air cargo enquiry has been submitted successfully. Our team will check the route availability."
      );

      setForm(initialForm);
    } catch (submitError) {
      setError(
        submitError.message ||
          "Connection failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* AIR CARGO HERO IMAGE */}
        <section className="relative mb-8 min-h-[320px] overflow-hidden rounded-3xl bg-[#002D5E] shadow-xl sm:min-h-[400px]">

          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=85"
            alt="Airplane flying above the clouds for international air cargo transportation"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#002D5E]/95 via-[#002D5E]/75 to-[#002D5E]/20" />

          <div className="relative z-10 flex min-h-[320px] flex-col justify-center px-6 py-10 sm:min-h-[400px] sm:px-12 lg:px-16">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg">
              <Plane size={30} />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-300 sm:text-sm">
              APNI MANZIL LOGISTICS
            </p>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Air Cargo
              <span className="block text-orange-400">
                Without Boundaries
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
              Connect your business with international air cargo
              opportunities. Share your shipment details and enquire
              about available routes through Apni Manzil.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                ✈ International Cargo
              </span>

              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                🌍 Global Routes
              </span>

              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                📦 Business Shipments
              </span>
            </div>
          </div>
        </section>

        {/* ENQUIRY FORM */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

          <div className="border-b border-slate-200 px-6 py-6 sm:px-10">
            <h2 className="text-xl font-bold text-[#002D5E] sm:text-2xl">
              Air Cargo Availability Enquiry
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your origin, destination and shipment details
              to submit an air cargo availability enquiry.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-10"
          >

            {/* ROUTE DETAILS */}
            <div>
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
                <MapPin size={21} className="text-orange-500" />
                Shipment Route
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label
                    className={labelClass}
                    htmlFor="originCountry"
                  >
                    Origin Country *
                  </label>

                  <input
                    id="originCountry"
                    name="originCountry"
                    value={form.originCountry}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="India"
                    autoComplete="country-name"
                    required
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="originCity"
                  >
                    Origin City / Airport *
                  </label>

                  <input
                    id="originCity"
                    name="originCity"
                    value={form.originCity}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Mumbai"
                    required
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="destinationCountry"
                  >
                    Destination Country *
                  </label>

                  <input
                    id="destinationCountry"
                    name="destinationCountry"
                    value={form.destinationCountry}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. United Arab Emirates"
                    autoComplete="country-name"
                    required
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="destinationCity"
                  >
                    Destination City / Airport *
                  </label>

                  <input
                    id="destinationCity"
                    name="destinationCity"
                    value={form.destinationCity}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Dubai"
                    required
                  />
                </div>

              </div>
            </div>

            {/* CARGO DETAILS */}
            <div>
              <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
                <Package size={21} className="text-orange-500" />
                Cargo Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div>
                  <label
                    className={labelClass}
                    htmlFor="cargoType"
                  >
                    Cargo Type *
                  </label>

                  <select
                    id="cargoType"
                    name="cargoType"
                    value={form.cargoType}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                    <option value="">
                      Select cargo type
                    </option>

                    <option value="General Cargo">
                      General Cargo
                    </option>

                    <option value="Documents">
                      Documents
                    </option>

                    <option value="Commercial Goods">
                      Commercial Goods
                    </option>

                    <option value="Perishable Goods">
                      Perishable Goods
                    </option>

                    <option value="Fragile Goods">
                      Fragile Goods
                    </option>

                    <option value="Dangerous Goods">
                      Dangerous Goods
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="weight"
                  >
                    Gross Weight (kg) *
                  </label>

                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={form.weight}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. 25"
                    required
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="shipmentDate"
                  >
                    Expected Shipment Date *
                  </label>

                  <input
                    id="shipmentDate"
                    name="shipmentDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.shipmentDate}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle
                  size={21}
                  className="mt-0.5 shrink-0"
                />

                <p>{error}</p>
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {result && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
              >
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0"
                />

                <p>{result}</p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="max-w-xl text-xs leading-5 text-slate-500">
                * Required fields. Actual airline availability,
                schedules and charges must be confirmed by the
                relevant cargo provider. This enquiry does not
                confirm a booking.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Search size={19} />
                    Check Availability
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

            </div>
          </form>
        </section>

        {/* FOOTER NOTE */}
        <p className="mt-6 text-center text-xs leading-5 text-slate-500">
          Apni Manzil — One Solution for All Delivery.
          Your logistics enquiry starts here.
        </p>

      </div>
    </main>
  );
}