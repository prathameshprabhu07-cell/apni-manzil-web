import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building2, Sofa, Truck, ShieldCheck, Clock, BadgeIndianRupee, ArrowRight } from 'lucide-react';

const PackersAndMovers = () => {
  const navigate = useNavigate();

  const services = [
    { id: 1, title: "House Shifting", desc: "Home Relocation", icon: <Home className="text-blue-600" size={32} /> },
    { id: 2, title: "Office Shifting", desc: "Office Relocation", icon: <Building2 className="text-orange-600" size={32} /> },
    { id: 3, title: "Furniture Moving", desc: "Heavy Item Moving", icon: <Sofa className="text-blue-500" size={32} /> },
    { id: 4, title: "Vehicle Transport", desc: "Car & Bike Moving", icon: <Truck className="text-indigo-600" size={32} /> },
    { id: 5, title: "Storage with Movers", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
    { id: 6, title: "Storage with Movers", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">Home / Truck & Movers</p>
            <h1 className="text-5xl font-black mb-4">Packers & Movers</h1>
            <p className="text-xl font-medium opacity-90 italic">Reliable Relocation Services for Your Home or Office</p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
             <img src="https://images.unsplash.com/photo-1600518464441-9154a4dba246?auto=format&fit=crop&q=80&w=800" 
                  alt="Relocation" className="rounded-2xl shadow-2xl border-4 border-white/20" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-slate-800 text-center mb-12 uppercase tracking-wide">Select a Relocation Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-800">{s.title}</h3>
              <p className="text-sm text-slate-500 mb-6">{s.desc}</p>
              <button className="w-full bg-orange-500 text-white py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition">
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-blue-700 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-2xl text-white">
          <div className="md:w-1/3">
             <img src="https://images.unsplash.com/photo-1549194388-2469d59ec75c?auto=format&fit=crop&q=80&w=400" 
                  alt="Worker" className="rounded-3xl shadow-lg" />
          </div>
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl font-black">Get Your Free Moving Quote!</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 font-bold"><ShieldCheck className="text-orange-400"/> Professional Service</div>
              <div className="flex items-center gap-3 font-bold"><Clock className="text-orange-400"/> Safe & Secure</div>
              <div className="flex items-center gap-3 font-bold"><BadgeIndianRupee className="text-orange-400"/> Affordable Pricing</div>
            </div>
            <p className="text-blue-100 italic">Hassle-Free Moving Experience Guaranteed!</p>
            <button className="bg-orange-500 px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition flex items-center gap-3 group">
              Get Quote Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackersAndMovers;