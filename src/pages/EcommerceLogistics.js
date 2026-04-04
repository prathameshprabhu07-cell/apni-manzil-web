import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PackageCheck, ShoppingCart, Banknote, RefreshCcw, Box, 
  ChevronRight, CheckCircle, MapPin, ArrowRight
} from 'lucide-react';

const EcommerceLogistics = () => {
  const navigate = useNavigate();

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
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition shadow-xl">
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
              <button className="w-full bg-slate-50 group-hover:bg-orange-500 group-hover:text-white text-slate-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2">
                Explore More <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Call to Action Banner */}
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
               <button className="bg-white text-[#002D5E] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition shadow-xl">
                 Get Started
               </button>
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

export default EcommerceLogistics;