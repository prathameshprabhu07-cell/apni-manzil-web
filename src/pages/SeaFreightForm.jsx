import React, { useState } from "react";
import {
  Ship,
  MapPin,
  ArrowRight,
  Search,
  Anchor,
  Globe2,
  Container,
  ExternalLink,
  LoaderCircle,
  CheckCircle2,
  Mail,
  Weight,
  Package,
} from "lucide-react";

import seaFreightShip from "../assets/sea-freight-ship.jpg";

// Apni Manzil Sea Freight Webhook
const SEA_FREIGHT_WEBHOOK =
  "https://pizza-yes-thomas-collectible.trycloudflare.com/webhook/apni-manzil-logistics";

const providers = [
  {
    name: "Maersk",
    description: "Global container shipping and logistics.",
    url: "https://www.maersk.com/",
  },
  {
    name: "Hapag-Lloyd",
    description: "International container shipping services.",
    url: "https://www.hapag-lloyd.com/",
  },
];

export default function SeaFreightForm() {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    cargoType: "General Cargo",
    shipmentType: "Not Sure",
    weight: "",
    contactEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSubmitted(false);
    setShippingOptions([]);

    try {
      const payload = {
        ...form,

        // Compatibility with the existing freight workflow
        from: form.origin,
        to: form.destination,
        loadtype:
          form.shipmentType === "FCL"
            ? "container20"
            : form.shipmentType === "LCL"
              ? "LCL"
              : "Not Sure",
        quantity: 1,
        mode: form.shipmentType,
        cargoWeight: Number(form.weight),
        weight: Number(form.weight),
        contactEmail: form.contactEmail.trim(),
        service: "Sea Freight",
        platform: "Apni Manzil",
      };

      const response = await fetch(SEA_FREIGHT_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Request failed (${response.status}). Please try again.`
        );
      }

      const result = await response.json();

      // Supports common n8n response structures
      let options = [];

      if (Array.isArray(result)) {
        options = result;
      } else if (Array.isArray(result?.providers)) {
        options = result.providers;
      } else if (Array.isArray(result?.quotes)) {
        options = result.quotes;
      } else if (Array.isArray(result?.results)) {
        options = result.results;
      } else if (Array.isArray(result?.data)) {
        options = result.data;
      } else if (Array.isArray(result?.options)) {
        options = result.options;
      } else if (result?.provider || result?.company) {
        options = [result];
      } else if (result?.data && typeof result.data === "object") {
        const data = result.data;

        if (Array.isArray(data.providers)) {
          options = data.providers;
        } else if (Array.isArray(data.quotes)) {
          options = data.quotes;
        }
      }

      setShippingOptions(options);
      setSubmitted(true);
    } catch (err) {
      console.error("Sea Freight Webhook Error:", err);

      setError(
        "Shipping options load hot nahit. Webhook URL, n8n workflow ani response settings check kara."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,24,54,0.94) 0%, rgba(0,35,76,0.78) 52%, rgba(0,24,54,0.38) 100%), url(" +
            seaFreightShip +
            ")",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#00172f]/50 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:py-32">
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Globe2 size={17} className="text-orange-400" />
              Your Global Shipping Discovery Platform
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Global Sea Freight
              <span className="mt-2 block text-orange-400">
                Solutions
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Find the Right Shipping Partner for Your Cargo — All in One
              Place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-100">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-orange-400" />
                Global Shipping Partners
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-orange-400" />
                FCL & LCL Options
              </span>
            </div>

            <a
              href="#sea-freight-search"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              Find Shipping Partners
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
              <Ship size={58} className="mb-5 text-orange-400" />

              <h2 className="text-2xl font-bold">
                Ship Beyond Borders
              </h2>

              <p className="mt-3 max-w-xs leading-7 text-slate-200">
                Discover international shipping partners for your import
                and export requirements.
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-white/20 pt-5">
                <Anchor className="text-orange-400" size={22} />

                <div>
                  <p className="font-semibold">Apni Manzil</p>
                  <p className="text-sm text-slate-300">
                    Your Cargo. Your Choice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH FORM */}
      <section
        id="sea-freight-search"
        className="scroll-mt-8 px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Start Your Search
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#002D5E] sm:text-4xl">
              Find Your Shipping Partner
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Enter your shipment details to explore suitable sea freight
              options.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center gap-3 bg-[#002D5E] px-6 py-5 text-white sm:px-9">
              <div className="rounded-xl bg-white/10 p-3">
                <Container size={25} />
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Shipment Details
                </h3>
                <p className="text-sm text-blue-100">
                  Tell us about your cargo
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-6 p-5 sm:grid-cols-2 sm:p-9"
            >
              {/* FROM */}
              <div>
                <label htmlFor="origin" className={labelClass}>
                  From <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-[26px] text-orange-500"
                  />

                  <input
                    id="origin"
                    name="origin"
                    value={form.origin}
                    onChange={handleChange}
                    placeholder="e.g. Nhava Sheva, India"
                    required
                    maxLength={150}
                    autoComplete="shipping origin"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* TO */}
              <div>
                <label htmlFor="destination" className={labelClass}>
                  To <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-[26px] text-green-600"
                  />

                  <input
                    id="destination"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="e.g. Rotterdam, Netherlands"
                    required
                    maxLength={150}
                    autoComplete="shipping destination"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* CARGO TYPE */}
              <div>
                <label htmlFor="cargoType" className={labelClass}>
                  Cargo Type <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Package
                    size={19}
                    className="absolute left-4 top-[26px] text-orange-500"
                  />

                  <select
                    id="cargoType"
                    name="cargoType"
                    value={form.cargoType}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-11`}
                  >
                    <option>General Cargo</option>
                    <option>Textiles</option>
                    <option>Machinery</option>
                    <option>Industrial Goods</option>
                    <option>Food Products</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* SHIPMENT TYPE */}
              <div>
                <label htmlFor="shipmentType" className={labelClass}>
                  Shipment Type <span className="text-red-500">*</span>
                </label>

                <select
                  id="shipmentType"
                  name="shipmentType"
                  value={form.shipmentType}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Not Sure">Not Sure</option>
                  <option value="FCL">FCL — Full Container Load</option>
                  <option value="LCL">LCL — Less than Container Load</option>
                </select>
              </div>

              {/* WEIGHT */}
              <div>
                <label htmlFor="weight" className={labelClass}>
                  Cargo Weight (KG){" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Weight
                    size={19}
                    className="absolute left-4 top-[26px] text-orange-500"
                  />

                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="0.01"
                    max="100000000"
                    step="any"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="e.g. 15000"
                    required
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="contactEmail" className={labelClass}>
                  Contact Email{" "}
                  <span className="font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-[26px] text-orange-500"
                  />

                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    maxLength={254}
                    autoComplete="email"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700 sm:col-span-2"
                >
                  {error}
                </div>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-5 py-4 font-bold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" size={21} />
                      Finding Shipping Options...
                    </>
                  ) : (
                    <>
                      <Search size={21} />
                      Find Suitable Shipping Options
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                  No booking or payment is collected on this page. Final
                  availability, rates and terms must be confirmed with the
                  shipping company.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* WEBHOOK RESULTS */}
      {submitted && (
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-7 flex items-start gap-3">
              <CheckCircle2
                size={28}
                className="mt-1 shrink-0 text-green-600"
              />

              <div>
                <h2 className="text-2xl font-extrabold text-[#002D5E]">
                  Shipping Options
                </h2>

                <p className="mt-2 leading-7 text-slate-600">
                  Route: {form.origin} → {form.destination}
                </p>
              </div>
            </div>

            {shippingOptions.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {shippingOptions.map((item, index) => {
                  const companyName =
                    item.companyName ||
                    item.company ||
                    item.provider ||
                    item.name ||
                    "Shipping Provider";

                  const companyUrl =
                    item.officialWebsite ||
                    item.website ||
                    item.url ||
                    item.link;

                  const quoteUrl =
                    item.quoteUrl ||
                    item.quoteLink ||
                    item.bookingUrl;

                  const validUrl = (value) => {
                    try {
                      const parsed = new URL(value);
                      return ["https:", "http:"].includes(parsed.protocol)
                        ? parsed.href
                        : null;
                    } catch {
                      return null;
                    }
                  };

                  const safeCompanyUrl = validUrl(companyUrl);
                  const safeQuoteUrl = validUrl(quoteUrl);

                  return (
                    <article
                      key={`${companyName}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-blue-50 p-3 text-[#002D5E]">
                          <Ship size={27} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-[#002D5E]">
                            {companyName}
                          </h3>

                          <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                            {item.description ||
                              item.service ||
                              "Review the provider's official information for your shipment."}
                          </p>
                        </div>
                      </div>

                      {(item.rate || item.price) && (
                        <p className="mt-4 font-semibold text-green-700">
                          Rate: {item.currency || ""}{" "}
                          {item.rate || item.price}
                        </p>
                      )}

                      {safeCompanyUrl && (
                        <a
                          href={safeCompanyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#002D5E] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-900"
                        >
                          Official Website
                          <ExternalLink size={16} />
                        </a>
                      )}

                      {safeQuoteUrl && (
                        <a
                          href={safeQuoteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
                        >
                          Request Quote
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <p className="leading-7 text-slate-600">
                  Your search was submitted successfully, but the webhook
                  did not return a list of shipping companies in a recognized
                  format. You can visit these providers' official websites
                  to investigate your shipment route.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {providers.map((provider) => (
                    <a
                      key={provider.name}
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-5 transition hover:border-orange-400 hover:bg-orange-50"
                    >
                      <div>
                        <h3 className="font-bold text-[#002D5E]">
                          {provider.name}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {provider.description}
                        </p>
                      </div>

                      <ExternalLink
                        size={19}
                        className="shrink-0 text-orange-500"
                      />
                    </a>
                  ))}
                </div>

                <p className="mt-5 text-xs leading-6 text-slate-500">
                  These are general provider links, not confirmation that
                  the selected route is available. Confirm route coverage,
                  rates and terms directly with each provider.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER NOTE */}
      <section className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-[#002D5E]">
              Apni Manzil — Global Sea Freight Solutions
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Discover shipping partners for your cargo.
            </p>
          </div>

          <a
            href="https://www.maersk.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#002D5E] hover:text-orange-600"
          >
            Explore Global Shipping
            <ExternalLink size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}