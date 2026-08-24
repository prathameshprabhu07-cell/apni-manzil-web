import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Globe, Plane, User, MapPin, Package, Scale, 
  ArrowLeft, CheckCircle, ChevronRight, Info, DollarSign
} from 'lucide-react';

const InternationalDelivery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  
  // n8n लोकल प्रोडक्शन वेबहूक URL (तुझ्या सूचनेनुसार अपडेट केली आहे)
  const n8nUrl = "http://localhost:5678/webhook/international-courier";

  const [formData, setFormData] = useState({
    // Sender / Pickup Details
    senderName: '', senderMobile: '', pickupAddress: '21 annirudh near suvarna hospital near suvarna', pickupCity: 'Mumbai', pickupState: 'Maharashtra', pickupPincode: '400092',
    
    // International Buyer Details
    country: 'United States', deliveryAddress: '', deliveryPincode: '', state: '', city: '', 
    currency: 'INR', receiverName: '', receiverMobile: '', emailId: '',
    
    // Order & International Clauses
    shipmentPurpose: 'Commercial', orderId: `INT_${Math.floor(100000 + Math.random() * 900000)}`, 
    orderDate: new Date().toISOString().split('T')[0], orderChannel: 'CUSTOM',
    igstPaymentStatus: 'Not Applicable', incoTerms: 'FOB', taxId: '',

    // Product Details
    productName: '', sku: '', unitPrice: '', quantity: '1', hsnCode: '', hsnDescription: '',

    // Payment & Shipping Charges
    shippingCharges: '0', giftWrap: '0', transactionFee: '0', discounts: '0', paymentMethod: 'Prepaid',

    // Package Details (Dead Weight & Dimensions)
    deadWeight: '0.5', length: '10', breadth: '10', height: '10', volumetricWeight: '0.5'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // एकूण अमाऊंट कॅल्क्युलेट करणे
  const calculateTotalValue = () => {
    const price = parseFloat(formData.unitPrice) || 0;
    const qty = parseInt(formData.quantity) || 1;
    const shipping = parseFloat(formData.shippingCharges) || 0;
    const gift = parseFloat(formData.giftWrap) || 0;
    const fee = parseFloat(formData.transactionFee) || 0;
    const discount = parseFloat(formData.discounts) || 0;
    
    const subTotal = (price * qty);
    const total = subTotal + shipping + gift + fee - discount;
    return { subTotal, total: total > 0 ? total : 0 };
  };

  const { subTotal, total } = calculateTotalValue();

  const handleInternationalBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload = {
      ...formData,
      serviceType: "International",
      subTotal,
      totalOrderValue: total,
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      // १. Firebase Firestore मध्ये सेव्ह करणे
      await addDoc(collection(db, "international_bookings"), bookingPayload);

      // २. n8n वेबहूकला डेटा पाठवणे
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
          <h1 className="text-lg font-black italic uppercase tracking-wider">International <span className="text-orange-400">Courier Order</span></h1>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="max-w-3xl mx-auto p-4 pt-8">
        <form onSubmit={handleInternationalBooking} className="space-y-8">
          
          {/* Pickup Address Section */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-4 text-[#002D5E]">
              <MapPin size={18}/> Pickup Address (Verified)
            </h2>
            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-blue-900">Home | 21 annirudh near suvarna hospital near suvarna Mumbai Maharashtra-400092</p>
                <span className="inline-block mt-2 bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Verified</span>
              </div>
            </div>
          </section>

          {/* Delivery Details (Buyer Information) */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-blue-600">
              <Globe size={18}/> Delivery Details (Buyer Information)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Country *</label>
                <input name="country" value={formData.country} onChange={handleChange} required className="form-input" />
              </div>
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
              <input name="receiverName" placeholder="Full Name (Buyer) *" required className="form-input" onChange={handleChange} />
              <input name="receiverMobile" placeholder="Mobile Number *" required className="form-input" onChange={handleChange} />
              <input name="emailId" type="email" placeholder="Email ID *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="deliveryAddress" placeholder="Address Line 1 *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="city" placeholder="City *" required className="form-input" onChange={handleChange} />
              <input name="state" placeholder="State *" required className="form-input" onChange={handleChange} />
              <input name="deliveryPincode" placeholder="Pincode / Zipcode *" required className="form-input md:col-span-2" onChange={handleChange} />
            </div>
          </section>

          {/* Order Details & International Clauses */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-purple-600">
              <Info size={18}/> Order Details & International Clauses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Shipment Purpose *</label>
                <select name="shipmentPurpose" value={formData.shipmentPurpose} onChange={handleChange} className="form-input font-bold">
                  <option value="Commercial">Commercial</option>
                  <option value="Gift">Gift</option>
                  <option value="Sample">Sample</option>
                  <option value="Personal">Personal Use</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Order ID</label>
                <input name="orderId" value={formData.orderId} readOnly className="form-input bg-slate-100 text-slate-500 font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">IGST Payment Status</label>
                <select name="igstPaymentStatus" value={formData.igstPaymentStatus} onChange={handleChange} className="form-input font-bold">
                  <option value="Not Applicable">A - Not Applicable</option>
                  <option value="LUT or Export">B - LUT or Export under Bond</option>
                  <option value="Against Payment">C - Export Against Payment of IGST</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Inco Terms</label>
                <select name="incoTerms" value={formData.incoTerms} onChange={handleChange} className="form-input font-bold">
                  <option value="FOB">FOB (Free On Board)</option>
                  <option value="CIF">CIF (Cost, Insurance, and Freight)</option>
                </select>
              </div>
              <input name="taxId" placeholder="Tax ID / VAT Number (Optional)" className="form-input md:col-span-2" onChange={handleChange} />
            </div>
          </section>

          {/* Product Details */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-amber-600">
              <Package size={18}/> Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="productName" placeholder="Product 1 Name *" required className="form-input md:col-span-2" onChange={handleChange} />
              <input name="sku" placeholder="SKU *" required className="form-input" onChange={handleChange} />
              <input name="hsnCode" placeholder="HSN Code *" required className="form-input" onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Unit Price ({formData.currency}) *</label>
                <input name="unitPrice" type="number" placeholder="0.00" required className="form-input" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Quantity *</label>
                <input name="quantity" type="number" min="1" value={formData.quantity} required className="form-input" onChange={handleChange} />
              </div>
              <input name="hsnDescription" placeholder="HSN Description (Optional)" className="form-input md:col-span-2" onChange={handleChange} />
            </div>
          </section>

          {/* Package Weight & Dimensions */}
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h2 className="flex items-center gap-2 font-black uppercase text-sm mb-6 text-indigo-600">
              <Scale size={18}/> Package Dimensions & Weight
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Dead Weight (Kg)</label>
                <input name="deadWeight" type="number" step="0.01" value={formData.deadWeight} required className="form-input" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Length (CM)</label>
                <input name="length" type="number" value={formData.length} required className="form-input" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Breadth (CM)</label>
                <input name="breadth" type="number" value={formData.breadth} required className="form-input" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase italic">Height (CM)</label>
                <input name="height" type="number" value={formData.height} required className="form-input" onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* Summary & Submit */}
          <section className="bg-[#002D5E] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h2 className="font-black uppercase text-xs opacity-70 tracking-widest">Order Summary</h2>
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>Sub-total for Product:</span>
                <span className="font-bold">{formData.currency} {subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-2 text-orange-400">
                <span>Total Order Value:</span>
                <span>{formData.currency} {total.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-blue-200 italic">* Note: Payment method for International Orders is strictly Prepaid.</p>
              
              <button 
                disabled={loading} 
                className="w-full mt-4 bg-orange-500 text-white py-5 rounded-2xl font-[950] uppercase tracking-[2px] shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing International Order..." : `Book International Courier (${formData.currency} ${total.toFixed(2)})`} <ChevronRight size={20}/>
              </button>
            </div>
            <Plane className="absolute -bottom-12 -right-12 text-white/5" size={280}/>
          </section>

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