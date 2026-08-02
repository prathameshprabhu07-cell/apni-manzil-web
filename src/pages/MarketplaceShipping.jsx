import React, { useState } from 'react';
import { db } from '../firebase'; // तुझ्या प्रोजेक्टमधील फायरबेस कॉन्फिग पाथ तपासून घ्यावा
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ShoppingBag, Package, Truck, MapPin, Phone, Mail, User, Building, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const MarketplaceShipping = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    sellerName: '',
    mobile: '',
    email: '',
    marketplace: 'Amazon',
    pickupAddress: '',
    deliveryAddress: '',
    productName: '',
    weight: '',
    dimensions: '',
    parcelValue: '',
    paymentType: 'Prepaid',
    numberOfParcels: '1'
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
      // फायरबेसमध्ये डेटा सेव्ह करणे
      await addDoc(collection(db, "marketplace_shipments"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      setLoading(false);
      setSuccessMessage('🎉 Your marketplace shipping has been successfully booked! Our team will contact you soon for pickup.');
      
      // फॉर्म रिसेट करणे
      setFormData({
        companyName: '',
        sellerName: '',
        mobile: '',
        email: '',
        marketplace: 'Amazon',
        pickupAddress: '',
        deliveryAddress: '',
        productName: '',
        weight: '',
        dimensions: '',
        parcelValue: '',
        paymentType: 'Prepaid',
        numberOfParcels: '1'
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
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Zap size={16} /> E-Commerce Logistics Aggregator
        </div>
        <h1 className="text-4xl font-extrabold sm:text-5xl text-slate-900 tracking-tight mb-4">
          Marketplace <span className="text-blue-600">Shipping & Fulfillment</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Book fast and secure shipping for all your orders from Amazon, Flipkart, Meesho, Shopify, and WooCommerce from a single dashboard.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Info Panel with Marketplace Image Grid */}
        <div className="md:col-span-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
              <ShoppingBag className="w-7 h-7 text-blue-300" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Fast & Reliable E-Commerce Delivery</h2>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Enjoy best shipping rates, real-time tracking, and hassle-free COD remittances.
            </p>

            {/* Marketplace Brand Badges/Images Preview */}
            <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <p className="text-xs font-semibold text-blue-200 mb-2 uppercase tracking-wider">Supported Platforms</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-800">
                <div className="bg-amber-400 py-1.5 px-2 rounded-lg shadow-sm">Amazon</div>
                <div className="bg-blue-400 py-1.5 px-2 rounded-lg shadow-sm text-white">Flipkart</div>
                <div className="bg-pink-500 py-1.5 px-2 rounded-lg shadow-sm text-white">Meesho</div>
                <div className="bg-emerald-500 py-1.5 px-2 rounded-lg shadow-sm text-white">Shopify</div>
                <div className="bg-purple-600 py-1.5 px-2 rounded-lg shadow-sm text-white">WooCommerce</div>
                <div className="bg-slate-700 py-1.5 px-2 rounded-lg shadow-sm text-white">Others</div>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-blue-700/50 text-sm text-blue-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> All-in-One Marketplace Support
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Doorstep Free Pickup
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Fast COD Refund Cycle
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-blue-700/50 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-300 shrink-0" />
            <span className="text-xs text-blue-200">100% secure parcel handling and tracking facility.</span>
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
            
            {/* Seller & Company Details */}
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
                      placeholder="e.g. Apni Manzil Stores"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Marketplace Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Marketplace Platform</label>
              <select 
                name="marketplace" 
                value={formData.marketplace} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium text-slate-800"
              >
                <option value="Amazon">Amazon</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Meesho">Meesho</option>
                <option value="Shopify">Shopify</option>
                <option value="WooCommerce">WooCommerce</option>
                <option value="Other">Other / Direct Website</option>
              </select>
            </div>

            {/* Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Address (Warehouse / Store)</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea 
                    name="pickupAddress" 
                    rows="2"
                    value={formData.pickupAddress} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter complete pickup address with Pincode"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address (Customer)</label>
                <div className="relative">
                  <Truck className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea 
                    name="deliveryAddress" 
                    rows="2"
                    value={formData.deliveryAddress} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter complete delivery address with Pincode"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Product & Parcel Details */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">2. Product & Parcel Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name</label>
                  <div className="relative">
                    <Package className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      name="productName" 
                      value={formData.productName} 
                      onChange={handleChange} 
                      required 
                      placeholder="e.g. Cotton Kurti"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Weight (kg/gms)</label>
                  <input 
                    type="text" 
                    name="weight" 
                    value={formData.weight} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. 500g or 1.2kg"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dimensions (L x W x H cm)</label>
                  <input 
                    type="text" 
                    name="dimensions" 
                    value={formData.dimensions} 
                    onChange={handleChange} 
                    placeholder="e.g. 20x15x10 cm"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                    placeholder="e.g. 1499"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Mode</label>
                  <select 
                    name="paymentType" 
                    value={formData.paymentType} 
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="Prepaid">Prepaid</option>
                    <option value="COD">COD (Cash on Delivery)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Parcels</label>
                  <input 
                    type="number" 
                    min="1" 
                    name="numberOfParcels" 
                    value={formData.numberOfParcels} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition duration-200 disabled:opacity-50 text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Truck className="w-5 h-5" /> <span>Book Shipping Order</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default MarketplaceShipping;