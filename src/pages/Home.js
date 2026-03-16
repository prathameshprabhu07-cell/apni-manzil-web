import React from 'react';
import { Search, MapPin, Package, Truck, Bike, Home, Warehouse, Globe, Zap, Bot, Star } from 'lucide-react';

const SmartMarketplace = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 shadow-sm">
        <div className="text-2xl font-bold text-blue-900">Apni <span className="text-orange-500">Manzil</span></div>
        <div className="space-x-8 font-medium text-gray-600">
          <a href="#services">Services</a>
          <a href="#track">Track Shipment</a>
          <a href="#partner">Logistics Partner</a>
        </div>
        <button className="bg-blue-900 text-white px-6 py-2 rounded-full font-bold">Login / Sign Up</button>
      </nav>

      {/* 2. Hero Section - AI Search */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-10 text-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">India’s AI Smart Logistics Platform</h1>
        <p className="text-xl text-gray-600 mb-10">One Solution for All Delivery</p>
        
        {/* Smart Search Bar */}
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl flex gap-4 items-center border border-orange-100">
          <div className="flex-1 flex items-center gap-2 border-r pr-4">
            <MapPin className="text-orange-500" />
            <input placeholder="Pickup Location" className="w-full outline-none" />
          </div>
          <div className="flex-1 flex items-center gap-2 border-r pr-4">
            <MapPin className="text-blue-500" />
            <input placeholder="Delivery Location" className="w-full outline-none" />
          </div>
          <div className="flex-1">
            <select className="w-full outline-none bg-transparent">
              <option>Select Weight (kg)</option>
              <option>0.5kg - 2kg</option>
              <option>2kg - 10kg</option>
            </select>
          </div>
          <button className="bg-orange-500 text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-600 transition">
            Compare Services
          </button>
        </div>
      </section>

      {/* 3. The 9 AI-Powered Services Grid */}
      <section className="py-20 px-10 max-w-7xl mx-auto" id="services">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 border-l-8 border-orange-500 pl-4">Popular Logistics Services</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Grid - 9 Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Domestic Courier", icon: <Package />, color: "bg-blue-50" },
              { name: "Express Courier", icon: <Zap />, color: "bg-orange-50" },
              { name: "Same Day Delivery", icon: <Truck />, color: "bg-green-50" },
              { name: "Bike Delivery", icon: <Bike />, color: "bg-red-50" },
              { name: "Packers & Movers", icon: <Home />, color: "bg-amber-50" },
              { name: "Warehouse", icon: <Warehouse />, color: "bg-slate-50" },
              { name: "International", icon: <Globe />, color: "bg-indigo-50" },
              { name: "Special Logistics", icon: <Star />, color: "bg-cyan-50" },
              { name: "AI Smart Selection", icon: <Bot />, color: "bg-yellow-50" },
            ].map((s, i) => (
              <div key={i} className={`${s.color} p-8 rounded-3xl hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-orange-200 group text-center`}>
                <div className="flex justify-center mb-4 text-gray-700 group-hover:scale-110 transition-transform">
                  {React.cloneElement(s.icon, { size: 40 })}
                </div>
                <h4 className="font-bold text-gray-800">{s.name}</h4>
                <p className="text-[10px] mt-2 text-gray-500 uppercase font-bold tracking-widest">Book Now</p>
              </div>
            ))}
          </div>

          {/* 4. AI Recommendation Panel (Side Box) */}
          <div className="bg-blue-900 rounded-[40px] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Bot className="text-orange-400" size={30} />
                <h3 className="text-xl font-bold">AI Smart Recommendation</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                  <p className="text-sm opacity-70">Cheapest Delivery</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-lg">Delhivery</span>
                    <span className="text-orange-400 font-bold text-xl">₹ 79</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                  <p className="text-sm opacity-70">Fastest Delivery</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-lg">DTDC Air</span>
                    <span className="text-orange-400 font-bold text-xl">1 Day</span>
                  </div>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                  <p className="text-sm opacity-70">Best Value Delivery</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-lg">BlueDart</span>
                    <span className="text-orange-400 font-bold text-xl">₹ 85</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-orange-500 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-orange-900/50">
                Book Recommended
              </button>
            </div>
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-10">
                <Bot size={200} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartMarketplace;