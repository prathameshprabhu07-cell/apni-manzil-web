import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Snowflake, Thermometer, Weight, Calendar, 
  ShieldCheck, ChevronRight, CornerDownRight, Factory
} from 'lucide-react';

const ColdStorageForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    productType: '',
    tempRequired: '2-8°C (Chilled)',
    quantity: '',
    duration: '',
    complianceRequired: 'No'
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
        serviceType: "Cold Storage",
        status: "Pending",
        timestamp: new Date()
      });
      alert("Cold Storage inquiry submitted! Our specialist will call you shortly.");
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
      <div className="bg-cyan-700 text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            Cold Storage <span className="text-cyan-300">Solutions</span>
          </h1>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Temperature Controlled Logistics</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        
        {/* ❄️ Hero Visual */}
        <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-44 relative bg-cyan-900">
          <img 
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover opacity-60" 
            alt="Cold Storage facility"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
             <div className="bg-cyan-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg animate-pulse">
                <Snowflake className="text-white" size={24} />
             </div>
             <h2 className="text-white font-black text-2xl drop-shadow-md">Preserving Quality with Precision</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 📌 Step 1: Basic Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-cyan-700 uppercase tracking-widest mb-4">
              <Factory size={14}/> Step 1: Basic Info
            </h3>
            <input 
              name="name" 
              placeholder="Full Name / Company Name" 
              required 
              className="form-input" 
              onChange={handleChange} 
            />
          </div>

          {/* 📌 Step 2: Product Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-blue-600 uppercase tracking-widest mb-4">
              <Thermometer size={14}/> Step 2: Product Details
            </h3>
            <div className="space-y-4">
              <input 
                name="productType" 
                placeholder="Product Type (e.g. Dairy, Pharma, Fruits)" 
                required 
                className="form-input" 
                onChange={handleChange} 
              />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase italic">Required Temperature Range</label>
                <select name="tempRequired" className="form-input" onChange={handleChange}>
                  <option>2-8°C (Chilled / Pharma)</option>
                  <option>-18°C to -25°C (Frozen / Meat)</option>
                  <option>15-25°C (Ambient / Controlled)</option>
                  <option>Custom / Ultra Low Temp</option>
                </select>
              </div>
            </div>
          </div>

          {/* 📌 Step 3: Storage Needs */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-orange-600 uppercase tracking-widest mb-4">
              <Weight size={14}/> Step 3: Storage Needs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input 
                name="quantity" 
                placeholder="Quantity (e.g. 500 kg / 10 Tons)" 
                required 
                className="form-input" 
                onChange={handleChange} 
              />
              <div className="relative">
                <Calendar size={16} className="absolute left-4 top-4 text-slate-400" />
                <input 
                  name="duration" 
                  placeholder="Duration (Days/Months)" 
                  required 
                  className="form-input pl-12" 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          {/* 📌 Step 4: Compliance */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-emerald-700 uppercase tracking-widest mb-4">
              <ShieldCheck size={14}/> Step 4: Compliance
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
               <p className="text-xs font-bold text-slate-600 flex items-center gap-2">
                 <CornerDownRight size={14} className="text-emerald-500"/> Do you need FSSAI / Pharma compliance?
               </p>
               <div className="flex gap-2">
                  {['No', 'Yes'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({...formData, complianceRequired: opt})}
                      className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                        formData.complianceRequired === opt 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'bg-white text-slate-400 border border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <button 
            disabled={loading} 
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-cyan-700 text-white hover:bg-cyan-800 active:scale-95'}`}
          >
            {loading ? "Sending Inquiry..." : "Book Cold Storage"}
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
          border-color: #0891b2;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default ColdStorageForm;