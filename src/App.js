import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import ImportExportDetail from './pages/ImportExportDetail'; // Your new page

// Keep other components as they are
const Courier = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Courier Services</h1><p>API Integration in progress...</p></div>;
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
        <Route path="/" element={<Home />} />
        
        {/* Updated this specific route */}
        <Route path="/importexport" element={<ImportExportDetail />} />

        <Route path="/courier" element={<Courier />} />
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