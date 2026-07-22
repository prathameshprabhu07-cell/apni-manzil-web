import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Truck, Zap, Clock, Calendar, FileText, 
  Package, Boxes, RefreshCcw, ChevronRight, CheckCircle2, MapPin, User, Search
} from 'lucide-react';

const CourierServiceDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);

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
    length: '',  
    breadth: '', 
    height: '',  
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

  // --- १. SHIPROCKET RATES CHECK ---
  const handleCheckRates = async () => {
    if(!formData.dropPincode || !formData.weight || !formData.pickupPincode || !formData.length || !formData.breadth || !formData.height) {
      alert("Pincode, Weight आणि सर्व Dimensions (L, B, H) भरणे गरजेचे आहे!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/rates', {
        pickup_pincode: formData.pickupPincode,
        delivery_pincode: formData.dropPincode,
        weight: parseFloat(formData.weight),
        length: parseInt(formData.length) || 10,
        breadth: parseInt(formData.breadth) || 10,
        height: parseInt(formData.height) || 10,
        cod: formData.paymentMode === 'Prepaid' ? 0 : 1
      });

      const availableCouriers = response.data?.rates?.data?.available_courier_companies;

      if (response.data.success && availableCouriers && Array.isArray(availableCouriers)) {
        setRates(availableCouriers);
        alert("Live Rates अपडेट झाले आहेत!");
      } else {
        alert("ह्या मार्गासाठी सेवा उपलब्ध नाहीये. पिनकोड तपासा.");
        setRates(null);
      }
    } catch (error) {
      console.error("Rate Error:", error);
      alert("Error: " + (error.response?.data?.message || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  // --- २. FINAL BOOKING (Webhook सह) ---
  const handleFinalBooking = async (e) => {
    e.preventDefault();
    
    if(!selectedCourier) {
      alert("कृपया लिस्ट मधून एक कुरिअर सर्व्हिस निवडा!");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        courier_id: selectedCourier.courier_company_id,
        shipping_cost: Math.ceil(parseFloat(selectedCourier.rate) + 20),
        timestamp: new Date().toISOString()
      };

      // थेट n8n वेबहुककडे डेटा पाठवत आहे (ज्यामध्ये तुम्ही टोकन सेट केले आहे)
      const bookingRes = await axios.post('http://localhost:5678/webhook/apni-manzil-logistics', bookingData);

      if (bookingRes.status === 200 || bookingRes.data) {
        alert(`Booking यशस्वी!`);
        navigate('/dashboard'); 
      } else {
        alert("Booking अयशस्वी: Unknown error");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking यशस्वी होऊ शकली नाही.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header Section */}
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

      {/* Main Form Section */}
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
                <label className="text-xs font-black uppercase text-slate-400 ml-4">Weight (kg) & Dimensions (cm)</label>
                <div className="flex gap-2">
                   <input name="weight" required type="number" step="0.1" placeholder="Weight" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={handleInputChange} />
                   <button type="button" onClick={handleCheckRates} className="bg-blue-600 text-white px-4 rounded-2xl hover:bg-blue-700 transition flex items-center gap-2">
                      <Search size={18}/> Rates
                   </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <input name="length" required type="number" placeholder="L" className="w-1/3 p-3 bg-slate-50 rounded-xl border-none font-bold outline-none ring-1 ring-slate-100 focus:ring-orange-500" onChange={handleInputChange} />
                  <input name="breadth" required type="number" placeholder="B" className="w-1/3 p-3 bg-slate-50 rounded-xl border-none font-bold outline-none ring-1 ring-slate-100 focus:ring-orange-500" onChange={handleInputChange} />
                  <input name="height" required type="number" placeholder="H" className="w-1/3 p-3 bg-slate-50 rounded-xl border-none font-bold outline-none ring-1 ring-slate-100 focus:ring-orange-500" onChange={handleInputChange} />
                </div>
              </div>
            </div>

            {rates && (
              <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-200">
                 <h4 className="font-black text-green-800 uppercase text-xs mb-4">Select Courier & Rate:</h4>
                 <div className="flex gap-4 overflow-x-auto pb-2 px-2">
                    {rates.map((courier, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedCourier(courier)}
                        className={`p-4 rounded-2xl shadow-sm min-w-[160px] border cursor-pointer transition-all duration-300 ${
                          selectedCourier?.courier_company_id === courier.courier_company_id 
                          ? 'bg-[#002D5E] text-white border-orange-400 scale-105 shadow-lg' 
                          : 'bg-white text-slate-900 border-green-100 hover:border-blue-300'
                        }`}
                      >
                         <p className={`text-[10px] font-black uppercase ${selectedCourier?.courier_company_id === courier.courier_company_id ? 'text-orange-400' : 'text-slate-400'}`}>
                            {courier.courier_name}
                         </p>
                         <p className="text-lg font-black">₹{Math.ceil(parseFloat(courier.rate) + 20)}</p>
                         <p className="text-[9px] font-bold mt-1 opacity-80 uppercase tracking-tighter">Est. Delivery: {courier.etd}</p>
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
                {loading ? 'Processing...' : 'Confirm Booking'} <ChevronRight size={20}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourierServiceDetail;