import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Handshake, CheckCircle, Send, ArrowLeft } from 'lucide-react';

const PartnerRegistration = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Segoe UI' }}>
        <CheckCircle size={80} color="#008a5e" style={{ marginBottom: '20px' }} />
        <h2 style={{ color: '#004080' }}>Registration Successful!</h2>
        <p>Our team will contact you within 24 hours to verify your details.</p>
        <button onClick={() => navigate('/')} style={btnStyle}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
      <div style={{ backgroundColor: '#004080', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <Handshake size={50} style={{ marginBottom: '15px' }} />
        <h1>Become a Partner</h1>
        <p>Join India's fastest growing logistics network</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '-40px auto 50px auto', backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Full Name / Company Name</label>
            <input type="text" required style={inputStyle} placeholder="Enter name" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Contact Number</label>
            <input type="tel" required style={inputStyle} placeholder="Enter mobile number" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Business Type</label>
            <select style={inputStyle}>
              <option>Truck Owner</option>
              <option>Courier Franchise</option>
              <option>Warehouse Partner</option>
              <option>Delivery Agent</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>City/Area of Operation</label>
            <input type="text" required style={inputStyle} placeholder="e.g. Pune, Maharashtra" />
          </div>
          <button type="submit" style={{ ...btnStyle, width: '100%', marginTop: '10px' }}>
            Submit Application <Send size={18} style={{ marginLeft: '10px' }} />
          </button>
        </form>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const btnStyle = { backgroundColor: '#004080', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' };

export default PartnerRegistration;