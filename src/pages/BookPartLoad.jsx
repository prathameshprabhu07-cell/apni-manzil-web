import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, MapPin, Calendar, Package, 
  Weight, Phone, CheckCircle2, MessageSquare, Info
} from 'lucide-react';

const BookPartLoad = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    date: '',
    weight: '',
    materialType: 'General Cargo',
    mobile: '',
    details: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "part_load_bookings"), {
        ...formData,
        status: "Pending",
        bookingType: "Part Load",
        timestamp: new Date()
      });
      alert("Part Load Request Received! Our team will contact you for pricing.");
      navigate('/truck-transport');
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
            Part <span className="text-green-300">Load</span>
          </h1>
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Economy Shipping</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto p-4 mt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 📍 Route & Date */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h2 className="flex items-center gap-2 font-black uppercase text-[10px] text-green-700 tracking-[0.2em]">
              <MapPin size={14}/> Trip Details
            </h2>
            <div className="space-y-3">
              <input name="pickup" placeholder="Pickup City" required className="form-input" onChange={handleChange} />
              <input name="drop" placeholder="Drop City" required className="form-input" onChange={handleChange} />
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 ml-4 mb-1 uppercase">Loading Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-4 text-slate-400" />
                  <input type="date" name="date" required className="form-input pl-12" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* 📦 Load & Weight */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h2 className="flex items-center gap-2 font-black uppercase text-[10px] text-orange-600 tracking-[0.2em]">
              <Package size={14}/> Cargo Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <Weight size={18} className="absolute left-4 top-4 text-slate-400" />
                <input 
                  type="number" name="weight" placeholder="Approx Weight (in KG)" 
                  required className="form-input pl-12" onChange={handleChange} 
                />
              </div>
              <select name="materialType" className="form-input font-bold" onChange={handleChange}>
                <option>General Cargo</option>
                <option>Furniture / Household</option>
                <option>Box / Parcels</option>
                <option>Industrial Parts</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* 📝 Extra Details Box */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
            <h2 className="flex items-center gap-2 font-black uppercase text-[10px] text-blue-600 tracking-[0.2em]">
              <Info size={14}/> About Your Load
            </h2>
            <div className="relative">
              <MessageSquare size={18} className="absolute left-4 top-4 text-slate-400" />
              <textarea 
                name="details" 
                placeholder="Tell us more about your goods (e.g., number of boxes, fragile item, etc.)" 
                rows="3"
                className="form-input pl-12 pt-4 resize-none"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* 📱 Contact & Submit */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="relative">
              <span className="absolute left-5 top-4 font-black text-slate-400">+91</span>
              <input 
                type="tel" name="mobile" placeholder="Mobile Number" 
                required className="form-input pl-14 font-black tracking-widest" 
                maxLength="10" onChange={handleChange} 
              />
            </div>

            <button 
              disabled={loading} 
              className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-green-700 text-white hover:bg-green-800 active:scale-95'}`}
            >
              {loading ? "Sending..." : "Request Best Price"}
              {!loading && <CheckCircle2 size={20}/>}
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
          color: #1e293b;
        }
        .form-input:focus {
          border-color: #15803d;
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default BookPartLoad;