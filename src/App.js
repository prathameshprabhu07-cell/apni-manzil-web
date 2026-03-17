import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Firebase Imports
import { db } from './firebase'; 
import { ref, onValue } from "firebase/database";

// Pages and Components Imports
import Home from './pages/Home'; 
import About from './pages/About'; 
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; 
import CourierService from './components/CourierService'; 
// --- हे नवीन पेज आपण इथे इंपोर्ट केलं आहे ---
import CourierServiceDetail from './pages/CourierServiceDetail'; 
import Tracking from './pages/Tracking'; // आधीपासून असलेली ट्रॅकिंग फाईल
import AdminDashboard from './components/AdminDashboard'; // नवीन ॲडमिन पॅनेल
import HelpCenter from './pages/HelpCenter'; 
import PartnerRegistration from './pages/PartnerRegistration'; 
import MSMEDashboard from './components/MSMEDashboard'; 
import MSMERegistration from './pages/MSMERegistration'; 
import ChatBot from './components/ChatBot'; 

// Placeholder Components
const Transport = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Transport & Trucking Services</h1><p>Our fleet is ready to move your heavy cargo across India. Coming Soon...</p></div>;
const Packers = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Packers & Movers</h1><p>Professional home and office shifting services. Coming Soon...</p></div>;
const AirFreight = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Air Freight Services</h1><p>Fastest delivery via air cargo. Coming Soon...</p></div>;
const SeaFreight = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Sea Freight Services</h1><p>Bulk global shipping via sea. Coming Soon...</p></div>;
const Customs = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Customs Clearance</h1><p>Hassle-free international documentation. Coming Soon...</p></div>;
const TradeFinance = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Trade Finance Solutions</h1><p>Financial support for your global trade. Coming Soon...</p></div>;

function App() {
  const [isMSMERegistered, setIsMSMERegistered] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);

  // --- Firebase कडून रजिस्ट्रेशन स्टेटस तपासणे ---
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        fontSize: '1.2rem', 
        color: '#004080',
        fontWeight: 'bold' 
      }}>
        Loading Apni Manzil...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* 1. Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/help" element={<HelpCenter />} /> 
        <Route path="/track" element={<Tracking />} /> 
        
        {/* 2. Core Logistics Services */}
        <Route path="/courier-info" element={<CourierDetail />} />
        <Route path="/courier" element={<CourierService />} />
        
        {/* --- हे नवीन रूट आपण इथे ॲड केलं आहे --- */}
        <Route path="/courier-service" element={<CourierServiceDetail />} />
        
        <Route path="/transport" element={<Transport />} />
        <Route path="/importexport" element={<ImportExportDetail />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />

        {/* 3. Registrations & Dashboards */}
        <Route path="/partner-registration" element={<PartnerRegistration />} />
        
        <Route path="/admin-control-panel" element={<AdminDashboard />} />

        <Route 
          path="/msme" 
          element={
            isMSMERegistered ? (
              <MSMEDashboard businessName={businessName} />
            ) : (
              <Navigate to="/msme-registration" />
            )
          } 
        />

        <Route 
          path="/msme-registration" 
          element={
            <MSMERegistration 
              setRegistered={setIsMSMERegistered} 
              setBusinessName={setBusinessName} 
            />
          } 
        />

        {/* 4. 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global Components */}
      <ChatBot />
    </Router>
  );
}

export default App;