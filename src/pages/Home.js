import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Truck, Bike, Home as HomeIcon, Warehouse, Globe, Zap, Bot, Star, 
  Search, HelpCircle, Box, Boxes, ChevronRight, CheckCircle, ArrowRight,
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin 
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const mainServices = [
    { id: 1, name: "Courier & Parcel Delivery", icon: <Package size={32} />, color: "text-blue-600", bg: "bg-blue-50", isCourier: true },
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
      
      {/* 1. PROFESSIONAL NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-black text-[#002D5E] flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg">AM</span>
          <div className="flex flex-col leading-none">
            <span>Apni <span className="text-orange-500">Manzil</span></span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">One Solution for All</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <a href="#services" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition flex items-center gap-1">
            <Box size={16}/> Services
          </a>
          <a href="#track" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition flex items-center gap-1">
            <Search size={16}/> Track Shipment
          </a>
          <a href="/partner-registration" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition flex items-center gap-1">
            <Globe size={16}/> Logistics Partner
          </a>
          <a href="/help" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition flex items-center gap-1">
            <HelpCircle size={16}/> Help
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:block text-sm font-bold text-[#002D5E] px-4 py-2">Login</button>
          <button className="bg-[#002D5E] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-blue-800 transition transform hover:scale-105 active:scale-95">
            Sign Up
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-16 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-[#002D5E] mb-6 tracking-tight leading-tight">
          India’s <span className="text-orange-500 text-center">AI Smart</span> Logistics Platform
        </h1>
        <p className="text-slate-500 font-bold mb-12 text-lg uppercase tracking-[0.3em]">One Solution for All Delivery</p>
        
        <div className="max-w-5xl mx-auto bg-white p-3 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-2 border border-blue-50">
           <div className="flex-1 flex items-center gap-2 px-4 py-4 bg-slate-50 rounded-2xl">
             <Search size={20} className="text-gray-400" />
             <input type="text" placeholder="Pickup Pincode" className="bg-transparent flex-1 outline-none font-bold text-sm" />
           </div>
           <div className="flex-1 flex items-center gap-2 px-4 py-4 bg-slate-50 rounded-2xl">
             <Search size={20} className="text-gray-400" />
             <input type="text" placeholder="Delivery Pincode" className="bg-transparent flex-1 outline-none font-bold text-sm" />
           </div>
           <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition shadow-lg shadow-orange-200">
             Compare Services
           </button>
        </div>
      </section>

      {/* 3. MAIN SERVICES SECTION */}
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
                  onClick={() => s.isCourier ? navigate('/courier-service') : null}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-orange-400 hover:shadow-2xl transition-all cursor-pointer group flex flex-col items-center justify-center h-52 relative overflow-hidden shadow-sm"
                >
                  <div className={`${s.bg} ${s.color} p-5 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {s.icon}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-800 text-center px-4 leading-snug">{s.name}</h4>
                  <div className="absolute bottom-4 flex items-center gap-1 text-[10px] font-black text-orange-500 uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-center">
                    {s.isCourier ? "View Categories" : "Book Now"} <ChevronRight size={12}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-[#002D5E] rounded-[3rem] p-10 text-white shadow-2xl sticky top-28 overflow-hidden border-t-8 border-orange-500">
               <div className="flex items-center gap-4 mb-10">
                 <div className="bg-white/10 p-3 rounded-2xl text-center">
                   <Bot className="text-orange-400 text-center" size={32} />
                 </div>
                 <h3 className="text-2xl font-black leading-none">AI Smart<br/><span className="text-orange-400">Logistics Pick</span></h3>
               </div>
               
               <div className="space-y-5 mb-10 text-center">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl flex justify-between items-center border border-white/5">
                    <div className='text-center'>
                      <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-center">Cheapest Rate</p>
                      <p className="font-bold text-lg text-center">Delhivery</p>
                    </div>
                    <span className="font-black text-orange-400 text-2xl tracking-tighter text-center">₹ 79</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl flex justify-between items-center border border-white/5">
                    <div className='text-center'>
                      <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest text-center">Fastest Time</p>
                      <p className="font-bold text-lg text-center">DTDC Air</p>
                    </div>
                    <span className="font-black text-orange-400 text-2xl tracking-tighter text-right text-center">24H</span>
                  </div>
               </div>
               <button className="w-full bg-orange-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition shadow-xl shadow-orange-950/20 text-center">
                 Compare All Rates
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- BECOME A LOGISTICS PARTNER --- */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#002D5E] to-blue-800 rounded-[3.5rem] p-1 md:p-2 shadow-2xl border border-blue-400/20">
          <div className="bg-white/5 backdrop-blur-md rounded-[3.3rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Become a <span className="text-orange-400">Logistics Partner</span>
              </h2>
              <p className="text-blue-100 text-lg font-medium italic opacity-90">
                "Road, Rail, Air or Sea - We deliver everywhere. Join our network today!"
              </p>
              <button className="bg-orange-500 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition shadow-2xl flex items-center gap-3 mx-auto md:mx-0 group">
                Join as Partner <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
                alt="Comprehensive Logistics Network" 
                className="rounded-[2.5rem] shadow-2xl border-4 border-white/10 object-cover h-80 w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- TRACK YOUR SHIPMENT --- */}
      <section id="track" className="max-w-7xl mx-auto px-6 py-20 mb-20">
        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl border border-slate-50 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8 w-full text-center">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-10 w-2 bg-[#002D5E] rounded-full"></div>
              <h3 className="text-3xl font-black text-[#002D5E]">Track Your Shipment</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-4 bg-slate-50 border border-slate-100 px-8 py-6 rounded-[2rem] focus-within:border-orange-400 transition-all shadow-inner">
                <Search className="text-slate-400" size={24} />
                <input type="text" placeholder="Enter Tracking ID (e.g. AM2026XXX)" className="bg-transparent w-full outline-none font-bold text-slate-700" />
              </div>
              <button className="bg-[#002D5E] text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-900 transition shadow-lg">
                Track Status
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Booked', 'Picked Up', 'In Transit', 'Delivered'].map((step, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${idx === 0 ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-100 opacity-40'} flex flex-col items-center gap-2`}>
                    <CheckCircle size={18} className={idx === 0 ? 'text-orange-500' : 'text-slate-400'} />
                    <span className="text-[10px] font-black uppercase tracking-tighter">{step}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="lg:w-1/3 grid grid-cols-2 gap-4 w-full">
             <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 text-center space-y-2 shadow-sm">
                <p className="text-4xl font-black text-[#002D5E]">10k+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipments</p>
             </div>
             <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 text-center space-y-2 shadow-sm">
                <p className="text-4xl font-black text-[#002D5E]">500+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partners</p>
             </div>
             <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border border-orange-100 text-center space-y-2 col-span-2 shadow-sm">
                <p className="text-4xl font-black text-orange-500 text-center">100+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Cities Covered</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#002D5E] text-white pt-20 pb-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-2xl font-black flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg">AM</span>
              <span>Apni <span className="text-orange-500">Manzil</span></span>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed">
              India's leading AI-powered logistics platform. One solution for all your delivery needs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-orange-500 transition"><Facebook size={18}/></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-orange-500 transition"><Instagram size={18}/></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-orange-500 transition"><Linkedin size={18}/></a>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1">Quick Links</h4>
            <ul className="space-y-3 text-blue-100/60 text-sm">
              <li><a href="#services" className="hover:text-orange-400 transition">Our Services</a></li>
              <li><a href="#track" className="hover:text-orange-400 transition">Track Shipment</a></li>
              <li><a href="/partner-registration" className="hover:text-orange-400 transition">Become a Partner</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1">Support</h4>
            <ul className="space-y-3 text-blue-100/60 text-sm">
              <li><a href="/help" className="hover:text-orange-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1">Contact Us</h4>
            <ul className="space-y-4 text-blue-100/60 text-sm">
              <li className="flex items-center gap-3"><Phone size={18} className="text-orange-500"/> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-orange-500"/> support@apnimanzil.co.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs font-bold text-blue-100/40 uppercase tracking-widest">
          <p>© 2026 Apni Manzil. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;