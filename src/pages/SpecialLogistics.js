import React from 'react';
import { 
  Snowflake, Pill, GlassWater, HardHat, Flame, 
  ShieldCheck, MapPin
} from 'lucide-react';

// ✅ फिक्स: फाईल पाथ केस-सेन्सिटिव्हिटीनुसार बदलला आहे
import { sendWhatsAppNotification } from '../utils/whatsapp';

const SpecialLogistics = () => {

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन
  const handleSpecialBooking = (serviceTitle) => {
    // कस्टमरचा डेटा (टेस्टिंगसाठी तुझा नंबर)
    const customerPhone = "7378502356"; 
    const customerName = "Special Logistics Client";
    const orderId = "SPEC-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप मेसेज पाठवा
    sendWhatsAppNotification(customerPhone, customerName, serviceTitle, orderId);
    
    alert(`${serviceTitle} साठी तुमची चौकशी यशस्वीरित्या पाठवण्यात आली आहे!`);
  };

  const specialServices = [
    {
      id: 1,
      title: "Cold Chain Logistics",
      desc: "Temperature Controlled shipping for perishables.",
      icon: <Snowflake size={40} className="text-blue-500" />,
      tag: "Explore"
    },
    {
      id: 2,
      title: "Medicine Transport",
      desc: "Safe Delivery of Medicines and Vaccines.",
      icon: <Pill size={40} className="text-red-500" />,
      tag: "Explore"
    },
    {
      id: 3,
      title: "Fragile Item Shipping",
      desc: "Safe Delivery of Fragile & Delicate Goods.",
      icon: <GlassWater size={40} className="text-amber-500" />,
      tag: "Explore"
    },
    {
      id: 4,
      title: "Heavy Machinery Transport",
      desc: "Safe Transport of Heavy Equipment & Plants.",
      icon: <HardHat size={40} className="text-slate-700" />,
      tag: "Explore"
    },
    {
      id: 5,
      title: "Dangerous Goods Transport",
      desc: "Certified handling for hazardous materials.",
      icon: <Flame size={40} className="text-orange-600" />,
      tag: "Explore"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION (Blue Header) */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-left space-y-4">
               <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Home / Special Logistics</p>
               <h1 className="text-5xl md:text-6xl font-black tracking-tight">Special <span className="text-yellow-400">Logistics</span></h1>
               <p className="text-xl font-bold opacity-90">Special Handling Delivery</p>
            </div>
            <div className="hidden md:block">
               <img src="https://cdn-icons-png.flaticon.com/512/4151/4151113.png" alt="Truck" className="w-64 h-64 object-contain opacity-20" />
            </div>
         </div>
         {/* Background Curves */}
         <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-[3rem]"></div>
      </div>

      {/* 2. SERVICE SELECTION TITLE */}
      <div className="text-center py-10">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Select a Special Shipping Service Category</h2>
      </div>

      {/* 3. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialServices.map((s) => (
            <div key={s.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group text-center flex flex-col items-center">
              <div className="mb-4 p-4 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="font-black text-lg text-slate-800 mb-2">{s.title}</h3>
              <p className="text-slate-400 text-xs font-bold mb-6">{s.desc}</p>
              
              <button 
                onClick={() => handleSpecialBooking(s.title)}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition shadow-lg shadow-orange-100 cursor-pointer"
              >
                {s.tag}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION (Bottom Blue Bar) */}
      <div className="max-w-6xl mx-auto mb-20 px-4">
        <div className="bg-[#002D5E] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
            <div className="bg-white/10 p-4 rounded-full">
               <ShieldCheck size={50} className="text-orange-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2">Reliable & Secure Transportation for Sensitive Shipments!</h3>
              <p className="text-blue-100/70 font-bold uppercase tracking-widest text-xs">Request a Customized Logistics Solution Today!</p>
            </div>
          </div>
          
          <button 
            onClick={() => handleSpecialBooking("Special Handling Quote Request")}
            className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition shadow-xl mt-8 md:mt-0 relative z-10 cursor-pointer"
          >
            Get a Quote!
          </button>
        </div>
      </div>

      {/* ५. फायनल ब्रँडेड ट्रक इमेज सेक्शन */}
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

export default SpecialLogistics;