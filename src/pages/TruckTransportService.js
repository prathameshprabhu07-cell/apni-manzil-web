import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Truck, Package, Boxes, Globe, Zap, Anchor, 
  ChevronRight, Phone, Mail, Facebook, Instagram, Linkedin
} from 'lucide-react';

const TruckTransportService = () => {
  const navigate = useNavigate();

  // सर्व्हिसेसची नावे तशीच ठेवली आहेत, किंमत पूर्णपणे काढली आहे.
  const truckTypes = [
    { id: 1, name: "Mini Truck", desc: "Small city deliveries & narrow roads", icon: <Truck size={30} /> },
    { id: 2, name: "Pickup Truck", desc: "Reliable for medium loads & shifting", icon: <Package size={30} /> },
    { id: 3, name: "Tempo Transport", desc: "Best for commercial & furniture goods", icon: <Boxes size={30} /> },
    { id: 4, name: "Full Truck Load", desc: "Dedicated truck for large volume cargo", icon: <Truck size={30} className="text-blue-800"/> },
    { id: 5, name: "Part Truck Load", desc: "Cost-effective sharing for smaller loads", icon: <Zap size={30} /> },
    { id: 6, name: "Container Transport", desc: "Secure international & interstate transit", icon: <Anchor size={30} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* १. हिरो सेक्शन (निळी पट्टी फिक्स असलेला) */}
      <div className="bg-[#002D5E] text-white pt-12 pb-32 px-6 md:px-16 relative overflow-hidden">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-orange-400 mb-8 font-black hover:scale-105 transition-transform"
        >
          <ArrowLeft size={20}/> BACK TO HOME
        </button>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          <div className="md:w-3/5 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Truck & <span className="text-orange-500">Transport</span> <br/> Services
            </h1>
            <p className="text-blue-100/80 text-xl font-bold italic border-l-4 border-orange-500 pl-4 max-w-xl">
              "India's largest fleet for your every load - Mini to Container"
            </p>
          </div>
          
          <div className="md:w-2/5 relative z-20"> 
            <img 
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000" 
              alt="Truck Service" 
              className="rounded-[3rem] shadow-2xl w-full h-80 object-cover border-8 border-white/10"
            />
          </div>
        </div>
      </div>

      {/* २. ६ कार्ड्स (जुन्या साईझमध्ये, विना किंमत) */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 mb-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {truckTypes.map((truck) => (
            <div key={truck.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border border-slate-100 group flex flex-col items-center text-center">
              <div className="bg-blue-50 text-[#002D5E] p-5 rounded-3xl mb-6 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all">
                {truck.icon}
              </div>
              <h3 className="text-xl font-black text-[#002D5E] mb-2">{truck.name}</h3>
              <p className="text-sm text-slate-500 font-bold mb-6">{truck.desc}</p>
              
              {/* फक्त बुक नाव बटन ठेवले आहे */}
              <button className="text-xs font-black uppercase tracking-widest text-[#002D5E] flex items-center gap-2 group-hover:text-orange-500 transition">
                Book Now <ChevronRight size={14}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ३. फुटर */}
      <footer className="bg-[#002D5E] text-white pt-20 pb-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 text-center md:text-left">
            <div className="text-2xl font-black flex items-center gap-2 justify-center md:justify-start">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg">AM</span>
              <span>Apni <span className="text-orange-500">Manzil</span></span>
            </div>
            <p className="text-blue-100/60 text-sm font-medium">India's leading logistics platform.</p>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-bold text-orange-500">Services</h4>
            <ul className="text-blue-100/60 text-sm font-bold space-y-2">
              <li>Trucking</li>
              <li>Hyperlocal</li>
              <li>Packers & Movers</li>
            </ul>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-bold text-orange-500">Support</h4>
            <ul className="text-blue-100/60 text-sm font-bold space-y-2">
              <li>Help Center</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-bold text-orange-500">Contact</h4>
            <p className="text-blue-100/60 text-sm font-bold">+91 98765 43210</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-[10px] font-black text-blue-100/30 uppercase">
          © 2026 Apni Manzil. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
};

export default TruckTransportService;