import React, { useState } from 'react';

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    pincode: '', 
    address: '', 
    city: '',
    state: '',
    weight: '0.5' 
  });

  const services = [
    { id: 1, name: "Domestic Courier", desc: "Delivery anywhere across India", icon: "🇮🇳" },
    { id: 2, name: "International Courier", desc: "Worldwide shipping services", icon: "🌎" },
    { id: 3, name: "Express / Same Day", desc: "Urgent fastest delivery", icon: "⚡" },
    { id: 4, name: "Surface Courier", desc: "Economy shipping (Road/Truck)", icon: "🚛" },
    { id: 5, name: "Air Courier", desc: "Priority flight delivery", icon: "✈️" },
    { id: 6, name: "Bulk Courier", desc: "Special rates for Business & MSMEs", icon: "📦" },
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
      // तुझी Render ची लिंक इथे तपासा
      const response = await fetch('https://apni-manzil-web.onrender.com/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_number: "AM-" + Date.now(),
          shipping_address: formData.address,
          shipping_city: formData.city,
          shipping_state: formData.state,
          shipping_pincode: formData.pincode,
          shipping_name: formData.name,
          shipping_phone: formData.phone,
          weight: formData.weight,
          service_name: selectedService.name,
          payment_method: "prepaid"
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(`Success! Order Booked. AWB: ${result.data?.awb_number || 'Pending'}`);
        setSelectedService(null);
      } else {
        alert("Error: " + (result.error || "Order creation failed. Check logs."));
      }
    } catch (error) {
      alert("Server Connection Error: Make sure your Render backend is awake!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f4f7f9', minHeight: '100vh' }}>
      {!selectedService ? (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '10px' }}>Select Courier Service</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Choose the best delivery option for your needs</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {services.map((s) => (
              <div key={s.id} onClick={() => handleServiceSelection(s)} style={cardStyle}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{s.icon}</div>
                <h3 style={{ color: '#008080', margin: '10px 0' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', color: '#777', height: '40px' }}>{s.desc}</p>
                <button style={bookBtnStyle}>Select Service</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={formWrapper}>
          <button onClick={() => setSelectedService(null)} style={backBtn}>← Back to Services</button>
          <h2 style={{ color: '#004080', marginBottom: '20px' }}>Booking: {selectedService.name}</h2>
          
          <form style={formStyle} onSubmit={handleSubmit}>
            <div style={inputGroup}>
              <input name="name" placeholder="Receiver Name" style={inputStyle} onChange={handleChange} required />
              <input name="phone" placeholder="Phone (10 digits)" style={inputStyle} onChange={handleChange} required />
            </div>
            
            <textarea name="address" placeholder="Full Address" style={{...inputStyle, height: '80px'}} onChange={handleChange} required />
            
            <div style={inputGroup}>
              <input name="city" placeholder="City" style={inputStyle} onChange={handleChange} required />
              <input name="state" placeholder="State" style={inputStyle} onChange={handleChange} required />
            </div>
            
            <div style={inputGroup}>
              <input name="pincode" placeholder="Pincode" style={inputStyle} onChange={handleChange} required />
              <input name="weight" placeholder="Weight (KG)" type="number" step="0.1" style={inputStyle} onChange={handleChange} required />
            </div>

            <button type="submit" style={confirmBtn} disabled={loading}>
              {loading ? 'Please Wait...' : 'Confirm & Book Shipment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// CSS Styles
const cardStyle = { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', cursor: 'pointer', textAlign: 'center', transition: '0.3s' };
const bookBtnStyle = { background: '#008080', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', marginTop: '15px', width: '100%' };
const formWrapper = { maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputGroup = { display: 'flex', gap: '10px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', width: '100%' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' };

export default CourierService;