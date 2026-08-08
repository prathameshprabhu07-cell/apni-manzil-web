import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  ArrowLeft, Truck, Zap, Calendar, FileText,
  Package, Boxes, RefreshCcw, ChevronRight, CheckCircle2, MapPin, User, Search, IndianRupee, Ruler
} from 'lucide-react';

// --- Updated to n8n Production Webhook URL ---
const BACKEND_BASE_URL = 'http://localhost:5678/webhook/apni-manzil-logistics';

const CourierServiceDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [rateCheckLoading, setRateCheckLoading] = useState(false);

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
    weight: '0.5',
    length: '10',
    breadth: '10',
    height: '10',
    parcelType: 'Non-Document',
    productDescription: '',
    declaredValue: '',
    paymentMode: 'Prepaid'
  });

  const subServices = [
    { id: 1, name: "Domestic Courier", desc: "Shipping across India", icon: <Truck className="text-blue-600" size={24}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, name: "Express Courier", desc: "Urgent delivery", icon: <Zap className="text-orange-500" size={24}/>, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Live Rates & Firestore Inquiry Integration ---
  const handleCheckLiveRates = async () => {
    if(!formData.pickupPincode || !formData.dropPincode || !formData.weight) {
      alert("Please fill in the pickup pincode, delivery pincode, and weight!");
      return;
    }

    setRateCheckLoading(true);
    setRates(null);
    setSelectedCourier(null);

    const rateRequestData = {
      action: 'check_rates',
      mobile: formData.senderPhone || '9999999999',
      pickup_pincode: formData.pickupPincode,
      delivery_pincode: formData.dropPincode,
      weight: parseFloat(formData.weight),
      length: parseFloat(formData.length) || 10,
      breadth: parseFloat(formData.breadth) || 10,
      height: parseFloat(formData.height) || 10,
      cod: formData.paymentMode === 'Prepaid' ? 0 : 1,
      product_description: formData.productDescription,
      declared_value: parseFloat(formData.declaredValue) || 0,
      parcel_type: formData.parcelType,
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Save Inquiry to Firebase Firestore
      await addDoc(collection(db, "courier_inquiries"), rateRequestData);

      // 2. Fetch Live Rates from n8n Webhook
      const response = await axios.post(BACKEND_BASE_URL, rateRequestData);
      
      const availableCouriers = response.data?.data?.available_courier_companies || 
                                response.data?.available_courier_companies || 
                                response.data?.data ||
                                response.data;

      if (Array.isArray(availableCouriers) && availableCouriers.length > 0) {
        setRates(availableCouriers);
      } else {
        alert("Currently no service available for this route or weight.");
        setRates(null);
      }
    } catch (error) {
      console.error("Rate Check Error:", error);
      alert("An error occurred while checking rates.");
      setRates(null);
    } finally {
      setRateCheckLoading(false);
    }
  };

  // --- Final Booking (Sending complete data to n8n Webhook) ---
  const handleFinalBooking = async (e) => {
    e.preventDefault();

    if(!selectedCourier) {
      alert("Please select a courier service from the list!");
      return;
    }

    if (!formData.senderName || !formData.senderPhone || !formData.senderAddress || !formData.pickupPincode ||
        !formData.receiverName || !formData.receiverPhone || !formData.receiverAddress || !formData.dropPincode) {
      alert("Please fill in all sender and receiver information.");
      return;
    }

    setLoading(true);

    try {
      const courierId = selectedCourier.courier_company_id || selectedCourier.courierId;
      const courierName = selectedCourier.courier_name || selectedCourier.courierName;
      const courierRate = selectedCourier.rate ?? selectedCourier.price;
      const courierEtd = selectedCourier.etd ?? selectedCourier.tatDays;

      const bookingData = {
        action: 'create_order',
        ...formData,
        courier_id: courierId,
        courier_name: courierName,
        shipping_cost: Math.ceil(parseFloat(courierRate) + 20),
        delivery_date: courierEtd,
        product_description: formData.productDescription,
        declared_value: parseFloat(formData.declaredValue) || 0,
        parcel_type: formData.parcelType,
        timestamp: new Date().toISOString()
      };

      const bookingRes = await axios.post(BACKEND_BASE_URL, bookingData);

      if (bookingRes.status === 200 || bookingRes.data) {
        alert(`Booking Successful! Order placed on Nimbus Post.`);
        navigate('/dashboard');
      } else {
        alert("Booking Failed.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Could not connect to the n8n webhook server.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneInput = (e, fieldName) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({...formData, [fieldName]: val});
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header Banner */}
      <div className="bg-[#002D5E] text-white pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-orange-400 mb-8 font-bold hover:text-orange-300 transition relative z-10 cursor-pointer">
            <ArrowLeft size={20}/> Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Book Your Parcel</h1>
          <p className="text-slate-300 font-medium max-w-xl">Solutions for all delivery "Fastest. Safest. Reliable."</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto -mt-16 px-6 relative z-50">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border-4 border-orange-50">
          <h2 className="text-3xl font-black text-[#002D5E] mb-10 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
            <Package className="text-orange-500" size={32}/> Shipment & Rate Details
          </h2>
          
          <form onSubmit={handleFinalBooking} className="space-y-12">
            {/* 1. Quick Rate Check Section */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 mb-12">
              <h3 className="text-xl font-black text-[#002D5E] mb-6 flex items-center gap-2">
                <IndianRupee size={24} className="text-blue-600"/> 1. Check Rates & Service Availability
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2">Pickup Pincode</label>
                  <input name="pickupPincode" value={formData.pickupPincode} onChange={handleInputChange} required placeholder="Ex. 400001" className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2">Delivery Pincode</label>
                  <input name="dropPincode" value={formData.dropPincode} onChange={handleInputChange} required placeholder="Ex. 110001" className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2">Approx. Weight (Kg)</label>
                  <input name="weight" value={formData.weight} onChange={handleInputChange} required type="number" step="0.1" placeholder="0.5" className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none" />
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 items-end mb-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2 flex items-center gap-1">
                    <Ruler size={14} className="text-orange-500"/> Length (cm)
                  </label>
                  <input name="length" value={formData.length} onChange={handleInputChange} required type="number" step="0.1" placeholder="10" className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2 flex items-center gap-1">
                    <Ruler size={14} className="text-orange-500"/> Breadth (cm)
                  </label>
                  <input name="breadth" value={formData.breadth} onChange={handleInputChange} required type="number" step="0.1" placeholder="10" className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2 flex items-center gap-1">
                    <Ruler size={14} className="text-orange-500"/> Height (cm)
                  </label>
                  <input name="height" value={formData.height} onChange={handleInputChange} required type="number" step="0.1" placeholder="10" className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none" />
                </div>
              </div>

              {/* Product Description & Declared Value Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2">
                    Product Description
                  </label>
                  <input
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex. Masala, Clothes, Electronics"
                    className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 ml-2">
                    Declared Value (₹)
                  </label>
                  <input
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleInputChange}
                    required
                    type="number"
                    min="1"
                    placeholder="Ex. 2000"
                    className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-bold outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={handleCheckLiveRates}
                  disabled={rateCheckLoading}
                  className="w-full sm:w-auto px-8 py-4 h-[56px] bg-blue-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {rateCheckLoading ? <RefreshCcw size={20} className="animate-spin"/> : <Search size={20}/>}
                  {rateCheckLoading ? 'Checking Rates...' : 'Check Rates'}
                </button>
              </div>

              {rates && (
                <div className="mt-8 bg-white p-6 rounded-2xl border border-green-100">
                  <h4 className="font-black text-green-800 uppercase text-sm mb-4">Available Courier Companies:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {rates.map((courier, idx) => {
                      const courierCompanyId = courier.courier_company_id || courier.courierId;
                      const courierName = courier.courier_name || courier.courierName;
                      const courierRate = courier.rate ?? courier.price;
                      const courierEtd = courier.etd ?? courier.tatDays;

                      return (
                        <div 
                          key={idx}
                          onClick={() => setSelectedCourier(courier)}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                            (selectedCourier?.courier_company_id === courierCompanyId || selectedCourier?.courierId === courierCompanyId)
                            ? 'bg-[#002D5E] text-white border-orange-400 shadow-lg scale-[1.02]' 
                            : 'bg-slate-50 border-slate-100'
                          }`}
                        >
                          <div>
                            <p className="font-black text-sm">{courierName}</p>
                            <p className="text-xs mt-1 opacity-80">Est. Delivery: {courierEtd || 'N/A'}</p>
                          </div>
                          <p className="text-2xl font-black mt-3 text-orange-400">₹{Math.ceil(parseFloat(courierRate) + 20)}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* 2. Sender and Receiver Details Form */}
            <div className="pt-10 border-t-2 border-slate-100">
              <h3 className="text-xl font-black text-[#002D5E] mb-6 flex items-center gap-2">
                <CheckCircle2 size={24} className="text-green-500"/> 2. Sender and Receiver Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Sender */}
                <div className="space-y-5 bg-blue-50/50 p-6 md:p-8 rounded-[2rem] border border-blue-100">
                  <h4 className="text-lg font-black text-blue-900 flex items-center gap-2"><User size={18}/> Sender (From)</h4>
                  <input name="senderName" value={formData.senderName} onChange={handleInputChange} required placeholder="Full Name" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" />
                  
                  <div className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden">
                    <span className="bg-slate-100 px-4 py-4 text-slate-500 font-bold border-r">+91</span>
                    <input 
                      name="senderPhone" 
                      value={formData.senderPhone}
                      required 
                      type="tel" 
                      maxLength="10" 
                      placeholder="Mobile Number" 
                      className="w-full p-4 border-none font-bold outline-none" 
                      onChange={(e) => handlePhoneInput(e, 'senderPhone')} 
                    />
                  </div>
                  <input name="pickupPincode" value={formData.pickupPincode} onChange={handleInputChange} required placeholder="Pickup Pincode" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" />
                  <textarea name="senderAddress" value={formData.senderAddress} onChange={handleInputChange} required rows="3" placeholder="Address" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm"></textarea>
                </div>

                {/* Receiver */}
                <div className="space-y-5 bg-orange-50/50 p-6 md:p-8 rounded-[2rem] border border-orange-100">
                  <h4 className="text-lg font-black text-orange-900 flex items-center gap-2"><MapPin size={18}/> Receiver (To)</h4>
                  <input name="receiverName" value={formData.receiverName} onChange={handleInputChange} required placeholder="Full Name" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" />
                  
                  <div className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden">
                    <span className="bg-slate-100 px-4 py-4 text-slate-500 font-bold border-r">+91</span>
                    <input 
                      name="receiverPhone" 
                      value={formData.receiverPhone}
                      required 
                      type="tel" 
                      maxLength="10" 
                      placeholder="Mobile Number" 
                      className="w-full p-4 border-none font-bold outline-none" 
                      onChange={(e) => handlePhoneInput(e, 'receiverPhone')} 
                    />
                  </div>
                  <input name="dropPincode" value={formData.dropPincode} onChange={handleInputChange} required placeholder="Delivery Pincode" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" />
                  <textarea name="receiverAddress" value={formData.receiverAddress} onChange={handleInputChange} required rows="3" placeholder="Address" className="w-full p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm"></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <label className="text-sm font-black text-slate-500 uppercase">Payment Mode:</label>
                <div className="flex gap-2">
                  {['Prepaid', 'COD'].map((mode) => (
                    <button 
                      key={mode}
                      type="button"
                      onClick={() => setFormData({...formData, paymentMode: mode})}
                      className={`px-6 py-2 rounded-full font-black text-xs uppercase cursor-pointer ${formData.paymentMode === mode ? 'bg-[#002D5E] text-white' : 'bg-slate-100 text-slate-400'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-12 py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-3 cursor-pointer"
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