import React, { useState } from 'react';
import { Building2, Package, Truck, ArrowRight, MessageSquare, ClipboardList, Info, Monitor, Utensils, Zap, Clock } from 'lucide-react';

const CommercialMovingForm = () => {
  const [formData, setFormData] = useState({
    businessType: 'Office',
    name: '', phone: '',
    pickup: '', drop: '',
    moveTiming: 'Day',
    extraNote: ''
  });

  const businessTypes = [
    "Office", "Shop / Retail", "Warehouse", "Restaurant", "Clinic / Hospital", "Salon / Spa"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-40">
      {/* Header */}
      <div className="bg-[#002D5E] text-white p-6 sticky top-0 z-50 shadow-lg">
        <h1 className="text-xl font-black italic tracking-tighter">APNI MANZIL <span className="text-green-400">COMMERCIAL</span></h1>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Business & Industrial Relocation</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* 1. Business Type Selection */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Building2 size={16} className="text-blue-600" /> 1. Business Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {businessTypes.map(type => (
              <button 
                key={type}
                onClick={() => setFormData({...formData, businessType: type})}
                className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${formData.businessType === type ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 bg-slate-50'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Contact & Timing */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Clock size={16} className="text-orange-500" /> 2. Contact & Timing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Contact Person Name" className="p-4 bg-slate-50 rounded-2xl border-none font-bold" />
            <input type="text" placeholder="Business Phone Number" className="p-4 bg-slate-50 rounded-2xl border-none font-bold" />
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Shifting Preference</label>
              <select 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700"
                onChange={(e) => setFormData({...formData, moveTiming: e.target.value})}
              >
                <option value="Day">Standard Day Shifting</option>
                <option value="Night">Night Shifting (Minimal Business Impact) 🌙</option>
                <option value="Urgent">Urgent / Emergency Shifting ⚡</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Items Checklist (Quick Categorization) */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <ClipboardList size={16} className="text-purple-600" /> 3. Inventory Overview
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2"><Zap size={14}/> IT / Computers</span>
              <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2"><Monitor size={14}/> Office Furniture</span>
              <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2"><Package size={14}/> Stock / Raw Material</span>
              <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2"><Utensils size={14}/> Heavy Machinery</span>
            </div>
            
            {/* ETC / EXTRA ITEMS BOX - तुझी मेन रिक्वायरमेंट */}
            <div className="mt-4">
              <label className="text-[10px] font-black text-blue-600 uppercase ml-2 mb-2 flex items-center gap-2">
                <MessageSquare size={14}/> Mention Items & Special Instructions (ETC)
              </label>
              <textarea 
                className="w-full p-5 bg-slate-50 rounded-[1.5rem] border-2 border-dashed border-slate-200 outline-none focus:border-blue-500 font-bold text-sm"
                rows="5"
                placeholder="उदा. 10 ऑफिस चेअर्स, 2 सर्वर रॅक, काचेचे काऊंटर, किंवा इतर कोणतेही सामान..."
                value={formData.extraNote}
                onChange={(e) => setFormData({...formData, extraNote: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* 4. Services Required */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Truck size={16} className="text-green-600" /> 4. Service Add-ons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Labelling", "Dismantling", "Unpacking", "Insurance", "Security"].map(service => (
              <label key={service} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-xs font-bold text-slate-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Alert Info */}
        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex gap-4 items-start">
          <Info className="text-blue-600 shrink-0" size={20} />
          <p className="text-[10px] font-bold text-blue-800 uppercase leading-relaxed">
            Note: Commercial shifting leads are assigned to our premium partners who specialize in quick and safe business relocation.
          </p>
        </div>

      </div>

      {/* Footer Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 flex items-center justify-between px-10 shadow-2xl z-[100]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Business Type</span>
          <span className="text-xl font-black text-[#002D5E]">{formData.businessType}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95">
          Send Inquiry <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CommercialMovingForm;