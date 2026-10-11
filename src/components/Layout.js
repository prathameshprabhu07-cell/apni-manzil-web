```jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import {
  Menu,
  X,
  Phone,
  Globe,
  User,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Truck,
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react';

const Layout = ({ children, user }) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);

  const navigate = useNavigate();

  // Secure booking
  const secureBooking = (callback) => {
    if (user) {
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      alert('सर्व्हिस बुक करण्यासाठी कृपया आधी लॉगिन करा.');
      navigate('/login');
    }
  };

  // Firebase logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMobileMenuOpen(false);
      setShowDashboardModal(false);
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Logout करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  // All services
  const services = [
    { name: 'Truck Transport', path: '/truck-transport' },
    { name: 'Packers & Movers', path: '/packers-movers' },
    { name: 'Warehouse Storage', path: '/warehouse-storage' },
    { name: 'Courier Service', path: '/courier-service' },
    { name: 'Special Logistics', path: '/special-logistics' },
    { name: 'AI Smart Logistics', path: '/ai-smart-logistics' }
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServiceOpen(false);
  };

  const openDashboard = () => {
    closeMobileMenu();

    if (user) {
      navigate('/customer-dashboard');
    } else {
      setShowDashboardModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#001D3D]">

      {/* TOP INFORMATION BAR */}
      <div className="hidden md:flex bg-[#001D3D] text-white px-6 lg:px-12 py-3 justify-between items-center text-[11px] lg:text-xs font-bold relative z-[61]">

        <div className="flex items-center gap-5 lg:gap-8">

          <a
            href="https://wa.me/917218852356"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-r border-slate-700 pr-5 lg:pr-8 hover:text-[#FF5E00] transition-colors"
          >
            <Phone size={14} className="text-[#FF5E00]" />
            24/7 WHATSAPP SUPPORT: +91 7218852356
          </a>

          <span className="flex items-center gap-2">
            <Globe size={14} className="text-[#FF5E00]" />
            GLOBAL LOGISTICS NETWORK
          </span>

        </div>

        <div className="flex items-center gap-5 lg:gap-7">

          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-[#FF5E00] transition-colors uppercase"
              >
                <LogIn size={14} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 text-[#FF5E00] hover:text-white transition-colors uppercase border-l border-slate-700 pl-5 lg:pl-8"
              >
                <UserPlus size={14} />
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">

              <span className="text-[#FF5E00] uppercase border-r border-slate-700 pr-4">
                Hi, {user.email ? user.email.split('@')[0] : 'User'}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-400 transition-colors uppercase"
              >
                <LogOut size={14} />
                Logout
              </button>

            </div>
          )}

          <Link
            to="/track"
            className="hover:text-[#FF5E00] transition-colors uppercase border-l border-slate-700 pl-5 lg:pl-8"
          >
            Track Shipment
          </Link>

        </div>
      </div>

      {/* RESPONSIVE NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-10 py-3 sm:py-4 sticky top-0 z-[60] shadow-sm">

        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-2 sm:gap-4">

          {/* BRAND LOGO */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 sm:gap-3 min-w-0"
          >

            <img
              src="/favicon.png"
              alt="Apni Manzil Logo"
              className="h-10 sm:h-14 lg:h-16 w-auto max-w-[58px] sm:max-w-none object-contain border-r-4 border-[#FF5E00] pr-2 sm:pr-3"
            />

            <div className="flex flex-col min-w-0">

              <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight uppercase italic leading-tight whitespace-nowrap">
                Apni Manzil
              </span>

              <span className="text-[7px] sm:text-[9px] lg:text-[10px] font-black text-[#FF5E00] tracking-[0.08em] sm:tracking-[0.18em] uppercase mt-1 whitespace-nowrap">
                Logistics & Supply Chain
              </span>

            </div>

          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 text-xs xl:text-[13px] font-black tracking-wide text-[#001D3D]">

            <Link
              to="/"
              className="hover:text-[#FF5E00] transition-colors"
            >
              HOME
            </Link>

            {/* DESKTOP SERVICES DROPDOWN */}
            <div
              className="relative py-3"
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
            >

              <button
                type="button"
                onClick={() => setIsServiceOpen((previous) => !previous)}
                className="flex items-center gap-1 hover:text-[#FF5E00] transition-colors"
                aria-expanded={isServiceOpen}
              >
                SERVICES

                <ChevronDown
                  size={16}
                  className={isServiceOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                />
              </button>

              {isServiceOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl border-t-4 border-[#FF5E00] py-3 z-[100] rounded-b-lg">

                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={() => setIsServiceOpen(false)}
                      className="block px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#FF5E00] font-bold text-sm transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}

                </div>
              )}

            </div>

            <Link
              to="/partner-registration"
              className="text-[#FF5E00] hover:text-[#001D3D] transition-colors whitespace-nowrap"
            >
              BECOME A PARTNER
            </Link>

            <button
              type="button"
              onClick={openDashboard}
              className="border-2 border-[#001D3D] px-4 xl:px-6 py-2.5 hover:bg-[#001D3D] hover:text-white transition-colors uppercase font-black text-xs rounded-sm shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <User size={16} />

              {user ? 'MY DASHBOARD' : 'DASHBOARD'}
            </button>

          </div>

          {/* MOBILE AND TABLET BUTTONS */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">

            <button
              type="button"
              onClick={openDashboard}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-[#001D3D] hover:bg-slate-100 transition-colors"
              aria-label="Open Dashboard"
            >
              <User size={21} />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((previous) => !previous)}
              className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#001D3D] text-white hover:bg-[#FF5E00] transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>

          </div>

        </div>

        {/* MOBILE NAVIGATION MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden max-h-[75vh] overflow-y-auto mt-4 border-t border-slate-200 pt-3 pb-2">

            <div className="flex flex-col gap-1 text-sm font-bold text-[#001D3D]">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Home
              </Link>

              {/* MOBILE SERVICES DROPDOWN */}
              <button
                type="button"
                onClick={() => setIsServiceOpen((previous) => !previous)}
                className="px-4 py-3 flex items-center justify-between rounded-lg hover:bg-slate-100 transition-colors text-left"
                aria-expanded={isServiceOpen}
              >
                Services

                <ChevronDown
                  size={18}
                  className={isServiceOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
                />
              </button>

              {isServiceOpen && (
                <div className="ml-4 border-l-2 border-[#FF5E00]">

                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      onClick={closeMobileMenu}
                      className="block px-5 py-3 text-slate-600 hover:text-[#FF5E00] hover:bg-slate-50 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}

                </div>
              )}

              <Link
                to="/partner-registration"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-lg text-[#FF5E00] hover:bg-slate-100 transition-colors"
              >
                Become a Partner
              </Link>

              <Link
                to="/track"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Track Shipment
              </Link>

              {!user ? (
                <>

                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="mx-2 mt-2 py-3 text-center rounded-lg bg-[#001D3D] text-white hover:bg-[#FF5E00] transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="mx-2 py-3 text-center rounded-lg border-2 border-[#FF5E00] text-[#001D3D] hover:bg-orange-50 transition-colors"
                  >
                    Create Account
                  </Link>

                </>
              ) : (
                <>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/customer-dashboard');
                    }}
                    className="mx-2 mt-2 py-3 rounded-lg bg-[#001D3D] text-white hover:bg-[#FF5E00] transition-colors"
                  >
                    My Dashboard
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mx-2 py-3 rounded-lg border border-red-200 text-red-600 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>

                </>
              )}

              {/* MOBILE CONTACT INFORMATION */}
              <div className="mt-3 mx-2 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">

                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Globe size={16} className="text-[#FF5E00]" />
                  Global Logistics Network
                </p>

                <a
                  href="https://wa.me/917218852356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:text-green-800"
                >
                  <Phone size={17} />
                  WhatsApp Support
                </a>

                <a
                  href="mailto:help@apnimanzil.co.in"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#FF5E00]"
                >
                  <Mail size={17} />
                  help@apnimanzil.co.in
                </a>

              </div>

            </div>

          </div>
        )}

      </nav>

      {/* DASHBOARD MODAL */}
      {showDashboardModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          onClick={() => setShowDashboardModal(false)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-modal-title"
            className="bg-white rounded-2xl p-5 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-t-[8px] border-[#FF5E00]"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setShowDashboardModal(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-black transition-colors"
              aria-label="Close dashboard modal"
            >
              <X size={25} />
            </button>

            <div className="text-center mb-7 sm:mb-10 pt-3">

              <h2
                id="dashboard-modal-title"
                className="text-2xl sm:text-3xl font-black text-[#001D3D] uppercase italic tracking-tight"
              >
                Choose Portal
              </h2>

              <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                Access Your Secure Dashboard
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

              {/* CUSTOMER PORTAL */}
              <div className="flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-[#FF5E00] transition-colors">

                <div className="bg-white p-3 sm:p-4 rounded-xl w-fit mb-4 shadow-sm text-[#001D3D]">
                  <User size={30} />
                </div>

                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-2">
                  MSME / Individual
                </h3>

                <p className="text-xs text-slate-500 mb-5">
                  Book logistics services and manage your shipments.
                </p>

                <div className="mt-auto space-y-3">

                  <Link
                    to="/login"
                    onClick={() => setShowDashboardModal(false)}
                    className="block w-full text-center py-3 bg-[#001D3D] text-white text-xs font-black uppercase rounded-lg hover:bg-[#FF5E00] transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setShowDashboardModal(false)}
                    className="block w-full text-center py-3 border-2 border-[#001D3D] text-[#001D3D] text-xs font-black uppercase rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Register
                  </Link>

                </div>

              </div>

              {/* PARTNER PORTAL */}
              <div className="flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-[#FF5E00] transition-colors">

                <div className="bg-white p-3 sm:p-4 rounded-xl w-fit mb-4 shadow-sm text-[#001D3D]">
                  <Truck size={30} />
                </div>

                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-2">
                  Vendor / Partner
                </h3>

                <p className="text-xs text-slate-500 mb-5">
                  Access your partner account and logistics opportunities.
                </p>

                <div className="mt-auto space-y-3">

                  <Link
                    to="/login"
                    onClick={() => setShowDashboardModal(false)}
                    className="block w-full text-center py-3 bg-[#001D3D] text-white text-xs font-black uppercase rounded-lg hover:bg-[#FF5E00] transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/vendor-register"
                    onClick={() => setShowDashboardModal(false)}
                    className="block w-full text-center py-3 border-2 border-[#001D3D] text-[#001D3D] text-xs font-black uppercase rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Become a Partner
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* MAIN PAGE CONTENT */}
      <main className="flex-grow flex flex-col relative z-0">
        {React.isValidElement(children)
          ? React.cloneElement(children, { secureBooking, user })
          : children}
      </main>

      {/* PROFESSIONAL FOOTER */}
      <footer className="bg-[#001D3D] text-white pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-12 border-t-8 border-[#FF5E00] relative z-10">

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-12">

          {/* COMPANY INFORMATION */}
          <div>

            <h4 className="text-2xl font-black mb-5 italic uppercase tracking-tight">
              <Link to="/">Apni Manzil</Link>
            </h4>

            <p className="text-slate-400 text-xs font-bold leading-7 uppercase tracking-wide mb-6">
              Simplifying logistics for every destination across the globe.
              India's growing logistics aggregator platform.
            </p>

            <div className="flex items-center gap-5">

              <a
                href="https://www.facebook.com/share/1AjZxsuL4h/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-400 hover:text-[#FF5E00] transition-colors"
              >
                <Facebook size={19} />
              </a>

              <a
                href="https://www.instagram.com/prathameshprabhu07?igsh=MXA2Ym92ZnE3N2lkcA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 hover:text-[#FF5E00] transition-colors"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-[#FF5E00] transition-colors"
              >
                <Linkedin size={19} />
              </a>

            </div>

          </div>

          {/* SUPPORT LINKS */}
          <div>

            <h5 className="text-[#FF5E00] font-black text-xs uppercase tracking-widest mb-5">
              Support & Info
            </h5>

            <ul className="space-y-4 text-xs font-bold uppercase tracking-wide text-slate-300">

              <li className="hover:text-white transition-colors">
                <Link to="/about">About Us</Link>
              </li>

              <li className="hover:text-white transition-colors">
                <Link to="/help">Help Center</Link>
              </li>

              <li className="hover:text-white transition-colors">
                <Link to="/track">Service Areas</Link>
              </li>

              <li className="hover:text-white transition-colors">
                <Link to="/partner-registration">Become a Partner</Link>
              </li>

              <li className="hover:text-white transition-colors">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>

            </ul>

          </div>

          {/* SERVICES */}
          <div>

            <h5 className="text-[#FF5E00] font-black text-xs uppercase tracking-widest mb-5">
              Our Services
            </h5>

            <ul className="space-y-4 text-xs font-bold uppercase tracking-wide text-slate-300">

              {services.map((service) => (
                <li
                  key={service.path}
                  className="hover:text-white transition-colors"
                >
                  <Link to={service.path}>{service.name}</Link>
                </li>
              ))}

            </ul>

          </div>

          {/* CONTACT INFORMATION */}
          <div>

            <h5 className="text-[#FF5E00] font-black text-xs uppercase tracking-widest mb-5">
              Contact Us
            </h5>

            <ul className="space-y-5 text-xs font-bold tracking-wide text-slate-300">

              <li className="flex items-start gap-3 leading-6">
                <MapPin
                  size={18}
                  className="text-[#FF5E00] shrink-0 mt-1"
                />

                <span>
                  KUDAL, SINDHUDURG, 416520,
                  MAHARASHTRA, INDIA
                </span>
              </li>

              <li className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="text-[#FF5E00] shrink-0"
                />

                <a
                  href="mailto:help@apnimanzil.co.in"
                  className="hover:text-white transition-colors break-all"
                >
                  help@apnimanzil.co.in
                </a>

              </li>

              <li className="flex items-start gap-3">

                <Phone
                  size={18}
                  className="text-[#FF5E00] shrink-0"
                />

                <a
                  href="https://wa.me/917218852356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +91 7218852356
                </a>

              </li>

            </ul>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800 text-center">

          <p className="text-slate-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-6">
            © 2026 APNI MANZIL LOGISTICS SOLUTIONS PVT LTD.
            <br className="sm:hidden" />
            ALL RIGHTS RESERVED.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Layout;
```
