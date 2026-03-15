import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Truck, Home as HomeIcon, Building2, Globe, PlaneTakeoff, 
  Ship, Receipt, Handshake, Plus, Trash2, Instagram, Facebook, Linkedin,
  ShieldCheck, BarChart3, Users, Award
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // --- Rate Calculator States ---
  const [parcels, setParcels] = useState([{ id: 1, length: '', width: '', height: '', weight: '', value: '' }]);
  const [pickupPin, setPickupPin] = useState('');
  const [destPin, setDestPin] = useState('');
  const [payMode, setPayMode] = useState('Prepaid');

  const addParcel = () => {
    if (parcels.length < 5) {
      setParcels([...parcels, { id: Date.now(), length: '', width: '', height: '', weight: '', value: '' }]);
    } else {
      alert("You can add a maximum of 5 parcels at a time.");
    }
  };

  const removeParcel = (id) => {
    if (parcels.length > 1) {
      setParcels(parcels.filter(p => p.id !== id));
    }
  };

  const services = [
    { id: 'courier', title: 'Courier Services', desc: 'Domestic & International', icon: <Package size={30} color="#008a5e" />, btnColor: '#008a5e' },
    { id: 'transport', title: 'Transport', desc: 'Heavy & Full Truck', icon: <Truck size={30} color="#e64a19" />, btnColor: '#e64a19' },
    { id: 'packers', title: 'Packers & Movers', desc: 'Safe Home Shifting', icon: <HomeIcon size={30} color="#f57c00" />, btnColor: '#f57c00' },
    { id: 'msme', title: 'Business MSME', desc: 'Bulk B2B Solutions', icon: <Building2 size={30} color="#1976d2" />, btnColor: '#1976d2' },
    { id: 'importexport', title: 'Import & Export', desc: 'Global Trade & Logistics', icon: <Globe size={30} color="#6a1b9a" />, btnColor: '#6a1b9a' },
    { id: 'airfreight', title: 'Air Freight', desc: 'Fast Cargo Services', icon: <PlaneTakeoff size={30} color="#4fc3f7" />, btnColor: '#4fc3f7' },
    { id: 'seafreight', title: 'Sea Freight', desc: 'Cost-Effective Cargo', icon: <Ship size={30} color="#1a237e" />, btnColor: '#1a237e' },
    { id: 'customs', title: 'Customs Clearance', desc: 'Hassle-Free Documentation', icon: <Receipt size={30} color="#ffd600" />, btnColor: '#ffd600' },
    { id: 'tradefinance', title: 'Trade Finance', desc: 'Funding for Global Trade', icon: <Handshake size={30} color="#d32f2f" />, btnColor: '#d32f2f' }
  ];

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* 1. Navbar & Hero (As is, with slight polish) */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff', padding: '10px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h2 style={{ color: '#004080', fontWeight: 'bold', margin: 0, fontSize: '1.5rem' }}>Apni Manzil</h2>
          <span style={{ fontSize: '0.65rem', color: '#666', fontWeight: '600' }}>ONE SOLUTION FOR ALL DELIVERIES</span>
        </div>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => navigate('/help')}>Help</span>
          <button style={{ backgroundColor: '#004080', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ backgroundImage: 'linear-gradient(rgba(0,40,80,0.8), rgba(0,40,80,0.8)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1350&q=80")', backgroundSize: 'cover', padding: '100px 20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>India's Smartest Logistics Platform</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Seamless Shipping for MSMEs & Businesses</p>
        <div style={{ background: 'white', borderRadius: '35px', display: 'flex', margin: '0 auto', maxWidth: '600px', padding: '5px' }}>
          <input type="text" placeholder="Enter Tracking ID..." style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 20px', borderRadius: '35px' }} />
          <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold' }}>Track Now</button>
        </div>
      </div>

      {/* --- NEW: Stats/Trust Section --- */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '40px 20px', backgroundColor: 'white', flexWrap: 'wrap', borderBottom: '1px solid #eee' }}>
        <div style={{ textAlign: 'center' }}><h3 style={{ margin: 0, color: '#004080' }}>5000+</h3><p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Deliveries Completed</p></div>
        <div style={{ textAlign: 'center' }}><h3 style={{ margin: 0, color: '#004080' }}>120+</h3><p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Cities Covered</p></div>
        <div style={{ textAlign: 'center' }}><h3 style={{ margin: 0, color: '#004080' }}>300+</h3><p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Happy MSMEs</p></div>
      </div>

      {/* --- NEW: Partners Section --- */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Our Delivery Partners</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', opacity: 0.5, flexWrap: 'wrap', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Delhivery</span><span>BlueDart</span><span>DTDC</span><span>XpressBees</span><span>Ecom Express</span>
        </div>
      </div>

      {/* Services Grid (As is) */}
      <div style={{ maxWidth: '1240px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '40px' }}>Our Logistics Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {services.map((s) => (
            <div key={s.id} onClick={() => navigate(`/${s.id}`)} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: `4px solid ${s.btnColor}`, cursor: 'pointer' }}>
              <div style={{ marginBottom: '15px' }}>{s.icon}</div>
              <h5 style={{ fontWeight: 'bold', margin: '0' }}>{s.title}</h5>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '15px' }}>{s.desc}</p>
              <button style={{ backgroundColor: s.btnColor, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '25px', cursor: 'pointer', width: '100%' }}>Explore</button>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Calculator (As is, with slight padding) */}
      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ backgroundColor: '#004080', padding: '20px', textAlign: 'center', color: 'white' }}>
            <h3 style={{ margin: 0 }}>Shipping Rate Calculator</h3>
          </div>
          <div style={{ padding: '30px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                <div><label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Pickup Pincode</label><input style={inputStyle} value={pickupPin} onChange={(e)=>setPickupPin(e.target.value)} placeholder="e.g. 400001" /></div>
                <div><label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Destination Pincode</label><input style={inputStyle} value={destPin} onChange={(e)=>setDestPin(e.target.value)} placeholder="e.g. 411001" /></div>
                <div><label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Payment Mode</label><select style={inputStyle} value={payMode} onChange={(e)=>setPayMode(e.target.value)}><option>Prepaid</option><option>COD</option></select></div>
             </div>
             {parcels.map((parcel) => (
                <div key={parcel.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 45px', gap: '10px', marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '10px', alignItems: 'center' }}>
                   <input placeholder="L (cm)" style={inputStyle} /><input placeholder="W (cm)" style={inputStyle} /><input placeholder="H (cm)" style={inputStyle} /><input placeholder="Weight (Kg)" style={inputStyle} /><input placeholder="Value (₹)" style={inputStyle} />
                   <button onClick={() => removeParcel(parcel.id)} style={{ color: '#d32f2f', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={18}/></button>
                </div>
             ))}
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
                <button onClick={addParcel} style={{ padding: '8px 15px', cursor: 'pointer', border: '1px solid #004080', borderRadius: '5px', background: 'white', color: '#004080', fontWeight: 'bold', fontSize: '0.8rem' }}>+ Add Box</button>
                <button style={{ backgroundColor: '#008a5e', color: 'white', padding: '12px 35px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Rates</button>
             </div>
          </div>
        </div>
      </div>

      {/* Footer (Simplified) */}
      <footer style={{ backgroundColor: '#0b1622', color: 'white', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ textAlign: 'center', color: '#aaa', fontSize: '0.8rem' }}>
          <p>© 2026 Apni Manzil Logistics Solutions | help@apnimanzil.co.in | +91 7218852356</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;