import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Apple, Pill, Package, 
  CheckCircle, MapPin, BadgePercent, Smartphone
} from 'lucide-react';

// ✅ WhatsApp Utility Import केली आहे
import { sendWhatsAppNotification } from '../utils/WhatsApp';

const HyperlocalService = () => {
  const navigate = useNavigate();

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन
  const handleLocalBooking = (serviceName) => {
    // युजरचा डेटा (टेस्टिंगसाठी तुझा नंबर)
    const customerPhone = "7378502356"; 
    const customerName = "Local Customer";
    const orderId = "HL-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप नोटिफिकेशन ट्रिगर करा
    sendWhatsAppNotification(customerPhone, customerName, serviceName, orderId);
    
    alert(`${serviceName} साठी तुमची स्थानिक बुकिंग विनंती यशस्वीरित्या पाठवली आहे!`);
  };

  const services = [
    { id: 1, name: "Food Delivery", desc: "Fast & Reliable", icon: <ShoppingCart className="text-orange-500" size={32} />, img: "🍔" },
    { id: 2, name: "Grocery Delivery", desc: "Fast & Reliable", icon: <Apple className="text-green-600" size={32} />, img: "🍎" },
    { id: 3, name: "Medicine Delivery", desc: "Delivery in 24 Hours", icon: <Pill className="text-blue-500" size={32} />, img: "💊" },
    { id: 4, name: "Same City Parcel", desc: "All Size Parcels", icon: <Package className="text-amber-600" size={32} />, img: "📦" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. Hero Section with Blue Shade & Rider Image */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <p className="text-sm font-bold opacity-80 mb-2">Home / Hyperlocal / Bike Delivery</p>
            <h1 className="text-4xl md:text-6xl font-black mb-4">Hyperlocal / Bike Delivery</h1>
            <div className="bg-blue-900/30 backdrop-blur-md inline-block px-6 py-2 rounded-lg border-l-4 border-orange-500">
              <p className="text-xl font-bold">Fast Local Delivery within City</p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end relative">
            <div className="w-full h-64 md:h-80 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
               <p className="text-sm opacity-50 italic">[Bike Rider Illustration Image]</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32"></div>
      </section>

      {/* 2. Services Selection (4 Boxes) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 -mt-12 mb-20 relative z-20">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-black text-[#002D5E]">Select a Local Delivery Service</h2>
          <p className="text-slate-500 font-medium">Quick & Convenient Delivery Solutions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-4xl">
                {s.img}
              </div>
              <h3 className="font-black text-[#002D5E] mb-1">{s.name}</h3>
              <p className="text-xs text-slate-400 font-bold mb-6">{s.desc}</p>
              
              {/* ✅ Explore बटनवर क्लिक केल्यावर नोटिफिकेशन जाईल */}
              <button 
                onClick={() => handleLocalBooking(s.name)}
                className="w-full bg-orange-500 text-white py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-600 transition"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI Feature Bar & Book Now Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 mb-24">
        <div className="flex flex-wrap justify-between bg-white p-4 rounded-2xl shadow-md border border-slate-100 mb-6 gap-4">
           <div className="flex items-center gap-2 font-bold text-sm text-slate-600"><CheckCircle className="text-blue-500" size={18}/> Quick & Reliable</div>
           <div className="flex items-center gap-2 font-bold text-sm text-slate-600"><MapPin className="text-blue-500" size={18}/> Live Tracking</div>
           <div className="flex items-center gap-2 font-bold text-sm text-slate-600"><BadgePercent className="text-blue-500" size={18}/> Affordable Rates</div>
           <div className="flex items-center gap-2 font-bold text-sm text-slate-600"><Smartphone className="text-blue-500" size={18}/> Easy-To-Use</div>
        </div>

        <div className="bg-gradient-to-r from-[#002D5E] to-blue-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
           <div className="flex items-center gap-6 z-10">
              <div className="hidden md:block bg-white/10 p-4 rounded-2xl">
                 <span className="text-4xl">🤖</span>
              </div>
              <div>
                 <h2 className="text-2xl md:text-3xl font-black text-white">Get <span className="text-yellow-400">Delivery</span> Within the Hour!</h2>
                 <p className="text-blue-100 font-medium mt-1 italic">Delivering <span className="text-orange-400">Anything, Anytime, Anywhere!</span></p>
              </div>
           </div>
           
           {/* ✅ Book Now वर क्लिक केल्यावर नोटिफिकेशन जाईल */}
           <button 
            onClick={() => handleLocalBooking("Urgent Hyperlocal Delivery")}
            className="mt-6 md:mt-0 bg-orange-500 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition transform hover:scale-105 z-10"
           >
             Book Now
           </button>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-16 -mr-16"></div>
        </div>
      </section>

      {/* ४. फायनल ब्रँडेड ट्रक इमेज सेक्शन */}
      <div 
        className="w-full h-[550px] flex items-start justify-center text-center pt-[60px] relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/truck-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#002D5E'
        }}
      >
        <div className="max-w-5xl px-6 relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-[950] uppercase tracking-[3px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            One Solution for All Logistics
          </h2>
        </div>
      </div>

    </div>
  );
};

export default HyperlocalService;