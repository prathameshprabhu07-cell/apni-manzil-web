import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react';

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    pickupPincode: '',
    dropPincode: '',
    weight: '',
    serviceType: 'Domestic Courier'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // इथे आपण पुढे Backend जोडू, सध्या फक्त अलर्ट दाखवू
    alert(`Order Placed for ${formData.senderName}! We will contact you on WhatsApp.`);
    navigate('/'); // बुकिंग झाल्यावर होम पेजवर परत जाण्यासाठी
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[#002D5E] font-black mb-8 hover:text-orange-500 transition cursor-pointer"
        >
          <ArrowLeft size={24} /> BACK TO SERVICES
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-[#002D5E]/5">
          {/* Header */}
          <div className="bg-[#002D5E] p-10 text-center">
            <h1 className="text-white text-3xl md:text-5xl font-black mb-2 uppercase tracking-tight">
              Complete Your <span className="text-orange-400">Booking</span>
            </h1>
            <p className="text-blue-100/60 font-bold italic">Fill the details below to ship your parcel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Full Name</label>
              <input 
                name="senderName" 
                required 
                placeholder="John Doe" 
                className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-400 outline-none font-bold transition-all"
                onChange={handleInputChange} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">WhatsApp Number</label>
              <input 
                name="senderPhone" 
                required 
                placeholder="+91 0000000000" 
                className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-400 outline-none font-bold transition-all"
                onChange={handleInputChange} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Pickup Pincode</label>
              <input 
                name="pickupPincode" 
                required 
                placeholder="400001" 
                className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-400 outline-none font-bold transition-all"
                onChange={handleInputChange} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Weight (kg)</label>
              <input 
                name="weight" 
                required 
                placeholder="0.5" 
                className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-400 outline-none font-bold transition-all"
                onChange={handleInputChange} 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Delivery Address Details</label>
              <textarea 
                name="address" 
                rows="3"
                placeholder="Enter full destination address..." 
                className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-400 outline-none font-bold transition-all"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="md:col-span-2 bg-orange-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Send size={20} /> CONFIRM BOOKING NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;