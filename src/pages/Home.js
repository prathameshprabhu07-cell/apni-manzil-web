import React, { useState } from 'react';
import { FiPackage, FiTruck, FiBox, FiGlobe, FiBriefcase, FiSearch, FiCpu } from 'react-icons/fi';
import CourierDetail from './CourierDetail';

const Home = () => {
  const [view, setView] = useState('main'); // 'main' kiva 'courier'

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

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Apni Manzil Services</h1>
        <p className="text-muted">Tumchya logistics cha pratyek prashna, amche ekach uttar.</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
        {/* 1. Courier - Jya var click kelyavar navin page ughadel */}
        <ServiceCard icon={<FiPackage />} title="Courier Services" desc="Domestic & International" btnColor="#27ae60" action={() => setView('courier')} />
        
        {/* 2. Baki sagle cards parat add kele */}
        <ServiceCard icon={<FiTruck />} title="Transport" desc="Heavy & Full Truck" btnColor="#d35400" />
        <ServiceCard icon={<FiBox />} title="Packers & Movers" desc="Home Shifting" btnColor="#f39c12" />
        <ServiceCard icon={<FiBriefcase />} title="Business MSME" desc="Bulk Solutions" btnColor="#2980b9" />
        <ServiceCard icon={<FiGlobe />} title="International" desc="Sea & Air Freight" btnColor="#8e44ad" />
        <ServiceCard icon={<FiSearch />} title="Tracking" desc="Real-time Status" btnColor="#7f8c8d" />
        <ServiceCard icon={<FiCpu />} title="AI Logistics" desc="Smart Management" btnColor="#2c3e50" />
      </div>

      <style>{`.hover-up:hover { transform: translateY(-10px); transition: 0.3s; }`}</style>
    </div>
  );
};

export default Home;