import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  Home as HomeIcon, 
  Building2, 
  Globe, 
  PlaneTakeoff, 
  Ship, 
  Receipt, 
  Handshake,
  CheckCircle,
  Plus, 
  Trash2,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  // --- Rate Calculator States ---
  const [parcels, setParcels] = useState([
    { id: 1, length: '', width: '', height: '', weight: '', value: '' }
  ]);
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

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const footerLinkStyle = {
    cursor: 'pointer',
    transition: '0.3s',
    display: 'block',
    marginBottom: '10px'
  };

  // नेव्हिगेशनसाठी कॉमन फंक्शन
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Courier Services', path: '/courier' },
    { name: 'Transport', path: '/transport' },
    { name: 'Business MSME', path: '/msme' },
    { name: 'Partner Registration', path: '/partner-registration' },
    { name: 'Help Centre', path: '/help' }
  ];

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* 1. Main Navbar (Sticky) */}
      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 1000,
        backgroundColor: '#fff', padding: '10px 50px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: '#004080', fontWeight: 'bold', margin: 0, lineHeight: '1.1', fontSize: '1.5rem' }}>Apni Manzil</h2>
          <span style={{ fontSize: '0.65rem', color: '#666', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>One Solution For All Deliveries</span>
        </div>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#555', fontWeight: '500', fontSize: '0.9rem' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ cursor: 'pointer', color: '#555', fontWeight: '500', fontSize: '0.9rem' }} onClick={() => alert('Tracking system coming soon!')}>Tracking</span>
          <button style={{ backgroundColor: '#004080', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Login</button>
        </div>
      </nav>

      {/* 2. Secondary Services Bar - FIX: आता सर्व लिंक्स काम करतील */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '12px 0', display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>
        {menuItems.map((item, idx) => (
          <span 
            key={idx} 
            onClick={() => navigate(item.path)}
            style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>
            {item.name}
          </span>
        ))}
      </div>

      {/* 3. Hero Section */}
      <div style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1350&q=80")', backgroundSize: 'cover', padding: '120px 20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: 0 }}>Apni Manzil</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Reliable Logistics & Global Supply Chain Solutions</p>
        <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '35px', display: 'flex', width: '100%', maxWidth: '650px', padding: '6px' }}>
            <input type="text" placeholder="Enter Tracking ID (e.g. AMZ12345)" style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 25px', borderRadius: '35px' }} />
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 35px', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold' }}>Track Now</button>
          </div>
        </div>
      </div>

      {/* 4. Services Grid */}
      <div style={{ maxWidth: '1240px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '40px' }}>Our Logistics Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {services.map((s) => (
            <div key={s.id} onClick={() => navigate(`/${s.id}`)} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: `4px solid ${s.btnColor}`, cursor: 'pointer' }}>
              <div style={{ marginBottom: '15px' }}>{s.icon}</div>
              <h5 style={{ fontWeight: 'bold', margin: '0' }}>{s.title}</h5>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>{s.desc}</p>
              <button style={{ backgroundColor: s.btnColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', width: '100%' }}>Explore</button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Rate Calculator */}
      <div style={{ maxWidth: '1100px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#004080', padding: '25px', textAlign: 'center', color: 'white' }}>
            <h2 style={{ margin: 0 }}>Shipping Rate Calculator</h2>
          </div>
          <div style={{ padding: '35px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <div><label>Pickup Pincode</label><input style={inputStyle} value={pickupPin} onChange={(e)=>setPickupPin(e.target.value)} /></div>
                <div><label>Destination Pincode</label><input style={inputStyle} value={destPin} onChange={(e)=>setDestPin(e.target.value)} /></div>
                <div><label>Payment Mode</label><select style={inputStyle} value={payMode} onChange={(e)=>setPayMode(e.target.value)}><option>Prepaid</option><option>COD</option></select></div>
             </div>
             {parcels.map((parcel) => (
                <div key={parcel.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 45px', gap: '10px', marginBottom: '10px', padding: '15px', background: '#f9f9f9', borderRadius: '10px' }}>
                   <input placeholder="L" style={inputStyle} /><input placeholder="W" style={inputStyle} /><input placeholder="H" style={inputStyle} /><input placeholder="Kg" style={inputStyle} /><input placeholder="₹" style={inputStyle} />
                   <button onClick={() => removeParcel(parcel.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={20}/></button>
                </div>
             ))}
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button onClick={addParcel} style={{ padding: '10px 20px', cursor: 'pointer', border: '1px solid #004080', borderRadius: '5px', background: 'white', color: '#004080', fontWeight: 'bold' }}><Plus size={18}/> Add Box</button>
                <button style={{ backgroundColor: '#008a5e', color: 'white', padding: '10px 40px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Now</button>
             </div>
          </div>
        </div>
      </div>

      {/* 6. Footer Section */}
      <footer style={{ backgroundColor: '#0b1622', color: 'white', padding: '60px 20px 20px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          
          <div>
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Apni Manzil</h3>
            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.7' }}>
              Apni Manzil is India's emerging logistics platform, providing reliable courier, transport, and integrated supply chain solutions.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px', borderBottom: '2px solid #004080', display: 'inline-block', paddingBottom: '5px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#aaa', fontSize: '0.85rem' }}>
              <li style={footerLinkStyle} onClick={() => navigate('/courier')}>Courier Services</li>
              <li style={footerLinkStyle} onClick={() => navigate('/transport')}>Transport Services</li>
              <li style={footerLinkStyle} onClick={() => navigate('/msme')}>Business MSME</li>
              <li style={footerLinkStyle} onClick={() => navigate('/about-us')}>About Us</li>
              <li style={footerLinkStyle} onClick={() => alert('Tracking system coming soon!')}>Track Shipment</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px', borderBottom: '2px solid #004080', display: 'inline-block', paddingBottom: '5px' }}>Contact Us</h4>
            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.7' }}>
              Maharashtra, India
            </p>
            <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '10px' }}><strong>Email:</strong> help@apnimanzil.co.in</p>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}><strong>Phone:</strong> +91 7218852356</p>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}><strong>Hours:</strong> Mon - Sat (8:00 AM - 7:00 PM)</p>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px', borderBottom: '2px solid #004080', display: 'inline-block', paddingBottom: '5px' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Instagram style={{ cursor: 'pointer' }} size={20} onClick={() => window.open('https://instagram.com', '_blank')} />
              <Facebook style={{ cursor: 'pointer' }} size={20} onClick={() => window.open('https://facebook.com', '_blank')} />
              <Linkedin style={{ cursor: 'pointer' }} size={20} onClick={() => window.open('https://linkedin.com', '_blank')} />
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '1px solid #222', paddingTop: '20px', color: '#666', fontSize: '0.8rem' }}>
          <p>© 2026 Apni Manzil Logistics Solutions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;