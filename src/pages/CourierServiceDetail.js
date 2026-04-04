import React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  ArrowLeft, Truck, Zap, Clock, Calendar, FileText, 
  Package, Boxes, RefreshCcw, ChevronRight
} from 'lucide-react';

const CourierServiceDetail = () => {
  const navigate = useNavigate();

  const subServices = [
    { id: 1, name: "Domestic Courier", desc: "Standard shipping across India", icon: <Truck size={28} />, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, name: "Express Courier", desc: "Fastest delivery for urgent parcels", icon: <Zap size={28} />, color: "text-orange-500", bg: "bg-orange-50" },
    { id: 3, name: "Same Day Delivery", desc: "Delivery within the same city", icon: <Clock size={28} />, color: "text-green-600", bg: "bg-green-50" },
    { id: 4, name: "Next Day Delivery", desc: "Guaranteed delivery by tomorrow", icon: <Calendar size={28} />, color: "text-amber-700", bg: "bg-amber-50" },
    { id: 5, name: "Document Courier", desc: "Secure paper & letter delivery", icon: <FileText size={28} />, color: "text-slate-600", bg: "bg-slate-50" },
    { id: 6, name: "Parcel Delivery", desc: "Reliable box & item shipping", icon: <Package size={28} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: 7, name: "Bulk Shipping", desc: "Heavy & large volume orders", icon: <Boxes size={28} />, color: "text-pink-600", bg: "bg-pink-50" },
    { id: 8, name: "Reverse Pickup", desc: "Easy returns and pickups", icon: <RefreshCcw size={28} />, color: "text-cyan-600", bg: "bg-cyan-50" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* १. Header Section */}
      <div className="bg-[#002D5E] text-white pt-12 pb-24 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-orange-400 mb-8 font-bold hover:text-orange-300 transition relative z-10"
        >
          <ArrowLeft size={20}/> Back to Home
        </button>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Courier & Parcel Delivery Service
          </h1>
          <p className="text-blue-100/80 text-lg md:text-2xl font-medium italic">
            "Smart courier solution for your need"
          </p>
        </div>
      </div>

      {/* २. मुख्य आशय (8 Boxes + Sidebar) */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-12 pb-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-4">
            {subServices.map((s) => (
              <div 
                key={s.id} 
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-between group hover:shadow-2xl hover:border-orange-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`${s.bg} ${s.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-[#002D5E] text-lg">{s.name}</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{s.desc}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-[35%]">
            <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-blue-50 relative overflow-hidden h-fit">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-orange-500 p-2 rounded-lg text-white shadow-lg shadow-orange-200">
                  <Zap size={20} fill="white" />
                </div>
                <h3 className="text-xl font-black text-[#002D5E]">AI Smart Pick</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-blue-50 rounded-2xl border border-blue-100">
                  <span className="font-bold text-slate-600">Cheapest</span>
                  <span className="font-black text-[#002D5E] text-xl text-right">₹ 79 <br/><span className="text-[10px] text-slate-400 block tracking-tighter uppercase">Delhivery</span></span>
                </div>
                <div className="flex items-center justify-between p-5 bg-orange-50 rounded-2xl border border-orange-100">
                  <span className="font-bold text-slate-600">Fastest</span>
                  <span className="font-black text-[#002D5E] text-xl text-right">1 Day <br/><span className="text-[10px] text-slate-400 block tracking-tighter uppercase">DTDC Air</span></span>
                </div>
              </div>

              <button className="w-full mt-10 bg-[#002D5E] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-800 transition shadow-xl">
                Compare All Rates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ३. नवीन ब्रँडेड ट्रक इमेज सेक्शन */}
      <div 
        className="w-full h-[400px] flex items-center justify-center text-center px-6 mt-12 mb-12"
        style={{
          // Public फोल्डरमध्ये इमेज असल्याने डायरेक्ट पाथ वापरला आहे
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/truck-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-4xl">
          <h2 className="text-white text-3xl md:text-5xl font-black mb-4 drop-shadow-lg">
            तुमच्या मालाची सुरक्षित ने-आण, आता आपल्या मंझिलसह!
          </h2>
          <p className="text-orange-400 text-lg md:text-xl font-bold uppercase tracking-widest drop-shadow-md">
            "Reliable Logistics Partner Across India"
          </p>
        </div>
      </div>

    </div>
  );
};

export default CourierServiceDetail;