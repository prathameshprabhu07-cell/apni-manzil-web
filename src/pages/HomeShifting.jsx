import React, { useState } from 'react';
import { Plus, Minus, MessageSquare, Truck, PackageCheck, AlertCircle, MapPin, User, Phone, Layers } from 'lucide-react';
import { INVENTORY_DATA } from '../constants/InventoryConstants';

const ApniManzilFinalForm = () => {
  const [cart, setCart] = useState({});
  const [extraNote, setExtraNote] = useState("");
  const [hasLift, setHasLift] = useState(false);
  const [needInstallation, setNeedInstallation] = useState(false);

  // --- New Logistics States ---
  const [details, setDetails] = useState({
    ownerName: "",
    contactNo: "",
    pickupAddress: "",
    pickupPincode: "",
    pickupFloor: "",
    dropAddress: "",
    dropPincode: "",
    dropFloor: ""
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

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
        <h1 className="text-xl font-black tracking-tighter italic">APNI MANZIL <span className="text-orange-500 italic">MOVERS</span></h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Booking Details</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* 1. OWNER INFORMATION */}
        <div className="mb-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <User size={16} className="text-indigo-600" /> Owner Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="ownerName" placeholder="Full Name" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 text-sm font-bold" />
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="contactNo" placeholder="Contact Number" onChange={handleChange} className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 text-sm font-bold" />
            </div>
          </div>
        </div>

        {/* 2. PICKUP DETAILS */}
        <div className="mb-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <MapPin size={16} className="text-red-500" /> Pickup Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <textarea name="pickupAddress" placeholder="Full Pickup Address" rows="2" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-red-500 text-sm font-bold" />
            <div className="grid grid-cols-2 gap-4">
              <input name="pickupPincode" placeholder="Pickup Pincode" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-red-500 text-sm font-bold" />
              <div className="relative">
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="pickupFloor" placeholder="Pickup Floor (e.g. 3rd)" onChange={handleChange} className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-red-500 text-sm font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. DROP-OFF DETAILS */}
        <div className="mb-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Truck size={16} className="text-green-600" /> Drop-off Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <textarea name="dropAddress" placeholder="Full Drop Address" rows="2" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-green-500 text-sm font-bold" />
            <div className="grid grid-cols-2 gap-4">
              <input name="dropPincode" placeholder="Drop Pincode" onChange={handleChange} className="p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-green-500 text-sm font-bold" />
              <div className="relative">
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="dropFloor" placeholder="Drop Floor (e.g. Ground)" onChange={handleChange} className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-green-500 text-sm font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. INVENTORY SELECTION */}
        {Object.entries(INVENTORY_DATA).map(([category, items]) => (
          <div key={category} className="mb-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <PackageCheck size={16} className="text-indigo-600" /> {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-all group">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{item.name}</span>
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

        {/* 5. SERVICE OPTIONS */}
        <div className="mb-10 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Service Options</h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <input type="checkbox" checked={hasLift} onChange={() => setHasLift(!hasLift)} className="w-5 h-5 accent-indigo-600" />
              <span className="text-sm font-bold text-slate-700">Lift Available at Locations</span>
            </label>
            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
              <input type="checkbox" checked={needInstallation} onChange={() => setNeedInstallation(!needInstallation)} className="w-5 h-5 accent-orange-500" />
              <span className="text-sm font-bold text-slate-700">Need Installation / Uninstallation</span>
            </label>
          </div>
        </div>

        {/* 6. ANYTHING ELSE */}
        <div className="bg-[#FFF7ED] rounded-[2rem] p-8 border-2 border-dashed border-orange-200 mb-12">
          <h2 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <MessageSquare size={20} /> Anything Else?
          </h2>
          <textarea 
            className="w-full p-5 bg-white rounded-2xl border-none shadow-inner focus:ring-2 ring-orange-400 text-sm font-medium text-slate-700"
            rows="4"
            placeholder="Additional items or instructions..."
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 flex items-center justify-between px-10 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] z-[100]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Items</span>
          <span className="text-2xl font-black text-[#002D5E]">{totalItems}</span>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 transition-all">
          Proceed to Rates <Truck size={20} />
        </button>
      </div>
    </div>
  );
};

export default ApniManzilFinalForm;