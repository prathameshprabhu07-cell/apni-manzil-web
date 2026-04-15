import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Store, ShoppingBag, Box, Settings, 
  ChevronRight, Truck, Database, Globe
} from 'lucide-react';

const FulfillmentWarehouseForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    brandName: '',
    storeLink: '',
    monthlyOrders: '',
    avgOrdersPerDay: '',
    skuCount: '',
    productType: '',
    sizeCategory: 'Small (Electronics/Small Items)',
    pickPack: 'Yes',
    codHandling: 'No',
    returnsHandling: 'No'
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
        serviceType: "Fulfillment Warehouse",
        status: "Pending",
        timestamp: new Date()
      });
      alert("Fulfillment inquiry submitted! Our team will contact your brand soon.");
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
            E-Commerce <span className="text-orange-500">Fulfillment</span>
          </h1>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Pick, Pack & Ship Solutions</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        
        {/* 📸 Image Section */}
        <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-44 relative">
          <img 
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Fulfillment warehouse"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent flex items-center p-8">
             <div className="bg-white/90 p-4 rounded-2xl">
                <Truck className="text-[#002D5E]" size={32} />
             </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 📌 Step 1: Business Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-blue-700 uppercase tracking-widest mb-4">
              <Store size={14}/> Step 1: Business Info
            </h3>
            <div className="space-y-3">
              <input name="brandName" placeholder="Brand Name" required className="form-input" onChange={handleChange} />
              <div className="relative">
                <Globe size={16} className="absolute left-4 top-4 text-slate-400" />
                <input name="storeLink" placeholder="Website / Store Link (Optional)" className="form-input pl-12" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* 📌 Step 2: Order Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-orange-600 uppercase tracking-widest mb-4">
              <ShoppingBag size={14}/> Step 2: Order Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="monthlyOrders" type="number" placeholder="Monthly Orders" required className="form-input" onChange={handleChange} />
              <input name="avgOrdersPerDay" type="number" placeholder="Avg Orders per Day" required className="form-input" onChange={handleChange} />
            </div>
          </div>

          {/* 📌 Step 3: Product Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-green-700 uppercase tracking-widest mb-4">
              <Database size={14}/> Step 3: Product Info
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="skuCount" type="number" placeholder="Total SKU Count" required className="form-input" onChange={handleChange} />
                <input name="productType" placeholder="Product Type (e.g. Clothing)" required className="form-input" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase">Size Category</label>
                <select name="sizeCategory" className="form-input" onChange={handleChange}>
                  <option>Small (Electronics/Cosmetics)</option>
                  <option>Medium (Apparel/Shoes)</option>
                  <option>Large (Appliances/Furniture)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 📌 Step 4: Services Needed */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-purple-700 uppercase tracking-widest mb-4">
              <Settings size={14}/> Step 4: Services Needed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase text-center block">Pick & Pack</label>
                <select name="pickPack" className="form-input text-center" onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase text-center block">COD Cash</label>
                <select name="codHandling" className="form-input text-center" onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-2 uppercase text-center block">Returns</label>
                <select name="returnsHandling" className="form-input text-center" onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            disabled={loading} 
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-[#002D5E] text-white hover:bg-blue-900 active:scale-95'}`}
          >
            {loading ? "Registering Brand..." : "Start Fulfillment Now"}
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
          border-color: #002D5E;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default FulfillmentWarehouseForm;