import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';

// Placeholder Components (हे आपण नंतर टप्प्याटप्प्याने डेव्हलप करू)
const CourierPage = () => <div style={{padding: '50px'}}><h2>Courier & Parcel Service</h2><p>API Integration coming soon...</p></div>;
const TransportPage = () => <div style={{padding: '50px'}}><h2>Full Truck / Tempo Transport</h2><p>Vendor Bidding System coming soon...</p></div>;
const MoversPage = () => <div style={{padding: '50px'}}><h2>Packers & Movers</h2><p>Local Partner network coming soon...</p></div>;
const BusinessPage = () => <div style={{padding: '50px'}}><h2>MSME & Bulk Business Dashboard</h2><p>Enterprise solutions coming soon...</p></div>;
const TradePage = () => <div style={{padding: '50px'}}><h2>Import & Export (EXIM)</h2><p>Global Trade & Customs support coming soon...</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courier" element={<CourierPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/packers" element={<MoversPage />} />
        <Route path="/msme" element={<BusinessPage />} />
        <Route path="/trade" element={<TradePage />} />
      </Routes>
    </Router>
  );
}

export default App;