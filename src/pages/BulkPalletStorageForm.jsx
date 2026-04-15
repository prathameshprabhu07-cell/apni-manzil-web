import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Warehouse, PackageCheck, Truck, CalendarClock, 
  ChevronRight, Building2, Layers, HardHat
} from 'lucide-react';

const BulkPalletStorageForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    palletCount: '',
    palletType: 'Standard',
    forkliftNeeded: 'No',
    handlingRequired: 'No',
    duration: '',
    contractType: 'Monthly'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "warehouse_requests"), {
        ...formData,
        serviceType: "Bulk & Pallet Storage",
        status: "Pending",
        timestamp: new Date()
      });
      alert("Bulk & Pallet Storage inquiry submitted successfully!");
      navigate(-1);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* 🟦 Header */}
      <div className="bg-amber-600 text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            Bulk & <span className="text-amber-200">Pallet</span> Storage
          </h1>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Industrial Capacity Solutions</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        
        {/* 🏗️ Hero Visual */}
        <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-44 relative bg-amber-900">
          <img 
            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover opacity-60" 
            alt="Pallet Storage"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
             <div className="bg-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                <Warehouse className="text-white" size={24} />
             </div>
             <h2 className="text-white font-black text-2xl drop-shadow-md">Heavy-Duty Storage</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 📌 Step 1: Basic Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-amber-700 uppercase tracking-widest mb-4">
              <Building2 size={14}/> Step 1: Basic Info
            </h3>
            <input 
              name="companyName" 
              placeholder="Name / Company Name" 
              required 
              className="form-input" 
              onChange={handleChange} 
            />
          </div>

          {/* 📌 Step 2: Pallet Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-blue-600 uppercase tracking-widest mb-4">
              <Layers size={14}/> Step 2: Pallet Details
            </h3>
            <input 
              name="palletCount" 
              type="number"
              placeholder="Number of Pallets" 
              required 
              className="form-input" 
              onChange={handleChange} 
            />
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600">Pallet Type</span>
               <div className="flex gap-2">
                  {['Standard', 'Heavy'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, palletType: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.palletType === opt ? 'bg-blue-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>
          </div>

          {/* 📌 Step 3: Handling */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-orange-700 uppercase tracking-widest mb-4">
              <HardHat size={14}/> Step 3: Handling
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600 flex items-center gap-2"><Truck size={14}/> Forklift Needed?</span>
               <div className="flex gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, forkliftNeeded: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.forkliftNeeded === opt ? 'bg-orange-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600 flex items-center gap-2"><PackageCheck size={14}/> Loading/Unloading?</span>
               <div className="flex gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, handlingRequired: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.handlingRequired === opt ? 'bg-orange-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>
          </div>

          {/* 📌 Step 4: Duration */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-emerald-700 uppercase tracking-widest mb-4">
              <CalendarClock size={14}/> Step 4: Duration
            </h3>
            <input 
              name="duration" 
              placeholder="Storage Duration (e.g. 3 Months, 1 Year)" 
              required 
              className="form-input" 
              onChange={handleChange} 
            />
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600">Contract Type</span>
               <div className="flex gap-2">
                  {['Monthly', 'Yearly', 'Project Base'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, contractType: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.contractType === opt ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>
          </div>

          <button 
            disabled={loading} 
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-amber-600 text-white hover:bg-amber-700 active:scale-95'}`}
          >
            {loading ? "Processing..." : "Submit Storage Request"}
            <ChevronRight size={20}/>
          </button>

        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1.1rem 1.25rem;
          background: #f8fafc;
          border-radius: 1.5rem;
          border: 2px solid #f1f5f9;
          font-weight: 700;
          outline: none;
          transition: all 0.2s;
          color: #1e293b;
          font-size: 0.9rem;
        }
        .form-input:focus {
          border-color: #d97706;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default BulkPalletStorageForm;