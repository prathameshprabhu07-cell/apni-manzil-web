import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Truck, Package, Boxes, Zap, Anchor, 
  ChevronRight
} from 'lucide-react';

// ✅ WhatsApp Utility Import केली आहे
import { sendWhatsAppNotification } from '../utils/WhatsApp';

const TruckTransportService = () => {
  const navigate = useNavigate();

  // ✅ बुकिंग हाताळण्यासाठी फंक्शन
  const handleTruckBooking = (truckName) => {
    // कस्टमरचा डेटा (टेस्टिंगसाठी तुझा नंबर)
    const customerPhone = "7378502356"; 
    const customerName = "Truck Service Client";
    const orderId = "TRK-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप मेसेज पाठवा
    sendWhatsAppNotification(customerPhone, customerName, truckName, orderId);
    
    alert(`${truckName} साठी तुमची बुकिंग चौकशी यशस्वीरित्या पाठवण्यात आली आहे!`);
  };

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
      
      {/* १. हिरो सेक्शन */}
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

      {/* २. ६ कार्ड्स */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 mb-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {truckTypes.map((truck) => (
            <div key={truck.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border border-slate-100 group flex flex-col items-center text-center">
              <div className="bg-blue-50 text-[#002D5E] p-5 rounded-3xl mb-6 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all">
                {truck.icon}
              </div>
              <h3 className="text-xl font-black text-[#002D5E] mb-2">{truck.name}</h3>
              <p className="text-sm text-slate-500 font-bold mb-6">{truck.desc}</p>
              
              {/* ✅ Book Now वर क्लिक केल्यावर नोटिफिकेशन जाईल */}
              <button 
                onClick={() => handleTruckBooking(truck.name)}
                className="text-xs font-black uppercase tracking-widest text-[#002D5E] flex items-center gap-2 group-hover:text-orange-500 transition"
              >
                Book Now <ChevronRight size={14}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ३. फायनल ब्रँडेड ट्रक इमेज सेक्शन */}
      <div 
        className="w-full h-[550px] flex items-start justify-center text-center pt-[60px] relative overflow-hidden"
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

export default TruckTransportService;