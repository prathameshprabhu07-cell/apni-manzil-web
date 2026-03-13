import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Home.js 'pages' फोल्डरमध्ये असल्याने पाथ बदलला आहे
import Home from './pages/Home'; 

// Standard Functional Components
const Courier = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Courier Services Page</h1><p>Integration with Shiprocket/Delhivery API coming soon.</p></div>;
const Transport = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Transport & Trucking Page</h1><p>Vendor bidding system setup in progress.</p></div>;
const Packers = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Packers & Movers Page</h1><p>Local vendor networking portal.</p></div>;
const MSME = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Business MSME Dashboard</h1><p>Bulk order management for corporate clients.</p></div>;
const ImportExport = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Import & Export Page</h1><p>International trade and customs clearance portal.</p></div>;
const AirFreight = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Air Freight Page</h1><p>Fast global air cargo solutions.</p></div>;
const SeaFreight = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Sea Freight Page</h1><p>Ocean freight and container tracking.</p></div>;
const Customs = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Customs Clearance Page</h1><p>Documentation and CHA assistance.</p></div>;
const TradeFinance = () => <div style={{ padding: '50px', textAlign: 'center' }}><h1>Trade Finance Page</h1><p>Funding and LC solutions for trade.</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Home Route */}
        <Route path="/" element={<Home />} />

        {/* Individual Service Routes */}
        <Route path="/courier" element={<Courier />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/msme" element={<MSME />} />
        <Route path="/importexport" element={<ImportExport />} />
        <Route path="/airfreight" element={<AirFreight />} />
        <Route path="/seafreight" element={<SeaFreight />} />
        <Route path="/customs" element={<Customs />} />
        <Route path="/tradefinance" element={<TradeFinance />} />
      </Routes>
    </Router>
  );
}

export default App;