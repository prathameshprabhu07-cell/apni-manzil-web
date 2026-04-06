import React, { useState, useEffect } from 'react';
import { X, MapPin, Package, Calendar, Loader2, Info } from 'lucide-react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAllShippingRates } from '../services/shippingService';

const BookingForm = ({ serviceName, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [courierRates, setCourierRates] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    weight: '0.5',
    date: ''
  });

  // १. पिनकोड बदलल्यावर रेट्स चेक करणे
  useEffect(() => {
    const fetchRates = async () => {
      if (formData.pickup.length === 6 && formData.drop.length === 6) {
        setRatesLoading(true);
        const data = await getAllShippingRates(formData.pickup, formData.drop, formData.weight);
        setCourierRates(data);
        setRatesLoading(false);
      }
    };
    fetchRates();
  }, [formData.pickup, formData.drop, formData.weight]);

  // २. Razorpay पेमेंट फंक्शन
  const handlePayment = (amount, bookingId) => {
    const options = {
      key: "rzp_live_SaHG507xstegnT", // तुझी LIVE KEY
      amount: amount * 100,
      currency: "INR",
      name: "Apni Manzil",
      description: `Shipping for ${serviceName}`,
      handler: async function (response) {
        alert("✅ पेमेंट यशस्वी! तुमची ऑर्डर बुक झाली आहे.");
        onClose();
      },
      prefill: {
        name: "Customer",
        email: "contact@apnimanzil.co.in",
        contact: "7378502356"
      },
      theme: { color: "#001D3D" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ३. फॉर्म सबमिट आणि फायरबेस एंट्री
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourier) return alert("कृपया कुरियर पार्टनर निवडा!");

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        serviceType: serviceName,
        pickupAddress: formData.pickup,
        dropAddress: formData.drop,
        dimensions: formData.weight,
        pickupDate: formData.date,
        courierName: selectedCourier.name,
        price: selectedCourier.rate,
        status: "Payment Pending",
        createdAt: serverTimestamp(),
      });

      // पेमेंट खिडकी उघडा
      handlePayment(selectedCourier.rate, docRef.id);
    } catch (error) {
      alert("❌ एरर: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative border-t-[8px] border-[#FF5E00] my-8 animate-in zoom-in duration-200">
        
        <button type="button" onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#001D3D] uppercase italic">Book {serviceName}</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">AI Logistics Search Active</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Pickup Pincode</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18}/>
                <input required maxLength={6} value={formData.pickup} onChange={(e) => setFormData({...formData, pickup: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm" placeholder="e.g. 411001" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Drop Pincode</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-[#FF5E00]" size={18}/>
                <input required maxLength={6} value={formData.drop} onChange={(e) => setFormData({...formData, drop: e.target.value})} className="w-full p-4 pl-12 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm" placeholder="e.g. 400001" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Weight (KG)</label>
              <select value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} className="p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm">
                <option value="0.5">0.5 KG</option>
                <option value="1">1 KG</option>
                <option value="5">5 KG</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Pickup Date</label>
              <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-[#FF5E00] text-sm" />
            </div>
          </div>

          {/* Rate Comparison Section */}
          <div className="mt-8">
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 ml-2 flex items-center gap-2">
              <Info size={12}/> Select Courier Partner
            </h3>
            
            {ratesLoading ? (
              <div className="flex items-center justify-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed">
                <Loader2 className="animate-spin text-[#FF5E00] mr-2" size={20} />
                <span className="text-[10px] font-black uppercase text-slate-500">Searching Best Rates...</span>
              </div>
            ) : courierRates.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 max-h-[200px] overflow-y-auto pr-2">
                {courierRates.map((courier, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedCourier(courier)}
                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all 
                      ${selectedCourier?.name === courier.name ? 'border-[#FF5E00] bg-orange-50' : 'border-slate-100 bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Package size={20} className="text-[#001D3D]"/>
                      <div>
                        <p className="text-xs font-black uppercase">{courier.name}</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase italic">Est: {courier.etd}</p>
                      </div>
                    </div>
                    <p className="text-lg font-black text-[#FF5E00]">₹{courier.rate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-50 rounded-3xl text-[10px] font-black text-slate-400 uppercase italic">
                Enter Pincodes to see Rates
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase text-xs">Cancel</button>
            <button 
              type="submit" 
              disabled={loading || !selectedCourier}
              className={`flex-[2] text-white py-4 rounded-2xl font-black uppercase text-xs shadow-xl flex justify-center items-center gap-2 
                ${!selectedCourier ? 'bg-slate-300' : 'bg-[#001D3D] hover:bg-[#FF5E00]'}`}
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Pay & Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;