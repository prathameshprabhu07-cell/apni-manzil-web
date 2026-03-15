import React, { useState } from 'react';
// Firebase पाथ तपासून घे, जर तुमची firebase.js 'src' मध्ये असेल तर '../firebase' बरोबर आहे.
import { db } from '../firebase'; 
import { ref, set } from "firebase/database";
import { Truck, Send, CheckCircle, Package } from 'lucide-react';

const CourierService = () => {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  
  // १. युजरचा डेटा स्टोअर करण्यासाठी स्टेट
  const [formData, setFormData] = useState({
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    pincode: '',
    city: '',
    state: '',
    weight: '0.5',
    price: '100'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // २. NIMBUS POST AUTOMATIC LOGIC (Using your credentials)
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // पायरी १: लॉगिन करून टोकन मिळवणे
      const loginRes = await fetch("https://api.nimbuspost.com/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "email": "emsil7378502356+3381@automaticsignup.com",
          "password": "nQRgQ92qIV"
        })
      });
      const loginResult = await loginRes.json();
      const token = loginResult.data;

      // पायरी २: ऑर्डर बुक करणे (API Key: 9c1c8a6d992152752ca5817f3f70e37915987414252867)
      const response = await fetch("https://api.nimbuspost.com/api/v1/shipments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "order_number": `AM-${Date.now()}`,
          "shipping_charges": Number(formData.price),
          "payment_type": "prepaid",
          "consignee": {
            "name": formData.receiverName,
            "address": formData.deliveryAddress,
            "pincode": formData.pincode,
            "phone": formData.receiverPhone,
            "city": formData.city,
            "state": formData.state
          },
          "pickup_address": {
            "name": "Apni Manzil Hub",
            "pincode": "411001" // तुझा ऑफिस पिनकोड
          },
          "order_items": [{ "name": "General Goods", "qty": 1, "price": Number(formData.price) }],
          "weight": parseFloat(formData.weight)
        })
      });

      const result = await response.json();

      if (result.status === true) {
        const awb = result.data.awb_number;
        const label = result.data.label;

        // ३. Firebase मध्ये माहिती सेव्ह करणे (Real-time DB)
        await set(ref(db, `bookings/ORD-${Date.now()}`), {
          ...formData,
          awb: awb,
          labelUrl: label,
          status: "Auto-Booked",
          bookedAt: new Date().toISOString()
        });

        setSuccessData({ awb, label });
      } else {
        alert("Nimbus Error: " + result.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("CORS Error किंवा तांत्रिक अडचण आली आहे.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '80px auto', fontFamily: 'Arial' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#004080' }}><Truck size={30} /> Apni Manzil Mediator</h2>
        <p>ऑटोमॅटिक कुरियर बुकिंग सिस्टिम</p>
      </div>

      {!successData ? (
        <form onSubmit={handleBooking} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Receiver Name</label>
            <input type="text" name="receiverName" required onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="tel" name="receiverPhone" placeholder="Mobile Number" required onChange={handleChange} style={inputStyle} />
            <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} style={inputStyle} />
          </div>

          <textarea name="deliveryAddress" placeholder="Full Address" required onChange={handleChange} style={{ ...inputStyle, height: '60px', marginBottom: '10px' }} />

          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="text" name="city" placeholder="City" required onChange={handleChange} style={inputStyle} />
            <input type="text" name="state" placeholder="State" required onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input type="number" step="0.1" name="weight" placeholder="Weight (kg)" required onChange={handleChange} style={inputStyle} />
            <input type="number" name="price" placeholder="Value (₹)" required onChange={handleChange} style={inputStyle} />
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "System Booking..." : "Confirm & Auto-Book"} <Send size={18} />
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px', background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: '10px' }}>
          <CheckCircle size={40} color="green" />
          <h3>Shipment Booked!</h3>
          <p>AWB Number: <strong>{successData.awb}</strong></p>
          <a href={successData.label} target="_blank" rel="noreferrer" style={{ ...buttonStyle, textDecoration: 'none', background: '#2f855a' }}>Print Shipping Label</a>
          <button onClick={() => setSuccessData(null)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>New Booking</button>
        </div>
      )}
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', backgroundColor: '#004080', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' };

export default CourierService;