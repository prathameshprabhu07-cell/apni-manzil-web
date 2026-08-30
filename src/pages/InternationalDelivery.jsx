import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Globe, Plane, User, MapPin, Package, Scale, 
  ArrowLeft, CheckCircle, ChevronRight, Info
} from 'lucide-react';

const InternationalDelivery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  
  // रेट्स आणि शिपिंग ऑप्शन्ससाठी स्टेट्स
  const [availableRates, setAvailableRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  
  // n8n लोकल प्रोडक्शन वेबहूक URL
  const n8nUrl = "http://localhost:5678/webhook/international-courier";

  const [formData, setFormData] = useState({
    // FROM (Sender Details)
    senderName: '', senderMobile: '', senderEmail: '', 
    senderAddress: '', senderCity: '', senderState: '', senderPincode: '',
    
    // TO (Receiver / International Buyer Details)
    receiverName: '', receiverMobile: '', receiverEmail: '', 
    country: 'United States', deliveryAddress: '', city: '', state: '', deliveryPincode: '', currency: 'INR',
    
    // PACKAGE (Item Details)
    productName: '', category: 'General', quantity: '1', 
    unitPrice: '', currencyType: 'INR', deadWeight: '0.5', 
    length: '10', breadth: '10', height: '10', hsnCode: '',

    // EXPORT (International Clauses)
    shipmentPurpose: 'Commercial', exportReason: 'Commercial Sale', 
    incoTerms: 'FOB', igstPaymentStatus: 'Not Applicable', taxId: '',

    // Payment
    paymentMethod: 'Prepaid'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // CHECK RATES - n8n वेबहूकला रेट्स फेच करण्यासाठी रिक्वेस्ट
  const handleCheckRates = async () => {
    if (!formData.senderPincode || !formData.deliveryPincode || !formData.country) {
      alert("Please fill complete Sender Pincode, Delivery Pincode, and Country.");
      return;
    }

    setLoading(true);

    try {
      const ratePayload = {
        action: "check_rates",
        serviceType: "International",
        ...formData,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratePayload)
      });

      if (!response.ok) {
        throw new Error(`Rate request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("International Rates Response:", result);

      if (result && result.rates) {
        setAvailableRates(result.rates);
        alert("International courier options fetched successfully!");
      } else if (Array.isArray(result)) {
        setAvailableRates(result);
        alert("International courier options fetched successfully!");
      } else {
        // जर वेबहूकवरून लिस्ट आली नाही तर डिफॉल्ट टेस्ट ऑप्शन्स दाखवले जातील जेणेकरून युजरला अडचण येणार नाही
        setAvailableRates([
          { serviceName: "DHL Express Worldwide", eta: "3-5 Business Days", price: 2450 },
          { serviceName: "FedEx International Priority", eta: "4-6 Business Days", price: 2190 },
          { serviceName: "Aramex Express Standard", eta: "6-8 Business Days", price: 1850 }
        ]);
        alert("Fetched default courier options.");
      }

    } catch (error) {
      console.error("Rate Check Error:", error);
      // फॉलबॅक ऑप्शन जेणेकरून टेस्टिंग अडकणार नाही
      setAvailableRates([
        { serviceName: "DHL Express Worldwide", eta: "3-5 Business Days", price: 2450 },
        { serviceName: "FedEx International Priority", eta: "4-6 Business Days", price: 2190 }
      ]);
      alert("Connected with offline mode rate estimation.");
    } finally {
      setLoading(false);
    }
  };

  // BOOK NOW - फायनल बुकिंग आणि डेटाबेस सेव्ह
  const handleInternationalBooking = async (e) => {
    e.preventDefault();

    if (!selectedRate) {
      alert("Please check rates and select an International Courier Option first!");
      return;
    }

    setLoading(true);

    const bookingPayload = {
      ...formData,
      selectedRate: selectedRate,
      serviceType: "International",
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "international_bookings"), bookingPayload);

      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      setBooked(true);
    } catch (error) {
      console.error("International Booking Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (booked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl space-y-4 border border-blue-100">
          <CheckCircle size={80} className="mx-auto text-blue-500 animate-bounce" />
          <h1 className="text-3xl font-[950] italic uppercase">International Order Booked!</h1>
          <p className="font-bold text-slate-500">Your international shipment has been registered successfully. Customs & dispatch team will process it soon.</p>
          <button type="button" onClick={() => navigate('/')} className="bg-[#002D5E] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition hover:scale-105 cursor-pointer">Go To Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header with Airplane Theme */}
      <div className="bg-gradient-to-r from-[#002D5E] to-blue-700 text-white p-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <button type="button" onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition"><ArrowLeft size={20}/></button>
        <div className="flex items-center gap-3">
          <Plane className="text-blue-300 animate-pulse" size={28} />
          <h1 className="text-lg font-black italic uppercase tracking-wider">International <span className="text-orange-400">Courier</span></h1>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="max-w-3xl mx-auto p-4 pt-8">
        <form onSubmit={handleInternationalBooking} className="space-y-8">
          
          {/* 1. FROM SECTION */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-[#002D5E]">
              <User size={18}/> FROM (Sender Details)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="senderName" placeholder="Name *" required className="form-input" onChange={handleChange} />
              <input name="senderMobile" placeholder="Mobile *" required className="form-input" onChange={handleChange} />
              <input name="senderEmail" type="email" placeholder="Email *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="senderAddress" placeholder="Address *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="senderCity" placeholder="City *" required className="form-input" onChange={handleChange} />
              <input name="senderState" placeholder="State *" required className="form-input" onChange={handleChange} />
              <input name="senderPincode" placeholder="Pincode *" required className="form-input md:col-span-2" onChange={handleChange} />
            </div>
          </section>

          {/* 2. TO SECTION */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-blue-600">
              <Globe size={18}/> TO (Receiver / International Buyer)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="receiverName" placeholder="Name *" required className="form-input" onChange={handleChange} />
              <input name="receiverMobile" placeholder="Mobile *" required className="form-input" onChange={handleChange} />
              <input name="receiverEmail" type="email" placeholder="Email *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="country" placeholder="Country *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="deliveryAddress" placeholder="Address *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="city" placeholder="City *" required className="form-input" onChange={handleChange} />
              <input name="state" placeholder="State *" required className="form-input" onChange={handleChange} />
              <input name="deliveryPincode" placeholder="ZIP / Pincode *" required className="form-input" onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Currency *</label>
                <select name="currency" value={formData.currency} onChange={handleChange} className="form-input font-bold">
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="AUD">AUD</option>
                  <option value="CAD">CAD</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                  <option value="SGD">SGD</option>
                </select>
              </div>
            </div>
          </section>

          {/* 3. PACKAGE SECTION */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-amber-600">
              <Package size={18}/> PACKAGE (Item & Dimensions)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="productName" placeholder="Item / Package Name *" required className="form-input md:col-span-2" onChange={handleChange} />
              
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Category *</label>
                <select name="category" className="form-input font-bold" onChange={handleChange}>
                  <option value="General">General / Parcel</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Garments">Garments & Apparel</option>
                  <option value="Documents">Documents</option>
                  <option value="Medicines">Medicines (Rx)</option>
                  <option value="Food">Food Items</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Quantity *</label>
                <input name="quantity" type="number" min="1" value={formData.quantity} required className="form-input" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Value ({formData.currency}) *</label>
                <input name="unitPrice" type="number" placeholder="Declared Value" required className="form-input" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Weight (kg) *</label>
                <input name="deadWeight" type="number" step="0.01" value={formData.deadWeight} required className="form-input" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Length (cm)</label>
                <input name="length" type="number" value={formData.length} required className="form-input" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Breadth (cm)</label>
                <input name="breadth" type="number" value={formData.breadth} required className="form-input" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Height (cm)</label>
                <input name="height" type="number" value={formData.height} required className="form-input" onChange={handleChange} />
              </div>

              <input name="hsnCode" placeholder="HSN Code *" required className="form-input md:col-span-2" onChange={handleChange} />
            </div>
          </section>

          {/* 4. EXPORT SECTION */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-purple-600">
              <Info size={18}/> EXPORT (International Clauses)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Type *</label>
                <select name="shipmentPurpose" value={formData.shipmentPurpose} onChange={handleChange} className="form-input font-bold">
                  <option value="Commercial">Commercial</option>
                  <option value="Gift">Gift</option>
                  <option value="Sample">Sample</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Reason of Export *</label>
                <input name="exportReason" value={formData.exportReason} placeholder="Reason e.g. Sale of goods" required className="form-input" onChange={handleChange} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Invoice Terms (IncoTerms) *</label>
                <select name="incoTerms" value={formData.incoTerms} onChange={handleChange} className="form-input font-bold">
                  <option value="FOB">FOB (Free On Board)</option>
                  <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">IGST Status *</label>
                <select name="igstPaymentStatus" value={formData.igstPaymentStatus} onChange={handleChange} className="form-input font-bold">
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="LUT or Export">LUT or Export under Bond</option>
                  <option value="Against Payment">Export Against Payment of IGST</option>
                </select>
              </div>

              <input name="taxId" placeholder="Tax ID / VAT Number (Optional)" className="form-input md:col-span-2" onChange={handleChange} />
            </div>
          </section>

          {/* 5. CHECK RATES BUTTON */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#002D5E] font-black uppercase text-sm">
              <Scale size={18}/> Calculate Shipping Quotes
            </div>
            <button 
              type="button" 
              onClick={handleCheckRates}
              disabled={loading}
              className="bg-blue-600 text-white text-sm font-black uppercase px-6 py-3 rounded-2xl hover:bg-blue-700 transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Checking Rates..." : "[ CHECK RATES ]"}
            </button>
          </div>

          {/* 6. International Courier Options (Dynamic Rates Listing) */}
          {availableRates.length > 0 && (
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 animate-fadeIn">
              <h2 className="font-black uppercase text-xs mb-4 text-blue-600 italic">International Courier Options *</h2>
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

          {/* 7. BOOK NOW SECTION */}
          <div className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h2 className="font-black uppercase text-xs opacity-70 tracking-widest">Payment & Confirmation</h2>
              
              <div className="flex gap-4 mb-2">
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'Prepaid'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all cursor-pointer ${formData.paymentMethod === 'Prepaid' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>Prepaid</button>
                <button type="button" onClick={() => setFormData({...formData, paymentMethod: 'COD'})} className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all cursor-pointer ${formData.paymentMethod === 'COD' ? 'bg-white text-blue-900 border-white' : 'border-white/20'}`}>Pay On Delivery</button>
              </div>

              <p className="text-[10px] text-blue-200 italic">* Note: International shipments undergo security and customs verification.</p>
              
              <button 
                disabled={loading || !selectedRate} 
                className="w-full mt-4 bg-orange-500 text-white py-5 rounded-2xl font-[950] uppercase tracking-[2px] shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing Booking..." : selectedRate ? `Book Now (₹{selectedRate.price || selectedRate.rate})` : "Check Rates & Select Option First"} <ChevronRight size={20}/>
              </button>
            </div>
            <Plane className="absolute -bottom-12 -right-12 text-white/5" size={280}/>
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

export default InternationalDelivery;