import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogIn, UserPlus, Mail, Lock, ArrowRight, Loader2, 
  User, Building2, Truck, Phone, MapPin, FileText, ChevronRight, Globe, CheckCircle2, Upload
} from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('individual'); 
  const [eximStep, setEximStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/register') setIsLogin(false);
    else setIsLogin(true);
  }, [location.pathname]);

  // Automatically clear messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phone: '', address: '',
    businessName: '', gstNumber: '', businessType: 'Retail',
    companyName: '', serviceType: 'Courier', serviceArea: '', idProof: '',
    iecCode: '', eximType: 'Exporter', countries: '', productCategory: 'Electronics',
    shipmentType: 'Air', servicesRequired: 'Courier'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const roles = [
    { id: 'individual', label: 'Individual', icon: <User size={18}/> },
    { id: 'msme', label: 'Business', icon: <Building2 size={18}/> },
    { id: 'vendor', label: 'Partner', icon: <Truck size={18}/> },
    { id: 'exim', label: 'Global', icon: <Globe size={18}/> }
  ];

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your email address.");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset link has been sent to your email.");
      setShowResetModal(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
    setResetLoading(false);
  };

  const handleAuth = async (e) => {
    if(e) e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // 1. Check if the selected role matches the database role
          if (userData.role !== role) {
            setMessage({ type: 'error', text: `Access Denied. This account is registered as ${userData.role}.` });
            setLoading(false); 
            return;
          }

          // 2. Check account status for businesses
          if (userData.role !== 'individual' && userData.status === 'pending') {
            setMessage({ type: 'error', text: "Your account verification is pending." });
            setLoading(false); 
            return;
          }

          // 3. Navigate to correct dashboard
          navigate(userData.role === 'exim' ? '/exim-dashboard' : '/customer-dashboard');
        } else {
          setMessage({ type: 'error', text: "User profile not found in database." });
        }
      } else {
        // --- REGISTRATION LOGIC ---
        if (formData.password.length < 6) {
          setMessage({ type: 'error', text: "Password must be at least 6 characters." });
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const initialStatus = role === 'individual' ? 'active' : 'pending';

        // Save detailed user info to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          role,
          status: initialStatus,
          ...formData,
          createdAt: new Date().toISOString()
        });

        setMessage({ type: 'success', text: 'Registration Successful! Redirecting to login...' });
        setTimeout(() => setIsLogin(true), 3000);
      }
    } catch (error) {
      console.error("Firebase Error Code:", error.code);
      let errorMsg = "An unexpected error occurred.";

      // Specific Firebase Error Handling
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMsg = "Invalid email or password.";
          break;
        case 'auth/email-already-in-use':
          errorMsg = "This email is already registered.";
          break;
        case 'auth/invalid-email':
          errorMsg = "Please enter a valid email address.";
          break;
        case 'auth/weak-password':
          errorMsg = "Password is too weak.";
          break;
        default:
          errorMsg = error.message;
      }
      
      setMessage({ type: 'error', text: errorMsg });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] flex flex-col items-center justify-center p-4 py-12 font-sans">
      
      {/* MAIN AUTH CARD */}
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-[550px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white mb-10">
        
        <div className="pt-12 pb-8 px-10 text-center">
            <div className="w-16 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
            <h2 className="text-[#1e293b] text-3xl font-bold tracking-tight">
                {isLogin ? `Welcome Back` : `Create Account`}
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
                {isLogin ? `Log in to your ${role} portal` : `Start your logistics journey as ${role}`}
            </p>
        </div>

        <div className="px-10 pb-12">
          
          <div className="mb-8">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
              {roles.map((item) => (
                <button 
                  key={item.id} 
                  type="button" 
                  onClick={() => {setRole(item.id); setEximStep(1);}} 
                  className={`flex-1 py-2.5 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${role === item.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-xs font-bold text-center animate-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {message.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {isLogin && (
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18}/>
                  <input name="email" type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all" onChange={handleChange} />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18}/>
                  <input name="password" type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all" onChange={handleChange} />
                </div>
                
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowResetModal(true)} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 tracking-wide uppercase">
                    Forgot Password?
                  </button>
                </div>

                <button onClick={handleAuth} disabled={loading} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-indigo-600 hover:-translate-y-0.5 transition-all duration-200">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : `Sign In`}
                </button>
              </div>
            )}

            {!isLogin && role === 'exim' && (
              <div className="space-y-4">
                <div className="flex gap-1.5 mb-6 justify-center">
                    {[1,2,3,4,5].map(s => <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${eximStep >= s ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>)}
                </div>

                {eximStep === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-500">
                    <input name="companyName" placeholder="Company Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 focus:bg-white transition-all" onChange={handleChange} />
                    <input name="fullName" placeholder="Owner / Contact Person Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 focus:bg-white transition-all" onChange={handleChange} />
                    <div className="relative flex gap-2">
                        <input name="phone" placeholder="Mobile Number" className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                        <button type="button" className="px-4 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-xl border border-indigo-100 whitespace-nowrap">Verify OTP</button>
                    </div>
                    <input name="email" placeholder="Email ID" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Set Password" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <button type="button" onClick={() => setEximStep(2)} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-indigo-600 transition-all">Continue to Business Details <ChevronRight size={18}/></button>
                  </div>
                )}

                {eximStep === 2 && (
                  <div className="space-y-3 animate-in fade-in duration-500">
                    <input name="iecCode" placeholder="IEC Code ⭐" className="w-full p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl text-sm font-bold text-indigo-700 outline-none" onChange={handleChange} />
                    <input name="gstNumber" placeholder="GST Number (Recommended)" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <select name="eximType" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none" onChange={handleChange}>
                      <option value="">Select Business Type</option>
                      <option value="Exporter">Exporter</option>
                      <option value="Importer">Importer</option>
                      <option value="Both">Both</option>
                    </select>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setEximStep(1)} className="flex-1 border border-slate-200 py-4 rounded-2xl font-bold text-slate-500">Back</button>
                        <button type="button" onClick={() => setEximStep(3)} className="flex-[2] bg-[#1e293b] text-white py-4 rounded-2xl font-bold">Next Step</button>
                    </div>
                  </div>
                )}

                {eximStep === 3 && (
                  <div className="space-y-3 animate-in fade-in duration-500">
                    <input name="countries" placeholder="Countries dealing with" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <select name="productCategory" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange}>
                        <option value="">Product Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Machinery">Machinery</option>
                    </select>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setEximStep(2)} className="flex-1 border border-slate-200 py-4 rounded-2xl font-bold text-slate-500">Back</button>
                        <button type="button" onClick={() => setEximStep(4)} className="flex-[2] bg-[#1e293b] text-white py-4 rounded-2xl font-bold">Logistics Needs</button>
                    </div>
                  </div>
                )}

                {eximStep === 4 && (
                  <div className="space-y-3 animate-in fade-in duration-500">
                    <select name="shipmentType" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange}>
                        <option value="">Shipment Type</option>
                        <option value="Air">Air</option>
                        <option value="Sea">Sea</option>
                        <option value="Road">Road</option>
                    </select>
                    <select name="servicesRequired" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange}>
                        <option value="">Services Required</option>
                        <option value="Courier">Courier</option>
                        <option value="Freight">Freight</option>
                        <option value="Customs">Customs</option>
                    </select>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setEximStep(3)} className="flex-1 border border-slate-200 py-4 rounded-2xl font-bold text-slate-500">Back</button>
                        <button type="button" onClick={() => setEximStep(5)} className="flex-[2] bg-[#1e293b] text-white py-4 rounded-2xl font-bold">Documents</button>
                    </div>
                  </div>
                )}

                {eximStep === 5 && (
                  <div className="space-y-4 animate-in fade-in duration-500">
                    <div className="border-2 border-dashed border-slate-200 p-6 rounded-2xl text-center hover:border-indigo-400 transition-colors cursor-pointer group">
                        <Upload className="mx-auto text-slate-300 group-hover:text-indigo-500 mb-2" size={24} />
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">IEC Certificate Upload</p>
                    </div>
                    <div className="border-2 border-dashed border-slate-200 p-6 rounded-2xl text-center hover:border-indigo-400 transition-colors cursor-pointer group">
                        <Upload className="mx-auto text-slate-300 group-hover:text-indigo-500 mb-2" size={24} />
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">GST Certificate Upload</p>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setEximStep(4)} className="flex-1 border border-slate-200 py-4 rounded-2xl font-bold text-slate-500">Back</button>
                        <button onClick={handleAuth} disabled={loading} className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex justify-center">
                          {loading ? <Loader2 className="animate-spin" /> : `Complete Registration`}
                        </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isLogin && role !== 'exim' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in duration-500">
                <input name="fullName" placeholder="Full Name" className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all" onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password (Min 6 chars)" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all" onChange={handleChange} />
                <input name="phone" placeholder="Phone" className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600 transition-all" onChange={handleChange} />
                {role === 'msme' && ( <input name="businessName" placeholder="Business Name" className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} /> )}
                {role === 'vendor' && ( <input name="serviceArea" placeholder="Service Area (City)" className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} /> )}
                <button onClick={handleAuth} disabled={loading} className="md:col-span-2 bg-[#1e293b] text-white py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-indigo-600 transition-all mt-2 flex justify-center">
                   {loading ? <Loader2 className="animate-spin" /> : `Create Account`}
                </button>
              </div>
            )}
          </form>

          <div className="mt-10 text-center">
            <button onClick={() => {setIsLogin(!isLogin); setEximStep(1); setMessage({type:'', text:''});}} className="text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-indigo-600 transition-all">
              {isLogin ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION --- */}
      <div className="w-full max-w-[900px] flex flex-col items-center animate-in fade-in duration-1000 slide-in-from-bottom-5 mt-10">
          <h3 className="text-[#1e293b] text-2xl md:text-4xl font-black uppercase tracking-[0.2em] italic text-center mb-10 px-4">
            One Solution for all <span className="text-indigo-600">Deliveries</span>
          </h3>
          
          <div className="w-full relative px-4">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-[80px] opacity-40"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-[80px] opacity-40"></div>
              
              <div className="relative group overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(30,41,59,0.3)] border-4 border-white z-10">
                <img 
                  src="/fleet.png" 
                  alt="Apni Manzil Logistics Fleet" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/20 to-transparent pointer-events-none"></div>
              </div>
          </div>
          
          <p className="mt-10 text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] text-center">
            Reliable • Fast • Global Logistics Partner
          </p>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in duration-300">
          <div className="bg-white w-full max-md rounded-[2rem] p-10 shadow-2xl border border-slate-100">
            <h3 className="text-[#1e293b] text-2xl font-bold mb-2 text-center">Reset Password</h3>
            <p className="text-slate-500 text-sm mb-8 text-center">Enter your email to receive a reset link</p>
            
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-600"
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button 
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 flex justify-center items-center gap-2 hover:bg-indigo-700 transition-all"
              >
                {resetLoading ? <Loader2 className="animate-spin" /> : <>Send Reset Link</>}
              </button>
              <button 
                onClick={() => setShowResetModal(false)}
                className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest pt-2 hover:text-slate-600"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;