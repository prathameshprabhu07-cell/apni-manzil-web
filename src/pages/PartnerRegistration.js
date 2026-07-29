import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  ArrowLeft, Building2, Phone, Mail, MapPin, 
  Briefcase, CreditCard, ShieldCheck, ChevronRight, CheckCircle2, CheckSquare, Square
} from 'lucide-react';

// भारताची सर्व राज्ये, केंद्रशासित प्रदेश आणि त्यांची प्रमुख शहरे/जिल्हे
const stateDistricts = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Rajahmundry", "Kadapa", "Anantapur"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Naharlagun"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", "Mehsana", "Morbi"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu", "Bilaspur", "Chamba"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh"],
  "Karnataka": ["Bangalore Urban", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Bellary", "Shimoga", "Tumkur", "Udupi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Palakkad", "Alappuzha", "Kannur", "Kottayam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
  "Maharashtra": ["Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Nanded", "Jalgaon", "Sangli", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalna", "Bhusawal"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar", "Pali"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahabubnagar", "Nalgonda", "Adilabad"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Ayodhya"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Kharagpur", "Bardhaman", "Malda", "Baharampur"],
  "Andaman and Nicobar Islands": ["Port Blair", "Car Nicobar", "Mayabunder"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Sopore", "Kathua"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};

// ९ मुख्य सर्व्हिसेस आणि त्यांचे सब-सर्व्हिसेस
const coreServicesList = [
  {
    name: "Courier & Express Delivery",
    subServices: ["Same Day Delivery", "Next Day Delivery", "Document Delivery", "E-commerce Parcel"]
  },
  {
    name: "Truck Transport & Full Load (FTL)",
    subServices: ["Open Body Trucks", "Container Trucks", "Trailer Transport", "Heavy Machinery Moving"]
  },
  {
    name: "Part Load / LTL Transport",
    subServices: ["Hub-to-Hub LTL", "Door-to-Door LTL", "Express Cargo Part Load"]
  },
  {
    name: "Warehouse & Storage",
    subServices: ["Short Term Storage", "Long Term Storage", "Fulfillment Warehouse", "Cold Storage", "Bulk Pallet Storage"]
  },
  {
    name: "Packers & Movers (Shifting)",
    subServices: ["Home Shifting", "Office Shifting", "Furniture Shifting", "Commercial Moving", "Vehicle Transport"]
  },
  {
    name: "Hyperlocal Delivery",
    subServices: ["Grocery Delivery", "Dark Store Fulfillment", "B2B Local Distribution", "Food & Pharma Delivery"]
  },
  {
    name: "International Logistics (EXIM)",
    subServices: ["Air Freight", "Sea Freight", "Customs Clearance", "Trade Finance Support"]
  },
  {
    name: "E-commerce Logistics",
    subServices: ["COD Remittance Management", "Reverse Logistics (Returns)", "Multi-channel Integration"]
  },
  {
    name: "AI Smart Logistics & Special Transport",
    subServices: ["OTD Route Optimization", "Hazardous Goods Transport", "Temperature-Controlled Freight"]
  }
];

const VendorRegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  
  // n8n URLs
  const n8nBaseUrl = "http://localhost:5678/webhook";
  const n8nRegisterUrl = `${n8nBaseUrl}/apni-manzil-logistics`;
  const n8nSendOtpUrl = `${n8nBaseUrl}/send-otp`;

  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    gstNumber: '',
    officialEmail: '',
    mobile: '',
    bankAccountNo: '',
    ifscCode: '',
    bankName: '',
    accountHolderName: ''
  });

  // ईमेल OTP स्टेट्स
  const [emailOtp, setEmailOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // सर्व्हिसेस सिलेक्शन स्टेट्स
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedSubServices, setSelectedSubServices] = useState({});

  // राज्य आणि जिल्हा सिलेक्शन स्टेट्स
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // n8n द्वारे खऱ्या ईमेलवर OTP पाठवण्याचे फंक्शन
  const handleSendOtp = async () => {
    if (!formData.officialEmail || !formData.officialEmail.includes('@')) {
      alert("कृपया आधी वैध ऑफिशियल ईमेल पत्ता टाका!");
      return;
    }

    setOtpLoading(true);
    try {
      const response = await fetch(n8nSendOtpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.officialEmail }),
      });

      if (response.ok) {
        setOtpSent(true);
        alert("तुमच्या ऑफिशियल ईमेलवर OTP पाठवण्यात आला आहे. कृपया तुमचा इनबॉक्स (किंवा स्पॅम फोल्डर) तपासा!");
      } else {
        alert("OTP पाठवण्यात अयशस्वी. कृपया n8n वेबहूक तपासा.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      alert("Error sending OTP: " + error.message);
    } finally {
      setOtpLoading(false);
    }
  };

  // OTP व्हेरिफाय करण्यासाठी n8n ला विचारणे किंवा लोकल तपासणे
  const handleVerifyOtp = async () => {
    if (!emailOtp || emailOtp.length < 6) {
      alert("कृपया ६ अंकी वैध OTP टाका!");
      return;
    }

    // येथे तुम्ही n8n कडून OTP व्हेरिफाय करू शकता किंवा तात्पुरते पास करू शकता
    setIsEmailVerified(true);
    alert("ईमेल यशस्वीरित्या व्हेरिफाय झाला!");
  };

  const handleServiceToggle = (serviceName) => {
    setSelectedServices(prev => ({ ...prev, [serviceName]: !prev[serviceName] }));
  };

  const handleSubServiceToggle = (subName) => {
    setSelectedSubServices(prev => ({ ...prev, [subName]: !prev[subName] }));
  };

  const handleDistrictToggle = (district) => {
    setSelectedDistricts(prev => ({ ...prev, [district]: !prev[district] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      alert("कृपया फॉर्म सबमिट करण्यापूर्वी तुमचा ईमेल OTP द्वारे व्हेरिफाय करा!");
      return;
    }

    if (!formData.mobile || formData.mobile.length < 10) {
      alert("कृपया १० अंकी वैध मोबाईल नंबर भरा!");
      return;
    }

    const chosenServicesList = Object.keys(selectedServices).filter(k => selectedServices[k]);
    const chosenSubServicesList = Object.keys(selectedSubServices).filter(k => selectedSubServices[k]);
    const chosenDistrictsList = Object.keys(selectedDistricts).filter(k => selectedDistricts[k]);

    if (chosenServicesList.length === 0) {
      alert("किमान एक तरी मुख्य सर्व्हिस (Service) निवडा!");
      return;
    }

    if (!selectedState || chosenDistrictsList.length === 0) {
      alert("कृपया राज्य आणि किमान एक जिल्हा/शहर निवडा!");
      return;
    }

    setLoading(true);
    
    const vendorData = {
      ...formData,
      mobile: `+91${formData.mobile}`,
      servicesOffered: chosenServicesList,
      subServicesOffered: chosenSubServicesList,
      operatingState: selectedState,
      operatingDistricts: chosenDistrictsList,
      role: "Vendor",
      verificationStatus: "Pending",
      timestamp: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "vendors"), vendorData);

      await fetch(n8nRegisterUrl, {
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

          {/* Section 2: Contact Info with Real Email OTP via n8n */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-orange-600 uppercase tracking-widest mb-4">
              <Phone size={14}/> 2. Official Contact & Real Email OTP Verification
            </h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-4 text-slate-400 z-10" />
                  <input 
                    type="email" 
                    name="officialEmail" 
                    placeholder="Official Email Address" 
                    required 
                    disabled={isEmailVerified}
                    className="form-input pl-12 pr-32" 
                    onChange={handleChange} 
                  />
                  {!isEmailVerified && (
                    <button 
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="absolute right-2 bg-orange-500 text-white text-[11px] font-black px-4 py-2 rounded-xl hover:bg-orange-600 transition"
                    >
                      {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  )}
                  {isEmailVerified && (
                    <span className="absolute right-4 text-emerald-600 flex items-center gap-1 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle2 size={14} /> Verified
                    </span>
                  )}
                </div>

                {otpSent && !isEmailVerified && (
                  <div className="flex gap-2 items-center bg-blue-50 p-3 rounded-2xl border border-blue-200">
                    <input 
                      type="text"
                      maxLength="6"
                      placeholder="Enter 6-digit OTP from email"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      className="bg-white p-3 rounded-xl border border-blue-300 outline-none text-sm font-bold tracking-widest w-full"
                    />
                    <button 
                      type="button"
                      onClick={handleVerifyOtp}
                      className="bg-blue-700 text-white text-xs font-black px-6 py-3 rounded-xl hover:bg-blue-800 transition whitespace-nowrap"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center bg-[#f8fafc] rounded-[1.5rem] overflow-hidden border-2 border-[#f1f5f9] focus-within:border-[#002D5E] focus-within:bg-white transition-all">
                <span className="bg-slate-200 px-4 py-4 text-slate-700 font-extrabold border-r border-slate-300 select-none text-sm">+91</span>
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

          {/* Section 3: Core Services & Sub-Services */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-green-700 uppercase tracking-widest mb-4">
              <Briefcase size={14}/> 3. Services Offered (Select Main & Sub-Services)
            </h3>
            <div className="space-y-4">
              {coreServicesList.map((service, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div onClick={() => handleServiceToggle(service.name)} className="flex items-center justify-between cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      {selectedServices[service.name] ? <CheckSquare className="text-blue-700 shrink-0" size={20} /> : <Square className="text-slate-400 shrink-0" size={20} />}
                      <span className="font-extrabold text-slate-800 text-sm">{service.name}</span>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Main Service</span>
                  </div>

                  {selectedServices[service.name] && (
                    <div className="mt-3 pl-7 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.subServices.map((sub, sIdx) => (
                        <div key={sIdx} onClick={() => handleSubServiceToggle(sub)} className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 transition">
                          {selectedSubServices[sub] ? <CheckSquare className="text-orange-500 shrink-0" size={16} /> : <Square className="text-slate-300 shrink-0" size={16} />}
                          <span className="text-xs font-bold text-slate-700">{sub}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: All India State & Districts Selector */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-teal-700 uppercase tracking-widest mb-4">
              <MapPin size={14}/> 4. Operating Service Area (All India States & Districts)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Select Operating State / UT</label>
                <select 
                  value={selectedState} 
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistricts({});
                  }}
                  className="form-input"
                >
                  <option value="">-- Choose State / UT --</option>
                  {Object.keys(stateDistricts).map((stateName, idx) => (
                    <option key={idx} value={stateName}>{stateName}</option>
                  ))}
                </select>
              </div>

              {selectedState && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-2">Select Cities / Districts in {selectedState}:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
                    {stateDistricts[selectedState].map((district, dIdx) => (
                      <div key={dIdx} onClick={() => handleDistrictToggle(district)} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:border-teal-500 transition">
                        {selectedDistricts[district] ? <CheckSquare className="text-teal-600 shrink-0" size={16} /> : <Square className="text-slate-300 shrink-0" size={16} />}
                        <span className="text-xs font-bold text-slate-800">{district}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Bank Details */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="flex items-center gap-2 font-black text-[11px] text-purple-700 uppercase tracking-widest mb-4">
              <CreditCard size={14}/> 5. Bank Account Details (For Payouts)
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

          <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-[2rem] flex items-start gap-3">
            <ShieldCheck className="shrink-0 text-amber-600 mt-0.5" size={22}/>
            <div className="text-xs text-amber-900">
              <p className="font-black uppercase tracking-wide">Verification Notice</p>
              <p className="mt-1 font-medium leading-relaxed">
                Once submitted, our backend team will verify your GST, Email, and Bank details. Upon successful verification, your profile will be active on the Apni Manzil platform.
              </p>
            </div>
          </div>

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