import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Truck,
  Building2,
  MapPin,
  FileText,
  ShieldCheck,
  Users,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LockKeyhole
} from 'lucide-react';

const PackersMoversRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);

  // Form Data State
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

    // Documents
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
    preferredHours: '',

    // Payment / Settlement Details
    bankAccountHolder: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: 'Current',
    bankProof: null,
    upiId: '',

    // Partner Login Setup
    loginEmail: '',
    loginPassword: '',
    confirmPassword: '',

    // Partner Terms & Conditions
    termsAccepted: false
  });

  // Automatically select service if passed from VendorLandingPage
  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      const selected = location.state.selectedCategory;

      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(selected)
          ? prev.services
          : [...prev.services, selected]
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxGroupChange = (category, item) => {
    setFormData(prev => {
      const list = [...prev[category]];

      if (list.includes(item)) {
        return {
          ...prev,
          [category]: list.filter(i => i !== item)
        };
      }

      return {
        ...prev,
        [category]: [...list, item]
      };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleTermsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      termsAccepted: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Terms validation
    if (!formData.termsAccepted) {
      alert('Please accept the Partner Terms & Conditions before submitting.');
      return;
    }

    // Password validation
    if (formData.loginPassword !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    console.log('Form Submitted:', formData);

    try {
      await fetch(
        'https://coating-vocabulary-gcc-cognitive.trycloudflare.com/webhook/Packer_Partner',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );
    } catch (error) {
      console.error('Error sending data to webhook:', error);
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center space-y-6">

          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={40} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-[950] text-[#002D5E] uppercase italic">
              Registration Successful!
            </h2>

            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Thank you for registering with Apni Manzil. Our verification team will review
              your details and contact you soon.
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
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-sm lg:text-lg font-[950] uppercase italic tracking-wider">
            Packers & Movers Partner Registration
          </h1>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* 1 Partner / Business Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <Building2 size={24} />
              </div>

              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                1️⃣ Partner / Business Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Company / Business Name *
                </label>

                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Om Sai Packers & Movers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Owner / Contact Person Name *
                </label>

                <input
                  type="text"
                  name="ownerName"
                  required
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Shinde"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  WhatsApp Number *
                </label>

                <input
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="WhatsApp number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Business Address *
                </label>

                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Pune"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Pincode *
                </label>

                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g. 411001"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Google Business Profile Link (Optional)
                </label>

                <input
                  type="url"
                  name="gbpLink"
                  value={formData.gbpLink}
                  onChange={handleInputChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Website (Optional)
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

            </div>
          </div>

          {/* Services Offered */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Truck size={24} />
              </div>

              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                Services Offered (Multiple Selection)
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

              {[
                'Packers & Movers',
                'Warehouse',
                'International Logistics',
                'Home Shifting',
                'Office Shifting',
                'Commercial Shifting',
                'Local Shifting',
                'Intercity Shifting',
                'Outstation Shifting',
                'Packing',
                'Loading',
                'Unloading',
                'Unpacking',
                'Vehicle Transportation',
                'Storage'
              ].map((srv) => (

                <label
                  key={srv}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                    formData.services.includes(srv)
                      ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={formData.services.includes(srv)}
                    onChange={() =>
                      handleCheckboxGroupChange('services', srv)
                    }
                    className="accent-orange-500 w-4 h-4"
                  />

                  <span className="text-xs">
                    {srv}
                  </span>

                </label>

              ))}

            </div>
          </div>

          {/* Service Area */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                <MapPin size={24} />
              </div>

              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                Service Area (Crucial for Lead Matching)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Base City *
                </label>

                <input
                  type="text"
                  name="baseCity"
                  required
                  value={formData.baseCity}
                  onChange={handleInputChange}
                  placeholder="e.g. Pune"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Local Areas / PIN Codes Covered
                </label>

                <input
                  type="text"
                  name="localAreas"
                  value={formData.localAreas}
                  onChange={handleInputChange}
                  placeholder="e.g. Kothrud, Baner, Wakad"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Cities Covered
                </label>

                <input
                  type="text"
                  name="citiesCovered"
                  value={formData.citiesCovered}
                  onChange={handleInputChange}
                  placeholder="e.g. Pune, Mumbai, Nashik"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  States Covered
                </label>

                <input
                  type="text"
                  name="statesCovered"
                  value={formData.statesCovered}
                  onChange={handleInputChange}
                  placeholder="e.g. Maharashtra, Karnataka"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Intercity Service?
                </label>

                <select
                  name="intercityService"
                  value={formData.intercityService}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Outstation Service?
                </label>

                <select
                  name="outstationService"
                  value={formData.outstationService}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <Truck size={24} />
              </div>

              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                🚚 Vehicle Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Do you have your own vehicles?
                </label>

                <select
                  name="hasOwnVehicles"
                  value={formData.hasOwnVehicles}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Number of Own Vehicles
                </label>

                <input
                  type="number"
                  name="ownVehicleCount"
                  value={formData.ownVehicleCount}
                  onChange={handleInputChange}
                  placeholder="e.g. 2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Attached / Hired Vehicles Available?
                </label>

                <select
                  name="hiredVehicles"
                  value={formData.hiredVehicles}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">
                Vehicle Types (Select all that apply)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                {[
                  'Tata Ace',
                  'Pickup',
                  '14 ft',
                  '17 ft',
                  '20 ft',
                  'Container',
                  'Other'
                ].map((vType) => (

                  <label
                    key={vType}
                    className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition ${
                      formData.vehicleTypes.includes(vType)
                        ? 'bg-orange-50 border-orange-500 text-orange-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >

                    <input
                      type="checkbox"
                      checked={formData.vehicleTypes.includes(vType)}
                      onChange={() =>
                        handleCheckboxGroupChange('vehicleTypes', vType)
                      }
                      className="accent-orange-500 w-4 h-4"
                    />

                    <span className="text-xs">
                      {vType}
                    </span>

                  </label>

                ))}

              </div>
            </div>
          </div>

          {/* Manpower */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <Users size={24} />
              </div>

              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                👷 Manpower
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Number of Packers / Workers
                </label>

                <input
                  type="number"
                  name="workerCount"
                  value={formData.workerCount}
                  onChange={handleInputChange}
                  placeholder="e.g. 5"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Loading & Unloading Team Available?
                </label>

                <select
                  name="loadingTeam"
                  value={formData.loadingTeam}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Driver Available?
                </label>

                <select
                  name="driverAvailable"
                  value={formData.driverAvailable}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <DollarSign size={24} />
              </div>

              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                  💵 Pricing Information
                </h3>

                <p className="text-[11px] text-slate-500 font-medium">
                  Please provide approximate starting prices. Exact quotations are not required here.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {[
                ['localMinCharges', 'Local Minimum Charges', 'e.g. ₹3000'],
                ['perKmRate', 'Per KM Rate', 'e.g. ₹40/km'],
                ['bhk1Price', '1 BHK Starting Price', 'e.g. ₹5000'],
                ['bhk2Price', '2 BHK Starting Price', 'e.g. ₹8000'],
                ['bhk3Price', '3 BHK Starting Price', 'e.g. ₹12000'],
                ['bhk4Price', '4 BHK Starting Price', 'e.g. ₹16000'],
                ['packingCharges', 'Packing Charges', 'Approx amount'],
                ['loadingCharges', 'Loading Charges', 'Approx amount'],
                ['unloadingCharges', 'Unloading Charges', 'Approx amount']
              ].map(([name, label, placeholder]) => (

                <div key={name}>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    {label}
                  </label>

                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

              ))}

            </div>
          </div>

          {/* Documents Upload */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                <FileText size={24} />
              </div>

              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                  📂 Documents Upload
                </h3>

                <p className="text-[11px] text-slate-500 font-medium">
                  Not all documents are mandatory (small local movers can also register easily).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6">

              {[
                { label: 'PAN Card', name: 'panCard' },
                { label: 'Business Proof', name: 'businessProof' },
                { label: 'GST Certificate (If available)', name: 'gstCert' },
                { label: 'Udyam Certificate (If available)', name: 'udyamCert' },
                { label: 'Business Address Proof', name: 'addressProof' },
                { label: 'Shop / Establishment Certificate', name: 'shopCert' }
              ].map((doc) => (

                <div
                  key={doc.name}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2"
                >

                  <label className="block text-xs font-bold uppercase text-slate-700">
                    {doc.label}
                  </label>

                  <input
                    type="file"
                    name={doc.name}
                    onChange={handleFileChange}
                    className="w-full text-[10px] text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                  />

                </div>

              ))}

            </div>
          </div>

          {/* Trust / Experience & Preferences */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <ShieldCheck size={24} />
              </div>

              <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                ⭐ Trust, Experience & Lead Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Years in Packers & Movers Business
                </label>

                <input
                  type="text"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  placeholder="e.g. 5 Years"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Previous Customer Reviews / Rating
                </label>

                <input
                  type="text"
                  name="customerRating"
                  value={formData.customerRating}
                  onChange={handleInputChange}
                  placeholder="e.g. 4.5 Star on Google"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Insurance Available?
                </label>

                <select
                  name="insuranceAvailable"
                  value={formData.insuranceAvailable}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Damage / Claim Policy
                </label>

                <input
                  type="text"
                  name="claimPolicy"
                  value={formData.claimPolicy}
                  onChange={handleInputChange}
                  placeholder="Briefly describe policy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Any major customer complaint currently unresolved?
                </label>

                <select
                  name="unresolvedComplaints"
                  value={formData.unresolvedComplaints}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Preferred Working Hours
                </label>

                <input
                  type="text"
                  name="preferredHours"
                  value={formData.preferredHours}
                  onChange={handleInputChange}
                  placeholder="e.g. 9 AM - 9 PM"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Are you willing to accept leads from Apni Manzil? *
                </label>

                <select
                  name="acceptLeads"
                  required
                  value={formData.acceptLeads}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500 font-bold text-orange-600"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  How would you like to receive leads?
                </label>

                <select
                  name="leadReceiveMode"
                  value={formData.leadReceiveMode}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Both">Both (WhatsApp & Call)</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Call">Call</option>
                </select>
              </div>

            </div>
          </div>

          {/* Payment / Settlement Details */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">

              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl">
                <CreditCard size={24} />
              </div>

              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                  💳 Payment / Settlement Details
                </h3>

                <p className="text-[11px] text-slate-500 font-medium">
                  Partner Verified + Active झाल्यावर bank details घेऊ
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Account Holder Name
                </label>

                <input
                  type="text"
                  name="bankAccountHolder"
                  value={formData.bankAccountHolder}
                  onChange={handleInputChange}
                  placeholder="e.g. Om Sai Logistics"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Bank Name
                </label>

                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC Bank"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Account Number
                </label>

                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  IFSC Code
                </label>

                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC0001234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Account Type
                </label>

                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Current">Current</option>
                  <option value="Savings">Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  UPI ID (Optional)
                </label>

                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="e.g. business@upi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">

                <label className="block text-xs font-bold uppercase text-slate-700">
                  Cancelled Cheque / Bank Proof
                </label>

                <input
                  type="file"
                  name="bankProof"
                  onChange={handleFileChange}
                  className="w-full text-[10px] text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                />

              </div>

            </div>
          </div>

          {/* Partner Login Setup */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">

              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <LockKeyhole size={24} />
              </div>

              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                  🔐 Partner Login Setup
                </h3>

                <p className="text-[11px] text-slate-500 font-medium">
                  Create your Apni Manzil Partner Dashboard login credentials.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="md:col-span-2">

                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Login Email Address *
                </label>

                <input
                  type="email"
                  name="loginEmail"
                  required
                  value={formData.loginEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email for Partner Dashboard login"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />

              </div>

              <div>

                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Password *
                </label>

                <input
                  type="password"
                  name="loginPassword"
                  required
                  minLength={6}
                  value={formData.loginPassword}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />

              </div>

              <div>

                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Confirm Password *
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-enter password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-orange-500"
                />

              </div>

            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">

              <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                🔒 Your password is securely handled by Firebase Authentication.
                It will not be stored in Google Sheets or the Partner database.
              </p>

            </div>

          </div>

          {/* Partner Terms & Conditions */}
          <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">

            <div className="flex items-center gap-3 border-b pb-4">

              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <FileText size={24} />
              </div>

              <div>
                <h3 className="text-lg font-[950] text-[#002D5E] uppercase italic">
                  📜 Apni Manzil – Packers & Movers Partner Terms & Conditions
                </h3>

                <p className="text-[11px] text-slate-500 font-medium">
                  Please read all Terms & Conditions carefully before submitting your registration.
                </p>
              </div>

            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-[500px] overflow-y-auto space-y-5">

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  1. Accurate Information
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The Partner confirms that all information, documents, business details,
                  contact details, pricing information, and other information submitted
                  during registration are true, accurate, complete, and up to date.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  2. Document Verification
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Apni Manzil may verify the Partner’s business details, identity documents,
                  GST details, address, bank details, service area, vehicles, and other
                  information submitted during registration.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  3. Service Responsibility
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The Partner is responsible for the quality, safety, timeliness, packing,
                  loading, transportation, unloading, manpower, vehicles, and other services
                  provided to customers.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  4. Customer Quotations
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The Partner must provide customers with clear and transparent quotations.
                  No hidden or unauthorized additional charges should be imposed on customers.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  5. Accepted Leads
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Once a Partner accepts a customer enquiry or lead, the Partner should
                  communicate professionally with the customer and provide the committed
                  service as agreed.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  6. Customer Information
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Customer names, phone numbers, addresses, shipment details, and other
                  information received through Apni Manzil must be used only for legitimate
                  service-related purposes. Partners must not misuse, sell, or share customer
                  information without proper authorization.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  7. Legal Compliance
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The Partner is responsible for maintaining all applicable licences,
                  registrations, permits, insurance, tax compliance, vehicle documents,
                  labour compliance, and other legal requirements applicable to their business.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  8. Damages and Claims
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Any loss, damage, delay, negligence, theft, or service-related customer
                  claim arising from the Partner’s service will be handled according to the
                  applicable agreement, service terms, and applicable law.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  9. Customer Complaints
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The Partner agrees to cooperate with Apni Manzil in resolving customer
                  complaints, disputes, service issues, or verification requirements.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  10. False Information
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Submission of false, misleading, fraudulent, or forged information or
                  documents may result in rejection, suspension, or termination of the
                  Partner account.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  11. Partner Activation
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Registration does not automatically mean that the Partner is approved or
                  activated. Partner activation is subject to verification and approval by
                  Apni Manzil.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  12. No Guaranteed Leads
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Registration with Apni Manzil does not guarantee any minimum number of
                  enquiries, leads, bookings, orders, or revenue.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  13. Pricing
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  The Partner must honour the pricing and service commitments communicated
                  to customers unless a change is mutually agreed with the customer before
                  service confirmation.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  14. Platform Conduct
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Partners must not misuse the Apni Manzil platform, manipulate leads,
                  provide misleading information, engage in fraudulent activities, or
                  violate Apni Manzil platform policies.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  15. Suspension or Removal
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Apni Manzil may temporarily suspend, deactivate, or remove a Partner
                  from the platform in cases including serious customer complaints, fraud,
                  repeated service failures, document issues, policy violations, or other
                  legitimate concerns.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  16. Payment and Settlement
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Payment and settlement processes, where applicable, will be handled
                  according to the applicable Apni Manzil Partner policy or agreement.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  17. Communication
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  By registering, the Partner agrees that Apni Manzil may contact the
                  Partner through phone, WhatsApp, email, SMS, or other available
                  communication methods regarding verification, leads, onboarding, and
                  platform-related matters.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  18. Updates to Terms
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Apni Manzil may update or modify these Partner Terms & Conditions from
                  time to time. Partners may be required to comply with the latest
                  applicable version.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black text-[#002D5E] mb-1">
                  19. Acceptance
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  By submitting the registration form, the Partner confirms that they
                  have read, understood, and agreed to these Terms & Conditions and the
                  applicable Apni Manzil Partner policies.
                </p>
              </div>

              <div className="bg-white border border-orange-200 rounded-2xl p-4">

                <h4 className="text-sm font-black text-orange-600 mb-2">
                  Partner Declaration
                </h4>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  “I confirm that the information and documents provided by me are genuine
                  and accurate. I have read, understood, and agree to the Apni Manzil
                  Packers & Movers Partner Terms & Conditions.”
                </p>

              </div>

            </div>

            {/* Mandatory Acceptance Checkbox */}
            <label
              className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                formData.termsAccepted
                  ? 'bg-emerald-50 border-emerald-500'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >

              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleTermsChange}
                required
                className="mt-1 accent-orange-500 w-5 h-5 cursor-pointer"
              />

              <span className="text-xs text-slate-700 leading-relaxed">
                I confirm that the information and documents provided by me are genuine
                and accurate. I have read, understood, and agree to the{' '}
                <strong>
                  Apni Manzil Packers & Movers Partner Terms & Conditions.
                </strong>
              </span>

            </label>

            {!formData.termsAccepted && (
              <p className="text-[11px] text-red-500 font-bold">
                * You must accept the Terms & Conditions before submitting your registration.
              </p>
            )}

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