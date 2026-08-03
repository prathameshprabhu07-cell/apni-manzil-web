import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Package, Building2, User, Phone, Mail, MapPin, Layers, BarChart2, Thermometer, CheckCircle2, Loader2 } from 'lucide-react';

function StockManagement() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    warehouseLocation: '',
    productCategory: '',
    numberOfSkus: '',
    totalStockQuantity: '',
    totalStorageSpace: '',
    avgMonthlyInward: '',
    avgMonthlyOutward: '',
    barcodeAvailable: 'Yes',
    temperatureRequirement: 'Normal'
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "stock_management_leads"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setLoading(false);
      setSuccessMessage(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        mobile: '',
        email: '',
        warehouseLocation: '',
        productCategory: '',
        numberOfSkus: '',
        totalStockQuantity: '',
        totalStorageSpace: '',
        avgMonthlyInward: '',
        avgMonthlyOutward: '',
        barcodeAvailable: 'Yes',
        temperatureRequirement: 'Normal'
      });
      setTimeout(() => setSuccessMessage(false), 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
          <div className="relative z-10 max-w-xl">
            <span className="bg-blue-500/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-md">
              E-Commerce Sub-Service
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Stock & Inventory Management
            </h1>
            <p className="text-blue-100 text-base md:text-lg opacity-90 leading-relaxed">
              Optimize your stock levels, reduce holding costs, and streamline your warehouse operations seamlessly.
            </p>
          </div>
          <div className="mt-6 md:mt-0 relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
              <Package className="w-12 h-12 md:w-16 md:h-16 text-blue-300 animate-pulse" />
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Request Submitted Successfully!</h4>
              <p className="text-sm">Our logistics expert will get in touch with you shortly.</p>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-800 border-b pb-4 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" /> Enter Your Requirement Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Acme Retail Pvt Ltd"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Person *</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 9876543210"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. rahul@company.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Warehouse Location Required */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Warehouse Location Required *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="warehouseLocation"
                    value={formData.warehouseLocation}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Bhiwandi, Mumbai"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Product Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Category *</label>
                <div className="relative">
                  <Package className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Apparel, Electronics"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Number of SKUs */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of SKUs *</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="numberOfSkus"
                    value={formData.numberOfSkus}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 500"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Total Stock Quantity */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Stock Quantity *</label>
                <div className="relative">
                  <BarChart2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    name="totalStockQuantity"
                    value={formData.totalStockQuantity}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 10000"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              {/* Total Storage Space Required */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Storage Space Required *</label>
                <input
                  type="text"
                  name="totalStorageSpace"
                  value={formData.totalStorageSpace}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 1500 sq.ft."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Average Monthly Inward */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Average Monthly Inward *</label>
                <input
                  type="text"
                  name="avgMonthlyInward"
                  value={formData.avgMonthlyInward}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2000 units"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Average Monthly Outward */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Average Monthly Outward *</label>
                <input
                  type="text"
                  name="avgMonthlyOutward"
                  value={formData.avgMonthlyOutward}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 1800 units"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              {/* Barcode Available? */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Barcode Available? *</label>
                <select
                  name="barcodeAvailable"
                  value={formData.barcodeAvailable}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Temperature Requirement */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Temperature Requirement *</label>
                <div className="relative">
                  <Thermometer className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <select
                    name="temperatureRequirement"
                    value={formData.temperatureRequirement}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  >
                    <option value="Normal">Normal Storage</option>
                    <option value="Cold Storage">Cold Storage</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" /> Submitting Request...
                  </>
                ) : (
                  <>Submit Stock Management Request</>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default StockManagement;