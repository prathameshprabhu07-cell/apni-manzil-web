import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, Activity, BarChart3, Warehouse, 
  ChevronRight, Facebook, Instagram, Linkedin, Mail, Phone, 
  MapPin, Cpu, ShieldCheck
} from 'lucide-react';

const AISmartLogistics = () => {
  const navigate = useNavigate();

  const aiServices = [
    {
      id: 1,
      title: "Automated Dispatch",
      desc: "Smart Scheduling & Routing with AI precision.",
      icon: <Send size={40} className="text-blue-500" />,
      tag: "Explore"
    },
    {
      id: 2,
      title: "Real-Time Tracking",
      desc: "Track Your Shipment 24/7 with live AI updates.",
      icon: <Activity size={40} className="text-cyan-500" />,
      tag: "Explore"
    },
    {
      id: 3,
      title: "Predictive Analysis",
      desc: "Forecast & Optimize Shipments before delays occur.",
      icon: <BarChart3 size={40} className="text-indigo-500" />,
      tag: "Explore"
    },
    {
      id: 4,
      title: "AI-Powered Warehousing",
      desc: "Efficient Inventory Management using smart bots.",
      icon: <Warehouse size={40} className="text-purple-500" />,
      tag: "Explore"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. NAVBAR */}
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

      {/* 2. HERO SECTION (Tech Blue Theme) */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-left space-y-4 md:w-1/2">
               <p className="text-xs font-bold opacity-80 uppercase tracking-[0.3em]">Home / AI Smart Logistics</p>
               <h1 className="text-5xl md:text-7xl font-black tracking-tight">AI Smart <span className="text-orange-400">Logistics</span></h1>
               <p className="text-xl font-bold opacity-90 leading-relaxed">Advanced Automation for Efficient Shipping</p>
            </div>
            <div className="md:w-1/2 flex justify-end">
               <div className="relative">
                  {/* Digital Robot Icon Placeholder */}
                  <div className="absolute -inset-4 bg-blue-400/20 blur-3xl rounded-full animate-pulse"></div>
                  <Bot size={240} className="text-blue-100 opacity-20 relative z-10" />
               </div>
            </div>
         </div>
         {/* Decorative Tech Lines */}
         <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[4rem]"></div>
      </div>

      {/* 3. SECTION TITLE */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Select an AI Logistics Service Category</h2>
        <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* 4. AI SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiServices.map((s) => (
            <div key={s.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all group text-center flex flex-col items-center border-b-4 hover:border-b-blue-500">
              <div className="mb-6 p-5 rounded-3xl bg-slate-50 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="font-black text-xl text-slate-800 mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">{s.desc}</p>
              <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-[#002D5E] transition-colors shadow-lg shadow-orange-100 group-hover:shadow-blue-100">
                {s.tag}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TECH BANNER (Bottom) */}
      <div className="max-w-6xl mx-auto mb-24 px-4">
        <div className="bg-[#002D5E] rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
             <Cpu size={150} />
          </div>
          <div className="flex items-center gap-8 relative z-10 text-center md:text-left flex-col md:flex-row">
            <div className="bg-white/10 p-5 rounded-full backdrop-blur-md">
               <ShieldCheck size={50} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="text-3xl font-black mb-3">Enhance Your Logistics with AI Technology!</h3>
              <p className="text-blue-200/70 font-bold uppercase tracking-widest text-xs leading-relaxed">Optimize Your Supply Chain with Cutting-Edge AI Solutions.</p>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-orange-600 transition shadow-xl mt-10 md:mt-0 relative z-10">
            Learn More
          </button>
        </div>
      </div>

      {/* 6. FOOTER */}
      <footer className="bg-[#002D5E] text-white pt-20 pb-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-2xl font-black flex items-center gap-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic">AM</span>
              <span>Apni <span className="text-orange-500">Manzil</span></span>
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed font-medium">
              Transforming logistics through Artificial Intelligence. The smartest way to move your goods across India.
            </p>
            <div className="flex gap-4">
              <div className="p-2.5 bg-white/10 rounded-xl hover:bg-orange-500 transition cursor-pointer"><Facebook size={20}/></div>
              <div className="p-2.5 bg-white/10 rounded-xl hover:bg-orange-500 transition cursor-pointer"><Instagram size={20}/></div>
              <div className="p-2.5 bg-white/10 rounded-xl hover:bg-orange-500 transition cursor-pointer"><Linkedin size={20}/></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1 mb-8">AI Services</h4>
            <ul className="space-y-4 text-blue-100/60 text-sm font-bold">
              <li className="hover:text-orange-400 cursor-pointer">Smart Dispatch</li>
              <li className="hover:text-orange-400 cursor-pointer">Live Analytics</li>
              <li className="hover:text-orange-400 cursor-pointer">Route Optimization</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1 mb-8">Company</h4>
            <ul className="space-y-4 text-blue-100/60 text-sm font-bold">
              <li className="hover:text-orange-400 cursor-pointer">About AI Manzil</li>
              <li className="hover:text-orange-400 cursor-pointer">Security</li>
              <li className="hover:text-orange-400 cursor-pointer">Terms of AI</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold border-b-2 border-orange-500 w-fit pr-4 pb-1 mb-8">Contact Info</h4>
            <ul className="space-y-5 text-blue-100/60 text-sm font-bold">
              <li className="flex items-center gap-3"><Phone size={18} className="text-orange-500"/> +91 99999 88888</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-orange-500"/> ai.support@apnimanzil.com</li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-orange-500"/> Tech Hub, Bangalore</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-10 text-center text-[10px] font-black text-blue-100/30 uppercase tracking-[0.5em]">
          <p>© 2026 Apni Manzil AI - Future of Logistics</p>
        </div>
      </footer>

    </div>
  );
};

export default AISmartLogistics;