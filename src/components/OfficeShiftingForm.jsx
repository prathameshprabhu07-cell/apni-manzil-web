import React, { useState } from 'react';
import { Plus, Minus, MessageSquare, Truck, PackageCheck, AlertCircle, ShieldCheck, Cpu, MapPin, Layers } from 'lucide-react';
import { OFFICE_INVENTORY_DATA } from '../constants/OfficeInventoryConstants';

const OfficeShiftingForm = () => {
  const [cart, setCart] = useState({});
  const [extraNote, setExtraNote] = useState("");
  const [details, setDetails] = useState({
    companyName: "",
    contactNo: "",
    pickupAddress: "", pickupPincode: "", pickupFloor: "",
    dropAddress: "", dropPincode: "", dropFloor: ""
  });

  const [itSupport, setItSupport] = useState(false);
  const [insurance, setInsurance] = useState(false);

  const handleChange = (e) => setDetails({ ...details, [e.target.name]: e.target.value });

  const handleQty = (id, change) => {
    const current = cart[id] || 0;
    const next = current + change;
    if (next <= 0) {
      const { [id]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart({ ...cart, [id]: next });
    }
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-40">
      {/* Header */}
      <div className="bg-[#002D5E] text-white p-6 sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-black tracking-tighter italic">APNI MANZIL <span className="text-orange-500 italic">OFFICE</span></h1>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">Professional Corporate Relocation</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* 1. Company Information */}
        <div className="mb-8 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="companyName" placeholder="Company Name" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 text-sm font-bold" />
            <input name="contactNo" placeholder="Contact Person Number" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 text-sm font-bold" />
          </div>
        </div>

        {/* 2. Address Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
            <h2 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={14}/> Pickup</h2>
            <textarea name="pickupAddress" placeholder="Full Office Address" rows="2" onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl border-none mb-4 text-sm font-bold" />
            <div className="grid grid-cols-2 gap-2">
              <input name="pickupPincode" placeholder="Pincode" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold" />
              <input name="pickupFloor" placeholder="Floor" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold" />
            </div>
          </div>
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
            <h2 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Truck size={14}/> Drop-off</h2>
            <textarea name="dropAddress" placeholder="New Office Address" rows="2" onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl border-none mb-4 text-sm font-bold" />
            <div className="grid grid-cols-2 gap-2">
              <input name="dropPincode" placeholder="Pincode" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold" />
              <input name="dropFloor" placeholder="Floor" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold" />
            </div>
          </div>
        </div>

        {/* 3. Office Inventory */}
        {Object.entries(OFFICE_INVENTORY_DATA).map(([category, items]) => (
          <div key={category} className="mb-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <PackageCheck size={16} className="text-indigo-600" /> {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group transition-all">
                  <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  <div className="flex items-center gap-4 bg-white px-2 py-1.5 rounded-xl shadow-sm border border-slate-100">
                    <button onClick={() => handleQty(item.id, -1)} className="text-slate-400 hover:text-red-500 transition-colors"><Minus size={18}/></button>
                    <span className="font-black text-slate-900 w-5 text-center">{cart[item.id] || 0}</span>
                    <button onClick={() => handleQty(item.id, 1)} className="text-indigo-600 hover:scale-125 transition-transform"><Plus size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 4. Special Office Services */}
        <div className="mb-10 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Premium Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <input type="checkbox" checked={itSupport} onChange={() => setItSupport(!itSupport)} className="w-5 h-5 accent-indigo-600" />
              <div className="flex flex-col"><span className="text-sm font-bold text-slate-700">IT Setup Support</span><span className="text-[10px] text-slate-500 uppercase tracking-tighter">PC & Networking Re-setup</span></div>
            </label>
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <input type="checkbox" checked={insurance} onChange={() => setInsurance(!insurance)} className="w-5 h-5 accent-red-600" />
              <div className="flex flex-col"><span className="text-sm font-bold text-slate-700">Asset Insurance</span><span className="text-[10px] text-slate-500 uppercase tracking-tighter">Protection for IT equipment</span></div>
            </label>
          </div>
        </div>

        {/* 5. Special Instructions (The "ETC" Box) */}
        <div className="bg-[#EEF2FF] rounded-[2rem] p-8 border-2 border-dashed border-indigo-200 mb-12">
          <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <MessageSquare size={20} /> Special Shifting Instructions
          </h2>
          <p className="text-xs text-indigo-700/70 mb-4 font-medium">Mention if you have large Server Racks, CCTV wires removal, Medical equipment, or Employee-wise box labeling needs.</p>
          <textarea 
            className="w-full p-5 bg-white rounded-2xl border-none shadow-sm focus:ring-2 ring-indigo-400 text-sm font-medium text-slate-700"
            rows="5"
            placeholder="Type your extra requirements here..."
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 flex items-center justify-between px-10 shadow-2xl z-[100]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase">Total Office Assets</span>
          <span className="text-2xl font-black text-[#002D5E]">{totalItems}</span>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95">
          Get Office Quote <Truck size={20} />
        </button>
      </div>
    </div>
  );
};

export default OfficeShiftingForm;