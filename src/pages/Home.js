import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Truck, Bike, Home as HomeIcon, Warehouse, Globe, Zap, Bot, Star, 
  Search, HelpCircle, Box, Boxes, ChevronRight, CheckCircle, ArrowRight
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

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

  // --- Large Real Color Images Data ---
  const solutionStrip = [
    { 
      name: 'Courier Box', 
      img: 'https://images.unsplash.com/photo-1589710751891-b773998b5bf7?auto=format&fit=crop&q=80&w=600', 
      desc: 'Local Delivery' 
    },
    { 
      name: 'Truck Transport', 
      img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=500', 
      desc: 'Heavy Cargo' 
    },
    { 
      name: 'Packers Movers', 
      img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=500', 
      desc: 'House Shifting' 
    },
    { 
      name: 'Warehouse', 
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500', 
      desc: 'Smart Storage' 
    },
    { 
      // --- Updated: ५ व्या क्रमांकावर Ship आणि Plane चा Combo Image ---
      name: 'International Logistics', 
      img: 'https://img.freepik.com/free-photo/cargo-ship-sea-with-plane-flying-above_1142-42702.jpg', 
      desc: 'Plan & Ship' 
    },
    { 
      name: 'AI Robotics', 
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500', 
      desc: 'Auto Sorting' 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-50 to-slate-50 pt-16 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-[#002D5E] mb-6 tracking-tight leading-tight">
          India’s <span className="text-orange-500">AI Smart</span> Logistics Platform
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

      {/* 3. PARTNER SECTION */}
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
              <button 
                onClick={() => navigate('/partner-registration')}
                className="bg-orange-500 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition shadow-2xl flex items-center gap-3 mx-auto md:mx-0 group"
              >
                Join as Partner <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
                alt="Logistics Network" 
                className="rounded-[2.5rem] shadow-2xl border-4 border-white/10 object-cover h-80 w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: LARGE COLOR IMAGES STRIP (5th image updated) --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white mt-12 rounded-[3.5rem] shadow-sm border border-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#002D5E] uppercase italic tracking-tighter">
            One Solution for All Deliveries
          </h2>
          <div className="w-24 h-2 bg-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4">
          {solutionStrip.map((item, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="relative w-full aspect-square overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500 border-2 border-white group-hover:border-orange-500 group-hover:-translate-y-4">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D5E]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">{item.desc}</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="font-black text-sm uppercase tracking-tighter text-[#002D5E] group-hover:text-orange-500 transition-colors">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRACKING SECTION */}
      <section id="track" className="max-w-7xl mx-auto px-6 py-20 mb-20">
        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-2xl border border-slate-50 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8 w-full">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-10 w-2 bg-[#002D5E] rounded-full"></div>
              <h3 className="text-3xl font-black text-[#002D5E]">Track Your Shipment</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-4 bg-slate-50 border border-slate-100 px-8 py-6 rounded-[2rem] focus-within:border-orange-400 transition-all shadow-inner">
                <Search className="text-slate-400" size={24} />
                <input type="text" placeholder="Enter Tracking ID" className="bg-transparent w-full outline-none font-bold text-slate-700" />
              </div>
              <button className="bg-[#002D5E] text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-900 transition shadow-lg">
                Track Status
              </button>
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
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;