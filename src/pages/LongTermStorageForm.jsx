import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Building2, User, Clock, Package, 
  Ruler, ShieldCheck, CheckCircle2, ChevronRight, Info
} from 'lucide-react';

const LongTermStorageForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    duration: '',
    goodsType: '',
    inventorySize: '',
    areaRequired: '',
    rackingNeeded: 'No',
    dedicatedSpace: 'No',
    insuranceRequired: 'No',
    securityRequirement: 'Standard 24/7'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 💡 ऑटोमॅटिक वेअरहाऊस सजेशन लॉजिक
    if (name === "rackingNeeded" && value === "Yes") {
      setSuggestion("Recommended: Premium High-Bay Warehouse with Racking System.");
    } else if (name === "insuranceRequired" && value === "Yes") {
      setSuggestion("Recommended: Grade-A Secure Facility with Full Compliance.");
    } else {
      setSuggestion("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "warehouse_requests"), {
        ...formData,
        serviceType: "Long Term Storage",
        status: "Pending",
        timestamp: new Date()
      });
      alert("Long Term Storage inquiry submitted successfully!");
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
      <div className="bg-[#002D5E] text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            Long Term <span className="text-orange-500">Storage</span>
          </h1>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Enterprise Warehouse Solutions</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        
        {/* 📸 Image Section */}
        <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-40 object-cover" 
            alt="Long term warehouse"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 📌 Step 1: Basic Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-blue-700 uppercase tracking-widest mb-4">
              <Building2 size={14}/> Step 1: Basic Info
            </h3>
            <div className="space-y-3">
              <input name="companyName" placeholder="Company Name" required className="form-input" onChange={handleChange} />
              <input name="contactPerson" placeholder="Contact Person Name" required className="form-input" onChange={handleChange} />
            </div>
          </div>

          {/* 📌 Step 2: Storage Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-orange-600 uppercase tracking-widest mb-4">
              <Package size={14}/> Step 2: Storage Details
            </h3>
            <div className="space-y-3">
              <input name="duration" placeholder="Storage Duration (e.g. 1 Year, 24 Months)" required className="form-input" onChange={handleChange} />
              <input name="goodsType" placeholder="Type of Goods (e.g. Raw Materials, Finished Products)" required className="form-input" onChange={handleChange} />
              <input name="inventorySize" placeholder="Approx Inventory Size (Tons / Pallets)" required className="form-input" onChange={handleChange} />
            </div>
          </div>

          {/* 📌 Step 3: Space & Setup */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-green-700 uppercase tracking-widest mb-4">
              <Ruler size={14}/> Step 3: Space & Setup
            </h3>
            <div className="space-y-4">
              <input name="areaRequired" placeholder="Area Required (Sq. Ft.)" required className="form-input" onChange={handleChange} />
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase">Racking Needed?</label>
                  <select name="rackingNeeded" className="form-input" onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase">Dedicated Space?</label>
                  <select name="dedicatedSpace" className="form-input" onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes (Private Area)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 📌 Step 4: Additional Services */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-purple-700 uppercase tracking-widest mb-4">
              <ShieldCheck size={14}/> Step 4: Additional Services
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase">Insurance Required?</label>
                <select name="insuranceRequired" className="form-input" onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes (Full Cargo Cover)</option>
                </select>
              </div>
              <input name="securityRequirement" placeholder="Security (e.g. 24/7 CCTV, Biometric)" className="form-input" onChange={handleChange} />
            </div>
          </div>

          {/* 💡 AI Suggestion Alert */}
          {suggestion && (
            <div className="bg-blue-600 text-white p-5 rounded-[2rem] flex items-start gap-3 animate-bounce shadow-xl border-b-4 border-blue-900">
              <Info className="shrink-0" size={24}/>
              <p className="font-bold text-sm italic">{suggestion}</p>
            </div>
          )}

          <button 
            disabled={loading} 
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-[#002D5E] text-white hover:bg-blue-900 active:scale-95'}`}
          >
            {loading ? "Processing..." : "Get Enterprise Quote"}
            <ChevronRight size={20}/>
          </button>

        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1.1rem 1.5rem;
          background: #f8fafc;
          border-radius: 1.5rem;
          border: 2px solid #f1f5f9;
          font-weight: 700;
          outline: none;
          transition: all 0.2s;
          color: #1e293b;
          font-size: 0.95rem;
        }
        .form-input:focus {
          border-color: #002D5E;
          background: #fff;
          box-shadow: 0 10px 20px -10px rgba(0,45,94,0.1);
        }
      `}</style>
    </div>
  );
};

export default LongTermStorageForm;