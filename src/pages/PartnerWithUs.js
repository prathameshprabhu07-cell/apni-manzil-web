import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Building2, FileText, Phone, Mail, MapPin, 
  Briefcase, CreditCard, ShieldCheck, ChevronRight, CheckCircle2 
} from 'lucide-react';

const VendorRegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
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
    accountHolderName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // मोबाईल नंबर व्हॅलिडेट करा
    if (!formData.mobile || formData.mobile.length < 10) {
      alert("कृपया १० अंकी वैध मोबाईल नंबर भरा!");
      return;
    }

    setLoading(true);
    
    // पूर्ण डेटा एकत्र केला (मोबाईल नंबरला +91 लावून)
    const vendorData = {
      ...formData,
      mobile: `+91${formData.mobile}`,
      role: "Vendor",
      verificationStatus: "Pending", // व्हिफ़िकेशनसाठी पेंडिंग स्टेटस
      timestamp: new Date().toISOString()
    };

    try {
      // १. Firebase मध्ये 'vendors' कलेक्शनमध्ये सेव्ह करा
      await addDoc(collection(db, "vendors"), vendorData);

      // २. n8n कडे डेटा पाठवा (ऑटोमेशन किंवा नोटिफिकेशनसाठी)
      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData),
      });

      alert("Vendor registration submitted successfully! Our team will verify your details soon.");
      navigate(-1);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* 🟦 Header */}
      <div className="bg-[#002D5E] text-white p-6 flex items-center gap-4 sticky top-0 z-50 shadow-lg">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          <ArrowLeft size={20}/>
        </button>
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            Vendor <span className="text-orange-500">Registration</span>
          </h1>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Join Apni Manzil Partner Network</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 mt-4">
        {/* 📸 Banner Section */}
        <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-44 object-cover" 
            alt="Vendor Partnership"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div className="text-white">
              <span className="bg-orange-500 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Partner Program</span>
              <h2 className="text-lg font-black mt-1">Grow Your Logistics Business With Us</h2>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Business Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-blue-700 uppercase tracking-widest mb-4">
              <Building2 size={14}/> 1. Business Information
            </h3>
            <div className="space-y-3">
              <input name="companyName" placeholder="Company / Business Name" required className="form-input" onChange={handleChange} />
              <input name="ownerName" placeholder="Owner / Director Name" required className="form-input" onChange={handleChange} />
              <input name="gstNumber" placeholder="GST Number (e.g. 27XXXXX0000X1Z5)" required className="form-input uppercase" onChange={handleChange} />
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-orange-600 uppercase tracking-widest mb-4">
              <Phone size={14}/> 2. Official Contact Details
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-4 text-slate-400" />
                <input type="email" name="officialEmail" placeholder="Official Email Address" required className="form-input pl-12" onChange={handleChange} />
              </div>
              
              {/* Mobile Number with +91 Prefix */}
              <div className="flex items-center bg-[#f8fafc] rounded-[1.5rem] overflow-hidden border-2 border-[#f1f5f9] focus-within:border-[#002D5E] focus-within:bg-white transition-all">
                <span className="bg-slate-200 px-4 py-4 text-slate-700 font-extrabold border-r border-slate-300 select-none text-sm">
                  +91
                </span>
                <input 
                  type="tel"
                  maxLength="10"
                  name="mobile"
                  placeholder="Official Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, mobile: val });
                  }}
                  className="w-full p-4 bg-transparent border-none outline-none text-sm font-black tracking-[2px] text-slate-900" 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Service Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-green-700 uppercase tracking-widest mb-4">
              <Briefcase size={14}/> 3. Service & Operation Area
            </h3>
            <div className="space-y-3">
              <input name="serviceType" placeholder="Services Offered (e.g. Warehousing, Transport, Packaging)" required className="form-input" onChange={handleChange} />
              <input name="serviceArea" placeholder="Operating Service Areas / Cities (e.g. Pune, Mumbai, Nashik)" required className="form-input" onChange={handleChange} />
            </div>
          </div>

          {/* Section 4: Bank Details (For Future Payouts) */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-purple-700 uppercase tracking-widest mb-4">
              <CreditCard size={14}/> 4. Bank Account Details (For Payouts)
            </h3>
            <div className="space-y-3">
              <input name="accountHolderName" placeholder="Account Holder Name (as per passbook)" required className="form-input" onChange={handleChange} />
              <input type="text" name="bankAccountNo" placeholder="Bank Account Number" required className="form-input font-mono" onChange={handleChange} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="ifscCode" placeholder="IFSC Code" required className="form-input uppercase font-mono" onChange={handleChange} />
                <input type="text" name="bankName" placeholder="Bank Name & Branch" required className="form-input" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Verification Note Box */}
          <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-[2rem] flex items-start gap-3">
            <ShieldCheck className="shrink-0 text-amber-600 mt-0.5" size={22}/>
            <div className="text-xs text-amber-900">
              <p className="font-black uppercase tracking-wide">Verification Notice</p>
              <p className="mt-1 font-medium leading-relaxed">
                Once submitted, our backend team will verify your GST and bank details. Upon successful verification, your profile will be active on the Apni Manzil platform.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading} 
            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'bg-slate-400' : 'bg-[#002D5E] text-white hover:bg-blue-900 active:scale-95'}`}
          >
            {loading ? "Submitting Registration..." : "Submit Vendor Application"}
            <ChevronRight size={20}/>
          </button>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1.1rem 1.5rem;
          background: #f8fafc;
          border-radius: 1.5rem;
          border: 2px solid #f1f5f9;
          font-weight: 700;
          outline: none;
          transition: all 0.2s;
          color: #1e293b;
          font-size: 0.95rem;
        }
        .form-input:focus {
          border-color: #002D5E;
          background: #fff;
          box-shadow: 0 10px 20px -10px rgba(0,45,94,0.1);
        }
      `}</style>
    </div>
  );
};

export default VendorRegistrationForm;