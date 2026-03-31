import React, { useState } from 'react';
import { Search, MapPin, Package, Truck, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [showResult, setShowResult] = useState(false);

  // हे डेमो डेटा आहे, नंतर आपण API जोडू शकतो
  const trackData = {
    id: "AM-10293847",
    status: "In Transit",
    expectedDelivery: "05 April 2026",
    currentLocation: "Pune Warehouse, MH",
    steps: [
      { id: 1, title: "Order Placed", date: "28 March, 10:00 AM", completed: true },
      { id: 2, title: "Picked Up", date: "29 March, 02:30 PM", completed: true },
      { id: 3, title: "In Transit", date: "30 March, 05:00 AM", completed: true, active: true },
      { id: 4, title: "Out for Delivery", date: "Pending", completed: false },
      { id: 5, title: "Delivered", date: "Pending", completed: false }
    ]
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if(trackingId.length > 5) setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HERO SEARCH SECTION */}
      <div className="bg-[#001D3D] text-white pt-20 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10"><Truck size={300} /></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            Track Your <span className="text-[#FF5E00]">Shipment</span>
          </h1>
          <p className="text-slate-400 font-bold tracking-widest text-sm uppercase">Enter your tracking ID to get real-time updates</p>
          
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mt-10 bg-white p-3 rounded-[2rem] shadow-2xl">
            <div className="flex-grow flex items-center px-4 gap-3">
              <Search className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. AM-12345)" 
                className="w-full py-4 bg-transparent outline-none text-slate-800 font-black"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <button className="bg-[#FF5E00] text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-[#e05200] transition-all">
              Track Now
            </button>
          </form>
        </div>
      </div>

      {/* 2. TRACKING RESULT SECTION */}
      {showResult && (
        <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Progress Stepper */}
            <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl p-10 border border-slate-100">
              <div className="flex justify-between items-start mb-12 border-b border-slate-50 pb-8">
                <div>
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Tracking ID</h2>
                  <p className="text-2xl font-black text-[#001D3D]">{trackData.id}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Expected Delivery</h2>
                  <p className="text-2xl font-black text-[#FF5E00]">{trackData.expectedDelivery}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-10 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-1 bg-slate-100 -z-10"></div>
                {trackData.steps.map((step) => (
                  <div key={step.id} className="flex gap-6 items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      step.completed ? 'bg-green-500 text-white' : step.active ? 'bg-[#FF5E00] text-white animate-pulse' : 'bg-white text-slate-300 border-2 border-slate-100'
                    }`}>
                      {step.completed ? <CheckCircle2 size={20}/> : <Clock size={20}/>}
                    </div>
                    <div className="flex-grow">
                      <h3 className={`font-black uppercase tracking-tight ${step.completed || step.active ? 'text-[#001D3D]' : 'text-slate-300'}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Details */}
            <div className="space-y-6">
              <div className="bg-[#001D3D] text-white p-8 rounded-[3rem] shadow-xl">
                <h3 className="text-lg font-black mb-6 border-b border-white/10 pb-4">Live Location</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-[#FF5E00]" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Current Station</p>
                      <p className="font-bold">{trackData.currentLocation}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Package className="text-[#FF5E00]" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Service Type</p>
                      <p className="font-bold">Express Truck Transport</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-8 rounded-[3rem] border-2 border-orange-100">
                <ShieldCheck className="text-[#FF5E00] mb-4" size={40} />
                <h4 className="font-black text-[#001D3D] uppercase tracking-tight">Secured Shipment</h4>
                <p className="text-xs font-bold text-slate-500 mt-2">Your goods are insured and monitored under 24/7 surveillance.</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. SUPPORT BANNER */}
      {!showResult && (
        <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Having trouble?</p>
            <div className="flex justify-center gap-8">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-[#FF5E00] mb-2"><Phone size={24}/></div>
                    <span className="text-[10px] font-black uppercase">Call Center</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-[#FF5E00] mb-2"><Mail size={24}/></div>
                    <span className="text-[10px] font-black uppercase">Email Help</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;