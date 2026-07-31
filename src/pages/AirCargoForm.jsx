import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, ArrowLeft, ShieldCheck } from 'lucide-react';
import { sendWhatsAppNotification } from '../utils/whatsapp';

const AirCargoForm = () => {
  const navigate = useNavigate();
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

  const [formData, setFormData] = useState({
    // 1. Shipper
    shipperName: '', shipperContact: '', shipperMobile: '', shipperEmail: '', 
    shipperAddress: '', shipperGst: '', shipperPan: '', shipperIec: '',
    
    // 2. Consignee
    consigneeName: '', consigneeContact: '', consigneeMobile: '', consigneeEmail: '', 
    consigneeAddress: '', consigneeCity: '', consigneeCountry: '', consigneePostal: '',
    
    // 3. Shipment Info
    shipmentType: 'General Cargo', commodityName: '', packages: '', 
    weight: '', length: '', width: '', height: '',
    
    // 4. Cargo Value
    declaredValue: '', currency: 'INR', insurance: 'No',
    
    // 5. Origin & Destination
    pickupAddress: '', pickupAirport: '', destinationAirport: '', deliveryAddress: '',
    
    // 6. Service Type
    serviceType: 'Door to Door',
    
    // 7. Special Requirements
    tempControlled: false, fragile: false, keepUpright: false, 
    stackNotAllowed: false, expressService: false, priorityHandling: false,
    
    // 8. Documents Checklist info flags
    hasInvoice: false, hasPackingList: false, hasEwayBill: false, 
    hasKyc: false, hasIecDoc: false, hasMsds: false, hasDrugLicense: false, hasFssai: false,

    // 9. Customs
    customsType: 'Export', hsCode: '', countryOfOrigin: 'India', purpose: 'Sale',
    
    // 10. Flight Preference
    flightPreference: 'Earliest Available Flight', specificAirline: '', preferredDate: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderId = "AIR-CARGO-" + Math.floor(Math.random() * 100000);
    const serviceTitle = `Air Cargo (${formData.shipmentType}) - To: ${formData.destinationAirport}`;

    const bookingPayload = {
      orderId,
      serviceTitle,
      ...formData,
      timestamp: new Date().toISOString()
    };

    // Send WhatsApp Notification
    sendWhatsAppNotification(formData.shipperMobile, formData.shipperName || "Shipper", serviceTitle, orderId);

    // Send to n8n webhook
    try {
      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });
    } catch (error) {
      console.error("Webhook error:", error);
    }

    setLoading(false);
    alert(`Air Cargo Booking Request ${orderId} submitted successfully!`);
    navigate('/special-logistics');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-12 px-6 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col items-start">
          <button 
            onClick={() => navigate('/special-logistics')} 
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm font-bold cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Special Logistics
          </button>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            <Plane size={42} className="text-yellow-300" /> Air Cargo Shipping Booking Form
          </h1>
          <p className="text-blue-100 mt-2 font-medium">Complete details below for domestic & international air freight processing.</p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="max-w-5xl mx-auto px-6 -mt-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 space-y-10">
          
          {/* 1. Shipper (Sender) */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>1.</span> Shipper (Sender) Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Company / Full Name *</label>
                <input type="text" name="shipperName" required value={formData.shipperName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Sender name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Person</label>
                <input type="text" name="shipperContact" value={formData.shipperContact} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Contact person name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mobile Number *</label>
                <input type="tel" name="shipperMobile" required value={formData.shipperMobile} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="10-digit mobile" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
                <input type="email" name="shipperEmail" value={formData.shipperEmail} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="email@example.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Complete Address *</label>
                <input type="text" name="shipperAddress" required value={formData.shipperAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Full pickup address" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">GST Number (Business)</label>
                <input type="text" name="shipperGst" value={formData.shipperGst} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="GSTIN" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">PAN Number</label>
                <input type="text" name="shipperPan" value={formData.shipperPan} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="PAN" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">IEC Number (International)</label>
                <input type="text" name="shipperIec" value={formData.shipperIec} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="IEC Code" />
              </div>
            </div>
          </div>

          {/* 2. Consignee (Receiver) */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>2.</span> Consignee (Receiver) Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Receiver Name / Company *</label>
                <input type="text" name="consigneeName" required value={formData.consigneeName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Receiver name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Person</label>
                <input type="text" name="consigneeContact" value={formData.consigneeContact} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Contact person" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mobile Number *</label>
                <input type="tel" name="consigneeMobile" required value={formData.consigneeMobile} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Mobile number" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
                <input type="email" name="consigneeEmail" value={formData.consigneeEmail} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Email" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Complete Address *</label>
                <input type="text" name="consigneeAddress" required value={formData.consigneeAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Full delivery address" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">City *</label>
                <input type="text" name="consigneeCity" required value={formData.consigneeCity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Country *</label>
                <input type="text" name="consigneeCountry" required value={formData.consigneeCountry} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Country" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Postal Code *</label>
                <input type="text" name="consigneePostal" required value={formData.consigneePostal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Postal / Zip code" />
              </div>
            </div>
          </div>

          {/* 3. Shipment Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>3.</span> Shipment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Shipment Type *</label>
                <select name="shipmentType" value={formData.shipmentType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="Documents">Documents</option>
                  <option value="General Cargo">General Cargo</option>
                  <option value="Perishable Goods">Perishable Goods</option>
                  <option value="Pharma">Pharma</option>
                  <option value="Dangerous Goods (DG)">Dangerous Goods (DG)</option>
                  <option value="Live Animals">Live Animals</option>
                  <option value="Human Remains">Human Remains</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Commodity Name *</label>
                <input type="text" name="commodityName" required value={formData.commodityName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="e.g. Electronic Parts" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Number of Packages *</label>
                <input type="number" name="packages" required value={formData.packages} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Total boxes/units" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Weight (Actual - Kg) *</label>
                <input type="number" step="0.1" name="weight" required value={formData.weight} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Weight in kg" />
              </div>
              <div className="md:col-span-2 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Length (cm)</label>
                  <input type="number" name="length" value={formData.length} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="L" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Width (cm)</label>
                  <input type="number" name="width" value={formData.width} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="W" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="H" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-amber-600 font-bold">* Note: Air cargo billing also evaluates Volumetric Weight based on dimensions (L × W × H / 5000).</p>
          </div>

          {/* 4. Cargo Value */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>4.</span> Cargo Value & Insurance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Declared Value *</label>
                <input type="number" name="declaredValue" required value={formData.declaredValue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Amount" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Currency</label>
                <select name="currency" value={formData.currency} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Insurance Required?</label>
                <select name="insurance" value={formData.insurance} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Origin & Destination */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>5.</span> Origin & Destination
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Pickup Address *</label>
                <input type="text" name="pickupAddress" required value={formData.pickupAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Origin pickup address" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Pickup Airport (Optional)</label>
                <input type="text" name="pickupAirport" value={formData.pickupAirport} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="e.g. BOM / DEL" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Destination Airport *</label>
                <input type="text" name="destinationAirport" required value={formData.destinationAirport} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="e.g. DXB / JFK" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Final Delivery Address</label>
                <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Door delivery location" />
              </div>
            </div>
          </div>

          {/* 6. Service Type */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>6.</span> Service Type
            </h2>
            <div>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full md:w-1/3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                <option value="Door to Door">Door to Door</option>
                <option value="Airport to Airport">Airport to Airport</option>
                <option value="Door to Airport">Door to Airport</option>
                <option value="Airport to Door">Airport to Door</option>
              </select>
            </div>
          </div>

          {/* 7. Special Requirements */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>7.</span> Special Requirements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" name="tempControlled" checked={formData.tempControlled} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Temperature Controlled
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" name="fragile" checked={formData.fragile} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Fragile Item
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" name="keepUpright" checked={formData.keepUpright} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Keep Upright
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" name="stackNotAllowed" checked={formData.stackNotAllowed} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Stack Not Allowed
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" name="expressService" checked={formData.expressService} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Express Service
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer text-sm font-bold text-slate-700">
                <input type="checkbox" name="priorityHandling" checked={formData.priorityHandling} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Priority Handling
              </label>
            </div>
          </div>

          {/* 8. Documents Checklist */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>8.</span> Required Documents Checklist
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasInvoice" checked={formData.hasInvoice} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Commercial Invoice
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasPackingList" checked={formData.hasPackingList} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Packing List
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasEwayBill" checked={formData.hasEwayBill} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> E-Way Bill
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasKyc" checked={formData.hasKyc} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> KYC Documents
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasIecDoc" checked={formData.hasIecDoc} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> IEC (Commercial Export)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasMsds" checked={formData.hasMsds} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> MSDS (Dangerous Goods)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasDrugLicense" checked={formData.hasDrugLicense} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> Drug License (Medicine)
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <input type="checkbox" name="hasFssai" checked={formData.hasFssai} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" /> FSSAI (Food Items)
              </label>
            </div>
          </div>

          {/* 9. Customs */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>9.</span> Customs Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Type</label>
                <select name="customsType" value={formData.customsType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="Export">Export</option>
                  <option value="Import">Import</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">HS Code</label>
                <input type="text" name="hsCode" value={formData.hsCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="HS Code" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Country of Origin</label>
                <input type="text" name="countryOfOrigin" value={formData.countryOfOrigin} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="Origin country" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Purpose of Shipment</label>
                <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="Sale">Sale / Commercial</option>
                  <option value="Sample">Sample</option>
                  <option value="Gift">Gift</option>
                  <option value="Personal Use">Personal Use</option>
                  <option value="Return">Return</option>
                </select>
              </div>
            </div>
          </div>

          {/* 10. Flight Preference */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-blue-600 border-b pb-2 flex items-center gap-2">
              <span>10.</span> Flight Preference & Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Flight Choice</label>
                <select name="flightPreference" value={formData.flightPreference} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="Earliest Available Flight">Earliest Available Flight</option>
                  <option value="Specific Airline">Specific Airline</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Specific Airline (Optional)</label>
                <input type="text" name="specificAirline" value={formData.specificAirline} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" placeholder="e.g. Emirates / Qatar" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Preferred Delivery Date</label>
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl transition shadow-xl shadow-blue-200 cursor-pointer"
            >
              {loading ? "Submitting Air Cargo Booking..." : "Submit Air Cargo Booking & Notify via WhatsApp"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AirCargoForm;