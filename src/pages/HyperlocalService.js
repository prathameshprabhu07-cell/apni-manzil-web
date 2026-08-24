import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingCart, Apple, Pill, Package, 
  CheckCircle, MapPin, BadgePercent, Smartphone
} from 'lucide-react';

// इथे तुझ्या bike-rider.png चा पाथ तुझ्या फोल्डर स्ट्रक्चरनुसार ऍड केला आहे
import bikeRiderImg from '../assets/bike-rider.png'; 

const HyperlocalService = () => {
  const navigate = useNavigate();

  // मोबाईल नंबर स्टेट
  const [mobileNumber, setMobileNumber] = useState("");

  const n8nUrl = "https://racial-expansys-shortly-plugins.trycloudflare.com/webhook/apni-manzil-hyperlocal";

  // ट्रॅकिंग फंक्शन
  const trackBooking = async (serviceName) => {
    try {
      await axios.post(n8nUrl, {
        action: "Hyperlocal_Booking_Click",
        service_name: serviceName,
        mobile_number: mobileNumber ? `+91${mobileNumber}` : "",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Tracking Error:", error);
    }
  };

  const handleLocalBooking = async (serviceName) => {
    await trackBooking(serviceName);
    navigate('/same-day-delivery');
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
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 md:py-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <p className="text-sm font-bold opacity-80 mb-2">Home / Hyperlocal / Bike Delivery</p>
            <h1 className="text-4xl md:text-6xl font-black mb-4">Hyperlocal / Bike Delivery</h1>
            <div className="bg-blue-900/30 backdrop-blur-md inline-block px-6 py-2 rounded-lg border-l-4 border-orange-500">
              <p className="text-xl font-bold">Fast Local Delivery within City</p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end relative mt-6 md:mt-0">
            <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden flex items-center justify-center">
               <img 
                 src={bikeRiderImg} 
                 alt="Bike Rider" 
                 className="w-full h-full object-contain drop-shadow-2xl"
               />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32"></div>
      </section>

      {/* 2. Services Selection (4 Cards) & Big Button Below */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 -mt-2 mb-20 relative z-20">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-black text-[#002D5E]">Select a Local Delivery Service</h2>
          <p className="text-slate-500 font-medium">Quick & Convenient Delivery Solutions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-4xl">
                {s.img}
              </div>
              <h3 className="font-black text-[#002D5E] mb-1">{s.name}</h3>
              <p className="text-xs text-slate-400 font-bold">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Big Rectangular Button Below the 4 Cards */}
        <div className="w-full">
          <button 
            onClick={() => handleLocalBooking("Book Your Hyperlocal")}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl shadow-orange-200 hover:bg-orange-600 transition cursor-pointer"
          >
            Book Your Hyperlocal
          </button>
        </div>
      </section>

      {/* DETAILED SERVICES & WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                {[
                    { title: "Food Delivery", desc: "Enjoy your favorite meals delivered fresh and hot to your doorstep. Our rapid local network ensures your food arrives quickly, maintaining quality and taste every single time." },
                    { title: "Grocery Delivery", desc: "Simplify your daily routine with our efficient grocery delivery service. We ensure your essential household items and fresh produce reach you promptly, making shopping easier than ever." },
                    { title: "Medicine Delivery", desc: "Your health is our priority. Get your essential medicines and healthcare products delivered safely and securely to your home within 24 hours, ensuring you never run out of what you need." },
                    { title: "Same City Parcel", desc: "Need to send a package across the city? Our same-city parcel service handles everything from small documents to larger items with care, offering a reliable, affordable, and convenient way to stay connected locally." }
                ].map((item, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-6">
                        <h4 className="text-lg font-black text-[#002D5E] mb-1">{item.title}</h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-[#002D5E] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-black mb-6 border-b border-white/20 pb-4">Why Choose Us?</h3>
                <ul className="space-y-6">
                    <li className="flex gap-4">
                        <CheckCircle className="text-orange-400 mt-1 flex-shrink-0" />
                        <div><strong className="block text-white">Quick & Reliable:</strong> We prioritize speed to ensure timely deliveries.</div>
                    </li>
                    <li className="flex gap-4">
                        <MapPin className="text-orange-400 mt-1 flex-shrink-0" />
                        <div><strong className="block text-white">Live Tracking:</strong> Stay updated with real-time tracking for every order.</div>
                    </li>
                    <li className="flex gap-4">
                        <BadgePercent className="text-orange-400 mt-1 flex-shrink-0" />
                        <div><strong className="block text-white">Affordable Rates:</strong> Experience premium delivery services at budget-friendly prices.</div>
                    </li>
                    <li className="flex gap-4">
                        <Smartphone className="text-orange-400 mt-1 flex-shrink-0" />
                        <div><strong className="block text-white">Easy-To-Use:</strong> Our platform is designed for a seamless and user-friendly experience.</div>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* Quick Mobile Number Input */}
      <section className="max-w-xl mx-auto px-6 mb-16">
        <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full flex items-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-300 focus-within:ring-2 ring-blue-500">
            <span className="bg-slate-200 px-4 py-3 text-slate-700 font-extrabold border-r border-slate-300 select-none text-sm">
              +91
            </span>
            <input 
              type="tel"
              maxLength="10"
              placeholder="Enter mobile number for updates"
              value={mobileNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                setMobileNumber(val);
              }}
              className="w-full p-3 bg-transparent border-none outline-none text-sm font-bold text-slate-900"
            />
          </div>
        </div>
      </section>

      {/* 3. AI Feature Bar & Book Now Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 mb-24">
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
           
           <button 
            onClick={() => handleLocalBooking("Urgent Hyperlocal Delivery")}
            className="mt-6 md:mt-0 bg-orange-500 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition transform hover:scale-105 z-10 cursor-pointer"
           >
              Book Now
           </button>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-16 -mr-16"></div>
        </div>
      </section>

      {/* 4. फायनल ब्रँडेड ट्रक इमेज सेक्शन */}
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