import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, ClipboardList, LayoutGrid, Cpu, Activity, 
  ChevronRight, Building2, Barcode, PieChart
} from 'lucide-react';

const InventoryManagementForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    skuCount: '',
    inventoryVolume: '',
    softwareIntegration: 'No',
    rfidNeeded: 'No',
    frequency: '',
    reportingNeeded: 'No'
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
        serviceType: "Inventory Management",
        status: "Pending",
        timestamp: new Date()
      });
      alert("Inventory Management inquiry submitted successfully!");
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
      <div className="bg-indigo-700 text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            Inventory <span className="text-indigo-300">Management</span>
          </h1>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Stock Control & Tracking</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        
        {/* 📊 Hero Visual */}
        <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-44 relative bg-indigo-900">
          <img 
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover opacity-50" 
            alt="Inventory Tracking"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
             <div className="bg-indigo-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                <ClipboardList className="text-white" size={24} />
             </div>
             <h2 className="text-white font-black text-2xl drop-shadow-md">Smart Stock Optimization</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 📌 Step 1: Business Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-indigo-700 uppercase tracking-widest mb-4">
              <Building2 size={14}/> Step 1: Business Info
            </h3>
            <input 
              name="companyName" 
              placeholder="Company Name" 
              required 
              className="form-input" 
              onChange={handleChange} 
            />
          </div>

          {/* 📌 Step 2: Inventory Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-blue-600 uppercase tracking-widest mb-4">
              <LayoutGrid size={14}/> Step 2: Inventory Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="skuCount" 
                placeholder="Number of SKUs (e.g. 50, 500+)" 
                required 
                className="form-input" 
                onChange={handleChange} 
              />
              <input 
                name="inventoryVolume" 
                placeholder="Volume (e.g. 1000 Units/Month)" 
                required 
                className="form-input" 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* 📌 Step 3: System Requirement */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-purple-700 uppercase tracking-widest mb-4">
              <Cpu size={14}/> Step 3: System Requirement
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600">Software Integration Needed?</span>
               <div className="flex gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, softwareIntegration: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.softwareIntegration === opt ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600 flex items-center gap-2"><Barcode size={14}/> Barcode / RFID Needed?</span>
               <div className="flex gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, rfidNeeded: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.rfidNeeded === opt ? 'bg-purple-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>
          </div>

          {/* 📌 Step 4: Operations */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-emerald-700 uppercase tracking-widest mb-4">
              <Activity size={14}/> Step 4: Operations
            </h3>
            <input 
              name="frequency" 
              placeholder="Inbound / Outbound Frequency (e.g. Daily / Weekly)" 
              required 
              className="form-input" 
              onChange={handleChange} 
            />
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <span className="text-xs font-bold text-slate-600 flex items-center gap-2"><PieChart size={14}/> Monthly Reporting Required?</span>
               <div className="flex gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <button key={opt} type="button" onClick={() => setFormData({...formData, reportingNeeded: opt})}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.reportingNeeded === opt ? 'bg-emerald-600 text-white' : 'bg-white text-slate-400'}`}>{opt}</button>
                  ))}
               </div>
            </div>
          </div>

          <button 
            disabled={loading} 
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-indigo-700 text-white hover:bg-indigo-800 active:scale-95'}`}
          >
            {loading ? "Processing..." : "Get System Quote"}
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
          border-color: #4f46e5;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default InventoryManagementForm;