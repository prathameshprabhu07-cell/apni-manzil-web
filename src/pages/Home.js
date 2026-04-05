import React from 'react';
import { useNavigate } from 'react-router-dom';

// १. इमेजेस इम्पोर्ट करा (Path बरोबर असल्याची खात्री करा)
import HeroLogisticsImage from '../assets/global-logistics.png'; 
import TrackingAppImage from '../assets/tracking-app.png'; // <--- तुझी ट्रॅकिंग इमेज

// All icons
import { 
  Package, Truck, Bike, Home as HomeIcon, Warehouse, Globe, Zap, Bot, Star, 
  Search, HelpCircle, Box, Boxes, ChevronRight, CheckCircle, ArrowRight, MapPin 
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // १. मुख्य सर्व्हिसेस डेटा
  const mainServices = [
    { id: 1, name: "Courier & Parcel Delivery", icon: <Package size={32} />, color: "text-blue-600", bg: "bg-blue-50", isCourier: true },
    { id: 2, name: "Hyperlocal / Bike Delivery", icon: <Bike size={32} />, color: "text-orange-500", bg: "bg-orange-50", isHyperlocal: true }, 
    { id: 3, name: "Truck & Transport Booking", icon: <Truck size={32} />, color: "text-green-600", bg: "bg-green-50", isTruck: true },
    { id: 4, name: "Packers & Movers", icon: <HomeIcon size={32} />, color: "text-amber-700", bg: "bg-amber-50", isPackers: true },
    { id: 5, name: "Warehouse & Storage", icon: <Warehouse size={32} />, color: "text-slate-600", bg: "bg-slate-50", isWarehouse: true },
    { id: 6, name: "International Logistics", icon: <Globe size={32} />, color: "text-indigo-600", bg: "bg-indigo-50", isInternational: true },
    { id: 7, name: "E-commerce Logistics", icon: <Boxes size={32} />, color: "text-pink-600", bg: "bg-pink-50", isEcommerce: true },
    { id: 8, name: "Special Logistics", icon: <Star size={32} />, color: "text-cyan-600", bg: "bg-cyan-50", isSpecial: true },
    { id: 9, name: "AI Smart Logistics", icon: <Bot size={32} />, color: "text-yellow-600", bg: "bg-yellow-50", isAI: true }
  ];

  // २. इमेज स्ट्रिप डेटा
  const solutionStrip = [
    { name: 'Courier Box', img: 'https://images.unsplash.com/photo-1589710751891-b773998b5bf7?auto=format&fit=crop&q=80&w=600', desc: 'Local Delivery' },
    { name: 'Truck Transport', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=500', desc: 'Heavy Cargo' },
    { name: 'Packers Movers', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=500', desc: 'House Shifting' },
    { name: 'Warehouse', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500', desc: 'Smart Storage' },
    { name: 'International Logistics', img: 'https://img.freepik.com/free-photo/cargo-ship-sea-with-plane-flying-above_1142-42702.jpg', desc: 'Plan & Ship' },
    { name: 'AI Robotics', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500', desc: 'Auto Sorting' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HeroLogisticsImage} 
            alt="Apni Manzil Global Logistics" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#001D3D]/65 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-tight italic uppercase">
            India’s <span className="text-orange-500">AI Smart</span> <br/> Logistics Aggregator Platform
          </h1>
          <p className="text-white/80 font-bold mb-10 text-sm md:text-lg uppercase tracking-[0.4em]">One Solution for All Delivery</p>
          
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-3 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-2 border border-white/20">
              <div className="flex-1 flex items-center gap-2 px-4 py-4 bg-white rounded-2xl">
                <Search size={20} className="text-gray-400" />
                <input type="text" placeholder="Pickup Pincode" className="bg-transparent flex-1 outline-none font-bold text-sm text-slate-800" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-4 bg-white rounded-2xl">
                <Search size={20} className="text-gray-400" />
                <input type="text" placeholder="Delivery Pincode" className="bg-transparent flex-1 outline-none font-bold text-sm text-slate-800" />
              </div>
              <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition shadow-lg shadow-orange-500/40">
                Compare Services
              </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN SERVICES SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-10 w-2 bg-orange-500 rounded-full"></div>
              <h2 className="text-3xl font-black text-[#002D5E] tracking-tight">Popular Logistics Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mainServices.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => {
                    if (s.isCourier) navigate('/courier-service');
                    else if (s.isHyperlocal) navigate('/hyperlocal-service');
                    else if (s.isTruck) navigate('/truck-transport');
                    else if (s.isPackers) navigate('/packers-movers');
                    else if (s.isWarehouse) navigate('/warehouse-storage');
                    else if (s.isInternational) navigate('/international-logistics');
                    else if (s.isEcommerce) navigate('/ecommerce-logistics'); 
                    else if (s.isSpecial) navigate('/special-logistics');
                    else if (s.isAI) navigate('/ai-smart-logistics');
                  }}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-orange-400 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center justify-center h-52 relative overflow-hidden shadow-sm"
                >
                  <div className={`${s.bg} ${s.color} p-5 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {s.icon}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-800 text-center px-4 leading-snug">{s.name}</h4>
                  <div className="absolute bottom-4 flex items-center gap-1 text-[10px] font-black text-orange-500 uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-center">
                    { (s.isCourier || s.isHyperlocal || s.isTruck || s.isPackers || s.isWarehouse || s.isInternational || s.isEcommerce || s.isSpecial || s.isAI) ? "View Categories" : "Book Now"} <ChevronRight size={12}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-[#002D5E] rounded-[3rem] p-10 text-white shadow-2xl sticky top-28 overflow-hidden border-t-8 border-orange-500 text-center">
                <div className="flex items-center gap-4 mb-10 justify-center">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Bot className="text-orange-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-black leading-none text-left">AI Smart<br/><span className="text-orange-400">Logistics Pick</span></h3>
                </div>
                <div className="space-y-5 mb-10">
                   <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl flex justify-between items-center border border-white/5">
                     <div className="text-left">
                       <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Cheapest Rate</p>
                       <p className="font-bold text-lg">Delhivery</p>
                     </div>
                     <span className="font-black text-orange-400 text-2xl tracking-tighter">₹ 79</span>
                   </div>
                   <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl flex justify-between items-center border border-white/5">
                     <div className="text-left">
                       <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Fastest Time</p>
                       <p className="font-bold text-lg">DTDC Air</p>
                     </div>
                     <span className="font-black text-orange-400 text-2xl tracking-tighter">24H</span>
                   </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition shadow-xl shadow-orange-950/20">
                  Compare All Rates
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALL-IN-ONE TRACKING HUB - अपडेटेड इमेज (Sonya, change here) */}
      <section id="track" className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl border border-slate-50 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          <div className="lg:w-1/3 w-full flex justify-center">
            <div className="relative w-full max-w-[320px]">
              {/* आपण इथे इम्पोर्ट केलेली Image वापरत आहोत */}
              <img 
                src={TrackingAppImage} 
                alt="Live GPS Tracking" 
                className="w-full h-auto rounded-[3rem] shadow-2xl border-4 border-slate-900 ring-8 ring-orange-500/10"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src="https://img.freepik.com/premium-vector/tracking-delivery-service-home-with-smartphone_101884-754.jpg"
                }}
              />
            </div>
          </div>

          <div className="lg:w-2/3 space-y-10 w-full">
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full border border-orange-100">
                <Zap size={14} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Smart Tracking Engine</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] leading-tight">
                Track Your <span className="text-orange-500">Live Shipment</span>
              </h2>
              <p className="text-slate-500 text-lg font-bold max-w-xl mx-auto lg:mx-0">
                Enter your Tracking ID below to get real-time GPS location and delivery status instantly.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 bg-slate-50 p-3 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <div className="flex-1 flex items-center gap-4 px-6 py-4">
                <Search className="text-orange-500" size={24} />
                <input 
                  type="text" 
                  placeholder="Enter Tracking ID (e.g. AMZ12345)" 
                  className="bg-transparent w-full outline-none font-black text-slate-700 placeholder:text-slate-300 text-lg" 
                />
              </div>
              <button className="bg-[#002D5E] text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all shadow-xl flex items-center justify-center gap-3 group">
                Track Shipment <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNER SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#002D5E] to-blue-800 rounded-[3.5rem] p-1 md:p-2 shadow-2xl border border-blue-400/20">
          <div className="bg-white/5 backdrop-blur-md rounded-[3.3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Become a <span className="text-orange-400">Logistics Partner</span>
              </h2>
              <p className="text-blue-100 text-lg font-medium italic opacity-90">"Road, Rail, Air or Sea - We deliver everywhere. Join our network today!"</p>
              <button 
                onClick={() => navigate('/partner-registration')}
                className="bg-orange-500 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition shadow-2xl flex items-center gap-3 mx-auto md:mx-0 group"
              >
                Join as Partner <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" alt="Partner" className="rounded-[2.5rem] shadow-2xl border-4 border-white/10 object-cover h-80 w-full hover:scale-105 transition-transform duration-500"/>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ONE SOLUTION STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white mt-12 rounded-[3.5rem] shadow-sm border border-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] uppercase italic tracking-tighter">One Solution for All Deliveries</h2>
          <div className="w-24 h-2 bg-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4">
          {solutionStrip.map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-2 border-white group-hover:border-orange-500 group-hover:-translate-y-4">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D5E]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">{item.desc}</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="font-black text-sm uppercase tracking-tighter text-[#002D5E] group-hover:text-orange-500 transition-colors">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PREMIUM BENEFITS SECTION */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-24 bg-white mt-16 rounded-[4rem] shadow-sm border border-slate-50">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.5em] mb-4">The Gold Standard</h2>
            <h3 className="text-5xl md:text-6xl font-black text-[#002D5E] tracking-tight leading-[0.95]">Why Businesses <br /><span className="text-slate-300">Trust Apni Manzil.</span></h3>
          </div>
          <div className="lg:text-right">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-2">Efficiency. Security. Scale.</p>
            <div className="h-1.5 w-20 bg-orange-500 lg:ml-auto rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Unified Logistics", desc: "A single powerhouse for Couriers, Packers & Movers, and Heavy Transport.", icon: <Boxes size={24} />, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500" },
            { title: "Verified Network", desc: "Elite tie-ups with certified logistics partners.", icon: <CheckCircle size={24} />, img: "https://images.unsplash.com/photo-1521791136064-7986c295955c?auto=format&fit=crop&q=80&w=500" },
            { title: "Doorstep Service", desc: "Seamless doorstep collection and delivery.", icon: <HomeIcon size={24} />, img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=500" },
            { title: "Precision Tracking", desc: "Real-time visibility of every shipment.", icon: <Search size={24} />, img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=500" },
            { title: "Secure Delivery", desc: "Safe and guaranteed delivery protocols.", icon: <Zap size={24} />, img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=500" },
            { title: "Affordable Pricing", desc: "Institutional-grade pricing that beats market rates.", icon: <Zap size={24} />, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500" },
            { title: "Global Reach", desc: "Covering Domestic and International borders.", icon: <Globe size={24} />, img: "https://images.unsplash.com/photo-1436491865332-7a61a109c055?auto=format&fit=crop&q=80&w=500" },
            { title: "24/7 Support", desc: "Dedicated support desk for assistance.", icon: <HelpCircle size={24} />, img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500" }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden mb-6 shadow-lg border-2 border-transparent group-hover:border-orange-500 transition-all duration-500">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D5E] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-[#002D5E] shadow-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">{item.icon}</div>
              </div>
              <div className="px-2">
                <h4 className="text-lg font-black text-[#002D5E] uppercase tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h4>
                <p className="text-slate-400 font-bold text-xs leading-relaxed uppercase tracking-wide">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL BRANDING TRUCK SECTION */}
      <section className="w-full mt-20 mb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-white group">
            <img 
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200" 
              alt="Apni Manzil Logistics Truck" 
              className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002D5E]/60 to-transparent flex items-center px-12">
              <div className="max-w-xl text-white">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-4">
                  APNI <span className="text-orange-500">MANZIL</span>
                </h2>
                <p className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] opacity-90">
                  One Solution for All Deliveries
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 mb-20">
            <h2 className="text-3xl font-black text-[#002D5E] uppercase tracking-tighter">
              APNI <span className="text-orange-500">MANZIL</span> LOGISTICS
            </h2>
            <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs mt-6">
              Reliable • Fast • Smart
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;