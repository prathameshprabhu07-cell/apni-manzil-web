import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  User, MapPin, Package, Truck, Clock, 
  CreditCard, ArrowLeft, CheckCircle, ChevronRight 
} from 'lucide-react';

const SameDayDelivery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    senderName: '', senderMobile: '', pickupAddress: '', pickupPincode: '',
    receiverName: '', receiverMobile: '', deliveryAddress: '', deliveryPincode: '',
    packageType: 'Parcel', weight: '', size: 'Small',
    vehicleType: 'Bike', deliverySpeed: 'Same Day', paymentMethod: 'Prepaid'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // सध्या आपण फक्त डेटा Firebase मध्ये सेव्ह करू, API नंतर जोडू
      await addDoc(collection(db, "same_day_bookings"), {
        ...formData,
        status: "Pending",
        timestamp: new Date()
      });
      setBooked(true);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (booked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl space-y-4 border border-green-100">
          <CheckCircle size={80} className="mx-auto text-green-500 animate-bounce" />
          <h1 className="text-3xl font-[950] italic uppercase">Booking Received!</h1>
          <p className="font-bold text-slate-500">तुमची माहिती सेव्ह झाली आहे. API की जोडल्यावर बुकिंग लाईव्ह होईल.</p>
          <button onClick={() => navigate('/')} className="bg-[#002D5E] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition hover:scale-105">Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <div className="bg-black text-white p-6 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full"><ArrowLeft size={20}/></button>
        <h1 className="text-lg font-black italic uppercase tracking-tighter">Same Day <span className="text-blue-400">Booking Form</span></h1>
        <div className="w-10"></div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-8">
        <form onSubmit={handleFinalBooking} className="space-y-8">
          
          {/* 👤 SENDER DETAILS */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-blue-600">
              <User size={18}/> 1. Sender Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="senderName" placeholder="Sender Name" required className="form-input" onChange={handleChange} />
              <input name="senderMobile" placeholder="Mobile Number" required className="form-input" onChange={handleChange} />
              <input name="pickupAddress" placeholder="Pickup Address" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="pickupPincode" placeholder="Pincode" required className="form-input" onChange={handleChange} />
            </div>
          </section>

          {/* 📦 RECEIVER DETAILS */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-green-600">
              <MapPin size={18}/> 2. Receiver Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="receiverName" placeholder="Receiver Name" required className="form-input" onChange={handleChange} />
              <input name="receiverMobile" placeholder="Mobile Number" required className="form-input" onChange={handleChange} />
              <input name="deliveryAddress" placeholder="Delivery Address" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="deliveryPincode" placeholder="Pincode" required className="form-input" onChange={handleChange} />
            </div>
          </section>

          {/* 📦 PARCEL DETAILS */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-amber-600">
              <Package size={18}/> 3. Parcel Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="packageType" className="form-input font-bold" onChange={handleChange}>
                <option>Documents</option>
                <option>Food</option>
                <option>Parcel</option>
                <option>Electronics</option>
              </select>
              <input name="weight" placeholder="Weight (kg)" className="form-input" onChange={handleChange} />
              <select name="size" className="form-input font-bold md:col-span-2" onChange={handleChange}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </section>

          {/* 🚚 VEHICLE & DELIVERY TYPE */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
               <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 text-slate-400 italic">Vehicle</h2>
               <select name="vehicleType" className="form-input font-black" onChange={handleChange}>
                  <option value="Bike">Bike (0-5 kg)</option>
                  <option value="Auto">Auto (5-50 kg)</option>
                  <option value="Truck">Truck (50+ kg)</option>
               </select>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
               <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 text-slate-400 italic">Delivery Speed</h2>
               <select name="deliverySpeed" className="form-input font-black" onChange={handleChange}>
                  <option>Express (2-3 hrs)</option>
                  <option>Same Day (6-8 hrs)</option>
                  <option>Scheduled</option>
               </select>
            </div>
          </section>

          {/* 💰 PAYMENT & SUBMIT */}
          <div className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 opacity-60 italic">Payment Selection</h2>
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'Prepaid'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${formData.paymentMethod === 'Prepaid' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>Prepaid</button>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'COD'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${formData.paymentMethod === 'COD' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>COD</button>
              </div>
              <button disabled={loading} className="w-full bg-orange-500 text-white py-5 rounded-2xl font-[950] uppercase tracking-[2px] shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-3 active:scale-95">
                {loading ? "Processing..." : "Confirm Final Booking"} <ChevronRight size={20}/>
              </button>
            </div>
            <Truck className="absolute -bottom-10 -right-10 text-white/5" size={250}/>
          </div>

        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          background: #f8fafc;
          border-radius: 1rem;
          border: none;
          font-weight: 600;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default SameDayDelivery;