import React from 'react';
import { Package, Truck, Bike, Home as HomeIcon, Warehouse, Globe, Zap, Bot, Star, Search, MapPin, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Modern Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-black text-[#002D5E] flex items-center gap-2">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic">AM</span>
          Apni <span className="text-orange-500">Manzil</span>
        </div>
        <div className="hidden lg:flex gap-10 font-bold text-slate-600 uppercase text-xs tracking-widest">
          <a href="#" className="hover:text-orange-500 transition">Services</a>
          <a href="#" className="hover:text-orange-500 transition">Tracking</a>
          <a href="#" className="hover:text-orange-500 transition">Partners</a>
        </div>
        <div className="flex gap-4">
          <button className="hidden md:block font-bold text-[#002D5E]">Login</button>
          <button className="bg-[#002D5E] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-blue-800 transition">Sign Up</button>
        </div>
      </nav>

      {/* 2. Hero & Search Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-slate-50 pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#002D5E] mb-6 leading-tight">
            India’s <span className="text-orange-500">AI Smart</span> Logistics Platform
          </h1>
          <p className="text-lg text-slate-600 mb-12 font-medium">One Solution for All Delivery • Simple • Fast • Reliable</p>

          {/* Floating Search Box */}
          <div className="max-w-5xl mx-auto bg-white p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 border border-blue-100">
            <div className="flex-1 flex items-center gap-3 px-4 py-4 bg-slate-50 rounded-2xl">
              <MapPin className="text-orange-500" size={20} />
              <input type="text" placeholder="Pickup Pincode" className="bg-transparent w-full outline-none font-bold text-sm" />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-4 bg-slate-50 rounded-2xl">
              <MapPin className="text-blue-500" size={20} />
              <input type="text" placeholder="Delivery Pincode" className="bg-transparent w-full outline-none font-bold text-sm" />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-4 bg-slate-50 rounded-2xl">
              <Package className="text-slate-400" size={20} />
              <select className="bg-transparent w-full outline-none font-bold text-sm text-slate-500">
                <option>Select Weight (kg)</option>
                <option>Up to 2kg</option>
                <option>2kg to 10kg</option>
                <option>10kg+</option>
              </select>
            </div>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-orange-600 transition flex items-center justify-center gap-2">
              Compare <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main Services & AI Recommendation */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: 9 Service Cards */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-black text-[#002D5E] mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
              Popular Logistics Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { name: "Domestic Courier", icon: <Package size={32} />, color: "text-blue-600", bg: "bg-blue-50" },
                { name: "Express Courier", icon: <Zap size={32} />, color: "text-orange-500", bg: "bg-orange-50" },
                { name: "Same Day", icon: <Truck size={32} />, color: "text-green-600", bg: "bg-green-50" },
                { name: "Bike Delivery", icon: <Bike size={32} />, color: "text-red-500", bg: "bg-red-50" },
                { name: "Packers & Movers", icon: <HomeIcon size={32} />, color: "text-amber-700", bg: "bg-amber-50" },
                { name: "Warehouse", icon: <Warehouse size={32} />, color: "text-slate-600", bg: "bg-slate-50" },
                { name: "International", icon: <Globe size={32} />, color: "text-indigo-600", bg: "bg-indigo-50" },
                { name: "Special Goods", icon: <Star size={32} />, color: "text-cyan-600", bg: "bg-cyan-50" },
                { name: "AI Smart Hub", icon: <Bot size={32} />, color: "text-yellow-600", bg: "bg-yellow-50" }
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-orange-300 transition-all hover:shadow-xl cursor-pointer group text-center">
                  <div className={`${s.bg} ${s.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <h4 className="font-bold text-sm text-slate-700">{s.name}</h4>
                  <p className="text-[10px] mt-2 font-black text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase">Book Now</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Recommendation Box */}
          <div className="lg:w-1/3">
            <div className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-orange-500 p-2 rounded-xl">
                    <Bot size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">AI Smart Recommendation</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase opacity-60">Cheapest Option</p>
                      <p className="font-bold text-lg">Delhivery Surface</p>
                    </div>
                    <div className="text-orange-400 font-black text-2xl">₹79</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase opacity-60">Fastest Option</p>
                      <p className="font-bold text-lg">DTDC Air Express</p>
                    </div>
                    <div className="text-orange-400 font-black text-2xl tracking-tighter text-right">1 Day</div>
                  </div>
                </div>

                <button className="w-full mt-10 bg-orange-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition shadow-lg shadow-orange-950/20">
                  Compare All Rates
                </button>
              </div>
              
              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500 rounded-full opacity-10"></div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;