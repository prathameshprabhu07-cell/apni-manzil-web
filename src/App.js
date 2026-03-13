import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importing your pages and components with the correct paths
import Home from './pages/Home'; // Correct path for src/pages/Home.js
import Partner from './components/Partner'; // Correct path for src/components/Partner.js

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              <span className="text-primary">Apni</span> Manzil
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/partner">Become a Partner</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-lg-3 rounded-pill px-4 fw-bold" to="/partner">
                    Join Network
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes Configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partner" element={<Partner />} />
        </Routes>

        {/* Professional Footer */}
        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container text-center">
            <p className="mb-1 fw-bold">Apni Manzil - One Solution for All Deliveries</p>
            <p className="small text-muted">Serving Pan-India | Courier • MSME • Transport • Packers & Movers</p>
            <div className="mt-3">
              <small>© 2026 Apni Manzil Services. All Rights Reserved.</small>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;