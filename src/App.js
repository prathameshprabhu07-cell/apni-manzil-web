import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages and Components Imports
import Home from './pages/Home'; 
import About from './pages/About'; // खात्री कर की ही फाईल pages फोल्डरमध्ये आहे
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; 
import HelpCenter from './pages/HelpCenter'; 
import PartnerRegistration from './pages/PartnerRegistration'; 
import MSMEDashboard from './components/MSMEDashboard'; 
import MSMERegistration from './pages/MSMERegistration'; 
import ChatBot from './components/ChatBot'; 

// टिप: जेव्हा तू खालील सर्व्हिसेससाठी नवीन पेजेस बनवशील, तेव्हा हे इथून काढून वरती Import कर.
const Transport = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Transport & Trucking Services</h1><p>Our fleet is ready to move your heavy cargo across India. Coming Soon...</p></div>;
const Packers = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Packers & Movers</h1><p>Professional home and office shifting services. Coming Soon...</p></div>;
const AirFreight = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Air Freight Services</h1><p>Fastest delivery via air cargo. Coming Soon...</p></div>;
const SeaFreight = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Sea Freight Services</h1><p>Bulk global shipping via sea. Coming Soon...</p></div>;
const Customs = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Customs Clearance</h1><p>Hassle-free international documentation. Coming Soon...</p></div>;
const TradeFinance = () => <div style={{ padding: '100px 50px', textAlign: 'center', minHeight: '60vh' }}><h1>Trade Finance Solutions</h1><p>Financial support for your global trade. Coming Soon...</p></div>;

function App() {
  // MSME registration state
  const [isMSMERegistered, setIsMSMERegistered] = useState(false);
  const [businessName, setBusinessName] = useState("");

  return (
    <Router>
      <Routes>
        {/* 1. Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/help" element={<HelpCenter />} /> 
        
        {/* 2. Core Logistics Services */}
        <Route path="/courier" element={<CourierDetail />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/importexport" element={<ImportExportDetail />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />

        {/* 3. Registrations & Dashboards */}
        <Route path="/partner-registration" element={<PartnerRegistration />} />
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

        {/* 4. 404 Redirect - चुकीचा पत्ता टाकला तर होमवर नेईल */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global Components */}
      <ChatBot />
    </Router>
  );
}

export default App;