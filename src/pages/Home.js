import React, { useState } from 'react';
import { FiPackage, FiTruck, FiBox, FiGlobe, FiBriefcase, FiSearch, FiCpu, FiTrendingUp, FiAnchor, FiLayers, FiShield, FiWind, FiGlobe as FiWorld, FiZap, FiDatabase } from 'react-icons/fi';
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

  // Navin Logistics Insights Data
  const insights = [
    { title: "Market Giant", desc: "Indian Logistics is a $400B+ industry by 2026.", icon: <FiTrendingUp />, color: "#2ecc71" },
    { title: "Mode Split", desc: "70% Road, 25% Sea, and 5% Air transport share.", icon: <FiTruck />, color: "#e67e22" },
    { title: "Warehouse", desc: "Growth of 19% CAGR in smart warehousing.", icon: <FiLayers />, color: "#f1c40f" },
    { title: "Global Trade", desc: "Managing $1 Trillion+ of annual trade flow.", icon: <FiWorld />, color: "#3498db" },
    { title: "Last Mile", desc: "The most crucial step for Customer Satisfaction.", icon: <FiBox />, color: "#e74c3c" },
    { title: "Cold Chain", desc: "Vital for Healthcare & Fresh Food safety.", icon: <FiShield />, color: "#1abc9c" },
    { title: "Green Logistics", desc: "Shift towards EVs for zero emission delivery.", icon: <FiZap />, color: "#27ae60" },
    { title: "Digitalization", desc: "Real-time tracking using AI & IoT technology.", icon: <FiDatabase />, color: "#34495e" }
  ];

  return (
    <div className="container py-5">
      {/* Services Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Apni Manzil Services</h1>
        <p className="text-muted">Tumchya logistics cha pratyek prashna, amche ekach uttar.</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center mb