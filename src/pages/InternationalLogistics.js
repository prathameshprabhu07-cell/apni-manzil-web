import React from 'react';
import { 
  Globe, Plane, Ship, ArrowRightLeft, FileText, 
  MapPin, ShieldCheck, Zap, ChevronRight, 
  Facebook, Instagram, Linkedin, Phone, Mail 
} from 'lucide-react';

const InternationalLogistics = () => {
  const globalServices = [
    {
      id: 1,
      title: "International Courier",
      desc: "Fast and reliable door-to-door delivery across 190+ countries.",
      icon: <Globe size={32} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Air Cargo",
      desc: "Priority air freight for time-sensitive international shipments.",
      icon: <Plane size={32} className="text-sky-600" />,
      color: "bg-sky-50"
    },
    {
      id: 3,
      title: "Sea Freight",
      desc: "Cost-effective shipping solutions for bulk and large cargo.",
      icon: <Ship size={32} className="text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      id: 4,
      title: "Import / Export Shipping",
      desc: "End-to-end logistics support for your global business trade.",
      icon: <ArrowRightLeft size={32} className="text-orange-600" />,
      color: "bg-orange-50"
    },
    {
      id: 5,
      title: "Customs Clearance",
      desc: "Hassle-free documentation and compliance for smooth delivery.",
      icon: <FileText size={32} className="text-emerald-600" />,
      color: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. HERO SECTION (ग्लोबल लूक) */}
      <div className="bg-gradient-to-r from-[#001F3F] to-blue-800 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10 space-y-6">
            <div className="inline-block bg-orange-500/20 px-4 py-1 rounded-full border border-orange-500/30">
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest">Global Network • 190+ Countries</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              International <br/><span className="text-orange-400 text-center">Logistics</span>
            </h1>
            <p className="text-xl font-medium opacity-90 max-w-lg leading-relaxed">
              Connect your business to the world. Fastest global shipping with secure customs handling and real-time tracking.
            </p>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
            <div className="absolute -inset-10 bg-blue-400/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[4rem] border border-white/10 relative z-10">
                <Globe size={220} className="text-orange-400 animate-[spin_20s_linear_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-black text-[#002D5E] uppercase tracking-wider">Choose Global Service</h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {globalServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-orange-400 transition-all group flex flex-col items-center text-center space-y-5"
            >
              <div className={`${service.color} p-7 rounded-[2.5rem] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800">{service.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{service.desc}</p>
              <button className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition shadow-lg flex items-center justify-center gap-2 group/btn">
                Ship Now <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRUST BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#002D5E] rounded-[4rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden text-white border-b-[12px] border-orange-500">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-5xl font-black leading-tight">Fastest Cross-Border <br/><span className="text-orange-400">Shipping Solutions</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Zap size={24} className="text-orange-400" /> <span className="font-bold">Express Delivery</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <ShieldCheck size={24} className="text-orange-400" /> <span className="font-bold">Secure Customs</span>
              </div>
            </div>
            <button className="bg-white text-[#002D5E] px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-orange-500 hover:text-white transition shadow-2xl">
              Get Export Quote
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
             <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
             <img 
               src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600" 
               className="rounded-[3rem] shadow-2xl border-4 border-white/20 relative z-10 w-full h-80 object-cover" 
               alt="International Shipping"
             />
          </div>
        </div>
      </div>

      {/* --- 4. FOOTER --- */}
      <footer className="bg-[#001529] text-white pt-20 pb-10 px-6 md:px-16 border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-2xl font-black flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg text-center">AM</span>
              <span>Apni <span className="text-orange-400">Manzil</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading the way in global trade and logistics. Connecting India to every corner of the world.
            </p>
            <div className="flex gap-4">
              <div className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition cursor-pointer"><Facebook size={20}/></div>
              <div className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition cursor-pointer"><Instagram size={20}/></div>
              <div className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition cursor-pointer"><Linkedin size={20}/></div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-black border-b-2 border-orange-500 w-fit pr-4 pb-1 uppercase tracking-widest">Global Services</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-bold">
              <li className="hover:text-orange-400 transition cursor-pointer">Export Documentation</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Global Freight Forwarding</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Customs Consultancy</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-black border-b-2 border-orange-500 w-fit pr-4 pb-1 uppercase tracking-widest">Global Support</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-bold">
              <li className="hover:text-orange-400 transition cursor-pointer">Tracking Help</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Global Partners</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Regulatory Updates</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-black border-b-2 border-orange-500 w-fit pr-4 pb-1 uppercase tracking-widest">Contact Global</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li className="flex items-center gap-3"><Phone size={18} className="text-orange-500"/> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-orange-500"/> global@apnimanzil.co.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">
          <p>© 2026 Apni Manzil Global Logistics. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default InternationalLogistics;