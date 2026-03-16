import React from 'react';
import { Package, Truck, Bike, Home as HomeIcon, Warehouse, Globe, Zap, Bot, Star, ChevronRight, Boxes } from 'lucide-react';

const Home = () => {
  // तुझ्या ९ मुख्य कॅटेगरीजचा डेटा
  const mainServices = [
    { id: 1, name: "Courier & Parcel Delivery", icon: <Package size={32} />, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, name: "Hyperlocal / Bike Delivery", icon: <Bike size={32} />, color: "text-orange-500", bg: "bg-orange-50" },
    { id: 3, name: "Truck & Transport Booking", icon: <Truck size={32} />, color: "text-green-600", bg: "bg-green-50" },
    { id: 4, name: "Packers & Movers", icon: <HomeIcon size={32} />, color: "text-amber-700", bg: "bg-amber-50" },
    { id: 5, name: "Warehouse & Storage", icon: <Warehouse size={32} />, color: "text-slate-600", bg: "bg-slate-50" },
    { id: 6, name: "International Logistics", icon: <Globe size={32} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: 7, name: "E-commerce Logistics", icon: <Boxes size={32} />, color: "text-pink-600", bg: "bg-pink-50" },
    { id: 8, name: "Special Logistics", icon: <Star size={32} />, color: "text-cyan-600", bg: "bg-cyan-50" },
    { id: 9, name: "AI Smart Logistics", icon: <Bot size={32} />, color: "text-yellow-600", bg: "bg-yellow-50" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar (आधीचाच आहे) */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-black text-[#002D5E] flex items-center gap-2">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg">AM</span>
          Apni <span className="text-orange-500">Manzil</span>
        </div>
        <button className="bg-[#002D5E] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-blue-800 transition">Get Started</button>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-12 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#002D5E] mb-4">India’s AI Smart Logistics Platform</h1>
        <p className="text-slate-500 font-medium mb-10">One Solution for All Delivery</p>
        
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white p-3 rounded-3xl shadow-xl flex flex-col md:flex-row gap-2 border border-blue-50">
           <input type="text" placeholder="Pickup Pincode" className="flex-1 px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold text-sm" />
           <input type="text" placeholder="Delivery Pincode" className="flex-1 px-4 py-3 bg-slate-50 rounded-xl outline-none font-bold text-sm" />
           <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">Compare Services</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left: 9 Professional Cards */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-black text-[#002D5E] mb-8 border-l-4 border-orange-500 pl-4">Popular Logistics Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mainServices.map((s) => (
                <div key={s.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-orange-400 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center justify-center h-48 shadow-sm">
                  <div className={`${s.bg} ${s.color} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 text-center px-2">{s.name}</h4>
                  <div className="mt-3 text-[10px] font-black text-orange-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">Explore Categories →</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Recommendation Side Box */}
          <div className="lg:w-1/3">
            <div className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 overflow-hidden">
               <div className="flex items-center gap-3 mb-6">
                 <Bot className="text-orange-400" />
                 <h3 className="text-xl font-black">AI Smart Pick</h3>
               </div>
               <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                    <span className="text-xs opacity-70 italic">Best Price</span>
                    <span className="font-bold text-orange-400 text-xl">₹ 79</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                    <span className="text-xs opacity-70 italic">Fastest</span>
                    <span className="font-bold text-orange-400 text-xl">24 Hours</span>
                  </div>
               </div>
               <button className="w-full mt-8 bg-orange-500 text-white py-4 rounded-2xl font-black hover:bg-orange-600 transition shadow-lg">Show Best Rate</button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;