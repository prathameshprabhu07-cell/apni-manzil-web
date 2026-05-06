import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Truck, Zap, Clock, Calendar, FileText, 
  Package, Boxes, RefreshCcw, ChevronRight, CheckCircle2, MapPin, Phone, User, Home, CreditCard, Search
} from 'lucide-react';
// खालील ओळ आपण WhatsApp साठी वापरतोय, पण सध्या Zapier 404 देत असल्याने आपण ती फंक्शनमध्ये वापरणार नाही
import { sendWhatsAppNotification } from '../utils/whatsapp';

const CourierServiceDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState(null);
  
  const [formData, setFormData] = useState({
    serviceType: 'Domestic Courier',
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    pickupPincode: '',
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    dropPincode: '',
    weight: '',
    parcelType: 'Non-Document',
    paymentMode: 'Prepaid'
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

  const handleCheckRates = async () => {
    if(!formData.dropPincode || !formData.weight || !formData.pickupPincode) {
      alert("Please fill Pincode and Weight!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/nimbus', {
        endpoint: 'courier/serviceability',
        data: {
          pickup_postcode: formData.pickupPincode,
          delivery_postcode: formData.dropPincode,
          weight: formData.weight,
          cod: formData.paymentMode === 'Prepaid' ? 0 : 1
        }
      });

      if (response.data && response.data.data) {
        setRates(response.data.data);
        alert("Live Rates updated successfully!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Rate Error:", error);
      alert("Error checking rates. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderId = "CR-" + Math.floor(Math.random() * 100000);
      
      const shipmentData = {
        "order_number": orderId,
        "shipping_charges": 0,
        "discount": 0,
        "cod_charges": 0,
        "order_type": formData.paymentMode === 'Prepaid' ? "Prepaid" : "COD",
        "order_value": 500,
        
        "pickup_name": formData.senderName,
        "pickup_phone": formData.senderPhone,
        "pickup_address": formData.senderAddress,
        "pickup_postcode": formData.pickupPincode,
        
        "consignee_name": formData.receiverName,
        "consignee_phone": formData.receiverPhone,
        "consignee_address": formData.receiverAddress,
        "consignee_postcode": formData.dropPincode,
        
        "weight": parseFloat(formData.weight),
        "length": 10,  
        "breadth": 10, 
        "height": 10,  
        "package_content": formData.parcelType,
        "payment_type": formData.paymentMode.toLowerCase()
      };

      const bookingRes = await axios.post('/api/nimbus', {
        endpoint: 'shipments',
        data: shipmentData
      });

      if (bookingRes.data && bookingRes.data.data) {
        const awb = bookingRes.data.data.awb_number;
        const message = `Booking Confirmed! Order ID: ${orderId} | AWB: ${awb} | Sender: ${formData.senderName} | From: ${formData.pickupPincode} to ${formData.dropPincode} | Weight: ${formData.weight}kg`;
        
        // ही ओळ मी कमेंट केली आहे जेणेकरून Zapier चा 404 एरर बुकिंग थांबवणार नाही
        // await sendWhatsAppNotification(formData.senderPhone, formData.senderName, message, orderId);
        
        alert(`Booking Successful! Tracking ID: ${awb}`);
      } else {
        alert("Booking failed. Please check your credentials or API balance.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking unsuccessful. Please check console errors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      
      <div className="bg-[#002D5E] text-white pt-12 pb-24 px-6 md:px-16 relative overflow-hidden">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-orange-400 mb-8 font-bold hover:text-orange-300 transition relative z-10 cursor-pointer">
          <ArrowLeft size={20}/> Back to Home
        </button>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-7xl font-black mb-2 tracking-tight">Book Your Parcel</h1>
            <p className="text-orange-400 text-lg md:text-xl font-black uppercase tracking-[0.2em] mb-4">Solutions for all delivery</p>
            <p className="text-blue-100/80 text-lg font-medium italic">"Fastest. Safest. Reliable."</p>
          </div>
          
          <div className="flex-1 w-full max-w-md h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10">
            <img src="/bg.png" alt="Logistics Network" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto -mt-16 px-6 relative z-50">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border-4 border-orange-50">
          <h2 className="text-3xl font-black text-[#002D5E] mb-10 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
            <CheckCircle2 className="text-green-500" size={32}/> Shipment & Address Details
          </h2>
          
          <form onSubmit={handleFinalBooking} className="space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Select Service</label>
                <select name="serviceType" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none ring-2 ring-transparent focus:ring-orange-500 transition" onChange={handleInputChange}>
                  {subServices.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Parcel Type</label>
                <select name="parcelType" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange}>
                  <option value="Non-Document">Non-Document (Parcel)</option>
                  <option value="Document">Document (Letters/Papers)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Weight (kg)</label>
                <div className="flex gap-2">
                   <input name="weight" required type="number" step="0.1" placeholder="e.g. 0.5" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange} />
                   <button type="button" onClick={handleCheckRates} className="bg-blue-600 text-white px-4 rounded-2xl hover:bg-blue-700 transition flex items-center gap-2">
                      <Search size={18}/> Rates
                   </button>
                </div>
              </div>
            </div>

            {rates && (
              <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-200">
                 <h4 className="font-black text-green-800 uppercase text-xs mb-4">Available Courier Rates:</h4>
                 <div className="flex gap-4 overflow-x-auto pb-2">
                    {rates.map((courier, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl shadow-sm min-w-[150px] border border-green-100 text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase">{courier.name}</p>
                         <p className="text-lg font-black text-blue-900">₹{courier.total_amount}</p>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div className="space-y-6 bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100">
                <h3 className="text-lg font-black text-blue-800 uppercase tracking-widest flex items-center gap-2">
                  <User size={20}/> Sender (From)
                </h3>
                <div className="space-y-4">
                  <input name="senderName" required placeholder="Sender Full Name" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange} />
                  <input name="senderPhone" required placeholder="WhatsApp Number" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange} />
                  <input name="pickupPincode" required placeholder="Pickup Pincode" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange} />
                  <textarea name="senderAddress" required rows="3" placeholder="Complete Pickup Address" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange}></textarea>
                </div>
              </div>

              <div className="space-y-6 bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100">
                <h3 className="text-lg font-black text-orange-800 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={20}/> Receiver (To)
                </h3>
                <div className="space-y-4">
                  <input name="receiverName" required placeholder="Receiver Full Name" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange} />
                  <input name="receiverPhone" required placeholder="Contact Number" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange} />
                  <input name="dropPincode" required placeholder="Delivery Pincode" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange} />
                  <textarea name="receiverAddress" required rows="3" placeholder="Complete Delivery Address" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" onChange={handleInputChange}></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <label className="text-sm font-black text-slate-500 uppercase tracking-widest">Payment Mode:</label>
                <div className="flex gap-2">
                  {['Prepaid', 'COD'].map((mode) => (
                    <button 
                      key={mode}
                      type="button"
                      onClick={() => setFormData({...formData, paymentMode: mode})}
                      className={`px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition ${formData.paymentMode === mode ? 'bg-[#002D5E] text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-12 py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : 'Proceed with Booking'} <ChevronRight size={20}/>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-[#002D5E] uppercase tracking-[0.2em]">Our Premium Services</h2>
          <p className="text-slate-400 font-bold mt-2">Professional Logistics for Every Need</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subServices.map((s) => (
            <div 
              key={s.id} 
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
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