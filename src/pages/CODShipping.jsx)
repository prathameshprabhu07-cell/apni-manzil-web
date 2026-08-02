import React, { useState } from 'react';
import { db } from '../firebase'; // तुमच्या प्रोजेक्टमधील फायरबेस कॉन्फिग पाथ
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Wallet, Package, Truck, MapPin, Phone, Mail, User, Building, Landmark, Receipt, CheckCircle2, ShieldCheck, Banknote } from 'lucide-react';

const CODShipping = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    sellerName: '',
    mobile: '',
    email: '',
    pickupAddress: '',
    deliveryAddress: '',
    parcelWeight: '',
    parcelValue: '',
    codAmount: '',
    bankAccount: '',
    gstNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      // फायरबेसमध्ये 'cod_shipments' कलेक्शनमध्ये डेटा सेव्ह करणे
      await addDoc(collection(db, "cod_shipments"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      setLoading(false);
      setSuccessMessage('🎉 Your COD Shipping order has been successfully booked! Our team will verify your details and arrange a pickup.');
      
      // फॉर्म रिसेट करणे
      setFormData({
        companyName: '',
        sellerName: '',
        mobile: '',
        email: '',
        pickupAddress: '',
        deliveryAddress: '',
        parcelWeight: '',
        parcelValue: '',
        codAmount: '',
        bankAccount: '',
        gstNumber: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
      alert('Some technical error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Banner Section */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Banknote size={16} /> Secure Cash on Delivery Logistics
        </div>
        <h1 className="text-4xl font-extrabold sm:text-5xl text-slate-900 tracking-tight mb-4">
          COD <span className="text-emerald-600">Shipping & Fast Remittance</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ship your products with Cash on Delivery (COD) payment mode and get direct, lightning-fast settlements straight to your bank account.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Info Panel with Images & Security Trust Badges */}
        <div className="md:col-span-4 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
              <Wallet className="w-7 h-7 text-emerald-300" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Guaranteed COD Remittance</h2>
            <p className="text-emerald-200 text-sm leading-relaxed mb-6">
              Zero hassle, automated tracking, and direct bank transfers within 24-48 hours of successful customer delivery.
            </p>

            {/* Feature Highlights Card */}
            <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 24-48 Hours Payout Cycle
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 100% Secure Bank Settlement
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Instant NDR & Verification Support
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-emerald-700/50 text-sm text-emerald-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct Account Deposit
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Transparent Ledger Reports
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-emerald-700/50 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-300 shrink-0" />
            <span className="text-xs text-emerald-200">Bank-grade encryption for all your financial and order data.</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:col-span-8 p-8 sm:p-10">
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Seller & Company Details */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">1. Seller & Company Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      name="companyName" 
                      value={formData.companyName} 
                      onChange={handleChange} 
                      required 
                      placeholder="e.g. Apni Manzil Enterprises"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Seller Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      name="sellerName" 
                      value={formData.sellerName} 
                      onChange={handleChange} 
                      required 
                      placeholder="Your Full Name"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="tel" 
                      name="mobile" 
                      value={formData.mobile} 
                      onChange={handleChange} 
                      required 
                      placeholder="9898989898"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      placeholder="seller@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Pickup & Delivery Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea 
                    name="pickupAddress" 
                    rows="2"
                    value={formData.pickupAddress} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter complete pickup address with Pincode"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address</label>
                <div className="relative">
                  <Truck className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea 
                    name="deliveryAddress" 
                    rows="2"
                    value={formData.deliveryAddress} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter complete customer address with Pincode"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 3. Parcel & COD Financial Details */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">2. Parcel & COD Financial Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parcel Weight</label>
                  <input 
                    type="text" 
                    name="parcelWeight" 
                    value={formData.parcelWeight} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. 500g or 1.5kg"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parcel Value (₹)</label>
                  <input 
                    type="number" 
                    name="parcelValue" 
                    value={formData.parcelValue} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. 1999"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">COD Amount (₹)</label>
                  <input 
                    type="number" 
                    name="codAmount" 
                    value={formData.codAmount} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. 1999 (Cash to collect)"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-bold text-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* 4. Settlement Bank Account & GST */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">3. Bank Settlement & Tax Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Account / UPI ID (For COD Settlement)</label>
                  <div className="relative">
                    <Landmark className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      name="bankAccount" 
                      value={formData.bankAccount} 
                      onChange={handleChange} 
                      required 
                      placeholder="Account No / IFSC or UPI ID"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GST Number (Optional)</label>
                  <div className="relative">
                    <Receipt className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      name="gstNumber" 
                      value={formData.gstNumber} 
                      onChange={handleChange} 
                      placeholder="e.g. 27AAAAA0000A1Z5"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition duration-200 disabled:opacity-50 text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <Truck className="w-5 h-5" /> <span>Book COD Shipping Order</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default CODShipping;