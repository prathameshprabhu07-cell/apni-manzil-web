import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Truck, Zap, Clock, Calendar, FileText, 
  Package, Boxes, RefreshCcw, ChevronRight, CheckCircle2, MapPin, Phone
} from 'lucide-react';
import { sendWhatsAppNotification } from '../utils/whatsapp';

const CourierServiceDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: 'Domestic Courier',
    senderName: '',
    senderPhone: '',
    pickupPincode: '',
    dropPincode: '',
    weight: ''
  });

  const subServices = [
    { id: 1, name: "Domestic Courier", desc: "Shipping across India", icon: <Truck size={24} />, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, name: "Express Courier", desc: "Urgent delivery", icon: <Zap size={24} />, color: "text-orange-500", bg: "bg-orange-50" },
    { id: 3, name: "Same Day Delivery", desc: "Within same city", icon: <Clock size={24} />, color: "text-green-600", bg: "bg-green-50" },
    { id: 4, name: "Next Day Delivery", desc: "Guaranteed tomorrow", icon: <Calendar size={24} />, color: "text-amber-700", bg: "bg-amber-50" },
    { id: 5, name: "Document Courier", desc: "Paper & letters", icon: <FileText size={24} />, color: "text-slate-600", bg: "bg-slate-50" },
    { id: 6, name: "Parcel Delivery", desc: "Reliable item shipping", icon: <Package size={24} />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: 7, name: "Bulk Shipping", desc: "Large volume orders", icon: <Boxes size={24} />, color: "text-pink-600", bg: "bg-pink-50" },
    { id: 8, name: "Reverse Pickup", desc: "Returns and pickups", icon: <RefreshCcw size={24} />, color: "text-cyan-600", bg: "bg-cyan-50" }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalBooking = (e) => {
    e.preventDefault();
    const orderId = "CR-" + Math.floor(Math.random() * 100000);
    const message = `New Booking: ${formData.serviceType} | From: ${formData.pickupPincode} | Weight: ${formData.weight}kg`;
    sendWhatsAppNotification(formData.senderPhone, formData.senderName, message, orderId);
    alert("Booking Request Sent Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* 🟦 BLUE HEADER SECTION */}
      <div className="bg-[#002D5E] text-white pt-12 pb-24 px-6 md:px-16 relative overflow-hidden">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-orange-400 mb-8 font-bold hover:text-orange-300 transition relative z-10 cursor-pointer">
          <ArrowLeft size={20}/> Back to Home
        </button>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-7xl font-black mb-2 tracking-tight">Book Your Parcel</h1>
            {/* Tagline right below the heading */}
            <p className="text-orange-400 text-lg md:text-xl font-black uppercase tracking-[0.2em] mb-4">Solutions for all delivery</p>
            <p className="text-blue-100/80 text-lg font-medium italic">"Fastest. Safest. Reliable."</p>
          </div>
          
          {/* Your image inside the blue header on the right side */}
          <div className="flex-1 w-full max-w-md h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10">
            <img src="/bg.png" alt="Logistics Network" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* 📝 CENTRED BOOKING FORM */}
      <div className="max-w-4xl mx-auto -mt-16 px-6 relative z-50">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 border-4 border-orange-50">
          <h2 className="text-2xl font-black text-[#002D5E] mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-green-500"/> Shipment Details
          </h2>
          <form onSubmit={handleFinalBooking} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Select Service</label>
              <select name="serviceType" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange}>
                {subServices.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Full Name</label>
              <input name="senderName" required placeholder="Enter Name" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-4">Phone Number</label>
              <input name="senderPhone" required placeholder="WhatsApp Number" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Pincode</label>
                <input name="pickupPincode" required placeholder="400001" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Weight (kg)</label>
                <input name="weight" required placeholder="0.5" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange} />
              </div>
            </div>
            <button className="md:col-span-2 bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all active:scale-95">Confirm & Book via WhatsApp</button>
          </form>
        </div>
      </div>

      {/* 🖼️ OUR PREMIUM SERVICES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#002D5E] uppercase tracking-[0.2em]">Our Premium Services</h2>
          <p className="text-slate-400 font-bold mt-2">Professional Logistics for Every Need</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subServices.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
              <div className={`${s.bg} ${s.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-inner`}>
                {s.icon}
              </div>
              <h3 className="font-black text-[#002D5E] text-xl mb-2">{s.name}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500">
                Premium Service <ChevronRight size={14}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚛 TRUCK IMAGE SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div 
          className="w-full h-[450px] rounded-[3rem] overflow-hidden relative shadow-2xl flex items-center justify-center text-center px-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 45, 94, 0.55), rgba(0, 45, 94, 0.45)), url('/truck-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10">
            <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block shadow-lg">Fastest Network in India</span>
            <h2 className="text-white text-3xl md:text-5xl font-black mb-6 drop-shadow-2xl leading-tight">
              Safe & Secure Transport, <br/> now with <span className="text-orange-400 italic">"Apni Manzil"</span>
            </h2>
            <p className="text-blue-50 text-lg md:text-xl font-bold uppercase tracking-[0.3em] opacity-90">Reliable Logistics Partner</p>
          </div>
        </div>
      </div>

      {/* 🚛 BRANDING SECTION */}
      <div className="w-full bg-[#002D5E] py-16 px-6 text-center text-white">
        <h2 className="text-3xl font-black mb-8 italic text-orange-400 tracking-tighter uppercase">Apni Manzil Logistics</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div><p className="text-2xl font-black">27k+</p><p className="text-[10px] font-bold uppercase text-blue-300 tracking-widest">Pincodes</p></div>
          <div><p className="text-2xl font-black">24-48h</p><p className="text-[10px] font-bold uppercase text-blue-300 tracking-widest">Delivery</p></div>
          <div><p className="text-2xl font-black">Live</p><p className="text-[10px] font-bold uppercase text-blue-300 tracking-widest">Support</p></div>
        </div>
      </div>

    </div>
  );
};

export default CourierServiceDetail;