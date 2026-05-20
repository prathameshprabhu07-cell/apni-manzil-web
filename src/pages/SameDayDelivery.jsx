import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  User, MapPin, Package, Truck, Clock, 
  CreditCard, ArrowLeft, CheckCircle, ChevronRight, Info
} from 'lucide-react';

const SameDayDelivery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingRates, setFetchingRates] = useState(false);
  const [booked, setBooked] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  
  // State to hold live calculated rates from all 3 API aggregators
  const [partners, setPartners] = useState([
    { id: 'borzo', name: 'Borzo (WeFast)', price: 'Enter details to fetch', status: 'Pending' },
    { id: 'dunzo', name: 'Dunzo For Business', price: 'Coming Soon', status: 'Unavailable' },
    { id: 'shadowfax', name: 'Shadowfax Local', price: 'Coming Soon', status: 'Unavailable' }
  ]);

  // Form State Configuration
  const [formData, setFormData] = useState({
    senderName: '', senderMobile: '', pickupAddress: '', pickupPincode: '',
    receiverName: '', receiverMobile: '', deliveryAddress: '', deliveryPincode: '',
    packageType: 'Parcel', weight: '', size: 'Small',
    vehicleType: 'Bike', deliverySpeed: 'Same Day', paymentMethod: 'Prepaid'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to call our backend API and get real-time rates
  const fetchLiveRates = async () => {
    if (!formData.pickupPincode || !formData.deliveryPincode || !formData.pickupAddress || !formData.deliveryAddress) {
      alert("Please fill complete pickup and delivery addresses to calculate rates.");
      return;
    }

    setFetchingRates(true);
    try {
      const response = await fetch('http://localhost:5000/api/hyperlocal/borzo-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update the state with live price received from Borzo API
        setPartners([
          { id: 'borzo', name: 'Borzo (WeFast)', price: `₹${result.delivery_fee}`, status: 'Available' },
          { id: 'dunzo', name: 'Dunzo For Business', price: 'Coming Soon', status: 'Unavailable' },
          { id: 'shadowfax', name: 'Shadowfax Local', price: 'Coming Soon', status: 'Unavailable' }
        ]);
      } else {
        alert(result.message || "Could not fetch rates for this specific route.");
      }
    } catch (error) {
      console.error("Failed fetching live hyperlocal rates:", error);
      alert("Backend connectivity issue. Please check your local server configuration.");
    } finally {
      setFetchingRates(false);
    }
  };

  const handleFinalBooking = async (e) => {
    e.preventDefault();
    
    if (!selectedPartner || selectedPartner.status === 'Unavailable') {
      return alert("Please select an active and available courier partner to proceed.");
    }

    setLoading(true);
    try {
      // Saving final structure into Firebase Firestore Database
      await addDoc(collection(db, "same_day_bookings"), {
        ...formData,
        courierPartner: selectedPartner.name,
        finalPrice: selectedPartner.price,
        status: "Pending",
        timestamp: new Date()
      });
      setBooked(true);
    } catch (error) {
      alert("Error saving booking: " + error.message);
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
          <button onClick={() => navigate('/')} className="bg-[#002D5E] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition hover:scale-105">Go To Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header Panel */}
      <div className="bg-black text-white p-6 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full"><ArrowLeft size={20}/></button>
        <h1 className="text-lg font-black italic uppercase tracking-tighter">Same Day <span className="text-blue-400">Booking Form</span></h1>
        <div className="w-10"></div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-8">
        <form onSubmit={handleFinalBooking} className="space-y-8">
          
          {/* 👤 SECTION 1: SENDER DETAILS */}
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

          {/* 📦 SECTION 2: RECEIVER DETAILS */}
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

          {/* 📦 SECTION 3: PARCEL DETAILS */}
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

          {/* 🚚 SECTION 4: VEHICLE & LOGISTICS ROUTING CONFIGURATION */}
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
                  <option>Express (2-3 hrs)</option>
                  <option>Same Day (6-8 hrs)</option>
                  <option>Scheduled</option>
               </select>
            </div>
          </section>

          {/* 🛠️ SECTION 5: LIVE COURIER PARTNER PRICE COMPARISON MATRIX */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="flex items-center gap-2 font-black uppercase text-sm text-[#002D5E]">
                <Info size={18}/> 5. Compare & Select Delivery Fleet
              </h2>
              <button 
                type="button" 
                onClick={fetchLiveRates}
                disabled={fetchingRates}
                className="bg-blue-600 text-white text-xs font-black uppercase px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                {fetchingRates ? "Calculating..." : "Fetch Live Rates"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  onClick={() => partner.status === 'Available' && setSelectedPartner(partner)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all 
                    ${partner.status === 'Unavailable' ? 'opacity-50 cursor-not-allowed bg-slate-100 border-transparent' : 'cursor-pointer'}
                    ${selectedPartner?.id === partner.id ? 'border-orange-500 bg-orange-50/50' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-xs shadow-sm border border-slate-100 uppercase italic">
                      {partner.id.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight text-slate-800">{partner.name}</p>
                      <p className={`text-[9px] font-bold uppercase ${partner.status === 'Available' ? 'text-green-600' : 'text-slate-400'}`}>{partner.status}</p>
                    </div>
                  </div>
                  <p className="text-base font-black text-orange-500">{partner.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 💰 SECTION 6: FINANCIAL SETTLEMENT & SUBMITTALS */}
          <div className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="flex items-center gap-2 font-black uppercase text-[10px] mb-4 opacity-60 italic">Payment Verification Method</h2>
              <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'Prepaid'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${formData.paymentMethod === 'Prepaid' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>Prepaid</button>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'COD'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${formData.paymentMethod === 'COD' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>COD</button>
              </div>
              <button disabled={loading} className="w-full bg-orange-500 text-white py-5 rounded-2xl font-[950] uppercase tracking-[2px] shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-3 active:scale-95">
                {loading ? "Processing Order..." : "Confirm Final Hyperlocal Booking"} <ChevronRight size={20}/>
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