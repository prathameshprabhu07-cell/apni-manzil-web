import React, { useState } from 'react';
import { 
  Search, Truck, 
  Phone, Mail 
} from 'lucide-react';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [selectedService, setSelectedService] = useState('Courier & Parcel Delivery');

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      alert("Please enter a valid tracking ID");
      return;
    }
    console.log("Tracking ID:", trackingId, "Service:", selectedService);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HERO SEARCH SECTION */}
      <div className="bg-[#001D3D] text-white pt-20 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10"><Truck size={300} /></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            Track Your <span className="text-[#FF5E00]">Shipment</span>
          </h1>
          <p className="text-slate-400 font-bold tracking-widest text-sm uppercase">Enter your tracking ID to get real-time updates</p>
          
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-3 mt-10 bg-white p-3 rounded-[2rem] shadow-2xl items-center">
            
            {/* Select Service Dropdown */}
            <div className="w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-4">
              <select 
                value={selectedService} 
                onChange={(e) => setSelectedService(e.target.value)}
                className="bg-transparent text-[#001D3D] text-xs font-black uppercase tracking-wider px-3 py-3 outline-none cursor-pointer w-full md:w-52"
              >
                <option value="Courier & Parcel Delivery">Courier & Parcel Delivery</option>
                <option value="Hyperlocal / Bike Delivery">Hyperlocal / Bike Delivery</option>
                <option value="Truck & Transport Booking">Truck & Transport Booking</option>
                <option value="Packers & Movers">Packers & Movers</option>
                <option value="Warehouse & Storage">Warehouse & Storage</option>
                <option value="International Logistics">International Logistics</option>
                <option value="E-commerce Logistics">E-commerce Logistics</option>
                <option value="Special Logistics">Special Logistics</option>
                <option value="AI Smart Logistics">AI Smart Logistics</option>
              </select>
            </div>

            {/* Tracking ID Input */}
            <div className="flex-grow flex items-center px-4 gap-3 w-full">
              <Search className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. AM-12345)" 
                className="w-full py-4 bg-transparent outline-none text-slate-800 font-black"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>

            {/* Track Now Button */}
            <button type="submit" className="bg-[#FF5E00] text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-[#e05200] transition-all w-full md:w-auto shrink-0 cursor-pointer">
              Track Now
            </button>
          </form>
        </div>
      </div>

      {/* 2. SUPPORT BANNER */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Having trouble?</p>
          <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-[#FF5E00] mb-2"><Phone size={24}/></div>
                  <span className="text-[10px] font-black uppercase">Call Center</span>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-[#FF5E00] mb-2"><Mail size={24}/></div>
                  <span className="text-[10px] font-black uppercase">Email Help</span>
              </div>
          </div>
      </div>

    </div>
  );
};

export default Tracking;