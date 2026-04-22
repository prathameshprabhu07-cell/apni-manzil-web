import React, { useState } from 'react';
import { Truck, Package, Home, ChevronRight, ChevronLeft, ShieldCheck, CheckCircle2, Building2, Landmark, FileText } from 'lucide-react';

const PartnerRegistration = () => {
  const [step, setStep] = useState(0); 
  const [category, setCategory] = useState(null); 
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- STEP 0: CORPORATE SELECTION ---
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Strategic Partnership</h1>
            <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">Join the Most Advanced Logistics Network in India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl w-full border border-gray-200 shadow-2xl">
            {[
              { id: 'truck', title: 'Truck & Fleet', icon: <Truck size={32}/>, color: 'hover:bg-blue-600' },
              { id: 'packers', title: 'Packers & Movers', icon: <Package size={32}/>, color: 'hover:bg-orange-600' },
              { id: 'warehouse', title: 'Warehouse Group', icon: <Building2 size={32}/>, color: 'hover:bg-green-600' }
            ].map((item) => (
              <div key={item.id} onClick={() => { setCategory(item.id); nextStep(); }}
                className={`bg-white p-16 flex flex-col items-center justify-center border-r border-gray-100 last:border-0 cursor-pointer transition-all duration-300 group ${item.color} hover:text-white`}>
                <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-black uppercase tracking-tighter italic">{item.title}</h3>
                <div className="mt-4 w-10 h-1 bg-gray-200 group-hover:bg-white"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 1-11: PROFESSIONAL FORM ---
  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
      <div className="flex-grow flex flex-col items-center py-16 px-6">
        <div className="w-full max-w-4xl bg-white shadow-2xl flex flex-col lg:flex-row border border-gray-200">
          
          {/* Sidebar Info */}
          <div className="lg:w-1/3 bg-[#002D5E] p-12 text-white flex flex-col justify-between">
            <div>
              <p className="text-[#ff5e00] font-black text-xs uppercase tracking-widest mb-4 italic underline decoration-2 underline-offset-4">Registration Portal</p>
              <h2 className="text-3xl font-black uppercase italic leading-none mb-6">Step<br/>{step < 10 ? `0${step}` : step} <span className="text-blue-400">/ 11</span></h2>
              <p className="text-xs text-blue-200 font-bold uppercase tracking-widest leading-relaxed">Verification of {category} partnership records.</p>
            </div>
            <div className="mt-12 space-y-4">
              {[1,2,3,4,5,6,7,8,9,10,11].map(s => (
                <div key={s} className={`h-1 w-full ${s <= step ? 'bg-[#ff5e00]' : 'bg-gray-700'}`}></div>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:w-2/3 p-12 md:p-16">
            <div className="min-h-[400px]">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-8 border-b-4 border-slate-800 w-fit pb-2">Primary Entity Details</h3>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authorized Representative</label>
                      <input name="ownerName" onChange={handleInput} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-lg outline-none focus:border-[#004080]" placeholder="e.g. John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registered Company Name</label>
                      <input name="companyName" onChange={handleInput} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-lg outline-none focus:border-[#004080]" placeholder="e.g. APNI LOGISTICS PVT LTD" />
                    </div>
                  </div>
                </div>
              )}

              {step > 1 && step < 11 && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-500">
                   <div className="border-8 border-gray-50 p-10 rounded-full mb-8"><FileText size={60} className="text-gray-200"/></div>
                   <h2 className="text-xl font-black text-slate-400 uppercase italic tracking-widest underline decoration-gray-100 decoration-8 underline-offset-[-2px]">Component Section 0{step}</h2>
                   <p className="text-xs text-gray-300 font-bold mt-4 uppercase">Data Pipeline Configuration in Progress</p>
                </div>
              )}

              {step === 11 && (
                <div className="animate-in fade-in duration-500">
                  <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-8 border-b-4 border-orange-500 w-fit pb-2">Compliance Agreement</h3>
                  <div className="bg-gray-50 p-6 border border-gray-200 h-64 overflow-y-auto text-[12px] font-bold text-gray-600 leading-relaxed mb-8 shadow-inner">
                    <p className="mb-6 uppercase text-[#004080] border-b border-gray-200 pb-2">1.0 Data Accuracy & Verification</p>
                    <p className="mb-6">The registering entity confirms that all statutory documents (PAN, GST, Aadhaar) provided to Apni Manzil are authentic and up-to-date.</p>
                    <p className="mb-6 uppercase text-[#004080] border-b border-gray-200 pb-2">2.0 Operational Standards</p>
                    <p className="mb-6">Partner must adhere to the standardized Service Level Agreements (SLA).</p>
                  </div>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 accent-[#004080]" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-black transition">I Accept the Master Service Agreement</span>
                  </label>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-0 mt-16 border-t border-gray-100 pt-10">
              <button onClick={prevStep} className="flex-1 py-4 font-black uppercase text-xs tracking-widest text-gray-400 hover:text-black transition flex items-center justify-center gap-2">
                <ChevronLeft size={16}/> Back
              </button>
              <button onClick={nextStep} className="flex-[2] py-5 bg-[#004080] text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-[#ff5e00] transition duration-500 flex items-center justify-center gap-2 shadow-2xl">
                {step === 11 ? "Execute Registration" : "Proceed Next"} <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration;