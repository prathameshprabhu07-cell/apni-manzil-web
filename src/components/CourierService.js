import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', pincode: '', address: '', weight: '0.5' });

  // तुझ्या मूळ ९ सर्विसेस
  const services = [
    { id: 1, name: "Domestic Courier", desc: "Delivery anywhere across India", icon: "🇮🇳" },
    { id: 2, name: "International Courier", desc: "Worldwide shipping services", icon: "✈️" },
    { id: 3, name: "Express / Same Day", desc: "Urgent fastest delivery", icon: "⚡" },
    { id: 4, name: "Surface Courier", desc: "Economy shipping (Road/Truck)", icon: "🚛" },
    { id: 5, name: "Air Courier", desc: "Priority flight delivery", icon: "✈️" },
    { id: 6, name: "Bulk Courier", desc: "Special rates for Business & MSMEs", icon: "📦" },
    { id: 7, name: "In-City Courier", desc: "Local same-city delivery", icon: "📍" },
    { id: 8, name: "Government Speed Post", desc: "Reliable postal services", icon: "📮" },
    { id: 9, name: "Safe Document Service", desc: "High-security document handling", icon: "📄" },
  ];

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://apni-manzil-web.onrender.com/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: "AM-" + Date.now(),
          ...formData,
          service_name: selectedService.name,
          payment_method: "prepaid"
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.status) {
        alert(`Success! Your order has been booked. AWB: ${result.data.awb_number}`);
        setSelectedService(null);
      } else {
        alert("Error: " + (result.error || "Failed to book order. Please try again."));
      }
    } catch (error) {
      alert("Server Connection Error: Please ensure your Render backend is live.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f4f7f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {!selectedService ? (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#004080', fontWeight: 'bold' }}>
            Select Your Courier Service
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Choose a category to proceed with booking</p>
          
          {/* Box Design Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {services.map((s) => (
              <div key={s.id} style={newBoxStyle}>
                <div style={iconCircle}>{s.icon}</div>
                <h3 style={{ color: '#004080', fontSize: '18px', margin: '10px 0' }}>{s.name}</h3>
                <p style={{ fontSize: '13px', color: '#777', marginBottom: '20px', minHeight: '40px' }}>{s.desc}</p>
                <button 
                  onClick={() => handleServiceSelection(s)}
                  style={exploreBtnStyle}
                >
                  EXPLORE
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={formWrapper}>
          <button onClick={() => setSelectedService(null)} style={backBtn}>← Back to Services</button>
          <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '20px' }}>Booking: {selectedService.name}</h2>
          <form style={formStyle} onSubmit={handleSubmit}>
              <input name="name" placeholder="Receiver Name" style={inputStyle} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" style={inputStyle} onChange={handleChange} required />
              <input name="pincode" placeholder="Pincode" style={inputStyle} onChange={handleChange} required />
              <input name="weight" placeholder="Weight (KG)" type="number" step="0.1" style={inputStyle} onChange={handleChange} required />
              <textarea name="address" placeholder="Complete Delivery Address" style={{...inputStyle, height: '100px'}} onChange={handleChange} required />
              <button type="submit" style={confirmBtn} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Order & Dispatch'}
              </button>
          </form>
        </div>
      )}
    </div>
  );
};

// --- नवीन Box डिझाईन स्टाईल्स ---
const newBoxStyle = {
  background: '#fff',
  padding: '30px 20px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: '1px solid #f0f0f0'
};

const iconCircle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  marginBottom: '15px',
  border: '1px solid #eee'
};

const exploreBtnStyle = {
  background: '#ff5e00',
  color: '#fff',
  border: 'none',
  padding: '10px 30px',
  borderRadius: '25px',
  fontWeight: 'bold',
  fontSize: '12px',
  cursor: 'pointer',
  letterSpacing: '1px'
};

const formWrapper = { maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };

export default CourierService;