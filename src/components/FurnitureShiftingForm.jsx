import React, { useState } from 'react';
import { Plus, Minus, Sofa, Truck, Wrench, Package, ArrowRight, ShieldCheck, MessageSquare, Info, MapPin, User, Phone, Calendar } from 'lucide-react';
import { FURNITURE_INVENTORY_DATA } from '../constants/FurnitureInventoryConstants';

const FurnitureShiftingForm = () => {
  const [cart, setCart] = useState({});
  const [extraNote, setExtraNote] = useState("");
  // --- ✅ CONTACT & ADDRESS STATE ---
  const [userDetails, setUserDetails] = useState({
    name: '', phone: '', pickupAddress: '', pickupPincode: '', 
    dropAddress: '', dropPincode: '', moveDate: ''
  });

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
    <div className="min-h-screen bg-slate-50 pb-40">
      {/* Header */}
      <div className="bg-[#002D5E] text-white p-6 sticky top-0 z-50 shadow-lg">
        <h1 className="text-xl font-black italic tracking-tighter">APNI MANZIL <span className="text-blue-400">FURNITURE</span></h1>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Expert Furniture Handling</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* --- ✅ 1. CUSTOMER & ADDRESS DETAILS SECTION --- */}
        <div className="mb-10 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-blue-100">
          <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
            <User size={16} /> Contact & Address Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={18} />
                <input required type="text" placeholder="Full Name" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold" 
                  onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                <input required type="text" placeholder="Contact Number" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold" 
                  onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})} />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 text-slate-400" size={18} />
                <input required type="date" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-slate-500" 
                  onChange={(e) => setUserDetails({...userDetails, moveDate: e.target.value})} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-red-500" size={18} />
                <textarea placeholder="Pickup Full Address" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-sm" rows="2"
                  onChange={(e) => setUserDetails({...userDetails, pickupAddress: e.target.value})}></textarea>
                <input type="text" placeholder="Pickup Pincode" className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-xs"
                  onChange={(e) => setUserDetails({...userDetails, pickupPincode: e.target.value})} />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-green-500" size={18} />
                <textarea placeholder="Drop Full Address" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-sm" rows="2"
                  onChange={(e) => setUserDetails({...userDetails, dropAddress: e.target.value})}></textarea>
                <input type="text" placeholder="Drop Pincode" className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-xs"
                  onChange={(e) => setUserDetails({...userDetails, dropPincode: e.target.value})} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Inventory Items */}
        {Object.entries(FURNITURE_INVENTORY_DATA).map(([category, items]) => (
          <div key={category} className="mb-10 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sofa size={16} className="text-blue-600" /> {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  <div className="flex items-center gap-4 bg-white px-2 py-1.5 rounded-xl border border-slate-100">
                    <button onClick={() => handleQty(item.id, -1)} className="text-slate-400"><Minus size={18}/></button>
                    <span className="font-black text-slate-900 w-5 text-center">{cart[item.id] || 0}</span>
                    <button onClick={() => handleQty(item.id, 1)} className="text-blue-600"><Plus size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 3. ETC Box */}
        <div className="bg-[#EEF2FF] rounded-[2.5rem] p-8 border-2 border-dashed border-indigo-200 mb-12">
          <h2 className="text-sm font-black text-indigo-700 uppercase tracking-widest mb-4 flex items-center gap-2">
            <MessageSquare size={20} /> Other Items & Instructions
          </h2>
          <textarea 
            className="w-full p-5 bg-white rounded-2xl border-none shadow-sm focus:ring-2 ring-indigo-400 text-sm font-bold text-slate-700"
            rows="4"
            placeholder="Describe other items like Mandir, Safe, Gym items etc..."
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          ></textarea>
        </div>

      </div>

      {/* Footer Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 flex items-center justify-between px-10 shadow-2xl z-[100]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Total Items</span>
          <span className="text-2xl font-black text-[#002D5E]">{totalItems}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95">
          Confirm Order <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FurnitureShiftingForm;