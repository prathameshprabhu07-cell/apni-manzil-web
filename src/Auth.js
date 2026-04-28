import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
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
  const [resetEmail, setResetEmail] = useState(''); // Works for both Email/Phone
  const [resetLoading, setResetLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/register') setIsLogin(false);
    else setIsLogin(true);
  }, [location.pathname]);

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

  // --- OTP साठी Recaptcha Setup ---
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handleResetPassword = async (e) => {
    if(e) e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your registered Email or Mobile Number.");
      return;
    }

    setResetLoading(true);
    try {
      // जर इनपुटमध्ये @ असेल तर ईमेल पाठवा, नसेल तर मोबाईल रिसेट (OTP)
      if (resetEmail.includes('@')) {
        await sendPasswordResetEmail(auth, resetEmail);
        alert("Password reset link has been sent to your email. Check Inbox/Spam.");
        setShowResetModal(false);
      } else {
        // मोबाईल नंबर रिसेट लॉजिक (OTP)
        setupRecaptcha();
        const phoneNumber = resetEmail.startsWith('+') ? resetEmail : `+91${resetEmail}`;
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        setVerificationId(confirmationResult);
        alert("OTP has been sent to your mobile number.");
      }
    } catch (error) {
      console.error("Reset Error:", error.code);
      alert("Error: " + error.message);
    }
    setResetLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) return alert("Enter OTP");
    setResetLoading(true);
    try {
      await verificationId.confirm(otp);
      alert("Mobile verified! You can now reset your password in settings.");
      setShowResetModal(false);
    } catch (error) {
      alert("Invalid OTP");
    }
    setResetLoading(false);
  };

  const handleAuth = async (e) => {
    if(e) e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== role) {
            setMessage({ type: 'error', text: `Access Denied. Registered as ${userData.role}.` });
            setLoading(false); 
            return;
          }
          if (userData.role !== 'individual' && userData.status === 'pending') {
            setMessage({ type: 'error', text: "Your account verification is pending." });
            setLoading(false); 
            return;
          }
          navigate(userData.role === 'exim' ? '/exim-dashboard' : '/customer-dashboard');
        } else {
          setMessage({ type: 'error', text: "User profile not found." });
        }
      } else {
        if (formData.password.length < 6) {
          setMessage({ type: 'error', text: "Password must be at least 6 characters." });
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const initialStatus = role === 'individual' ? 'active' : 'pending';

        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid,
          role,
          status: initialStatus,
          ...formData,
          createdAt: new Date().toISOString()
        });

        setMessage({ type: 'success', text: 'Registration Successful! Redirecting...' });
        setTimeout(() => setIsLogin(true), 3000);
      }
    } catch (error) {
      let errorMsg = error.message;
      setMessage({ type: 'error', text: errorMsg });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] flex flex-col items-center justify-center p-4 py-12 font-sans">
      
      {/* Invisible Recaptcha for Phone Auth */}
      <div id="recaptcha-container"></div>

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
                <button key={item.id} type="button" onClick={() => {setRole(item.id); setEximStep(1);}} className={`flex-1 py-2.5 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 ${role === item.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-xs font-bold text-center ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {message.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isLogin && (
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18}/>
                  <input name="email" type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-indigo-600 outline-none transition-all" onChange={handleChange} />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18}/>
                  <input name="password" type="password" placeholder="Password" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-indigo-600 outline-none transition-all" onChange={handleChange} />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowResetModal(true)} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wide">
                    Forgot Password?
                  </button>
                </div>
                <button onClick={handleAuth} disabled={loading} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-sm shadow-lg hover:bg-indigo-600 transition-all">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : `Sign In`}
                </button>
              </div>
            )}

            {/* --- Registration Steps (No changes here as requested) --- */}
            {!isLogin && role === 'exim' && (
              <div className="space-y-4">
                <div className="flex gap-1.5 mb-6 justify-center">
                    {[1,2,3,4,5].map(s => <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${eximStep >= s ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>)}
                </div>
                {eximStep === 1 && (
                  <div className="space-y-3">
                    <input name="companyName" placeholder="Company Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <input name="fullName" placeholder="Owner Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <input name="phone" placeholder="Mobile Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <input name="email" placeholder="Email ID" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Set Password" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                    <button type="button" onClick={() => setEximStep(2)} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2">Next <ChevronRight size={18}/></button>
                  </div>
                )}
                {/* Steps 2-5 kept as per original logic */}
                {eximStep === 2 && ( <div className="space-y-3"> <input name="iecCode" placeholder="IEC Code" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} /> <button type="button" onClick={() => setEximStep(3)} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold">Next</button> </div> )}
                {eximStep === 3 && ( <div className="space-y-3"> <input name="countries" placeholder="Countries" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} /> <button type="button" onClick={() => setEximStep(4)} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold">Next</button> </div> )}
                {eximStep === 4 && ( <div className="space-y-3"> <select name="shipmentType" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange}> <option value="Air">Air</option><option value="Sea">Sea</option> </select> <button type="button" onClick={() => setEximStep(5)} className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold">Next</button> </div> )}
                {eximStep === 5 && ( <div className="space-y-3"> <button onClick={handleAuth} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold">Complete</button> </div> )}
              </div>
            )}

            {!isLogin && role !== 'exim' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="fullName" placeholder="Full Name" className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                <input name="phone" placeholder="Phone" className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none" onChange={handleChange} />
                <button onClick={handleAuth} disabled={loading} className="md:col-span-2 bg-[#1e293b] text-white py-4 rounded-2xl font-bold mt-2">
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

      {/* --- RESET MODAL --- */}
      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-10 shadow-2xl border border-slate-100">
            <h3 className="text-[#1e293b] text-2xl font-bold mb-2 text-center">Reset Password</h3>
            <p className="text-slate-500 text-sm mb-8 text-center">Enter Email or Mobile (+91...)</p>
            
            <div className="space-y-4">
              {!verificationId ? (
                <>
                  <input 
                    type="text" 
                    placeholder="Email or Mobile Number" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                  <button onClick={handleResetPassword} disabled={resetLoading} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm flex justify-center">
                    {resetLoading ? <Loader2 className="animate-spin" /> : `Send Reset Link / OTP`}
                  </button>
                </>
              ) : (
                <>
                  <input 
                    type="text" 
                    placeholder="Enter 6-Digit OTP" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none text-center tracking-widest font-bold"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button onClick={handleVerifyOTP} disabled={resetLoading} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm flex justify-center">
                    {resetLoading ? <Loader2 className="animate-spin" /> : `Verify OTP`}
                  </button>
                </>
              )}
              <button onClick={() => {setShowResetModal(false); setVerificationId('');}} className="w-full text-slate-400 text-xs font-bold uppercase pt-2">Back to Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;