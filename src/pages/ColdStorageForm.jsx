import React, { useState } from 'react';
import { ArrowLeft, ThermometerSnowflake, Box, Calendar, Clock, MapPin, Phone, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // ✅ Firebase इम्पोर्ट
import { collection, addDoc } from 'firebase/firestore'; // ✅ Firestore इम्पोर्ट

const ColdStorageDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    productType: 'Fruits & Vegetables',
    quantity: '',
    temperature: '-5°C to 0°C',
    duration: '',
    pickupLocation: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      ...formData,
      serviceType: "Cold Storage",
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      // १. Firebase मध्ये सेव्ह करा
      await addDoc(collection(db, "warehouse_requests"), bookingData);

      // २. n8n ला डेटा पाठवा
      const webhookUrl = "https://apnimanzil.app.n8n.cloud/webhook/Packer-booking";
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      alert("Cold Storage Booking Request Sent Successfully!");
      navigate(-1);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans">
      {/* Header */}
      <div className="bg-[#004080] text-white pt-12 pb-24 px-6 md:px-16 relative">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-cyan-400 mb-8 font-bold hover:text-cyan-300 transition">
          <ArrowLeft size={20}/> Back to Services
        </button>
        <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">Cold Storage Booking</h1>
        <p className="text-cyan-400 text-lg font-black uppercase tracking-widest">Preserving Freshness, Guaranteed</p>
      </div>

      <div className="max-w-4xl mx-auto -mt-16 px-6 pb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border-4 border-blue-50">
          <h2 className="text-2xl font-black text-[#004080] mb-8 flex items-center gap-3 border-b pb-4">
            <ThermometerSnowflake className="text-blue-500" size={28}/> Reserve Your Space
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Details */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Personal Information</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-400" size={20}/>
                  <input name="fullName" required placeholder="Full Name" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange} />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-slate-400" size={20}/>
                  <input name="phone" required placeholder="Phone Number" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange} />
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Storage Requirements</label>
                <select name="productType" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange}>
                  <option>Fruits & Vegetables</option>
                  <option>Dairy Products</option>
                  <option>Pharmaceuticals</option>
                  <option>Frozen Foods</option>
                  <option>Seafood</option>
                </select>
                <div className="relative">
                  <Box className="absolute left-4 top-4 text-slate-400" size={20}/>
                  <input name="quantity" required placeholder="Quantity (e.g. 500kg / 10 Crates)" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Temp & Duration */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Temperature Range</label>
                <select name="temperature" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange}>
                  <option>-20°C to -10°C (Deep Freeze)</option>
                  <option>-5°C to 0°C (Chilled)</option>
                  <option>2°C to 8°C (Cool)</option>
                  <option>10°C to 15°C (Controlled)</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Storage Duration</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-slate-400" size={20}/>
                  <input name="duration" required placeholder="Duration (e.g. 1 Month)" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-slate-400 ml-2">Location for Pickup (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={20}/>
                <textarea name="pickupLocation" rows="2" placeholder="Full Pickup Address" className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-blue-500 transition" onChange={handleInputChange}></textarea>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-5 bg-[#004080] text-white rounded-2xl font-black text-xl uppercase tracking-[0.2em] shadow-xl hover:bg-blue-800 transition active:scale-95 flex items-center justify-center gap-3">
              {loading ? "Sending..." : "Request Booking"} <ChevronRight size={24}/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ColdStorageDetail;