import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Warehouse, Building2, MapPin, FileText, ShieldCheck, Users, DollarSign, ArrowLeft, CheckCircle2, Cpu, Camera, Thermometer, Box } from 'lucide-react';

const WarehousePartnerRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    // 1. Business Info
    companyName: '',
    ownerName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    gbpLink: '',
    website: '',

    // 2. Warehouse Type
    warehouseTypes: [],

    // 3. Capacity
    totalArea: '',
    availableArea: '',
    storageCapacity: '',
    minSpace: '',
    maxSpace: '',
    clearHeight: '',

    // 4. Temperature & Storage Conditions
    hasTempControl: 'No',
    tempRange: '',
    frozenTemp: '',
    humidityControl: 'No',
    tempMonitoring: 'No',
    continuousMonitoring: 'No',

    // 5. Location
    locationArea: '',
    locationPincode: '',
    nearbyCity: '',
    serviceableCities: '',
    pickupAreas: '',
    highwayDistance: '',
    transitDistance: '',

    // 6. Loading Facilities
    loadingFacilities: [],

    // 7. Security
    securityFeatures: [],
    cctvRetention: '',

    // 8. Technology
    techFeatures: [],
    shareReports: 'Yes',

    // 9. Services Offered
    servicesOffered: [],

    // 10. Pricing
    pricingType: [],
    storageRate: '',
    minMonthlyCharge: '',
    loadingCharges: '',
    unloadingCharges: '',
    pickPackCharges: '',
    otherCharges: '',

    // 11. Documents
    panCard: null,
    gstCert: null,
    udyamCert: null,
    businessProof: null,
    addressProof: null,
    leaseProof: null,
    fireCert: null,
    fssaiCert: null,
    pharmaLicense: null,
    otherCert: null,

    // 12. Photos
    exteriorPhoto: null,
    interiorPhoto: null,
    loadingAreaPhoto: null,
    storageAreaPhoto: null,
    officePhoto: null,
    securityPhoto: null,
    coldStoragePhoto: null,

    // 13. Experience
    yearsInBusiness: '',
    majorCustomers: '',
    productsStored: '',
    monthlyVolume: '',
    unresolvedComplaints: 'No',

    // 14. Apni Manzil Partnership
    acceptLeads: 'Yes',
    leadCommMode: [],
    preferredHours: '',
    specialInstructions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxGroupChange = (category, item) => {
    setFormData(prev => {
      const list = [...prev[category]];
      if (list.includes(item)) {
        return { ...prev, [category]: list.filter(i => i !== item) };
      } else {
        return { ...prev, [category]: [...list, item] };
      }
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Warehouse Form Submitted:", formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-[950] text-[#002D5E] uppercase italic">Registration Successful!</h2>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Thank you for registering your warehouse with Apni Manzil. Our onboarding verification team will review your details and connect with you shortly.
            </p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Top Bar */}
      <div className="bg-[#002D5E] text-white py-6 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-xs font-black uppercase bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-sm lg:text-lg font-[950] uppercase italic tracking-wider">Warehouse Partner Registration</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Business Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Building2 size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">1. 🏢 Business Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Warehouse / Company Name *</label>
                <input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange} placeholder="e.g. Apex Logistics & Storage" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Owner / Contact Person Name *</label>
                <input type="text" name="ownerName" required value={formData.ownerName} onChange={handleInputChange} placeholder="e.g. Rajesh Patil" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Mobile Number *</label>
                <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} placeholder="10-digit mobile number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">WhatsApp Number *</label>
                <input type="tel" name="whatsapp" required value={formData.whatsapp} onChange={handleInputChange} placeholder="WhatsApp number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Complete Warehouse Address *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="Street / Industrial Area address" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="e.g. Bhiwandi / Pune" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pincode *</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} placeholder="e.g. 421302" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Google Business Profile Link</label>
                <input type="url" name="gbpLink" value={formData.gbpLink} onChange={handleInputChange} placeholder="https://maps.google.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Website (Optional)</label>
                <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://yourwebsite.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* 2. Warehouse Type */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Warehouse size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">2. 📦 Warehouse Type (What type of storage do you provide?)</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                "General / Dry Warehouse", "Cold Storage", "Temperature Controlled Warehouse", 
                "Frozen Storage", "Food Storage", "Pharmaceutical Storage", 
                "E-commerce Fulfilment", "Industrial / Commercial Storage", "Open Yard Storage", "Other"
              ].map((type) => (
                <label key={type} className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${formData.warehouseTypes.includes(type) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.warehouseTypes.includes(type)}
                    onChange={() => handleCheckboxGroupChange('warehouseTypes', type)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-xs">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Warehouse Capacity */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><Box size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">3. 📐 Warehouse Capacity</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Total Warehouse Area (sq. ft.) *</label>
                <input type="text" name="totalArea" required value={formData.totalArea} onChange={handleInputChange} placeholder="e.g. 10000 sq ft" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Available Area (sq. ft.) *</label>
                <input type="text" name="availableArea" required value={formData.availableArea} onChange={handleInputChange} placeholder="e.g. 4000 sq ft" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Storage Capacity — Approx. tons / pallets / boxes</label>
                <input type="text" name="storageCapacity" value={formData.storageCapacity} onChange={handleInputChange} placeholder="e.g. 500 Pallets" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Minimum Space Requirement — sq. ft.</label>
                <input type="text" name="minSpace" value={formData.minSpace} onChange={handleInputChange} placeholder="e.g. 500 sq ft" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Maximum Space Available — sq. ft.</label>
                <input type="text" name="maxSpace" value={formData.maxSpace} onChange={handleInputChange} placeholder="e.g. 4000 sq ft" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Clear Height (Optional)</label>
                <input type="text" name="clearHeight" value={formData.clearHeight} onChange={handleInputChange} placeholder="e.g. 24 ft" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* 4. Temperature & Storage Conditions */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Thermometer size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">4. 🌡️ Temperature & Storage Conditions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Is temperature-controlled storage available?</label>
                <select name="hasTempControl" value={formData.hasTempControl} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500 font-bold">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Temperature Range</label>
                <input type="text" name="tempRange" value={formData.tempRange} onChange={handleInputChange} placeholder="e.g. 2°C–8°C" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Frozen Temperature</label>
                <input type="text" name="frozenTemp" value={formData.frozenTemp} onChange={handleInputChange} placeholder="e.g. -18°C" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Humidity Control Available?</label>
                <select name="humidityControl" value={formData.humidityControl} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Temperature Monitoring Available?</label>
                <select name="tempMonitoring" value={formData.tempMonitoring} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">24×7 Temperature Monitoring?</label>
                <select name="continuousMonitoring" value={formData.continuousMonitoring} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Location & Service Area */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><MapPin size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">5. 📍 Location & Service Area</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Warehouse Location / Area *</label>
                <input type="text" name="locationArea" required value={formData.locationArea} onChange={handleInputChange} placeholder="e.g. Dapodi / Chakan" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">PIN Code *</label>
                <input type="text" name="locationPincode" required value={formData.locationPincode} onChange={handleInputChange} placeholder="e.g. 411012" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nearby Major City / Industrial Area</label>
                <input type="text" name="nearbyCity" value={formData.nearbyCity} onChange={handleInputChange} placeholder="e.g. MIDC Bhosari" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Serviceable Cities</label>
                <input type="text" name="serviceableCities" value={formData.serviceableCities} onChange={handleInputChange} placeholder="e.g. Pune, Mumbai" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pickup / Delivery Areas</label>
                <input type="text" name="pickupAreas" value={formData.pickupAreas} onChange={handleInputChange} placeholder="e.g. Pan-India or Western Zone" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Distance from Highway</label>
                <input type="text" name="highwayDistance" value={formData.highwayDistance} onChange={handleInputChange} placeholder="e.g. 2 km" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Distance from Airport / Port — if applicable</label>
                <input type="text" name="transitDistance" value={formData.transitDistance} onChange={handleInputChange} placeholder="e.g. 15 km from Airport" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* 6. Loading & Unloading Facilities */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Warehouse size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">6. 🚛 Loading & Unloading Facilities</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                "Loading / Unloading", "Dock Leveler", "Loading Bay", "Forklift", 
                "Pallet Truck", "Crane", "Weighing Scale", "Labour Available", 
                "Truck Parking", "Container Handling"
              ].map((fac) => (
                <label key={fac} className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${formData.loadingFacilities.includes(fac) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.loadingFacilities.includes(fac)}
                    onChange={() => handleCheckboxGroupChange('loadingFacilities', fac)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-xs">{fac}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 7. Warehouse Security */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><ShieldCheck size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">7. 🔐 Warehouse Security</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                "CCTV", "24×7 Security Guard", "Fire Safety System", "Fire Extinguishers", 
                "Access Control", "Alarm System", "Insurance Available", "Pest Control"
              ].map((sec) => (
                <label key={sec} className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${formData.securityFeatures.includes(sec) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.securityFeatures.includes(sec)}
                    onChange={() => handleCheckboxGroupChange('securityFeatures', sec)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-xs">{sec}</span>
                </label>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">CCTV Footage Retention (Days)</label>
              <input type="text" name="cctvRetention" value={formData.cctvRetention} onChange={handleInputChange} placeholder="e.g. 30 days" className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
            </div>
          </div>

          {/* 8. Warehouse Technology */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Cpu size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">8. 💻 Warehouse Technology</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                "Inventory Management System", "Barcode Scanning", "RFID", "WMS", 
                "Stock Reports", "Online Inventory Tracking", "API Integration"
              ].map((tech) => (
                <label key={tech} className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${formData.techFeatures.includes(tech) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.techFeatures.includes(tech)}
                    onChange={() => handleCheckboxGroupChange('techFeatures', tech)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-xs">{tech}</span>
                </label>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Can you share regular inventory reports with Apni Manzil?</label>
              <select name="shareReports" value={formData.shareReports} onChange={handleInputChange} className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500 font-bold">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* 9. Services Offered */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl"><Warehouse size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">9. 📋 Services Offered</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                "Storage Only", "Loading / Unloading", "Pick & Pack", "Inventory Management", 
                "Order Fulfilment", "Labelling", "Repacking", "Sorting", 
                "Distribution", "Last-Mile Delivery", "Reverse Logistics"
              ].map((srv) => (
                <label key={srv} className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${formData.servicesOffered.includes(srv) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.servicesOffered.includes(srv)}
                    onChange={() => handleCheckboxGroupChange('servicesOffered', srv)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-xs">{srv}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 10. Pricing */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><DollarSign size={24}/></div>
              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">10. 💰 Pricing</h3>
                <p className="text-[11px] text-slate-500 font-medium">Final quotation may vary depending on storage requirement, duration, volume and services required.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Pricing Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  "Per Sq. Ft. / Month", "Per Pallet / Month", "Per Ton / Month", 
                  "Per Box / Month", "Per Day", "Custom Pricing"
                ].map((pt) => (
                  <label key={pt} className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${formData.pricingType.includes(pt) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <input 
                      type="checkbox" 
                      checked={formData.pricingType.includes(pt)}
                      onChange={() => handleCheckboxGroupChange('pricingType', pt)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className="text-xs">{pt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Storage Rate (₹)</label>
                <input type="text" name="storageRate" value={formData.storageRate} onChange={handleInputChange} placeholder="e.g. ₹25 per sq.ft." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Minimum Monthly Charge (₹)</label>
                <input type="text" name="minMonthlyCharge" value={formData.minMonthlyCharge} onChange={handleInputChange} placeholder="e.g. ₹15000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Loading Charges (₹)</label>
                <input type="text" name="loadingCharges" value={formData.loadingCharges} onChange={handleInputChange} placeholder="Approx amount" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Unloading Charges (₹)</label>
                <input type="text" name="unloadingCharges" value={formData.unloadingCharges} onChange={handleInputChange} placeholder="Approx amount" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pick & Pack Charges (₹)</label>
                <input type="text" name="pickPackCharges" value={formData.pickPackCharges} onChange={handleInputChange} placeholder="Per order amount" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Other Charges (₹)</label>
                <input type="text" name="otherCharges" value={formData.otherCharges} onChange={handleInputChange} placeholder="If any" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* 11. Documents Upload */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><FileText size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">11. 📄 Documents Upload</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: "PAN Card", name: "panCard" },
                { label: "GST Certificate", name: "gstCert" },
                { label: "Udyam Certificate", name: "udyamCert" },
                { label: "Business Registration / Proof", name: "businessProof" },
                { label: "Warehouse Address Proof", name: "addressProof" },
                { label: "Warehouse Ownership / Lease Proof", name: "leaseProof" },
                { label: "Fire Safety Certificate", name: "fireCert" },
                { label: "FSSAI License — if applicable", name: "fssaiCert" },
                { label: "Drug / Pharma License — if applicable", name: "pharmaLicense" },
                { label: "Other Relevant Certifications", name: "otherCert" }
              ].map((doc) => (
                <div key={doc.name} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-700">{doc.label}</label>
                  <input type="file" name={doc.name} onChange={handleFileChange} className="w-full text-[10px] text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* 12. Warehouse Photos */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl"><Camera size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">12. 📸 Warehouse Photos</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: "Warehouse Exterior Photo", name: "exteriorPhoto" },
                { label: "Warehouse Interior Photo", name: "interiorPhoto" },
                { label: "Loading / Unloading Area", name: "loadingAreaPhoto" },
                { label: "Storage Area", name: "storageAreaPhoto" },
                { label: "Office / Reception", name: "officePhoto" },
                { label: "CCTV / Security Setup", name: "securityPhoto" },
                { label: "Cold Storage Equipment — if applicable", name: "coldStoragePhoto" }
              ].map((photo) => (
                <div key={photo.name} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-700">{photo.label}</label>
                  <input type="file" accept="image/*" name={photo.name} onChange={handleFileChange} className="w-full text-[10px] text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* 13. Experience & History */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><ShieldCheck size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">13. ⭐ Experience & History</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Years in Warehouse Business</label>
                <input type="text" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleInputChange} placeholder="e.g. 6 Years" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Current Major Customers / Industries Served — Optional</label>
                <input type="text" name="majorCustomers" value={formData.majorCustomers} onChange={handleInputChange} placeholder="e.g. FMCG, E-commerce brands" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Products Usually Stored</label>
                <input type="text" name="productsStored" value={formData.productsStored} onChange={handleInputChange} placeholder="e.g. Electronics, Garments, Packed Foods" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Approx. Monthly Storage Volume</label>
                <input type="text" name="monthlyVolume" value={formData.monthlyVolume} onChange={handleInputChange} placeholder="e.g. 200 Tons / month" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Any Previous Major Customer Complaint?</label>
                <select name="unresolvedComplaints" value={formData.unresolvedComplaints} onChange={handleInputChange} className="w-full md:w-1/2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500 font-bold">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* 14. Apni Manzil Partnership Preferences */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Users size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">14. 🤝 Apni Manzil Partnership</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Are you willing to accept warehouse leads from Apni Manzil? *</label>
                <select name="acceptLeads" required value={formData.acceptLeads} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500 font-bold text-orange-600">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Preferred Working Hours</label>
                <input type="text" name="preferredHours" value={formData.preferredHours} onChange={handleInputChange} placeholder="e.g. 24×7 or 9 AM - 8 PM" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Preferred Lead Communication</label>
                <div className="flex flex-wrap gap-3">
                  {["WhatsApp", "Phone Call", "Email", "All"].map((mode) => (
                    <label key={mode} className={`flex items-center gap-2 px-4 py-3 rounded-2xl border cursor-pointer transition ${formData.leadCommMode.includes(mode) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      <input 
                        type="checkbox" 
                        checked={formData.leadCommMode.includes(mode)}
                        onChange={() => handleCheckboxGroupChange('leadCommMode', mode)}
                        className="accent-orange-500 w-4 h-4"
                      />
                      <span className="text-xs">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Special Instructions / Additional Information</label>
                <textarea rows="3" name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} placeholder="Any specific details regarding your warehouse you'd like to share..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-wider shadow-2xl hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
            >
              Submit Warehouse Partner Registration →
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default WarehousePartnerRegister;