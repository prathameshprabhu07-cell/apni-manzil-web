import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Globe, Lock, Mail, Building, ArrowRight } from 'lucide-react';

const EXIMLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [iecCode, setIecCode] = useState(''); // Import Export Code
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // --- नवीन EXIM क्लायंट रजिस्ट्रेशन ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore मध्ये क्लायंटची माहिती सेव्ह करणे
        await setDoc(doc(db, "exim_clients", user.uid), {
          companyName,
          iecCode,
          email,
          role: "exim_client",
          createdAt: new Date().toISOString()
        });

        alert("Registration Successful! Welcome to EXIM Portal.");
      } else {
        // --- लॉगिन लॉजिक ---
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // यशस्वी लॉगिन झाल्यावर डॅशबोर्डवर पाठवा
      navigate('/exim/dashboard');
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Globe size={48} color="#FF5E00" style={{ marginBottom: '10px' }} />
          <h2 style={{ margin: 0, color: '#002D5E', fontWeight: '900' }}>
            APNI MANZIL <span style={{ color: '#FF5E00' }}>EXIM</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            {isRegistering ? 'Register your Import-Export Business' : 'Login to Global Trade Portal'}
          </p>
        </div>

        <form onSubmit={handleAuth}>
          {isRegistering && (
            <>
              <div style={inputGroupStyle}>
                <Building size={18} color="#94a3b8" />
                <input 
                  type="text" placeholder="Company Name" required 
                  style={inputStyle} value={companyName} onChange={(e) => setCompanyName(e.target.value)} 
                />
              </div>
              <div style={inputGroupStyle}>
                <ArrowRight size={18} color="#94a3b8" />
                <input 
                  type="text" placeholder="IEC Code (Import Export Code)" required 
                  style={inputStyle} value={iecCode} onChange={(e) => setIecCode(e.target.value)} 
                />
              </div>
            </>
          )}

          <div style={inputGroupStyle}>
            <Mail size={18} color="#94a3b8" />
            <input 
              type="email" placeholder="Email Address" required 
              style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div style={inputGroupStyle}>
            <Lock size={18} color="#94a3b8" />
            <input 
              type="password" placeholder="Password" required 
              style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" style={buttonStyle}>
            {isRegistering ? 'Create EXIM Account' : 'Login to Portal'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          {isRegistering ? 'Already have an account?' : 'New Exporter/Importer?'} 
          <span 
            onClick={() => setIsRegistering(!isRegistering)} 
            style={{ color: '#FF5E00', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}
          >
            {isRegistering ? 'Login Here' : 'Register Now'}
          </span>
        </p>
      </div>
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px'
};

const loginBoxStyle = {
  backgroundColor: 'white', padding: '40px', borderRadius: '24px', 
  boxShadow: '0 10px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px'
};

const inputGroupStyle = {
  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
  backgroundColor: '#f1f5f9', borderRadius: '12px', marginBottom: '15px', border: '1px solid #e2e8f0'
};

const inputStyle = {
  border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '15px'
};

const buttonStyle = {
  width: '100%', padding: '14px', borderRadius: '12px', border: 'none', 
  backgroundColor: '#002D5E', color: 'white', fontWeight: 'bold', 
  fontSize: '16px', cursor: 'pointer', transition: '0.3s', marginTop: '10px'
};

export default EXIMLogin;