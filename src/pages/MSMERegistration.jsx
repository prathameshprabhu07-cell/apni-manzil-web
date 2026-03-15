import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, FileText, Phone, ArrowRight } from 'lucide-react';

// --- Firebase Imports (हे नवीन जोडले आहेत) ---
import { database } from '../firebase'; 
import { ref, set } from "firebase/database";

const MSMERegistration = ({ setRegistered, setBusinessName }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    gstNumber: '',
    mobile: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Firebase डेटाबेसमध्ये माहिती सेव करणे
      // आपण 'msme_profile' या पाथवर डेटा ठेवतोय (जो App.js मध्ये तपासला जातो)
      const userRef = ref(database, 'msme_profile');
      
      await set(userRef, {
        businessName: formData.businessName,
        gstNumber: formData.gstNumber,
        mobile: formData.mobile,
        isRegistered: true,
        registrationDate: new Date().toISOString()
      });

      console.log("Data saved to Firebase!");

      // 2. Local State अपडेट करणे (App.js साठी)
      setBusinessName(formData.businessName);
      setRegistered(true);
      
      // 3. डॅशबोर्डवर नेणे
      navigate('/msme');
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Registration failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f0f4f8',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        width: '100%'
      }}>
        <h2 style={{ color: '#004080', textAlign: 'center', marginBottom: '10px' }}>MSME Registration</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Register your business to access the logistics dashboard.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Business Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Business Name</label>
            <div style={{ position: 'relative' }}>
              <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
              <input 
                type="text" 
                name="businessName"
                required
                placeholder="Enter Company Name"
                value={formData.businessName}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          {/* GST Number */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>GST Number</label>
            <div style={{ position: 'relative' }}>
              <FileText size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
              <input 
                type="text" 
                name="gstNumber"
                required
                placeholder="27XXXXX0000X1Z5"
                value={formData.gstNumber}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
              <input 
                type="tel" 
                name="mobile"
                required
                placeholder="99XXXXXXXX"
                value={formData.mobile}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              width: '100%', 
              backgroundColor: isSubmitting ? '#ccc' : '#004080', 
              color: 'white', 
              padding: '12px', 
              borderRadius: '6px', 
              border: 'none', 
              fontSize: '16px', 
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isSubmitting ? 'Registering...' : 'Complete Registration'} <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MSMERegistration;