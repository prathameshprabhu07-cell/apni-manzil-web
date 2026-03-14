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
  Trash2
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
      alert("तुम्ही एकावेळी जास्तीत जास्त ५ पार्सल जोडू शकता.");
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

  const statCardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid #eee'
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

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* 1. Main Navbar (आता हा वरच थांबेल - position: 'relative') */}
      <nav style={{ 
        position: 'relative', 
        zIndex: 1000,
        backgroundColor: '#fff', 
        padding: '10px 50px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        {/* Logo & Tagline Container */}
        <div 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <h2 style={{ color: '#004080', fontWeight: 'bold', margin: 0, lineHeight: '1.1', fontSize: '1.5rem' }}>
            Apni Manzil
          </h2>
          <span style={{ fontSize: '0.65rem', color: '#666', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            One Solution For All Deliveries
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#555', fontWeight: '500', fontSize: '0.9rem' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ cursor: 'pointer', color: '#555', fontWeight: '500', fontSize: '0.9rem' }}>Tracking</span>
          <button style={{ backgroundColor: '#004080', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Login</button>
        </div>
      </nav>

      {/* 2. Secondary Services Bar */}
      <div style={{ 
        backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '12px 0', 
        display: 'flex', justifyContent: 'center', gap: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
      }}>
        {[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '#' },
          { name: 'Courier Services', path: '/courier' },
          { name: 'Transport', path: '/transport' },
          { name: 'International', path: '/importexport' },
          { name: 'Business MSME', path: '/msme' },
          { name: 'Partner Registration', path: '/partner-registration' },
          { name: 'Help Centre', path: '/help' }
        ].map((item, index) => (
          <span 
            key={index}
            onClick={() => item.path !== '#' && navigate(item.path)}
            style={{ 
              cursor: 'pointer', fontSize: '0.8rem', color: '#444', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => e.target.style.color = '#004080'}
            onMouseOut={(e) => e.target.style.color = '#444'}
          >
            {item.name}
          </span>
        ))}
      </div>

      {/* 3. Hero Section (Only Tracking) */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 20px', textAlign: 'center', color: 'white'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: 0, letterSpacing: '1px' }}>Apni Manzil</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '10px', opacity: 0.9 }}>Reliable Logistics & Global Supply Chain Solutions</p>
        
        <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '35px', display: 'flex', width: '100%', maxWidth: '650px', padding: '6px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. AMZ12345)" 
              style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 25px', borderRadius: '35px', fontSize: '1rem', color: '#333' }}
            />
            <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '10px 35px', borderRadius: '35px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
              Track Now
            </button>
          </div>
        </div>
      </div>

      {/* 4. Services Grid */}
      <div style={{ maxWidth: '1240px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#004080', marginBottom: '40px', fontWeight: 'bold' }}>Our Logistics Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {services.map((s) => (
            <div key={s.id} onClick={() => navigate(`/${s.id}`)} style={{ backgroundColor: 'white', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', transition: 'all 0.3s ease', cursor: 'pointer', borderBottom: `4px solid ${s.btnColor}` }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ marginBottom: '15px' }}>{s.icon}</div>
              <h5 style={{ fontWeight: 'bold', color: '#222', fontSize: '1.1rem', margin: '0' }}>{s.title}</h5>
              <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '20px', marginTop: '8px', lineHeight: '1.4' }}>{s.desc}</p>
              <button style={{ backgroundColor: s.btnColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '25px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', width: '100%' }}>Explore Service</button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Advanced Rate Calculator (Below Services) */}
      <div style={{ maxWidth: '1100px', margin: '80px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.12)', overflow: 'hidden', border: '1px solid #eee' }}>
          <div style={{ backgroundColor: '#004080', padding: '25px', textAlign: 'center', color: 'white' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>Shipping Rate Calculator</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>Get instant quotes for your domestic & international shipments</p>
          </div>

          <div style={{ padding: '35px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>Pickup Pincode</label>
                <input type="text" placeholder="e.g. 411001" style={inputStyle} value={pickupPin} onChange={(e)=>setPickupPin(e.target.value)} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>Destination Pincode</label>
                <input type="text" placeholder="e.g. 400001" style={inputStyle} value={destPin} onChange={(e)=>setDestPin(e.target.value)} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>Payment Mode</label>
                <select style={inputStyle} value={payMode} onChange={(e)=>setPayMode(e.target.value)}>
                  <option>Prepaid</option>
                  <option>Cash on Delivery (COD)</option>
                  <option>To-Pay</option>
                </select>
              </div>
            </div>

            <h4 style={{ marginBottom: '15px', color: '#004080', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', fontSize: '1rem' }}>
              Parcel Details (L × W × H in cm)
            </h4>
            
            {parcels.map((parcel) => (
              <div key={parcel.id} style={{ 
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr)) 45px', 
                gap: '12px', marginBottom: '15px', alignItems: 'flex-end', padding: '15px',
                backgroundColor: '#f9fbff', borderRadius: '10px', border: '1px solid #e0e7ff'
              }}>
                <div><label style={{fontSize:'0.75rem', fontWeight:'bold', color: '#555'}}>Length</label><input type="number" placeholder="cm" style={inputStyle} /></div>
                <div><label style={{fontSize:'0.75rem', fontWeight:'bold', color: '#555'}}>Width</label><input type="number" placeholder="cm" style={inputStyle} /></div>
                <div><label style={{fontSize:'0.75rem', fontWeight:'bold', color: '#555'}}>Height</label><input type="number" placeholder="cm" style={inputStyle} /></div>
                <div><label style={{fontSize:'0.75rem', fontWeight:'bold', color: '#555'}}>Weight</label><input type="number" placeholder="kg" style={inputStyle} /></div>
                <div><label style={{fontSize:'0.75rem', fontWeight:'bold', color: '#555'}}>Value</label><input type="number" placeholder="₹" style={inputStyle} /></div>
                <button onClick={() => removeParcel(parcel.id)} style={{ backgroundColor: '#ffeded', color: '#d32f2f', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><Trash2 size={18}/></button>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', alignItems: 'center' }}>
              <button onClick={addParcel} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff', color: '#004080', border: '2px solid #004080', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                <Plus size={20} /> Add Another Box
              </button>
              <button style={{ backgroundColor: '#008a5e', color: 'white', border: 'none', padding: '15px 50px', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,138,94,0.3)' }}>
                Calculate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Logistics Details */}
      <div style={{ backgroundColor: '#fff', padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: '#004080', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '20px' }}>India's Trusted Logistics Network</h2>
              <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.1rem' }}>Apni Manzil provides end-to-end supply chain solutions. From local courier deliveries to complex international freight, we ensure your cargo reaches its destination safely and on time.</p>
              <div style={{ marginTop: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}><CheckCircle size={20} color="#008a5e" style={{ marginRight: '10px' }} /><span>24/7 Real-time Asset Tracking</span></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}><CheckCircle size={20} color="#008a5e" style={{ marginRight: '10px' }} /><span>Optimized Route Planning</span></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}><CheckCircle size={20} color="#008a5e" style={{ marginRight: '10px' }} /><span>Secure Warehousing</span></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={statCardStyle}><h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>15k+</h3><p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#666' }}>Pincodes Covered</p></div>
              <div style={statCardStyle}><h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>500+</h3><p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#666' }}>Trucks on Road</p></div>
              <div style={statCardStyle}><h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>1M+</h3><p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#666' }}>Deliveries Completed</p></div>
              <div style={statCardStyle}><h3 style={{ color: '#008a5e', margin: '0', fontSize: '1.8rem' }}>99%</h3><p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#666' }}>On-Time Rate</p></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', backgroundColor: '#f8f9fa' }}>
        <p>© 2026 Apni Manzil Logistics Solutions. All India Network.</p>
      </div>
    </div>
  );
};

export default Home;