import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';

// ही रिकामी पेजेस सध्या तयार करा जेणेकरून एरर येणार नाही
const Courier = () => <div className="p-5"><h1>Courier Service Page</h1></div>;
const Transport = () => <div className="p-5"><h1>Transport Service Page</h1></div>;
const Packers = () => <div className="p-5"><h1>Packers & Movers Page</h1></div>;
const Business = () => <div className="p-5"><h1>Business & MSME Dashboard</h1></div>;
const Trade = () => <div className="p-5"><h1>Import & Export Trade Page</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courier" element={<Courier />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/packers" element={<Packers />} />
        <Route path="/msme" element={<Business />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </Router>
  );
}

export default App;