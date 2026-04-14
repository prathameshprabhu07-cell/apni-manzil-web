import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, MessageCircle, 
  Truck, ChevronRight, Share2 
} from 'lucide-react';

const FindLoad = () => {
  const navigate = useNavigate();

  // तुझे नंबर येथे बदलू शकतोस
  const contactNumber = "9XXXXXXXXX"; 

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 🟢 Header Section */}
      <div className="bg-[#002D5E] text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
        >
          <ArrowLeft size={20}/>
        </button>
        <h1 className="text-xl font-black italic uppercase tracking-tighter">
          Find <span className="text-orange-400">Loads</span>
        </h1>
      </div>

      <div className="max-w-2xl mx-auto p-6 flex flex-col items-center text-center justify-center min-h-[80vh]">
        
        {/* 🚛 Animated Icon Box */}
        <div className="bg-orange-100 p-10 rounded-[3.5rem] mb-8 shadow-inner animate-pulse">
          <Truck size={80} className="text-orange-600" />
        </div>

        {/* 📝 Text Content */}
        <div className="space-y-4 mb-10">
          <h2 className="text-4xl md:text-6xl font-[1000] text-[#002D5E] uppercase tracking-tighter leading-none">
            🚛 Find <span className="text-orange-600">Load</span>
          </h2>
          <p className="text-slate-500 font-bold text-lg max-w-md mx-auto leading-tight">
            We are building a powerful system to connect drivers with daily loads.
          </p>
          
          {/* 🔥 Coming Soon Badge */}
          <div className="inline-block bg-orange-600 text-white px-8 py-2 rounded-full font-black uppercase tracking-[0.3em] text-xs shadow-xl mt-4">
            🔥 Coming Soon!
          </div>
        </div>

        {/* 📞 Contact Card */}
        <div className="w-full bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 space-y-8 relative overflow-hidden">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Share2 size={100} />
          </div>

          <div className="relative z-10">
            <p className="text-[#002D5E] font-black uppercase tracking-widest text-[10px] mb-6">
              For now, please contact us to get loads:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Call Button */}
              <a 
                href={`tel:${contactNumber}`} 
                className="flex items-center justify-center gap-3 bg-blue-50 text-[#002D5E] p-6 rounded-2xl font-black hover:bg-blue-100 transition-all border-2 border-blue-100 active:scale-95 shadow-sm"
              >
                <Phone size={24} /> 📞 Call
              </a>

              {/* WhatsApp Button */}
              <a 
                href={`https://wa.me/91${contactNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-50 text-green-700 p-6 rounded-2xl font-black hover:bg-green-100 transition-all border-2 border-green-100 active:scale-95 shadow-sm"
              >
                <MessageCircle size={24} /> 📲 WhatsApp
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-slate-400 font-bold text-sm italic">
                "Join our driver network and get regular trips."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🚛 Bottom Image Hook (Optional) */}
      <div className="max-w-md mx-auto px-6 opacity-30 grayscale pointer-events-none">
         <img src="/fleet-all-logistics.png" alt="Fleet" className="w-full h-auto" />
      </div>

    </div>
  );
};

export default FindLoad;