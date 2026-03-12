import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow">
      <a className="navbar-brand fw-bold" href="/">APNI MANZIL</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/tracking">Tracking</a></li>
          <li className="nav-item ms-lg-3">
            <button className="btn btn-light rounded-pill px-4 fw-bold">Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;