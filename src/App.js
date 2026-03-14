import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages and Components Imports
import Home from './pages/Home'; 
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; 
import HelpCenter from './pages/HelpCenter'; 
import PartnerRegistration from './pages/PartnerRegistration'; 
import MSMEDashboard from './components/MSMEDashboard'; 
import MSMERegistration from './pages/MSMERegistration'; 
import ChatBot from './components/ChatBot'; 

// Basic components for other routes
const Transport = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Transport & Trucking</h1></div>;
const Packers = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Packers & Movers</h1></div>;
const AirFreight = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Air Freight</h1></div>;
const SeaFreight = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Sea Freight</h1></div>;
const Customs = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Customs Clearance</h1></div>;
const TradeFinance = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Trade Finance</h1></div>;

function App() {
  // MSME register aahe ki nahi he check karnyacha state
  const [isMSMERegistered, setIsMSMERegistered] = useState(false);
  
  // Registration nantar business che naav save karnyathi navin state
  const [businessName, setBusinessName] = useState("");

  return (
    <Router>
      <Routes>
        {/* 1. Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* 2. Main Routes */}
        <Route path="/courier" element={<CourierDetail />} />
        <Route path="/importexport" element={<ImportExportDetail />} />
        <Route path="/help" element={<HelpCenter />} /> 
        <Route path="/partner-registration" element={<PartnerRegistration />} />

        {/* --- SMART MSME LOGIC START --- */}
        <Route 
          path="/msme" 
          element={
            isMSMERegistered ? (
              // Dashboard la businessName pathvla aahe
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
              setBusinessName={setBusinessName} // Naav save karnyathi function pathvle
            />
          } 
        />
        {/* --- SMART MSME LOGIC END --- */}

        {/* 3. Other Routes */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />
      </Routes>

      {/* 4. AI ChatBot */}
      <ChatBot />
    </Router>
  );
}

export default App;