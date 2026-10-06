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
      alert("Please enter the contact person's name.");
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
        throw new Error("Failed to submit commercial shifting inquiry.");
      }

      alert(
        "Your commercial shifting inquiry has been submitted successfully! Our relocation partners will review your requirement."
      );
    } catch (error) {
      console.error("Commercial shifting submission error:", error);

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
      <div className="bg-[#002D5E] text-white p-6 sticky top-0 z-50 shadow-lg">
        <h1 className="text-xl font-black italic tracking-tighter">
          APNI MANZIL{" "}
          <span className="text-green-400">COMMERCIAL</span>
        </h1>

        <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">
          Business & Industrial Relocation
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* 1. Business Type */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Building2 size={16} className="text-blue-600" />
            1. Business Type
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                  formData.businessType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-100 text-slate-500 bg-slate-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Contact & Timing */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Clock size={16} className="text-orange-500" />
            2. Contact & Timing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Name */}
            <input
              type="text"
              placeholder="Contact Person Name"
              value={formData.name}
              className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            {/* Business Phone */}
            <div className="flex items-center bg-slate-50 rounded-2xl overflow-hidden">
              <span className="pl-4 pr-2 text-slate-500 font-bold select-none">
                +91
              </span>

              <input
                type="tel"
                maxLength={10}
                inputMode="numeric"
                placeholder="Business Phone Number"
                value={formData.phone}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none"
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

            {/* Pickup Address */}
            <input
              type="text"
              placeholder="Pickup Address"
              value={formData.pickup}
              className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pickup: e.target.value,
                }))
              }
            />

            {/* Drop Address */}
            <input
              type="text"
              placeholder="Drop Address"
              value={formData.drop}
              className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  drop: e.target.value,
                }))
              }
            />

            {/* Shifting Preference */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                Shifting Preference
              </label>

              <select
                value={formData.moveTiming}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    moveTiming: e.target.value,
                  }))
                }
              >
                <option value="Day">Standard Day Shifting</option>
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
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <ClipboardList size={16} className="text-purple-600" />
            3. Inventory Overview
          </h2>

          <textarea
            rows={5}
            value={formData.extraNote}
            className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-dashed border-slate-200 outline-none focus:border-blue-500 font-bold text-sm resize-none"
            placeholder="Mention items such as office chairs, desks, computers, server racks, glass counters, machines, etc."
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                extraNote: e.target.value,
              }))
            }
          />
        </div>

        {/* 4. Service Add-ons */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Truck size={16} className="text-green-600" />
            4. Service Add-ons
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {serviceOptions.map((service) => {
              const isSelected = formData.services.includes(service);

              return (
                <label
                  key={service}
                  className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-transparent bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    className="w-4 h-4 accent-blue-600"
                    onChange={() => handleServiceToggle(service)}
                  />

                  <span className="text-xs font-bold text-slate-700">
                    {service}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Footer Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:p-6 flex items-center justify-between px-4 md:px-10 shadow-2xl z-[100]">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
            Business Type
          </span>

          <span className="text-sm md:text-xl font-black text-[#002D5E] truncate max-w-[140px] md:max-w-none">
            {formData.businessType}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-5 md:px-10 py-3 md:py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95"
        >
          {loading ? "Processing..." : "Send Inquiry"}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CommercialMovingForm;
```
