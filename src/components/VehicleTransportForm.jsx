import React, { useState } from 'react';
import { Truck, Car, Bike, Info, MapPin, ShieldCheck, ArrowRight, Gauge, ClipboardList, Fuel } from 'lucide-react';

const VehicleTransportForm = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', vehicleType: 'Car',
    model: '', condition: 'Running', fuel: 'Low',
    pickup: '', drop: '', transportType: 'Open',
    insurance: false
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-40">
      {/* --- Header --- */}
      <div className="bg-[#002D5E] text-white p-6 sticky top-0 z-50 shadow-lg">
        <h1 className="text-xl font-black italic tracking-tighter">APNI MANZIL <span className="text-orange-400">VEHICLE LOGISTICS</span></h1>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Safe Car & Bike Relocation</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* --- 1. Vehicle Selection & Basic Info --- */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Car size={16} className="text-orange-500" /> Vehicle Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Type Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Select Vehicle Type</label>
              <select 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 ring-orange-500"
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
              >
                <option value="Car">Car 🚗</option>
                <option value="Bike">Bike 🏍️</option>
                <option value="Scooter">Scooter / Activa</option>
                <option value="Bicycle">Bicycle 🚲</option>
                <option value="Commercial">Commercial Vehicle 🚛</option>
              </select>
            </div>

            {/* Brand / Model */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Brand / Model Name</label>
              <div className="relative">
                <ClipboardList className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="text" placeholder="e.g. Swift, Honda Activa, KTM" 
                  className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold focus:ring-2 ring-orange-500"
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                />
              </div>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Vehicle Condition</label>
              <div className="flex gap-3">
                {['Running', 'Non-running'].map(cond => (
                  <button 
                    key={cond}
                    onClick={() => setFormData({...formData, condition: cond})}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${formData.condition === cond ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Level */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 flex items-center gap-1">
                <Fuel size={12}/> Fuel Level
              </label>
              <select 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 ring-orange-500"
                onChange={(e) => setFormData({...formData, fuel: e.target.value})}
              >
                <option value="Empty">Empty (Best for safety)</option>
                <option value="Low">Low</option>
                <option value="Full">Full</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- 2. Location Details --- */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <MapPin size={16} className="text-red-500" /> Pickup & Drop Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-red-500" size={18} />
              <textarea placeholder="Pickup Location Address" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-sm" rows="3"></textarea>
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-green-500" size={18} />
              <textarea placeholder="Drop Location Address" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-blue-500 font-bold text-sm" rows="3"></textarea>
            </div>
          </div>
        </div>

        {/* --- 3. Transport Type & Safety --- */}
        <div className="mb-8 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-orange-50">
          <h2 className="text-xs font-black text-orange-600 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Truck size={16} /> Transport Type & Safety
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transport Options */}
            <div className="space-y-4">
              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.transportType === 'Open' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}
                onClick={() => setFormData({...formData, transportType: 'Open'})}>
                <div>
                   <p className="font-bold text-slate-800">Open Transport</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Budget Friendly / Normal Truck</p>
                </div>
                <input type="radio" checked={formData.transportType === 'Open'} readOnly />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.transportType === 'Enclosed' ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}
                onClick={() => setFormData({...formData, transportType: 'Enclosed'})}>
                <div>
                   <p className="font-bold text-slate-800">Enclosed Transport</p>
                   <p className="text-[10px] text-orange-600 font-bold uppercase tracking-tighter italic">Premium Safety / Closed Container</p>
                </div>
                <input type="radio" checked={formData.transportType === 'Enclosed'} readOnly />
              </label>
            </div>

            {/* Extra Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-700 flex items-center gap-2"><ShieldCheck size={16} className="text-green-600"/> Transit Insurance</span>
                <input type="checkbox" className="w-5 h-5 accent-orange-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm font-bold text-slate-700 flex items-center gap-2"><Truck size={16} className="text-blue-600"/> Door to Door Delivery</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="flex gap-3 items-center bg-orange-50 p-5 rounded-3xl text-orange-800 border border-orange-100">
          <Info size={24} className="shrink-0" />
          <p className="text-[10px] font-bold uppercase leading-tight tracking-tight">
            Safety Tip: Please remove all personal belongings from the vehicle and keep minimal fuel for transport safety.
          </p>
        </div>

      </div>

      {/* --- Footer Summary --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 flex items-center justify-between px-10 shadow-2xl z-[100]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Transport Mode</span>
          <span className="text-xl font-black text-[#002D5E]">{formData.transportType} <span className="text-orange-500">Carrier</span></span>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95">
          Get Vehicle Quote <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default VehicleTransportForm;