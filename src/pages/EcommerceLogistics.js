import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  PackageCheck, ShoppingCart, Banknote, RefreshCcw, Box, 
  ChevronRight, CheckCircle, MapPin, ArrowRight, Phone
} from 'lucide-react';

// ✅ फिक्स: फाईल पाथ केस-सेन्सिटिव्हिटीनुसार बदलला आहे
import { sendWhatsAppNotification } from '../utils/whatsapp';

const EcommerceLogistics = () => {
  const navigate = useNavigate();
  const [customerPhone, setCustomerPhone] = useState('');

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन (n8n URL अपडेट केली आहे)
  const handleEcommerceQuery = (serviceTitle) => {
    // मोबाईल नंबर व्हॅलिडेट करा
    if (!customerPhone || customerPhone.length < 10) {
      alert("कृपया चौकशी करण्यापूर्वी १० अंकी वैध मोबाईल नंबर भरा!");
      return;
    }

    // युजरचा डेटा
    const customerName = "E-com Vendor";
    const orderId = "EC-" + Math.floor(Math.random() * 100000);
    const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

    // १. व्हॉट्सॲप नोटिफिकेशन ट्रिगर करा
    sendWhatsAppNotification(customerPhone, customerName, serviceTitle, orderId);
    
    // २. n8n ला डेटा पाठवा
    axios.post(n8nUrl, {
      service: serviceTitle,
      customerName: customerName,
      phone: customerPhone,
      orderId: orderId,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      alert(`${serviceTitle} साठी तुमची चौकशी यशस्वीरित्या पाठवली आहे!`);
    })
    .catch((error) => {
      console.error("Error sending to n8n:", error);
      alert("चौकशी पाठवताना एरर आला, पण नोटिफिकेशन पाठवले आहे.");
    });
  };

  const ecommerceServices = [
    {
      id: 1,
      title: "Order Fulfillment",
      desc: "Complete responsibility from order picking to packing and shipping.",
      icon: <PackageCheck size={32} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Marketplace Shipping",
      desc: "Easy integration with Amazon, Flipkart, and Shopify stores.",
      icon: <ShoppingCart size={32} className="text-sky-600" />,
      color: "bg-sky-50"
    },
    {
      id: 3,
      title: "COD Shipping",
      desc: "Fast Cash on Delivery payment facility for your business.",
      icon: <Banknote size={32} className="text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      id: 4,
      title: "Returns Management",
      desc: "Simple management of RTO and reverse logistics.",
      icon: <RefreshCcw size={32} className="text-orange-600" />,
      color: "bg-orange-50"
    },
    {
      id: 5,
      title: "Inventory Handling",
      desc: "Smart stock tracking and inventory management system.",
      icon: <Box size={32} className="text-indigo-600" />,
      color: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-[#002D5E] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-black leading-tight">
              E-commerce <span className="text-orange-400">Logistics</span>
            </h1>
            <p className="text-xl opacity-90 font-medium max-w-lg mx-auto md:mx-0">
              Grow your online business with India's most reliable fulfillment network.
            </p>

            {/* Mobile Number Box with +91 Prefix */}
            <div className="max-w-md mx-auto md:mx-0 bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
              <label className="block text-xs font-bold text-orange-300 uppercase mb-2 tracking-wider text-left pl-1">
                तुमचा मोबाईल नंबर टाका
              </label>
              <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg">
                <span className="bg-slate-100 px-4 py-3 text-slate-700 font-bold border-r border-slate-200 select-none">
                  +91
                </span>
                <input 
                  type="tel"
                  maxLength="10"
                  value={customerPhone}
                  placeholder="मोबाईल नंबर (उदा. 7378502356)"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setCustomerPhone(val);
                  }}
                  className="w-full p-3 text-slate-900 font-bold outline-none border-none text-base"
                />
              </div>
            </div>

            <button 
              onClick={() => handleEcommerceQuery("Full E-commerce Setup")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition shadow-xl cursor-pointer"
            >
              Start Shipping Now
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
             <div className="relative">
                <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                <ShoppingCart size={180} className="text-white relative z-10" />
             </div>
          </div>
        </div>
      </div>

      {/* 2. Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest">Select an E-commerce Service</h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecommerceServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col items-center text-center"
            >
              <div className={`${service.color} p-6 rounded-3xl mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                {service.desc}
              </p>
              <button 
                onClick={() => handleEcommerceQuery(service.title)}
                className="w-full bg-slate-50 group-hover:bg-orange-500 group-hover:text-white text-slate-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore More <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Detailed Information Section */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-12">
          {[
            { title: "Order Fulfillment", desc: "Complete responsibility from order picking to packing and shipping. We handle your entire fulfillment process with care, ensuring every package is meticulously prepared and dispatched to your customers quickly and accurately." },
            { title: "Marketplace Shipping", desc: "Easy integration with Amazon, Flipkart, and Shopify stores. Seamlessly connect your online storefronts with our logistics platform to automate shipping, streamline order management, and provide reliable delivery across all your sales channels." },
            { title: "COD Shipping", desc: "Fast Cash on Delivery payment facility for your business. Enhance your customer experience and boost your sales with our secure and rapid COD processing, ensuring your cash flow remains consistent and hassle-free." },
            { title: "Returns Management", desc: "Simple management of RTO and reverse logistics. We turn the challenge of returns into a streamlined process, efficiently handling pickups and processing reverse logistics so you can focus on growing your business." },
            { title: "Inventory Handling", desc: "Smart stock tracking and inventory management system. Gain full control and visibility over your stock with our intelligent tracking solutions, helping you optimize inventory levels and prevent stockouts in real-time." }
          ].map((item, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-6 hover:bg-slate-50 p-4 transition-all rounded-r-2xl">
              <h4 className="text-xl font-black text-slate-800 mb-2">{item.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Call to Action Banner */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
            <div className="md:w-2/3 space-y-6 text-white text-center md:text-left">
               <h2 className="text-4xl font-black leading-tight">Boost Your Online Sales with Our <span className="text-orange-400">Logistics Solutions!</span></h2>
               <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2"><CheckCircle size={20} className="text-orange-400"/> <span className="font-bold">Lowest Rates</span></div>
                  <div className="flex items-center gap-2"><CheckCircle size={20} className="text-orange-400"/> <span className="font-bold">Fast Delivery</span></div>
               </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
               <button 
                onClick={() => handleEcommerceQuery("E-com Business Growth")}
                className="bg-white text-[#002D5E] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition shadow-xl cursor-pointer"
               >
                  Get Started
               </button>
            </div>
        </div>
      </div>

      {/* 5. Final branded section */}
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

export default EcommerceLogistics;