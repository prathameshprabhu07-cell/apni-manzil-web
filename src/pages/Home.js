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
  const [rates, setRates] = useState(null); // फक्त हे नवीन रिझल्टसाठी

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

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* 1. Main Navbar */}
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

      {/* 2. Secondary Services Bar (तुझे शॉर्टकट ऑप्शन्स) */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '12px 0', display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>Home</span>
        <span onClick={() => navigate('/about-us')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>About Us</span>
        <span onClick={() => navigate('/courier')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>Courier Services</span>
        <span onClick={() => navigate('/transport')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>Transport</span>
        <span onClick={() => navigate('/msme')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>Business MSME</span>
        <span onClick={() => navigate('/partner-registration')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>Partner Registration</span>
        <span onClick={() => navigate('/help')} style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600', textTransform: 'uppercase' }}>Help Centre</span>
      </div>

      {/* 3. Hero Section */}
      <div style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1350&q=80")', backgroundSize: 'cover', padding: '120px 20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: 0 }}>Apni Manzil</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Reliable Logistics & Global Supply Chain Solutions</p>
        <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '35px', display: 'flex', width: '100%', maxWidth: '650px', padding: '6px' }}>
            <input type="text" placeholder="Enter Tracking ID (e.g. AMZ12345)" style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 25px', borderRadius: '35px', color: '#333' }} />
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 35px', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold' }}>Track Now</button>
          </div>
        </div>
      </div>

      {/* 4. Services Grid (९ सेपरेट ब्लॉक्स) */}
      <div style={{ maxWidth: '1240px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '40px' }}>Our Logistics Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          
          <div onClick={() => navigate('/courier')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #008a5e', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Package size={30} color="#008a5e" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Courier Services</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Domestic & International</p>
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/transport')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #e64a19', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Truck size={30} color="#e64a19" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Transport</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Heavy & Full Truck</p>
            <button style={{ backgroundColor: '#e64a19', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/packers')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #f57c00', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><HomeIcon size={30} color="#f57c00" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Packers & Movers</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Safe Home Shifting</p>
            <button style={{ backgroundColor: '#f57c00', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/msme')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #1976d2', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Building2 size={30} color="#1976d2" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Business MSME</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Bulk B2B Solutions</p>
            <button style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/importexport')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #6a1b9a', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Globe size={30} color="#6a1b9a" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Import & Export</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Global Trade & Logistics</p>
            <button style={{ backgroundColor: '#6a1b9a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/airfreight')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #4fc3f7', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><PlaneTakeoff size={30} color="#4fc3f7" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Air Freight</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Fast Cargo Services</p>
            <button style={{ backgroundColor: '#4fc3f7', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/seafreight')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #1a237e', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Ship size={30} color="#1a237e" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Sea Freight</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Cost-Effective Cargo</p>
            <button style={{ backgroundColor: '#1a237e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/customs')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #ffd600', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Receipt size={30} color="#ffd600" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Customs Clearance</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Hassle-Free Documentation</p>
            <button style={{ backgroundColor: '#ffd600', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>

          <div onClick={() => navigate('/tradefinance')} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', borderBottom: '4px solid #d32f2f', cursor: 'pointer' }}>
            <div style={{ marginBottom: '15px' }}><Handshake size={30} color="#d32f2f" /></div>
            <h5 style={{ fontWeight: 'bold', margin: '0' }}>Trade Finance</h5>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px' }}>Funding for Global Trade</p>
            <button style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', width: '100%' }}>Explore</button>
          </div>
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
                <button onClick={() => setRates([{ name: 'Standard Delivery', price: 85 }])} style={{ backgroundColor: '#008a5e', color: 'white', padding: '10px 40px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Calculate Now</button>
             </div>
             {rates && (
               <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ fontWeight: 'bold' }}>{rates[0].name}</span>
                 <span style={{ color: '#008a5e', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{rates[0].price}.00</span>
               </div>
             )}
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
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', borderBottom: '2px solid #004080', display: 'inline-block', paddingBottom: '5px' }}>Contact Us</h4>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}>Email: help@apnimanzil.co.in</p>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}>Phone: +91 7218852356</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', borderBottom: '2px solid #004080', display: 'inline-block', paddingBottom: '5px' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Instagram size={20} /> <Facebook size={20} /> <Linkedin size={20} />
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