import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  Truck, Package, Building2, ChevronRight, ChevronLeft, 
  Phone, Mail, MapPin, Briefcase, CreditCard, ShieldCheck, FileText 
} from 'lucide-react';

const PartnerRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); 
  const [category, setCategory] = useState(null); 

  // n8n प्रोडक्शन URL
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    gstNumber: '',
    officialEmail: '',
    mobile: '',
    serviceType: '',
    serviceArea: '',
    bankAccountNo: '',
    ifscCode: '',
    bankName: '',
    accountHolderName: '',
    agreementAccepted: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mobile || formData.mobile.length < 10) {
      alert("कृपया १० अंकी वैध मोबाईल नंबर भरा!");
      return;
    }

    if (!formData.agreementAccepted) {
      alert("कृपया अटी व शर्ती स्वीकारण्यासाठी बॉक्सवर टिक करा!");
      return;
    }

    setLoading(true);
    
    const vendorData = {
      ...formData,
      category: category,
      mobile: `+91${formData.mobile}`,
      role: "Vendor",
      verificationStatus: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      // १. Firebase मध्ये सेव्ह करा
      await addDoc(collection(db, "vendors"), vendorData);

      // २. n8n कडे डेटा पाठवा
      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData),
      });

      alert("Vendor registration submitted successfully! Our team will verify your details soon.");
      navigate('/');
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 0: CORPORATE SELECTION ---
  if (step === 0) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Strategic Partnership</h1>
            <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">Join the Most Advanced Logistics Network in India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-6xl w-full border border-gray-200 shadow-2xl">
            {[
              { id: 'truck', title: 'Truck & Fleet', icon: <Truck size={32}/>, color: 'hover:bg-blue-600' },
              { id: 'packers', title: 'Packers & Movers', icon: <Package size={32}/>, color: 'hover:bg-orange-600' },
              { id: 'warehouse', title: 'Warehouse Group', icon: <Building2 size={32}/>, color: 'hover:bg-green-600' }
            ].map((item) => (
              <div key={item.id} onClick={() => { setCategory(item.id); nextStep(); }}
                className={`bg-white p-16 flex flex-col items-center justify-center border-r border-gray-100 last:border-0 cursor-pointer transition-all duration-300 group ${item.color} hover:text-white`}>
                <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-black uppercase tracking-tighter italic">{item.title}</h3>
                <div className="mt-4 w-10 h-1 bg-gray-200 group-hover:bg-white"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
      <div className="flex-grow flex flex-col items-center py-16 px-6">
        <div className="w-full max-w-4xl bg-white shadow-2xl flex flex-col lg:flex-row border border-gray-200">
          
          {/* Sidebar Info */}
          <div className="lg:w-1/3 bg-[#002D5E] p-12 text-white flex flex-col justify-between">
            <div>
              <p className="text-[#ff5e00] font-black text-xs uppercase tracking-widest mb-4 italic underline decoration-2 underline-offset-4">Registration Portal</p>
              <h2 className="text-3xl font-black uppercase italic leading-none mb-6">Step<br/>0{step} <span className="text-blue-400">/ 4</span></h2>
              <p className="text-xs text-blue-200 font-bold uppercase tracking-widest leading-relaxed">Complete onboarding for {category} partnership.</p>
            </div>
            <div className="mt-12 space-y-4">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-1 w-full ${s <= step ? 'bg-[#ff5e00]' : 'bg-gray-700'}`}></div>
              ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:w-2/3 p-12 md:p-16">
            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
              <div className="min-h-[400px]">
                
                {/* STEP 1: Business Details */}
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-6 border-b-4 border-slate-800 w-fit pb-2">1. Business Information</h3>
                    
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company / Business Name</label>
                      <input name="companyName" required onChange={handleInput} value={formData.companyName} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="e.g. APNI LOGISTICS PVT LTD" />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Owner / Director Name</label>
                      <input name="ownerName" required onChange={handleInput} value={formData.ownerName} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="e.g. John Doe" />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">GST Number</label>
                      <input name="gstNumber" required onChange={handleInput} value={formData.gstNumber} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base uppercase outline-none focus:border-[#004080]" placeholder="e.g. 27XXXXX0000X1Z5" />
                    </div>
                  </div>
                )}

                {/* STEP 2: Contact & Service Details */}
                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-6 border-b-4 border-orange-600 w-fit pb-2">2. Contact & Service Info</h3>
                    
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Email Address</label>
                      <input name="officialEmail" type="email" required onChange={handleInput} value={formData.officialEmail} className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="e.g. info@apnilogistics.com" />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Mobile Number</label>
                      <div className="flex items-center border-b-2 border-gray-200 focus-within:border-[#004080]">
                        <span className="font-extrabold text-slate-700 pr-2">+91</span>
                        <input 
                          type="tel"
                          maxLength="10"
                          name="mobile"
                          required
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData({ ...formData, mobile: val });
                          }}
                          className="w-full p-3 bg-transparent border-none outline-none text-base font-black tracking-wider text-slate-900" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Services Offered</label>
                      <input name="serviceType" required onChange={handleInput} value={formData.serviceType} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="e.g. Warehousing, Transport" />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operating Service Areas / Cities</label>
                      <input name="serviceArea" required onChange={handleInput} value={formData.serviceArea} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="e.g. Pune, Mumbai, Nashik" />
                    </div>
                  </div>
                )}

                {/* STEP 3: Bank Details */}
                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5">
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-6 border-b-4 border-blue-600 w-fit pb-2">3. Bank Account Details</h3>
                    
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Holder Name</label>
                      <input name="accountHolderName" required onChange={handleInput} value={formData.accountHolderName} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="As per bank passbook" />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bank Account Number</label>
                      <input name="bankAccountNo" required onChange={handleInput} value={formData.bankAccountNo} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold font-mono text-base outline-none focus:border-[#004080]" placeholder="Enter account number" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IFSC Code</label>
                        <input name="ifscCode" required onChange={handleInput} value={formData.ifscCode} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold uppercase font-mono text-base outline-none focus:border-[#004080]" placeholder="HDFC0001234" />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bank Name & Branch</label>
                        <input name="bankName" required onChange={handleInput} value={formData.bankName} type="text" className="w-full border-b-2 border-gray-200 p-3 font-bold text-base outline-none focus:border-[#004080]" placeholder="HDFC Bank, Pune" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Compliance Agreement */}
                {step === 4 && (
                  <div className="animate-in fade-in duration-500">
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-6 border-b-4 border-green-600 w-fit pb-2">4. Compliance Agreement</h3>
                    <div className="bg-gray-50 p-6 border border-gray-200 h-56 overflow-y-auto text-[12px] font-bold text-gray-600 leading-relaxed mb-6 shadow-inner">
                      <p className="mb-4 uppercase text-[#004080] border-b border-gray-200 pb-2">1.0 Data Accuracy & Verification</p>
                      <p className="mb-4">The registering entity confirms that all statutory documents (GST, Bank details) provided to Apni Manzil are authentic and up-to-date. Fraudulent entries will lead to immediate legal termination.</p>
                      <p className="mb-4 uppercase text-[#004080] border-b border-gray-200 pb-2">2.0 Operational Standards</p>
                      <p>Partner must adhere to the standardized Service Level Agreements (SLA) regarding cargo safety and delivery timelines.</p>
                    </div>
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        name="agreementAccepted" 
                        checked={formData.agreementAccepted} 
                        onChange={handleInput} 
                        className="w-5 h-5 accent-[#004080]" 
                      />
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-black transition">I Accept the Master Service Agreement</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12 border-t border-gray-100 pt-6">
                <button type="button" onClick={prevStep} className="flex-1 py-4 font-black uppercase text-xs tracking-widest text-gray-400 hover:text-black transition flex items-center justify-center gap-2">
                  <ChevronLeft size={16}/> Back
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] py-5 bg-[#004080] text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-[#ff5e00] transition duration-500 flex items-center justify-center gap-2 shadow-2xl"
                >
                  {loading ? "Submitting..." : (step === 4 ? "Execute Registration" : "Proceed Next")} <ChevronRight size={16}/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration;