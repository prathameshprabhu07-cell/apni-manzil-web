import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages फोल्डरमधून फाईल्स इम्पॉर्ट केल्या आहेत
import Home from './pages/Home'; 
import ImportExportDetail from './pages/ImportExportDetail'; 
import CourierDetail from './pages/CourierDetail'; // ही ओळ आपण जोडली आहे

// बाकीचे components तसेच ठेवले आहेत
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
        
        {/* २. कुरिअर डिटेल्स - आता यात तुम्ही दिलेले ९ ऑप्शन्स दिसतील */}
        <Route path="/courier" element={<CourierDetail />} />

        {/* ३. इम्पोर्ट एक्सपोर्ट */}
        <Route path="/importexport" element={<ImportExportDetail />} />

        {/* ४. इतर रूट्स */}
        <Route path="/transport" element={<Transport />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/msme" element={<MSME />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />
      </Routes>
    </Router>
  );
}

export default App;