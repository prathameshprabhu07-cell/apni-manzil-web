import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Building2, MapPin, FileText, ShieldCheck, Users, DollarSign, ArrowLeft, CheckCircle2 } from 'lucide-react';

const PackersMoversRegister = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // फॉर्म डेटा स्टेट
  const [formData, setFormData] = useState({
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
    
    // Services
    services: [],
    
    // Service Area
    baseCity: '',
    localAreas: '',
    citiesCovered: '',
    statesCovered: '',
    intercityService: 'No',
    outstationService: 'No',
    
    // Vehicles
    hasOwnVehicles: 'No',
    vehicleTypes: [],
    ownVehicleCount: '',
    hiredVehicles: 'No',
    
    // Manpower
    workerCount: '',
    loadingTeam: 'No',
    driverAvailable: 'No',
    
    // Pricing
    localMinCharges: '',
    perKmRate: '',
    bhk1Price: '',
    bhk2Price: '',
    bhk3Price: '',
    bhk4Price: '',
    packingCharges: '',
    loadingCharges: '',
    unloadingCharges: '',
    
    // Documents (Optional / Conditional)
    panCard: null,
    businessProof: null,
    gstCert: null,
    udyamCert: null,
    addressProof: null,
    shopCert: null,
    
    // Trust & Experience
    yearsInBusiness: '',
    customerRating: '',
    insuranceAvailable: 'No',
    claimPolicy: '',
    unresolvedComplaints: 'No',
    
    // Platform Terms
    acceptLeads: 'Yes',
    leadReceiveMode: 'Both',
    preferredHours: ''
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
    // इथे तुझा API कॉल किंवा बॅकएंड लॉजिक लिहू शकतोस
    console.log("Form Submitted:", formData);
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
              Thank you for registering with Apni Manzil. Our verification team will review your details and contact you soon.
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
          <h1 className="text-sm lg:text-lg font-[950] uppercase italic tracking-wider">Packers & Movers Partner Registration</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1️⃣ Partner / Business Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Building2 size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">1️⃣ Partner / Business Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Company / Business Name *</label>
                <input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange} placeholder="e.g. Om Sai Packers & Movers" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Owner / Contact Person Name *</label>
                <input type="text" name="ownerName" required value={formData.ownerName} onChange={handleInputChange} placeholder="e.g. Rahul Shinde" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
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
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Business Address *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="Street address" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="e.g. Pune" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pincode *</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} placeholder="e.g. 411001" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Google Business Profile Link (Optional)</label>
                <input type="url" name="gbpLink" value={formData.gbpLink} onChange={handleInputChange} placeholder="https://maps.google.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Website (Optional)</label>
                <input type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://yourwebsite.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* 🛠️ कोणत्या Services देता? */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Truck size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">कोणत्या Services देता? (Multiple Selection)</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                "Home Shifting", "Office Shifting", "Commercial Shifting", "Local Shifting",
                "Intercity Shifting", "Outstation Shifting", "Packing", "Loading",
                "Unloading", "Unpacking", "Vehicle Transportation", "Storage"
              ].map((srv) => (
                <label key={srv} className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${formData.services.includes(srv) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.services.includes(srv)}
                    onChange={() => handleCheckboxGroupChange('services', srv)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className="text-xs">{srv}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 📍 तुमचा Service Area */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><MapPin size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">तुमचा Service Area (Lead Matching साठी मुख्य)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Base City *</label>
                <input type="text" name="baseCity" required value={formData.baseCity} onChange={handleInputChange} placeholder="e.g. Pune" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Local Areas / PIN Codes Covered</label>
                <input type="text" name="localAreas" value={formData.localAreas} onChange={handleInputChange} placeholder="e.g. Kothrud, Baner, Wakad" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Cities Covered</label>
                <input type="text" name="citiesCovered" value={formData.citiesCovered} onChange={handleInputChange} placeholder="e.g. Pune, Mumbai, Nashik" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">States Covered</label>
                <input type="text" name="statesCovered" value={formData.statesCovered} onChange={handleInputChange} placeholder="e.g. Maharashtra, Karnataka" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Intercity Service?</label>
                <select name="intercityService" value={formData.intercityService} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Outstation Service?</label>
                <select name="outstationService" value={formData.outstationService} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* 🚚 Vehicle Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Truck size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">🚚 Vehicle Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Do you have your own vehicles?</label>
                <select name="hasOwnVehicles" value={formData.hasOwnVehicles} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Number of Own Vehicles</label>
                <input type="number" name="ownVehicleCount" value={formData.ownVehicleCount} onChange={handleInputChange} placeholder="e.g. 2" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Attached / Hired Vehicles Available?</label>
                <select name="hiredVehicles" value={formData.hiredVehicles} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Vehicle Types (Select all that apply)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Tata Ace", "Pickup", "14 ft", "17 ft", "20 ft", "Container", "Other"].map((vType) => (
                  <label key={vType} className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${formData.vehicleTypes.includes(vType) ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <input 
                      type="checkbox" 
                      checked={formData.vehicleTypes.includes(vType)}
                      onChange={() => handleCheckboxGroupChange('vehicleTypes', vType)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className="text-xs">{vType}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 👷 Manpower */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Users size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">👷 Manpower</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Number of Packers / Workers</label>
                <input type="number" name="workerCount" value={formData.workerCount} onChange={handleInputChange} placeholder="e.g. 5" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Loading & Unloading Team Available?</label>
                <select name="loadingTeam" value={formData.loadingTeam} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Driver Available?</label>
                <select name="driverAvailable" value={formData.driverAvailable} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* 💵 Pricing Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><DollarSign size={24}/></div>
              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">💵 Pricing Information</h3>
                <p className="text-[11px] text-slate-500 font-medium">इथे Approximate Starting Price घ्या. Exact quotation नको.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Local Minimum Charges</label>
                <input type="text" name="localMinCharges" value={formData.localMinCharges} onChange={handleInputChange} placeholder="e.g. ₹3000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Per KM Rate</label>
                <input type="text" name="perKmRate" value={formData.perKmRate} onChange={handleInputChange} placeholder="e.g. ₹40/km" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">1 BHK Starting Price</label>
                <input type="text" name="bhk1Price" value={formData.bhk1Price} onChange={handleInputChange} placeholder="e.g. ₹5000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">2 BHK Starting Price</label>
                <input type="text" name="bhk2Price" value={formData.bhk2Price} onChange={handleInputChange} placeholder="e.g. ₹8000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">3 BHK Starting Price</label>
                <input type="text" name="bhk3Price" value={formData.bhk3Price} onChange={handleInputChange} placeholder="e.g. ₹12000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">4 BHK Starting Price</label>
                <input type="text" name="bhk4Price" value={formData.bhk4Price} onChange={handleInputChange} placeholder="e.g. ₹16000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Packing Charges</label>
                <input type="text" name="packingCharges" value={formData.packingCharges} onChange={handleInputChange} placeholder="Approx amount" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Loading Charges</label>
                <input type="text" name="loadingCharges" value={formData.loadingCharges} onChange={handleInputChange} placeholder="Approx amount" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Unloading Charges</label>
                <input type="text" name="unloadingCharges" value={formData.unloadingCharges} onChange={handleInputChange} placeholder="Approx amount" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
            </div>
          </div>

          {/* 📂 Documents (Optional / Mandatory non-strict) */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><FileText size={24}/></div>
              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">📂 Documents Upload</h3>
                <p className="text-[11px] text-slate-500 font-medium">सगळे documents mandatory नाहीत (छोटे local movers सुद्धा register करू शकतात).</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: "PAN Card", name: "panCard" },
                { label: "Business Proof", name: "businessProof" },
                { label: "GST Certificate (If available)", name: "gstCert" },
                { label: "Udyam Certificate (If available)", name: "udyamCert" },
                { label: "Business Address Proof", name: "addressProof" },
                { label: "Shop / Establishment Certificate", name: "shopCert" }
              ].map((doc) => (
                <div key={doc.name} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <label className="block text-xs font-bold uppercase text-slate-700">{doc.label}</label>
                  <input type="file" name={doc.name} onChange={handleFileChange} className="w-full text-[10px] text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* ⭐ Trust / Experience & Apni Manzil Preferences */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><ShieldCheck size={24}/></div>
              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">⭐ Trust, Experience & Lead Preferences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Years in Packers & Movers Business</label>
                <input type="text" name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleInputChange} placeholder="e.g. 5 Years" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Previous Customer Reviews / Rating</label>
                <input type="text" name="customerRating" value={formData.customerRating} onChange={handleInputChange} placeholder="e.g. 4.5 Star on Google" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Insurance Available?</label>
                <select name="insuranceAvailable" value={formData.insuranceAvailable} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Damage / Claim Policy</label>
                <input type="text" name="claimPolicy" value={formData.claimPolicy} onChange={handleInputChange} placeholder="Briefly describe policy" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Any major customer complaint currently unresolved?</label>
                <select name="unresolvedComplaints" value={formData.unresolvedComplaints} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Preferred Working Hours</label>
                <input type="text" name="preferredHours" value={formData.preferredHours} onChange={handleInputChange} placeholder="e.g. 9 AM - 9 PM" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Are you willing to accept leads from Apni Manzil? *</label>
                <select name="acceptLeads" required value={formData.acceptLeads} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500 font-bold text-orange-600">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">How would you like to receive leads?</label>
                <select name="leadReceiveMode" value={formData.leadReceiveMode} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500">
                  <option value="Both">Both (WhatsApp & Call)</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Call">Call</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-wider shadow-2xl hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
            >
              Submit Partner Registration →
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PackersMoversRegister;