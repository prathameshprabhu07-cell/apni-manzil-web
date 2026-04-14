import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Truck, Search, Calculator, 
  ChevronRight, Box, PackagePlus
} from 'lucide-react';

const TruckTransportService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 font-sans overflow-x-hidden text-slate-900">
      
      {/* 🚛 १. हिरो सेक्शन (No Changes) */}
      <div 
        className="relative text-white pt-12 pb-48 px-6 md:px-16 overflow-hidden bg-[#002D5E]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,45,94,0.95), rgba(0,45,94,0.5)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* रेट कॅल्क्युलेटर बॉक्स */}
        <div className="absolute top-8 right-6 md:right-16 z-50">
          <div className="bg-orange-500 border border-orange-400 p-4 rounded-2xl flex items-center gap-4 hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl">
             <Calculator size={24} className="text-white"/>
             <div className="hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Check Pricing</p>
                <p className="text-sm font-black text-white">Rate Calculator</p>
             </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="relative z-10 flex items-center gap-2 text-orange-400 mb-12 font-black hover:translate-x-[-5px] transition-transform duration-300 cursor-pointer bg-black/20 w-fit px-4 py-2 rounded-full backdrop-blur-md"
        >
          <ArrowLeft size={20}/> BACK TO HOME
        </button>
        
        <div className="relative z-10 flex flex-col items-start text-left max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-8xl font-[1000] tracking-tighter leading-none uppercase drop-shadow-2xl">
            Reliable <span className="text-orange-500">Fleet</span> <br/> On Demand
          </h1>
          <p className="text-white/90 text-lg font-bold max-w-xl bg-[#002D5E]/50 backdrop-blur-sm p-4 rounded-xl border-l-4 border-orange-500">
            India's largest fleet, right at your fingertips. Choose your service to get started.
          </p>
        </div>
      </div>

      {/* २. मुख्य ३ पर्याय (Grid) */}
      <div className="max-w-7xl mx-auto px-6 -mt-24 mb-24 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* OPTION 1: BOOK TRUCK */}
          <div 
            onClick={() => navigate('/book-truck')}
            className="group bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center hover:bg-[#002D5E] hover:-translate-y-4 transition-all duration-500 ease-out cursor-pointer"
          >
            <div className="bg-orange-100 p-8 rounded-[2.5rem] mb-6 group-hover:bg-orange-500 transition-all duration-500 shadow-inner">
              <Truck size={50} className="text-orange-600 group-hover:text-white" />
            </div>
            <h2 className="text-3xl font-[1000] text-[#002D5E] group-hover:text-white mb-4 transition-colors duration-500 uppercase">Book Truck</h2>
            <p className="text-slate-500 font-bold group-hover:text-blue-100/70 mb-8 max-w-[250px] transition-colors duration-500 text-sm">
              Need a full vehicle for shifting or commercial load? Book instantly.
            </p>
            <button className="bg-[#002D5E] group-hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95 text-xs">
              Book Now <ChevronRight size={18}/>
            </button>
          </div>

          {/* OPTION 2: FIND LOADS (FIXED NAVIGATION) */}
          <div 
            onClick={() => navigate('/find-load')} // 👈 हे आपण ॲड केलं आहे
            className="group bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center hover:bg-orange-600 hover:-translate-y-4 transition-all duration-500 ease-out cursor-pointer"
          >
            <div className="bg-blue-100 p-8 rounded-[2.5rem] mb-6 group-hover:bg-[#002D5E] transition-all duration-500 shadow-inner">
              <Box size={50} className="text-[#002D5E] group-hover:text-white" />
            </div>
            <h2 className="text-3xl font-[1000] text-[#002D5E] group-hover:text-white mb-4 transition-colors duration-500 uppercase">Find Loads</h2>
            <p className="text-slate-500 font-bold group-hover:text-orange-100/70 mb-8 max-w-[250px] transition-colors duration-500 text-sm">
              Are you a truck owner? Find daily loads for your vehicle.
            </p>
            <button className="bg-[#002D5E] group-hover:bg-white group-hover:text-[#002D5E] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95 text-xs">
              Search <Search size={18}/>
            </button>
          </div>

          {/* OPTION 3: PART LOAD */}
          <div 
            onClick={() => navigate('/book-part-load')}
            className="group bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center hover:bg-green-700 hover:-translate-y-4 transition-all duration-500 ease-out cursor-pointer"
          >
            <div className="bg-green-100 p-8 rounded-[2.5rem] mb-6 group-hover:bg-white transition-all duration-500 shadow-inner">
              <PackagePlus size={50} className="text-green-700" />
            </div>
            <h2 className="text-3xl font-[1000] text-[#002D5E] group-hover:text-white mb-4 transition-colors duration-500 uppercase">Part Load</h2>
            <p className="text-slate-500 font-bold group-hover:text-green-50 mb-8 max-w-[250px] transition-colors duration-500 text-sm">
              Less goods? Share truck space and save up to 40% on transport.
            </p>
            <button className="bg-green-700 group-hover:bg-white group-hover:text-green-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-xl transition-all active:scale-95 text-xs">
              Book Part <ChevronRight size={18}/>
            </button>
          </div>

        </div>
      </div>

      {/* 🚛 ३. खालचा ब्रँडेड सेक्शन (No Changes) */}
      <div 
        className="w-full h-[600px] flex items-end justify-center text-center pb-[100px] relative overflow-hidden rounded-t-[4rem] md:rounded-t-[6rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,45,94,1), rgba(0,45,94,0.2)), url('/truck-bg.png'), url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#002D5E'
        }}
      >
        <div className="max-w-5xl px-6 relative z-10">
          <h2 className="text-white text-5xl md:text-7xl font-[1000] uppercase tracking-tighter drop-shadow-2xl leading-[0.9]">
            Apni Manzil <br/> <span className="text-orange-500">Logistics</span>
          </h2>
          <p className="text-white/60 mt-4 font-bold uppercase tracking-[4px]">Verified Trucks • Safe Delivery • Best Rates</p>
        </div>
      </div>

    </div>
  );
};

export default TruckTransportService;