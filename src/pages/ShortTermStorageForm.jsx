import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Calendar, Ruler, Phone, CheckCircle2, MapPin, Info, Edit3, Warehouse 
} from 'lucide-react';

const ShortTermStorageForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '', storageDuration: '', spaceNeeded: '', 
    materialType: 'General Goods', otherMaterial: '', 
    mobile: '', additionalNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalMaterial = formData.materialType === "Other" ? formData.otherMaterial : formData.materialType;

    try {
      await addDoc(collection(db, "warehouse_requests"), {
        ...formData,
        materialType: finalMaterial,
        serviceType: "Short Term Storage",
        status: "Pending",
        timestamp: new Date()
      });
      alert("Storage inquiry submitted!");
      navigate(-1);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* 🟦 Header */}
      <div className="bg-[#002D5E] text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-md">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <h1 className="text-xl font-black uppercase tracking-tighter">Short Term <span className="text-orange-500">Storage</span></h1>
      </div>

      <div className="max-w-xl mx-auto p-4">
        
        {/* 📸 Warehouse Image Section */}
        <div className="mt-4 mb-6 relative overflow-hidden rounded-[2.5rem] shadow-xl border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1000" 
            alt="Modern Warehouse" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div className="flex items-center gap-2 text-white">
              <Warehouse size={20} className="text-orange-400" />
              <span className="font-bold text-sm uppercase tracking-widest">Safe Storage Solutions</span>
            </div>
          </div>
        </div>

        {/* 📝 Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            
            <h2 className="text-[10px] font-black uppercase text-blue-700 tracking-[0.2em] ml-2">Fill Details Below</h2>

            <input name="location" placeholder="City / Area" required className="form-input" onChange={handleChange} />
            <input type="number" name="spaceNeeded" placeholder="Space Required (Sq. Ft.)" required className="form-input" onChange={handleChange} />
            <input name="storageDuration" placeholder="Duration (e.g. 15 Days)" required className="form-input" onChange={handleChange} />

            <div className="space-y-2">
              <select 
                name="materialType" 
                className="form-input font-bold" 
                onChange={handleChange}
                value={formData.materialType}
              >
                <option value="General Goods">General Goods</option>
                <option value="Household Items">Household Items</option>
                <option value="Industrial Material">Industrial Material</option>
                <option value="Agriculture Products">Agriculture Products</option>
                <option value="Other">Other (Please specify)</option>
              </select>
            </div>

            {formData.materialType === "Other" && (
              <div className="relative animate-in slide-in-from-top-2 duration-300">
                <Edit3 size={18} className="absolute left-4 top-4 text-orange-500" />
                <input 
                  name="otherMaterial" 
                  placeholder="Specify material type" 
                  required 
                  className="form-input pl-12 border-orange-200 bg-orange-50/30" 
                  onChange={handleChange} 
                />
              </div>
            )}

            <textarea name="additionalNotes" placeholder="Special requirements (CCTV, Pallets, etc.)" rows="3" className="form-input pt-4" onChange={handleChange}></textarea>
            
            <div className="relative">
              <Phone size={18} className="absolute left-5 top-4 text-slate-400" />
              <input type="tel" name="mobile" placeholder="Mobile Number" required maxLength="10" className="form-input pl-14 font-black tracking-[2px]" onChange={handleChange} />
            </div>
            
            <button 
              disabled={loading} 
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all ${loading ? 'bg-slate-400' : 'bg-[#002D5E] text-white hover:bg-blue-900 active:scale-95'}`}
            >
              {loading ? "Submitting..." : "Get Free Quote"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border-radius: 1.25rem;
          border: 2px solid #f1f5f9;
          font-weight: 700;
          outline: none;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .form-input:focus {
          border-color: #002D5E;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default ShortTermStorageForm;