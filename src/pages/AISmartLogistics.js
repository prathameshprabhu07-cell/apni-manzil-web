import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Send, Activity, BarChart3, Warehouse, 
  Cpu, ShieldCheck
} from 'lucide-react';

// ✅ WhatsApp Utility Import केली आहे
import { sendWhatsAppNotification } from '../utils/WhatsApp';

const AISmartLogistics = () => {
  const navigate = useNavigate();

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन
  const handleAIQuery = (serviceTitle) => {
    // समजा आपण डमी डेटा वापरतोय, रिअल टाइममध्ये हा डेटा फॉर्ममधून येईल
    const customerPhone = "7378502356"; // टेस्टसाठी तुझा नंबर किंवा युजरचा नंबर
    const customerName = "Valued Client";
    const orderId = "AI-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप नोटिफिकेशन पाठवा
    sendWhatsAppNotification(customerPhone, customerName, serviceTitle, orderId);
    
    alert(`${serviceTitle} साठी तुमची चौकशी (Query) व्हॉट्सॲपवर पाठवली आहे!`);
  };

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
      
      {/* 1. HERO SECTION (Tech Blue Theme) */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-left space-y-4 md:w-1/2">
               <p className="text-xs font-bold opacity-80 uppercase tracking-[0.3em]">Home / AI Smart Logistics</p>
               <h1 className="text-5xl md:text-7xl font-black tracking-tight">AI Smart <span className="text-orange-400">Logistics</span></h1>
               <p className="text-xl font-bold opacity-90 leading-relaxed">Advanced Automation for Efficient Shipping</p>
            </div>
            <div className="md:w-1/2 flex justify-end">
               <div className="relative">
                  <div className="absolute -inset-4 bg-blue-400/20 blur-3xl rounded-full animate-pulse"></div>
                  <Bot size={240} className="text-blue-100 opacity-20 relative z-10" />
               </div>
            </div>
         </div>
         <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-[4rem]"></div>
      </div>

      {/* 2. SECTION TITLE */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Select an AI Logistics Service Category</h2>
        <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* 3. AI SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiServices.map((s) => (
            <div key={s.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all group text-center flex flex-col items-center border-b-4 hover:border-b-blue-500">
              <div className="mb-6 p-5 rounded-3xl bg-slate-50 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="font-black text-xl text-slate-800 mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">{s.desc}</p>
              
              {/* ✅ बटणवर क्लिक केल्यावर WhatsApp मेसेज जाईल */}
              <button 
                onClick={() => handleAIQuery(s.title)}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-[#002D5E] transition-colors shadow-lg shadow-orange-100 group-hover:shadow-blue-100"
              >
                {s.tag}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECH BANNER (Bottom) */}
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
          <button 
            onClick={() => handleAIQuery("AI Tech Consultation")}
            className="bg-orange-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-orange-600 transition shadow-xl mt-10 md:mt-0 relative z-10"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* ५. ब्रँडेड ट्रक इमेज सेक्शन */}
      <div 
        className="w-full h-[550px] flex items-start justify-center text-center mt-20 pt-[60px] relative overflow-hidden"
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

export default AISmartLogistics;