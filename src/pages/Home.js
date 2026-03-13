import React, { useState } from 'react';
import { FiPackage, FiTruck, FiBox, FiGlobe, FiBriefcase, FiSearch, FiCpu } from 'react-icons/fi';
import CourierDetail from './CourierDetail';

const Home = () => {
  const [view, setView] = useState('main');

  if (view === 'courier') {
    return <CourierDetail onBack={() => setView('main')} />;
  }

  const ServiceCard = ({ icon, title, desc, btnColor, action }) => (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm text-center p-4 rounded-4 bg-white hover-up">
        <div className="mb-3 d-flex justify-content-center" style={{ fontSize: '3rem', color: btnColor }}>{icon}</div>
        <h6 className="fw-bold mb-2">{title}</h6>
        <p className="text-muted small mb-4">{desc}</p>
        <button 
          onClick={action}
          className="btn btn-sm w-100 rounded-pill text-white fw-bold py-2" 
          style={{ backgroundColor: btnColor, border: 'none' }}>
          Explore
        </button>
      </div>
    </div>
  );

  // Navin Logistics Data with Images
  const insights = [
    { 
      title: "Road Transport (70%)", 
      desc: "The backbone of domestic delivery and last-mile connectivity in India.", 
      img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Sea Freight (25%)", 
      desc: "Crucial for international bulk trade and global supply chain efficiency.", 
      img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Air Cargo (5%)", 
      desc: "Fastest mode for high-value and time-sensitive international shipments.", 
      img: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Rail Logistics", 
      desc: "Efficient and eco-friendly long-distance transport for heavy goods.", 
      img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Smart Warehousing", 
      desc: "Growing at 19% CAGR with AI-driven inventory and storage solutions.", 
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Cold Chain", 
      desc: "Ensuring safety for pharmaceutical and perishable food products.", 
      img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Green Logistics", 
      desc: "Moving towards sustainability with Electric Vehicles and zero emissions.", 
      img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title: "Digital Tracking", 
      desc: "Real-time visibility using IoT and advanced logistics software.", 
      img: "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?auto=format&fit=crop&w=400&q=80" 
    }
  ];

  return (
    <div className="container py-5">
      {/* Services Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Apni Manzil Services</h1>
        <p className="text-muted">Fast, Secure, and Reliable Logistics Solutions</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center mb-5">
        <ServiceCard icon={<FiPackage />} title="Courier Services" desc="Domestic & International" btnColor="#27ae60" action={() => setView('courier')} />
        <ServiceCard icon={<FiTruck />} title="Transport" desc="Heavy & Full Truck" btnColor="#d35400" />
        <ServiceCard icon={<FiBox />} title="Packers & Movers" desc="Home Shifting" btnColor="#f39c12" />
        <ServiceCard icon={<FiBriefcase />} title="Business MSME" desc="Bulk Solutions" btnColor="#2980b9" />
        <ServiceCard icon={<FiGlobe />} title="International" desc="Sea & Air Freight" btnColor="#8e44ad" />
        <ServiceCard icon={<FiSearch />} title="Tracking" desc="Real-time Status" btnColor="#7f8c8d" />
        <ServiceCard icon={<FiCpu />} title="AI Logistics" desc="Smart Management" btnColor="#2c3e50" />
      </div>

      <hr className="my-5" />

      {/* --- Visual Logistics Insights Section --- */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Industry Expertise</h2>
        <p className="text-muted">Navigating the future of Global & Domestic Logistics</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {insights.map((item, index) => (
          <div className="col" key={index}>
            <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
              <img src={item.img} alt={item.title} style={{ height: '160px', objectFit: 'cover' }} />
              <div className="card-body">
                <h6 className="fw-bold text-dark">{item.title}</h6>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-up:hover { transform: translateY(-10px); transition: 0.3s; }
        .card:hover img { transform: scale(1.1); transition: 0.5s; }
        .overflow-hidden { overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Home;