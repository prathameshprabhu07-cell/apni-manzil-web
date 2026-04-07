import React from 'react';
import { 
  Clock, Calendar, Box, Snowflake, ClipboardList, ShieldCheck, 
  ArrowRight, Warehouse, CheckCircle2
} from 'lucide-react';

// ✅ WhatsApp Utility Import केली आहे
import { sendWhatsAppNotification } from '../utils/WhatsApp';

const WarehouseStorage = () => {

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन
  const handleWarehouseBooking = (serviceTitle) => {
    // कस्टमरचा डेटा (टेस्टिंगसाठी तुझा नंबर)
    const customerPhone = "7378502356"; 
    const customerName = "Warehouse Client";
    const orderId = "WH-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप मेसेज पाठवा
    sendWhatsAppNotification(customerPhone, customerName, serviceTitle, orderId);
    
    alert(`${serviceTitle} साठी तुमची चौकशी यशस्वीरित्या पाठवण्यात आली आहे!`);
  };

  const warehouseServices = [
    {
      id: 1,
      title: "Short Term Storage",
      desc: "Flexible weekly or monthly storage for temporary needs.",
      icon: <Clock size={32} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Long Term Storage",
      desc: "Secure long-term solutions for your excess inventory.",
      icon: <Calendar size={32} className="text-orange-600" />,
      color: "bg-orange-50"
    },
    {
      id: 3,
      title: "Fulfillment Warehouse",
      desc: "Complete pick, pack, and ship services for e-commerce.",
      icon: <Box size={32} className="text-green-600" />,
      color: "bg-green-50"
    },
    {
      id: 4,
      title: "Cold Storage",
      desc: "Temperature controlled storage for perishable goods.",
      icon: <Snowflake size={32} className="text-cyan-600" />,
      color: "bg-cyan-50"
    },
    {
      id: 5,
      title: "Inventory Management",
      desc: "Real-time tracking and management of your stock.",
      icon: <ClipboardList size={32} className="text-indigo-600" />,
      color: "bg-indigo-50"
    },
    {
      id: 6,
      title: "Bulk & Pallet Storage",
      desc: "Spacious areas for large items and heavy pallets.",
      icon: <Warehouse size={32} className="text-amber-600" />,
      color: "bg-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="bg-gradient-to-r from-[#002D5E] to-blue-600 text-white py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10 space-y-6">
            <p className="text-sm font-bold opacity-80 uppercase tracking-[0.3em]">Home / Warehouse & Storage</p>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">Warehouse & <br/><span className="text-orange-400">Storage</span></h1>
            <p className="text-xl font-medium opacity-90 max-w-lg">
              Secure, scalable, and smart storage solutions for businesses and individuals. 
              Modern facilities with 24/7 monitoring.
            </p>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern Warehouse" 
              className="rounded-[3rem] shadow-2xl border-8 border-white/10 relative z-10 object-cover h-80 w-full"
            />
          </div>
        </div>
      </div>

      {/* 2. SUB SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-black text-[#002D5E] uppercase tracking-wider">Select a Storage Service</h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {warehouseServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-orange-400 transition-all group flex flex-col items-center text-center space-y-4"
            >
              <div className={`${service.color} p-6 rounded-[2rem] group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800">{service.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{service.desc}</p>
              
              {/* ✅ Get Quote वर क्लिक केल्यावर नोटिफिकेशन जाईल */}
              <button 
                onClick={() => handleWarehouseBooking(service.title)}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition shadow-lg shadow-orange-100"
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROMO BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#002D5E] rounded-[4rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden text-white border-t-8 border-orange-500">
          <div className="md:w-1/3 flex justify-center">
             <div className="bg-white/10 p-10 rounded-full backdrop-blur-md">
                <ShieldCheck size={120} className="text-orange-400" />
             </div>
          </div>
          <div className="md:w-2/3 space-y-8">
            <h2 className="text-4xl font-black">Get Safe & <span className="text-orange-400">Affordable</span> Storage!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="text-orange-400" /> Safe & Secure</div>
              <div className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="text-orange-400" /> Flexible Solutions</div>
              <div className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="text-orange-400" /> Affordable Rates</div>
              <div className="flex items-center gap-3 font-bold text-lg"><CheckCircle2 className="text-orange-400" /> 24/7 Monitoring</div>
            </div>
            
            {/* ✅ Get Quote Now वर क्लिक केल्यावर नोटिफिकेशन जाईल */}
            <button 
              onClick={() => handleWarehouseBooking("General Warehouse Quote Request")}
              className="bg-orange-500 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-orange-600 transition shadow-2xl flex items-center gap-4 group"
            >
              Get Quote Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-blue-200/60 font-bold italic tracking-widest text-sm text-center md:text-left">Hassle-Free Confidence & Peace of Mind!</p>
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

export default WarehouseStorage;