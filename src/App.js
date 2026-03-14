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
// टीप: जर तू या पेजेससाठी वेगळ्या फाईल्स बनवल्या असतील, तर वर import करून खालील कॉन्स्टंट काढून टाक.
const Transport = () => <div style={{ padding: '100px 50px', textAlign: 'center' }}><h1>Transport & Trucking Services</h1><p>Work in Progress...</p></div>;
const Packers = () => <div style={{ padding: '100px 50px', textAlign: 'center' }}><h1>Packers & Movers</h1><p>Work in Progress...</p></div>;
const AirFreight = () => <div style={{ padding: '100px 50px', textAlign: 'center' }}><h1>Air Freight Services</h1><p>Work in Progress...</p></div>;
const SeaFreight = () => <div style={{ padding: '100px 50px', textAlign: 'center' }}><h1>Sea Freight Services</h1><p>Work in Progress...</p></div>;
const Customs = () => <div style={{ padding: '100px 50px', textAlign: 'center' }}><h1>Customs Clearance</h1><p>Work in Progress...</p></div>;
const TradeFinance = () => <div style={{ padding: '100px 50px', textAlign: 'center' }}><h1>Trade Finance Solutions</h1><p>Work in Progress...</p></div>;

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

        {/* --- SMART MSME LOGIC --- */}
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

        {/* 3. Other Routes (Services) */}
        {/* Home.js मधून जेव्हा युजर 'Explore Service' किंवा कॅल्क्युलेटरवर क्लिक करेल, तेव्हा तो इथे येईल */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />

        {/* ४०४ एरर टाळण्यासाठी डिफॉल्ट रूट (Optional) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* 4. AI ChatBot (नेहमी स्क्रीनवर दिसेल) */}
      <ChatBot />
    </Router>
  );
}

export default App;