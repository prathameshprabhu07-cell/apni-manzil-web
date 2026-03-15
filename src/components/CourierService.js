import React, { useState } from 'react';
import { db } from '../firebase'; 
import { ref, set } from "firebase/database";

const CourierService = () => {
  const [selectedService, setSelectedService] = useState(null); // निवडलेली सर्व्हिस
  const [loading, setLoading] = useState(false);

  // १. तुझ्या फोटोप्रमाणे ९ सर्व्हिसेसची लिस्ट
  const services = [
    { id: 1, name: "Domestic Courier", desc: "India madhe kuthehi" },
    { id: 2, name: "International Courier", desc: "Jagbhar kuthehi" },
    { id: 3, name: "Express / Same Day", desc: "Fastest delivery" },
    { id: 4, name: "Surface Courier", desc: "Economy (Truck/Road)" },
    { id: 5, name: "Air Courier", desc: "Fast (Flight)" },
    { id: 6, name: "Bulk Courier", desc: "Business & MSME" },
    { id: 7, name: "In-City Courier", desc: "Local delivery" },
    { id: 8, name: "Government Speed Post", desc: "Postal service" },
    { id: 9, name: "Safe Document Service", desc: "High security" },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#eef2f7', minHeight: '100vh' }}>
      
      {/* जर कोणतीही सर्व्हिस निवडली नसेल, तर तुझे ९ कॉलम्स दिसतील */}
      {!selectedService ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#004080' }}>Select Your Courier Service</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px', 
            maxWidth: '1200px', 
            margin: '0 auto' 
          }}>
            {services.map((s) => (
              <div key={s.id} style={cardStyle}>
                <h3 style={{ color: '#008080' }}>{s.name}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{s.desc}</p>
                <button 
                  onClick={() => setSelectedService(s)} 
                  style={bookBtnStyle}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* जेव्हा युजर 'Book Now' क्लिक करेल, तेव्हा हा फॉर्म उघडेल */
        <div style={formWrapper}>
          <button onClick={() => setSelectedService(null)} style={backBtn}>← मागे जा (Back)</button>
          <h2 style={{ textAlign: 'center' }}>Booking: {selectedService.name}</h2>
          
          <form style={formStyle} onSubmit={(e) => { e.preventDefault(); alert("Nimbus API Call Starting..."); }}>
             <p style={{ color: '#666' }}>ही सर्व्हिस बुक करण्यासाठी खालील माहिती भरा:</p>
             <input placeholder="Receiver Name" style={inputStyle} required />
             <input placeholder="Phone Number" style={inputStyle} required />
             <input placeholder="Pincode" style={inputStyle} required />
             <textarea placeholder="Full Address" style={inputStyle} required />
             
             <button type="submit" style={confirmBtn}>Confirm Booking</button>
          </form>
        </div>
      )}
    </div>
  );
};

// --- STYLES (तुझ्या फोटोप्रमाणे मॅच करण्याचा प्रयत्न केला आहे) ---
const cardStyle = { 
  background: '#fff', 
  padding: '25px', 
  borderRadius: '8px', 
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
  borderTop: '4px solid #008080' 
};

const bookBtnStyle = { 
  background: '#008080', 
  color: '#fff', 
  border: 'none', 
  padding: '10px 0', 
  width: '100%', 
  borderRadius: '4px', 
  cursor: 'pointer',
  fontWeight: 'bold'
};

const formWrapper = { maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '10px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc' };
const backBtn = { background: 'none', border: 'none', color: '#004080', cursor: 'pointer', marginBottom: '20px' };
const confirmBtn = { background: '#004080', color: '#fff', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default CourierService;