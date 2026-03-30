import React, { useState } from 'react';
import { User, Building, Truck, IndianRupee, FileCheck, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const PartnerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    ownerName: '', companyName: '', phone: '', email: '', password: '',
    // Step 2: Business Info
    establishedSince: '', businessType: 'Individual', panNumber: '', gstNumber: '',
    // Step 3: Service Details
    serviceTypes: [], cities: '', serviceDistance: 'Both',
    // Step 4: Fleet & Capacity
    vehicleCount: '', vehicleTypes: [], workerCount: '', packingAvailable: 'Yes',
    // Step 10: Insurance
    providesInsurance: 'No'
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/partners/register', formData);
      if (res.data.success) {
        alert("तुमचा अर्ज मॅन्युअल व्हेरिफिकेशनसाठी पाठवला आहे! 🚀");
      }
    } catch (err) {
      alert("काहीतरी चूक झाली आहे. पुन्हा प्रयत्न करा.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        {/* Progress Bar */}
        <div className="bg-[#004080] p-8 text-white">
          <h1 className="text-2xl font-black mb-4 uppercase italic">Partner Onboarding</h1>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-2 flex-1 rounded-full ${currentStep >= s ? 'bg-[#ff5e00]' : 'bg-white/20'}`} />
            ))}
          </div>
          <p className="mt-4 text-sm font-bold opacity-80">Step {currentStep} of 11</p>
        </div>

        <div className="p-10">
          {/* STEP 1: BASIC DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-2xl"><User className="text-[#ff5e00]" /></div>
                <h2 className="text-xl font-black text-slate-800">Basic Details</h2>
              </div>
              <input type="text" placeholder="Owner Full Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-orange-500 font-bold" 
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})} />
              <input type="text" placeholder="Company Name" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-orange-500 font-bold" 
                onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
              <input type="text" placeholder="Mobile Number (OTP Verification)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-orange-500 font-bold" 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
          )}

          {/* STEP 3: SERVICE DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl"><Truck className="text-blue-600" /></div>
                <h2 className="text-xl font-black text-slate-800">Service Details</h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {['House Shifting', 'Office Shifting', 'Vehicle Transport'].map(item => (
                  <label key={item} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                    <input type="checkbox" className="w-5 h-5 accent-[#ff5e00]" />
                    <span className="font-bold text-slate-700">{item}</span>
                  </label>
                ))}
              </div>
              <input type="text" placeholder="Service Cities (e.g. Mumbai, Pune)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-orange-500 font-bold" 
                onChange={(e) => setFormData({...formData, cities: e.target.value})} />
            </div>
          )}

          {/* Buttons Navigation */}
          <div className="mt-12 flex gap-4">
            {currentStep > 1 && (
              <button onClick={prevStep} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black border-2 border-slate-100 text-slate-500 hover:bg-slate-50 transition">
                <ArrowLeft size={20} /> Back
              </button>
            )}
            
            {currentStep < 5 ? (
              <button onClick={nextStep} className="flex-[2] flex items-center justify-center gap-2 bg-[#ff5e00] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition">
                Continue <ArrowRight size={20} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="flex-[2] bg-green-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-green-700 transition">
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration;