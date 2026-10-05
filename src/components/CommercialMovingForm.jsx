```jsx
import React, { useState } from "react";
import {
  Building2,
  Truck,
  ArrowRight,
  ClipboardList,
  Clock,
} from "lucide-react";

const CommercialMovingForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessType: "Office",
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    moveTiming: "Day",
    extraNote: "",
    services: [],
  });

  const businessTypes = [
    "Office",
    "Shop / Retail",
    "Warehouse",
    "Restaurant",
    "Clinic / Hospital",
    "Salon / Spa",
  ];

  const serviceOptions = [
    "Labelling",
    "Dismantling",
    "Unpacking",
    "Insurance",
    "Security",
  ];

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Please enter the contact person name.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit business phone number.");
      return;
    }

    if (!formData.pickup.trim()) {
      alert("Please enter the pickup address.");
      return;
    }

    if (!formData.drop.trim()) {
      alert("Please enter the drop address.");
      return;
    }

    setLoading(true);

    const finalData = {
      ...formData,
      serviceType: "Commercial Shifting",
      requestSource: "apni_manzil",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "https://coating-vocabulary-gcc-cognitive.trycloudflare.com/webhook/packer-movers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status}`);
      }

      alert(
        "Your commercial shifting inquiry has been submitted successfully! Our relocation partners will review your requirement."
      );
    } catch (error) {
      console.error("Commercial Moving Webhook Error:", error);

      alert(
        "We could not submit your inquiry right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-40">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#002D5E] p-6 text-white shadow-lg">
        <h1 className="text-xl font-black italic tracking-tighter">
          APNI MANZIL{" "}
          <span className="text-green-400">COMMERCIAL</span>
        </h1>

        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          Business & Industrial Relocation
        </p>
      </div>

      <div className="mx-auto max-w-4xl p-4 md:p-8">

        {/* 1. Business Type */}
        <div className="mb-8 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Building2 size={16} className="text-blue-600" />
            1. Business Type
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {businessTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    businessType: type,
                  }))
                }
                className={`rounded-2xl border-2 p-4 text-sm font-bold transition-all ${
                  formData.businessType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-100 bg-slate-50 text-slate-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Contact & Timing */}
        <div className="mb-8 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Clock size={16} className="text-orange-500" />
            2. Contact & Timing
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Contact Name */}
            <input
              type="text"
              placeholder="Contact Person Name"
              value={formData.name}
              className="rounded-2xl border-none bg-slate-50 p-4 font-bold outline-none focus:ring-2 focus:ring-blue-200"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            {/* Phone */}
            <div className="flex items-center overflow-hidden rounded-2xl bg-slate-50">

              <span className="select-none bg-slate-50 pl-4 pr-2 font-bold text-slate-500">
                +91
              </span>

              <input
                type="tel"
                maxLength="10"
                placeholder="Business Phone Number"
                value={formData.phone}
                className="w-full rounded-2xl border-none bg-slate-50 p-4 font-bold outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }));
                }}
              />

            </div>

            {/* Pickup & Drop */}
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2">

              <input
                type="text"
                placeholder="Pickup Address"
                value={formData.pickup}
                className="rounded-2xl border-none bg-slate-50 p-4 font-bold outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pickup: e.target.value,
                  }))
                }
              />

              <input
                type="text"
                placeholder="Drop Address"
                value={formData.drop}
                className="rounded-2xl border-none bg-slate-50 p-4 font-bold outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    drop: e.target.value,
                  }))
                }
              />

            </div>

            {/* Moving Preference */}
            <div className="space-y-2 md:col-span-2">

              <label className="ml-2 text-[10px] font-black uppercase text-slate-400">
                Shifting Preference
              </label>

              <select
                value={formData.moveTiming}
                className="w-full rounded-2xl border-none bg-slate-50 p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-200"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    moveTiming: e.target.value,
                  }))
                }
              >
                <option value="Day">
                  Standard Day Shifting
                </option>

                <option value="Night">
                  Night Shifting (Minimal Business Impact)
                </option>

                <option value="Urgent">
                  Urgent / Emergency Shifting
                </option>
              </select>

            </div>

          </div>
        </div>

        {/* 3. Inventory Overview */}
        <div className="mb-8 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <ClipboardList size={16} className="text-purple-600" />
            3. Inventory Overview
          </h2>

          <textarea
            rows="5"
            value={formData.extraNote}
            placeholder="Mention items like office chairs, server racks, glass counters, machinery, equipment, etc..."
            className="w-full rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-bold outline-none focus:border-blue-500"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                extraNote: e.target.value,
              }))
            }
          />

          <p className="mt-2 text-xs text-slate-400">
            Please provide an approximate description of the items that need
            to be moved.
          </p>
        </div>

        {/* 4. Service Add-ons */}
        <div className="mb-8 rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm md:p-8">

          <h2 className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
            <Truck size={16} className="text-green-600" />
            4. Service Add-ons
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

            {serviceOptions.map((service) => (
              <label
                key={service}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition ${
                  formData.services.includes(service)
                    ? "bg-blue-50 ring-2 ring-blue-500"
                    : "bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  className="h-4 w-4 accent-blue-600"
                  onChange={() => handleServiceToggle(service)}
                />

                <span className="text-xs font-bold text-slate-700">
                  {service}
                </span>
              </label>
            ))}

          </div>
        </div>

      </div>

      {/* Footer Summary */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-between border-t bg-white px-6 p-6 shadow-2xl md:px-10">

        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">
            Business Type
          </span>

          <span className="text-lg font-black text-[#002D5E] md:text-xl">
            {formData.businessType}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:px-10"
        >
          {loading ? "Submitting..." : "Send Inquiry"}

          <ArrowRight size={20} />
        </button>

      </div>

    </div>
  );
};

export default CommercialMovingForm;
```
