import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  User, MapPin, Package, Truck, Clock, 
  ArrowLeft, CheckCircle, ChevronRight, Info
} from 'lucide-react';

const SameDayDelivery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  
  // फक्त वेबहूकवरून येणारे रेट्स स्टोअर करण्यासाठी स्टेट
  const [availableRates, setAvailableRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  
  // n8n प्रोडक्शन URL
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-hyperlocal";

  const [formData, setFormData] = useState({
    senderName: '', senderMobile: '', pickupAddress: '', pickupPincode: '',
    receiverName: '', receiverMobile: '', deliveryAddress: '', deliveryPincode: '',
    packageType: 'Parcel', weight: '0.5', packageValue: '100', channelOrderId: '',
    vehicleType: 'Bike', deliverySpeed: 'Same Day', scheduledTime: '', paymentMethod: 'Prepaid'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFetchRatesClick = async () => {
    if (!formData.pickupPincode || !formData.deliveryPincode) {
      alert("Please fill complete pickup and delivery Pincodes.");
      return;
    }

    setLoading(true);

    try {
      const ratePayload = {
        action: "check_rates",
        serviceType: "Hyperlocal",
        pickup_pincode: formData.pickupPincode,
        pickup_address: formData.pickupAddress,
        delivery_pincode: formData.deliveryPincode,
        delivery_address: formData.deliveryAddress,
        sender_name: formData.senderName,
        sender_mobile: formData.senderMobile,
        receiver_name: formData.receiverName,
        receiver_mobile: formData.receiverMobile,
        package_type: formData.packageType,
        weight: formData.weight,
        package_value: formData.packageValue,
        vehicle_type: formData.vehicleType,
        delivery_speed: formData.deliverySpeed,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ratePayload)
      });

      if (!response.ok) {
        throw new Error(`Rate request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("Hyperlocal Rate Response:", result);

      // फक्त n8n वेबहूक डेटावरून रेट्स सेट करणे (कोणताही डमी डेटा नाही)
      if (result && result.rates) {
        setAvailableRates(result.rates);
        alert("Live rates fetched successfully!");
      } else if (Array.isArray(result)) {
        setAvailableRates(result);
        alert("Live rates fetched successfully!");
      } else {
        setAvailableRates([]);
        alert("No rates received from server.");
      }

    } catch (error) {
      console.error("Rate Check Error:", error);
      alert("Unable to fetch live rates from webhook. Please try again.");
      setAvailableRates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalBooking = async (e) => {
    e.preventDefault();

    if (!selectedRate) {
      alert("Please fetch live rates and select a delivery service option first!");
      return;
    }

    setLoading(true);
    
    const bookingPayload = {
      ...formData,
      selectedRate: selectedRate,
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      // १. Firestore मध्ये सेव्ह
      await addDoc(collection(db, "same_day_bookings"), bookingPayload);

      // २. n8n प्रोडक्शन वेबहूकला डेटा पाठवा
      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      setBooked(true);
    } catch (error) {
      console.error("Booking Error:", error);
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
          <h1 className="text-3xl font-[950] italic uppercase">Booking Confirmed!</h1>
          <p className="font-bold text-slate-500">Your shipment request has been recorded. Logistics partner will arrive shortly.</p>
          <button type="button" onClick={() => navigate('/')} className="bg-[#002D5E] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition hover:scale-105 cursor-pointer">Go To Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="bg-black text-white p-6 flex items-center justify-between sticky top-0 z-50">
        <button type="button" onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full cursor-pointer"><ArrowLeft size={20}/></button>
        <h1 className="text-lg font-black italic uppercase tracking-tighter">Same Day <span className="text-blue-400">Booking Form</span></h1>
        <div className="w-10"></div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-8">
        <form onSubmit={handleFinalBooking} className="space-y-8">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-blue-600">
              <User size={18}/> 1. Where is your Pickup? (Sender)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="senderName" placeholder="Sender Name" required className="form-input" onChange={handleChange} />
              <input name="senderMobile" placeholder="Mobile Number" required className="form-input" onChange={handleChange} />
              <input name="pickupAddress" placeholder="Full Pickup Address" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="pickupPincode" placeholder="Pickup Pincode *" required className="form-input" onChange={handleChange} />
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-green-600">
              <MapPin size={18}/> 2. Where is your Drop? (Receiver)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="receiverName" placeholder="Receiver Name" required className="form-input" onChange={handleChange} />
              <input name="receiverMobile" placeholder="Mobile Number" required className="form-input" onChange={handleChange} />
              <input name="deliveryAddress" placeholder="Full Delivery Address" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="deliveryPincode" placeholder="Drop Pincode *" required className="form-input" onChange={handleChange} />
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-amber-600">
              <Package size={18}/> 3. Package Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Package Type *</label>
                <select name="packageType" className="form-input font-bold" onChange={handleChange} defaultValue="Parcel">
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Medicines">Medicines</option>
                  <option value="Food">Food</option>
                  <option value="Documents">Documents</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Loose Goods">Loose Goods</option>
                  <option value="Parcel">Others / General Parcel</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Package Value (₹) *</label>
                <input name="packageValue" type="number" placeholder="Value in INR" required className="form-input" defaultValue="100" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Weight (kg) *</label>
                <input name="weight" type="number" step="0.1" placeholder="Weight e.g. 0.5" required className="form-input" defaultValue="0.5" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Channel Order ID (Optional)</label>
                <input name="channelOrderId" placeholder="e.g. AM_78361" className="form-input" onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 text-slate-400 italic">Vehicle Category</h2>
                <select name="vehicleType" className="form-input font-black" onChange={handleChange}>
                   <option value="Bike">Bike (0-5 kg)</option>
                   <option value="Auto">Auto (5-50 kg)</option>
                   <option value="Truck">Truck (50+ kg)</option>
                </select>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 text-slate-400 italic">Delivery Operational Speed</h2>
                <select name="deliverySpeed" className="form-input font-black" onChange={handleChange}>
                   <option value="Express">Express (2-3 hrs)</option>
                   <option value="Same Day">Same Day (6-8 hrs)</option>
                   <option value="Scheduled">Scheduled</option>
                </select>
            </div>
          </section>

          {/* Conditional Scheduled Time Picker */}
          {formData.deliverySpeed === 'Scheduled' && (
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-fadeIn">
              <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-4 text-purple-600">
                <Clock size={18}/> Select Scheduled Pickup Date & Time
              </h2>
              <input 
                type="datetime-local" 
                name="scheduledTime" 
                required 
                className="form-input font-bold" 
                onChange={handleChange} 
              />
            </section>
          )}

          {/* Fetch Rates Button UI */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#002D5E] font-black uppercase text-sm">
              <Info size={18}/> Calculate Rates
            </div>
            <button 
              type="button" 
              onClick={handleFetchRatesClick}
              disabled={loading}
              className="bg-blue-600 text-white text-sm font-black uppercase px-6 py-3 rounded-2xl hover:bg-blue-700 transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Checking..." : "Fetch Live Rates"}
            </button>
          </div>

          {/* फक्त वेबहूकवरून आलेले रेट्स इथे दिसतील */}
          {availableRates.length > 0 && (
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 animate-fadeIn">
              <h2 className="font-black uppercase text-xs mb-4 text-blue-600 italic">Select Delivery Service & Rate *</h2>
              <div className="space-y-3">
                {availableRates.map((rate, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedRate(rate)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${selectedRate?.serviceName === rate.serviceName ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div>
                      <h4 className="font-black text-[#002D5E] text-sm">{rate.serviceName || rate.name}</h4>
                      <p className="text-xs text-slate-500 font-bold">Estimated ETA: {rate.eta || "Standard"}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-blue-600">₹{rate.price || rate.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 opacity-60 italic">Payment Method *</h2>
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'Prepaid'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all cursor-pointer ${formData.paymentMethod === 'Prepaid' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>Prepaid</button>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'COD'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all cursor-pointer ${formData.paymentMethod === 'COD' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>Pay On Delivery</button>
              </div>
              
              <button 
                disabled={loading || !selectedRate} 
                className="w-full bg-orange-500 text-white py-5 rounded-2xl font-[950] uppercase tracking-[2px] shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing Order..." : selectedRate ? `Confirm Final Booking (₹{selectedRate.price || selectedRate.rate})` : "Select Service & Rate First"} <ChevronRight size={20}/>
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