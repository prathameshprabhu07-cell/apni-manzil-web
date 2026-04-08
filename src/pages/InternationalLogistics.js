import React from 'react';
import { 
  Globe, Plane, Ship, ArrowRightLeft, FileText, 
  ShieldCheck, Zap, ChevronRight 
} from 'lucide-react';

// ✅ फिक्स: फाईल पाथ केस-सेन्सिटिव्हिटीनुसार बदलला आहे
import { sendWhatsAppNotification } from '../utils/whatsapp';

const InternationalLogistics = () => {

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन
  const handleGlobalBooking = (serviceTitle) => {
    // कस्टमरचा डेटा (सध्या तुझा नंबर टेस्टिंगसाठी)
    const customerPhone = "7378502356"; 
    const customerName = "Global Client";
    const orderId = "INT-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप मेसेज पाठवा
    sendWhatsAppNotification(customerPhone, customerName, serviceTitle, orderId);
    
    alert(`${serviceTitle} साठी तुमची चौकशी व्हॉट्सॲपवर पाठवण्यात आली आहे!`);
  };

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
      
      {/* 1. HERO SECTION */}
      <div className="bg-gradient-to-r from-[#001F3F] to-blue-800 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10 space-y-6">
            <div className="inline-block bg-orange-500/20 px-4 py-1 rounded-full border border-orange-500/30">
                <p className="text-xs font-black text-orange-400 uppercase tracking-widest">Global Network • 190+ Countries</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              International <br/><span className="text-orange-400">Logistics</span>
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
              
              <button 
                onClick={() => handleGlobalBooking(service.title)}
                className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition shadow-lg flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
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
            
            <button 
              onClick={() => handleGlobalBooking("International Export Quote")}
              className="bg-white text-[#002D5E] px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-orange-500 hover:text-white transition shadow-2xl cursor-pointer"
            >
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

      {/* ४. फायनल ब्रँडेड ट्रक इमेज सेक्शन */}
      <div 
        className="w-full h-[550px] flex items-start justify-center text-center pt-[60px] relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/truck-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#002D5E'
        }}
      >
        <div className="max-w-5xl px-6 relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-[950] uppercase tracking-[3px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
            One Solution for All Logistics
          </h2>
        </div>
      </div>

    </div>
  );
};

export default InternationalLogistics;