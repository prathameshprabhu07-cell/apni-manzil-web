import React, { useState } from 'react';

const TrackShipment = () => {
  const [selectedService, setSelectedService] = useState('Courier & Parcel Delivery');
  const [trackingId, setTrackingId] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      alert("Please enter tracking ID");
      return;
    }
    console.log("Tracking Service:", selectedService, "ID:", trackingId);
    // इथे तुझा पुढचा लॉजिक किंवा वेबहूक टाकू शकतोस
  };

  return (
    <div className="w-full bg-[#001D3D] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#001D3D] text-center">
        
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-wider mb-2">
          TRACK YOUR <span className="text-[#ff6b35]">SHIPMENT</span>
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mb-8 font-medium">
          ENTER YOUR TRACKING ID TO GET REAL-TIME UPDATES
        </p>

        {/* Search Box Container */}
        <form onSubmit={handleTrack} className="bg-white rounded-2xl md:rounded-full p-3 shadow-2xl flex flex-col md:flex-row items-center gap-3">
          
          {/* Select Service Dropdown */}
          <div className="w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-3">
            <select 
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
              className="bg-transparent text-[#001D3D] text-xs font-bold px-3 py-3 outline-none cursor-pointer w-full md:w-52"
            >
              <option value="Select Service" disabled>Select Service</option>
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
          <div className="w-full flex-1 px-3">
            <input 
              type="text"
              placeholder="Enter tracking ID (e.g. #AM-TRACK)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full bg-transparent text-[#001D3D] text-sm font-bold outline-none placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          {/* Track Now Button */}
          <button 
            type="submit"
            className="w-full md:w-auto bg-[#ff6b35] hover:bg-[#e85a28] text-white px-8 py-4 rounded-xl md:rounded-full font-black uppercase text-xs tracking-widest cursor-pointer transition whitespace-nowrap shadow-lg"
          >
            TRACK NOW
          </button>

        </form>

      </div>
    </div>
  );
};

export default TrackShipment;