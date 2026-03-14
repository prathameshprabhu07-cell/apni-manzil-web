import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages and Components इम्पॉर्ट
import Home from './pages/Home'; 
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; 
import HelpCenter from './pages/HelpCenter'; // हेल्प सेंटर जोडले
import ChatBot from './components/ChatBot'; // AI चॅटबॉट जोडला

// बाकीचे components
const Transport = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Transport & Trucking</h1></div>;
const Packers = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Packers & Movers</h1></div>;
const MSME = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Business MSME</h1></div>;
const AirFreight = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Air Freight</h1></div>;
const SeaFreight = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Sea Freight</h1></div>;
const Customs = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Customs Clearance</h1></div>;
const TradeFinance = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Trade Finance</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* १. होम पेज */}
        <Route path="/" element={<Home />} />
        
        {/* २. कुरिअर आणि इतर सर्व्हिसेस */}
        <Route path="/courier" element={<CourierDetail />} />
        <Route path="/importexport" element={<ImportExportDetail />} />
        <Route path="/help" element={<HelpCenter />} /> {/* हेल्प सेंटर रूट */}

        {/* ३. इतर रूट्स */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/msme" element={<MSME />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />
      </Routes>

      {/* ४. AI ChatBot - हा Routes च्या बाहेर आहे जेणेकरून तो सर्व पेजेसवर दिसेल */}
      <ChatBot />
    </Router>
  );
}

export default App;