import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Shield, Clock, MapPin } from 'lucide-react';

const CourierServiceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "Courier Service" };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-[#002D5E] text-white py-12 px-6 md:px-16">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-orange-400 mb-6 font-bold">
          <ArrowLeft size={20}/> Back
        </button>
        <h1 className="text-4xl font-black">{name}</h1>
        <p className="text-blue-100 opacity-70 mt-2 font-medium">Book your {name} with Apni Manzil AI Logistics</p>
      </div>

      <div className="max-w-4xl mx-auto -mt-10 px-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* डावी बाजू: Booking Form (Short) */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-[#002D5E] border-b-2 border-orange-500 w-fit pb-1">Quick Booking</h3>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Pickup Pincode</label>
                  <input type="text" placeholder="e.g. 400001" className="w-full bg-transparent outline-none font-bold mt-1" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Delivery Pincode</label>
                  <input type="text" placeholder="e.g. 411001" className="w-full bg-transparent outline-none font-bold mt-1" />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Approx Weight (KG)</label>
                  <input type="number" placeholder="0.5" className="w-full bg-transparent outline-none font-bold mt-1" />
                </div>
                <button className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 shadow-xl transition">
                  Check Rates & Book
                </button>
              </div>
            </div>

            {/* उजवी बाजू: Benefits */}
            <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100 space-y-6">
              <h3 className="text-lg font-black text-[#002D5E]">Why Choose {name}?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm h-fit"><Shield size={20}/></div>
                  <p className="text-sm font-bold text-slate-600">Fully Insured Shipments</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm h-fit"><Clock size={20}/></div>
                  <p className="text-sm font-bold text-slate-600">On-time Pickup Guarantee</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm h-fit"><MapPin size={20}/></div>
                  <p className="text-sm font-bold text-slate-600">Real-time GPS Tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierServiceDetail;