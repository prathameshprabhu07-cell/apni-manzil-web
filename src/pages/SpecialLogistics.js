import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Snowflake, Pill, GlassWater, HardHat, Flame, 
  ChevronRight, Facebook, Instagram, Linkedin, Mail, Phone, 
  ArrowRight, ShieldCheck, MapPin, Search
} from 'lucide-react';

const SpecialLogistics = () => {
  const navigate = useNavigate();

  const specialServices = [
    {
      id: 1,
      title: "Cold Chain Logistics",
      desc: "Temperature Controlled shipping for perishables.",
      icon: <Snowflake size={40} className="text-blue-500" />,
      tag: "Explore"
    },
    {
      id: 2,
      title: "Medicine Transport",
      desc: "Safe Delivery of Medicines and Vaccines.",
      icon: <Pill size={40} className="text-red-500" />,
      tag: "Explore"
    },
    {
      id: 3,
      title: "Fragile Item Shipping",
      desc: "Safe Delivery of Fragile & Delicate Goods.",
      icon: <GlassWater size={40} className="text-amber-500" />,
      tag: "Explore"
    },
    {
      id: 4,
      title: "Heavy Machinery Transport",
      desc: "Safe Transport of Heavy Equipment & Plants.",
      icon: <HardHat size={40} className="text-slate-700" />,
      tag: "Explore"
    },
    {
      id: 5,
      title: "Dangerous Goods Transport",
      desc: "Certified handling for hazardous materials.",
      icon: <Flame size={40} className="text-orange-600" />,
      tag: "Explore"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. NAVBAR (Existing style) */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="text-2xl font-black text-[#002D5E] flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg">AM</span>
          <span>Apni <span className="text-orange-500">Manzil</span></span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
          <span className="cursor-pointer hover:text-orange-500">Services</span>
          <span className="cursor-pointer hover:text-orange-500">Track Shipment</span>
          <span className="cursor-pointer hover:text-orange-500">Logistics Partner</span>
          <span className="cursor-pointer hover:text-orange-500">Help</span>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 font-bold text-[#002D5E]">Login</button>
          <button className="bg-[#002D5E] text-white px-6 py-2 rounded-full font-bold">Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO SECTION (Blue Header) */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-left space-y-4">
               <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Home / Special Logistics</p>
               <h1 className="text-5xl md:text-6xl font-black tracking-tight">Special <span className="text-yellow-400">Logistics</span></h1>
               <p className="text-xl font-bold opacity-90">Special Handling Delivery</p>
            </div>
            <div className="hidden md:block">
               {/* Decorative Illustration Space */}
               <img src="https://cdn-icons-png.flaticon.com/512/4151/4151113.png" alt="Truck" className="w-64 h-64 object-contain opacity-20" />
            </div>
         </div>
         {/* Background Curves */}
         <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-[3rem]"></div>
      </div>

      {/* 3. SERVICE SELECTION TITLE */}
      <div className="text-center py-10">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Select a Special Shipping Service Category</h2>
      </div>

      {/* 4. SERVICES GRID (Cards like the photo) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialServices.map((s) => (
            <div key={s.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all group text-center flex flex-col items-center">
              <div className="mb-4 p-4 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="font-black text-lg text-slate-800 mb-2">{s.title}</h3>
              <p className="text-slate-400 text-xs font-bold mb-6">{s.desc}</p>
              <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 transition shadow-lg shadow-orange-100">
                {s.tag}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION (Bottom Blue Bar) */}
      <div className="max-w-6xl mx-auto mb-20 px-4">
        <div className="bg-[#002D5E] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
            <div className="bg-white/10 p-4 rounded-full">
               <ShieldCheck size={50} className="text-orange-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2">Reliable & Secure Transportation for Sensitive Shipments!</h3>
              <p className="text-blue-100/70 font-bold uppercase tracking-widest text-xs">Request a Customized Logistics Solution Today!</p>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition shadow-xl mt-8 md:mt-0 relative z-10">
            Get a Quote!
          </button>
        </div>
      </div>

      {/* 6. FOOTER (Professional style) */}
      <footer className="bg-[#002D5E] text-white pt-20 pb-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-2xl font-black flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic">AM</span>
              <span>Apni <span className="text-orange-500">Manzil</span></span>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed">
              India's leading AI-powered logistics platform. One solution for all your special delivery needs.
            </p>
            <div className="flex gap-4">
              <div className="p-2 bg-white/10 rounded-full hover:bg-orange-500 transition cursor-pointer"><Facebook size={18}/></div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-orange-500 transition cursor-pointer"><Instagram size={18}/></div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-orange-500 transition cursor-pointer"><Linkedin size={18}/></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1 mb-6">Quick Links</h4>
            <ul className="space-y-3 text-blue-100/60 text-sm font-bold">
              <li className="hover:text-orange-400 cursor-pointer">Our Services</li>
              <li className="hover:text-orange-400 cursor-pointer">Track Shipment</li>
              <li className="hover:text-orange-400 cursor-pointer">Become a Partner</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1 mb-6">Support</h4>
            <ul className="space-y-3 text-blue-100/60 text-sm font-bold">
              <li className="hover:text-orange-400 cursor-pointer">Help Center</li>
              <li className="hover:text-orange-400 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-orange-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-blue-100/60 text-sm font-bold">
              <li className="flex items-center gap-3"><Phone size={18} className="text-orange-500"/> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-orange-500"/> support@apnimanzil.co.in</li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-orange-500"/> Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs font-bold text-blue-100/40 uppercase tracking-[0.3em]">
          <p>© 2026 Apni Manzil. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default SpecialLogistics;