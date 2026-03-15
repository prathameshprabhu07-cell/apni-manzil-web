import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, User, Phone, ArrowLeft, Send, CheckCircle } from 'lucide-react';

// Firebase Import
import { db } from '../firebase'; 
import { ref, push, set } from "firebase/database";

const CourierService = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    pickupAddress: '',
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    weight: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase मध्ये 'bookings' फोल्डरमध्ये डेटा सेव करणे
      const bookingsRef = ref(db, 'bookings');
      const newBookingRef = push(bookingsRef);
      
      await set(newBookingRef, {
        ...formData,
        status: 'Pending',
        bookingDate: new Date().toLocaleString(),
        orderId: "AMZ" + Math.floor(100000 + Math.random() * 900000)
      });

      setSubmitted(true);
      // 3 सेकंदानंतर डॅशबोर्डवर किंवा होमवर नेणे
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const sectionTitleStyle = {
    fontSize: '1.1rem',
    color: '#004080',
    fontWeight: 'bold',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <CheckCircle size={80} color="#008a5e" />
        <h2 style={{ color: '#004080', marginTop: '20px' }}>Booking Successful!</h2>
        <p style={{ color: '#666' }}>Our executive will contact you shortly for pickup.</p>
        <p style={{ fontSize: '0.8rem', color: '#999' }}>Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 20px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'none', color: '#004080', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#004080', padding: '20px', color: 'white', textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>Book Your Courier</h2>
          <p style={{ margin: '5px 0 0', opacity: 0.8 }}>Door-to-door pickup & delivery</p>
        </div>

        <form onSubmit={handleBooking} style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            
            {/* Sender Details */}
            <div>
              <h3 style={sectionTitleStyle}><User size={18} /> Sender Details</h3>
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#999' }} />
                <input name="senderName" placeholder="Your Name" style={inputStyle} required onChange={handleChange} />
              </div>
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#999' }} />
                <input name="senderPhone" placeholder="Your Phone Number" style={inputStyle} required onChange={handleChange} />
              </div>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#999' }} />
                <textarea name="pickupAddress" placeholder="Pickup Full Address" style={{ ...inputStyle, height: '80px', paddingLeft: '40px' }} required onChange={handleChange}></textarea>
              </div>
            </div>

            {/* Receiver Details */}
            <div>
              <h3 style={sectionTitleStyle}><Send size={18} /> Receiver Details</h3>
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#999' }} />
                <input name="receiverName" placeholder="Receiver Name" style={inputStyle} required onChange={handleChange} />
              </div>
              <div style={{ marginBottom: '15px', position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#999' }} />
                <input name="receiverPhone" placeholder="Receiver Phone Number" style={inputStyle} required onChange={handleChange} />
              </div>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#999' }} />
                <textarea name="deliveryAddress" placeholder="Delivery Full Address" style={{ ...inputStyle, height: '80px', paddingLeft: '40px' }} required onChange={handleChange}></textarea>
              </div>
            </div>

          </div>

          <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />

          {/* Package Details */}
          <h3 style={sectionTitleStyle}><Package size={18} /> Package Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
             <input name="weight" placeholder="Approx Weight (Kg)" style={inputStyle} required onChange={handleChange} />
             <input name="content" placeholder="What is inside? (e.g. Clothes, Documents)" style={inputStyle} required onChange={handleChange} />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '40px', width: '100%', backgroundColor: '#008a5e', color: 'white', 
              padding: '15px', borderRadius: '8px', border: 'none', fontSize: '1.1rem', 
              fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' 
            }}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourierService;