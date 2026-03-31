import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- LAYOUT IMPORT ---
import Layout from './components/Layout'; 

// ==========================================
// 1. FIREBASE & DATABASE CONFIGURATION
// ==========================================
import { db } from './firebase'; 
import { ref, onValue } from "firebase/database";

// ==========================================
// 2. MAIN PAGES & COMPONENTS IMPORTS
// ==========================================
import Home from './pages/Home'; 
import About from './pages/About'; 
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; 
import CourierService from './components/CourierService'; 
import CourierServiceDetail from './pages/CourierServiceDetail'; 
import HyperlocalService from './pages/HyperlocalService'; 
import TruckTransportService from './pages/TruckTransportService'; 
import Tracking from './pages/Tracking'; 
import AdminDashboard from './components/AdminDashboard'; 
import HelpCenter from './pages/HelpCenter'; 
import PartnerRegistration from './pages/PartnerRegistration'; 
import MSMEDashboard from './components/MSMEDashboard'; 
import MSMERegistration from './pages/MSMERegistration'; 
import ChatBot from './components/ChatBot'; 

// --- नवीन पेजेसचे इम्पोर्ट्स ---
import PackersAndMovers from './pages/PackersAndMovers'; 
import WarehouseStorage from './pages/WarehouseStorage'; 
import InternationalLogistics from './pages/InternationalLogistics'; 
import EcommerceLogistics from './pages/EcommerceLogistics'; 

// --- Special Logistics Import ---
import SpecialLogistics from './pages/SpecialLogistics'; 

// --- AI Smart Logistics Import ---
import AISmartLogistics from './pages/AISmartLogistics'; 

// --- VENDOR DASHBOARD IMPORT (नवीन जोडलेले) ---
import VendorDashboard from './pages/VendorDashboard'; 

// ==========================================
// 3. SERVICE PLACEHOLDER COMPONENTS
// ==========================================

const Transport = () => (
  <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f8fafc' }}>
    <h1 style={{ color: '#002D5E', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
      Transport & Trucking Solutions
    </h1>
    <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
      Our heavy-duty fleet management system is being upgraded to give you the best experience.
      Stay tuned for the grand launch of our professional transport services.
    </p>
  </div>
);

const AirFreight = () => (
  <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f0f9ff' }}>
    <h1 style={{ color: '#0369a1', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
      International Air Freight
    </h1>
    <p style={{ color: '#0c4a6e', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
      Fastest global delivery routes via premium air cargo partners. 
      Expanding our wings to deliver across 190+ countries soon.
    </p>
  </div>
);

const SeaFreight = () => (
  <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f0fdf4' }}>
    <h1 style={{ color: '#15803d', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
      Global Sea Freight
    </h1>
    <p style={{ color: '#14532d', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
      Affordable bulk shipping for your international business needs.
      Cargo containers and vessel tracking system integration in progress.
    </p>
  </div>
);

const Customs = () => (
  <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#f5f3ff' }}>
    <h1 style={{ color: '#6d28d9', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
      Customs & Compliance
    </h1>
    <p style={{ color: '#4c1d95', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
      Expert documentation and hassle-free customs clearance for your imports and exports.
      Our digital portal for automated filing is coming soon.
    </p>
  </div>
);

const TradeFinance = () => (
  <div style={{ padding: '120px 50px', textAlign: 'center', minHeight: '70vh', background: '#fff1f2' }}>
    <h1 style={{ color: '#be123c', fontSize: '3rem', fontWeight: '900', marginBottom: '20px' }}>
      Logistics Trade Finance
    </h1>
    <p style={{ color: '#881337', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
      Financial support and credit solutions for small and medium enterprises.
      Empowering your business growth with easy capital access.
    </p>
  </div>
);

// ==========================================
// 4. MAIN APPLICATION LOGIC
// ==========================================

function App() {
  const [isMSMERegistered, setIsMSMERegistered] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRef = ref(db, 'msme_profile'); 
    
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.isRegistered) {
        setIsMSMERegistered(true);
        setBusinessName(data.businessName);
      } else {
        setIsMSMERegistered(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#002D5E' }}>
        <div style={{ textAlign: 'center', color: 'white', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>APNI MANZIL</h2>
          <p style={{ letterSpacing: '3px', opacity: 0.8 }}>Loading Professional Logistics Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/help" element={<HelpCenter />} /> 
          <Route path="/track" element={<Tracking />} /> 
          
          <Route path="/courier-info" element={<CourierDetail />} />
          <Route path="/courier" element={<CourierService />} />

          <Route path="/courier-service" element={<CourierService />} /> 

          <Route path="/hyperlocal-service" element={<HyperlocalService />} />
          <Route path="/truck-transport" element={<TruckTransportService />} />
          
          <Route path="/transport" element={<Transport />} />
          <Route path="/importexport" element={<ImportExportDetail />} />

          <Route path="/packers" element={<PackersAndMovers />} />
          <Route path="/packers-movers" element={<PackersAndMovers />} />

          <Route path="/warehouse-storage" element={<WarehouseStorage />} />

          <Route path="/international-logistics" element={<InternationalLogistics />} />

          <Route path="/ecommerce-logistics" element={<EcommerceLogistics />} />

          <Route path="/special-logistics" element={<SpecialLogistics />} />

          <Route path="/ai-smart-logistics" element={<AISmartLogistics />} />

          <Route path="/airfreight" element={<AirFreight />} />
          <Route path="/seafreight" element={<SeaFreight />} />
          <Route path="/customs" element={<Customs />} />
          <Route path="/tradefinance" element={<TradeFinance />} />

          <Route path="/partner-registration" element={<PartnerRegistration />} />

          <Route path="/admin-control-panel" element={<AdminDashboard />} />

          {/* VENDOR DASHBOARD ROUTE (नवीन जोडलेला) */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />

          <Route 
            path="/msme" 
            element={isMSMERegistered ? <MSMEDashboard businessName={businessName} /> : <Navigate to="/msme-registration" />} 
          />

          <Route 
            path="/msme-registration" 
            element={<MSMERegistration setRegistered={setIsMSMERegistered} setBusinessName={setBusinessName} />} 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      <ChatBot />
    </Router>
  );
}

export default App;