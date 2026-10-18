import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Truck,
  Package,
  Warehouse,
  Globe,
  ShieldCheck,
  User,
  Users,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  ArrowRight,
  Briefcase,
  Sparkles,
  Building2,
  CircleUserRound,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from 'lucide-react';

const Layout = ({ children, user }) => {
  const navigate = useNavigate();

  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const services = [
    {
      name: 'Courier & Parcel Delivery',
      path: '/courier-service',
      icon: Package,
    },
    {
      name: 'Hyperlocal / Bike Delivery',
      path: '/hyperlocal-service',
      icon: Truck,
    },
    {
      name: 'Truck & Transport Booking',
      path: '/truck-transport',
      icon: Truck,
    },
    {
      name: 'Packers & Movers',
      path: '/packers-movers',
      icon: Package,
    },
    {
      name: 'Warehouse & Storage',
      path: '/warehouse-storage',
      icon: Warehouse,
    },
    {
      name: 'International Logistics',
      path: '/international-logistics',
      icon: Globe,
    },
    {
      name: 'E-commerce Logistics',
      path: '/ecommerce-logistics',
      icon: Building2,
    },
    {
      name: 'Special Logistics',
      path: '/special-logistics',
      icon: ShieldCheck,
    },
    {
      name: 'AI Smart Logistics',
      path: '/ai-smart-logistics',
      icon: Sparkles,
    },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServiceOpen(false);
  };

  const secureBooking = (callback) => {
    if (!user) {
      alert('Please login or register before continuing.');
      navigate('/login');
      return;
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await signOut(auth);

      setIsMobileMenuOpen(false);
      setShowDashboardModal(false);

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Determine the dashboard from the logged-in user's saved role.
  const getDashboardPath = async () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        alert(
          'Your user profile could not be found. Please contact support.'
        );
        return;
      }

      const userData = userSnapshot.data();
      const role = String(userData.role || '').toLowerCase();

      if (role === 'admin') {
        navigate('/super-secret-admin-99');
      } else if (role === 'vendor' || role === 'partner') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/customer-dashboard');
      }

      setShowDashboardModal(false);
      closeMobileMenu();
    } catch (error) {
      console.error('Unable to open dashboard:', error);

      alert(
        'Unable to open your dashboard. Please try again.'
      );
    }
  };

  const handleDashboardClick = () => {
    if (!user || !auth.currentUser) {
      setShowDashboardModal(true);
      setIsMobileMenuOpen(false);
      return;
    }

    getDashboardPath();
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
    setIsServiceOpen(false);
    setShowDashboardModal(false);
  };

  // Dashboard selection:
  // Individual / Business -> Customer Dashboard
  // Transporter / Service Partner -> Vendor Dashboard
  const handleDashboardSelection = async (path) => {
    if (!user || !auth.currentUser) {
      setShowDashboardModal(false);
      navigate('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        alert(
          'Your user profile could not be found. Please contact support.'
        );
        return;
      }

      const userData = userSnapshot.data();
      const role = String(userData.role || '').toLowerCase();

      if (role === 'admin') {
        setShowDashboardModal(false);
        navigate('/super-secret-admin-99');
        return;
      }

      const isVendor =
        role === 'vendor' ||
        role === 'partner';

      const requestedVendorDashboard =
        path === '/vendor-dashboard';

      if (isVendor !== requestedVendorDashboard) {
        alert(
          isVendor
            ? 'Your account is registered as a Vendor / Partner. Opening your Vendor Dashboard.'
            : 'Your account is registered as an Individual / Customer. Opening your Customer Dashboard.'
        );

        setShowDashboardModal(false);

        navigate(
          isVendor
            ? '/vendor-dashboard'
            : '/customer-dashboard'
        );

        return;
      }

      setShowDashboardModal(false);
      navigate(path);
      closeMobileMenu();
    } catch (error) {
      console.error('Dashboard selection failed:', error);
      alert('Unable to open your dashboard. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-white text-slate-800">
      {/* Top Information Bar */}
      <div className="hidden bg-[#002D5E] text-white lg:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://wa.me/917218852356"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-orange-300"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Support</span>
            </a>

            <a
              href="mailto:help@apnimanzil.co.in"
              className="inline-flex items-center gap-2 transition hover:text-orange-300"
            >
              <Mail size={16} />
              <span>help@apnimanzil.co.in</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="max-w-48 truncate">
                  Welcome
                  {user.displayName ? `, ${user.displayName}` : ''}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center gap-2 transition hover:text-orange-300 disabled:opacity-60"
                >
                  <LogOut size={15} />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 transition hover:text-orange-300"
                >
                  <LogIn size={15} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 transition hover:text-orange-300"
                >
                  <UserPlus size={15} />
                  Sign Up
                </Link>
              </>
            )}

            <Link
              to="/track"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Track Shipment
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex min-w-0 shrink-0 items-center gap-2"
            aria-label="Apni Manzil Home"
          >
            <img
              src="/favicon.png"
              alt="Apni Manzil Logo"
              className="h-11 w-11 rounded-lg object-contain"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />

            <div className="min-w-0 leading-tight">
              <span className="block text-lg font-extrabold tracking-tight text-[#002D5E] sm:text-xl">
                Apni <span className="text-orange-500">Manzil</span>
              </span>

              <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:block">
                Global Logistics Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex">
            <Link
              to="/"
              className="whitespace-nowrap text-sm font-semibold text-slate-700 transition hover:text-orange-500"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServiceOpen(true)}
              onMouseLeave={() => setIsServiceOpen(false)}
            >
              <button
                type="button"
                onClick={() =>
                  setIsServiceOpen((previous) => !previous)
                }
                aria-expanded={isServiceOpen}
                className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-slate-700 transition hover:text-orange-500"
              >
                Services

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isServiceOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isServiceOpen && (
                <div className="absolute left-0 top-full z-50 w-72 pt-3">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                    {services.map((service) => {
                      const ServiceIcon = service.icon;

                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          onClick={() => setIsServiceOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-orange-50 hover:text-[#002D5E]"
                        >
                          <ServiceIcon
                            size={18}
                            className="shrink-0 text-orange-500"
                          />

                          <span>{service.name}</span>

                          <ChevronRight
                            size={15}
                            className="ml-auto shrink-0"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/partner-registration"
              className="whitespace-nowrap text-sm font-semibold text-slate-700 transition hover:text-orange-500"
            >
              Become a Partner
            </Link>

            <Link
              to="/about-us"
              className="whitespace-nowrap text-sm font-semibold text-slate-700 transition hover:text-orange-500"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={handleDashboardClick}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#002D5E] px-3 py-2 text-sm font-semibold text-[#002D5E] transition hover:bg-blue-50"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  aria-label="Logout"
                  title="Logout"
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                >
                  <LogOut size={19} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-[#002D5E] transition hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="whitespace-nowrap rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen((previous) => !previous)
            }
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-[#002D5E] transition hover:bg-slate-100 lg:hidden"
            aria-label={
              isMobileMenuOpen ? 'Close menu' : 'Open menu'
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="max-h-[min(70dvh,calc(100dvh-72px))] overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-lg lg:hidden">
            <nav className="mx-auto max-w-7xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center rounded-lg px-3 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Home
              </Link>

              {/* Mobile Services */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setIsMobileServiceOpen((previous) => !previous)
                  }
                  aria-expanded={isMobileServiceOpen}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <span>Services</span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      isMobileServiceOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isMobileServiceOpen && (
                  <div className="mb-2 ml-3 border-l-2 border-orange-200 pl-3">
                    {services.map((service) => {
                      const ServiceIcon = service.icon;

                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 transition hover:bg-orange-50 hover:text-[#002D5E]"
                        >
                          <ServiceIcon
                            size={17}
                            className="shrink-0 text-orange-500"
                          />

                          <span>{service.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                to="/partner-registration"
                onClick={closeMobileMenu}
                className="flex items-center rounded-lg px-3 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Become a Partner
              </Link>

              <Link
                to="/about-us"
                onClick={closeMobileMenu}
                className="flex items-center rounded-lg px-3 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                About Us
              </Link>

              <Link
                to="/contact-us"
                onClick={closeMobileMenu}
                className="flex items-center rounded-lg px-3 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Contact Us
              </Link>

              <Link
                to="/track"
                onClick={closeMobileMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#002D5E] px-4 py-3 font-bold text-white transition hover:bg-blue-900"
              >
                <Package size={18} />
                Track Shipment
              </Link>

              <a
                href="https://wa.me/917218852356"
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-green-500 px-4 py-3 font-semibold text-green-700 transition hover:bg-green-50"
              >
                <MessageCircle size={18} />
                WhatsApp Support
              </a>

              <div className="my-3 border-t border-slate-200" />

              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#002D5E] text-white">
                      <User size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">
                        Logged in as
                      </p>

                      <p className="truncate font-semibold text-[#002D5E]">
                        {user.displayName || user.email || 'User'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDashboardClick}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#002D5E] px-4 py-3 font-semibold text-[#002D5E] transition hover:bg-blue-50"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    <LogOut size={18} />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#002D5E] px-3 py-3 font-semibold text-[#002D5E] transition hover:bg-blue-50"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-3 py-3 font-bold text-white transition hover:bg-orange-600"
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="min-w-0 flex-1">
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              secureBooking,
              user,
            })
          : children}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#002D5E] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {/* Company Information */}
            <div>
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-3"
              >
                <img
                  src="/favicon.png"
                  alt="Apni Manzil"
                  className="h-11 w-11 rounded-lg bg-white object-contain p-1"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />

                <span className="text-xl font-extrabold">
                  Apni <span className="text-orange-400">Manzil</span>
                </span>
              </Link>

              <p className="mb-5 text-sm leading-7 text-blue-100">
                Your trusted logistics aggregation platform for courier,
                transport, packers and movers, and logistics solutions
                across India.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/917218852356"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500"
                >
                  <MessageCircle size={19} />
                </a>

                <a
                  href="mailto:help@apnimanzil.co.in"
                  aria-label="Email Apni Manzil"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500"
                >
                  <Mail size={19} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>

              <ul className="space-y-3 text-sm text-blue-100">
                <li>
                  <Link to="/" className="transition hover:text-orange-300">
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about-us"
                    className="transition hover:text-orange-300"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact-us"
                    className="transition hover:text-orange-300"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/careers"
                    className="transition hover:text-orange-300"
                  >
                    Careers
                  </Link>
                </li>

                <li>
                  <Link
                    to="/partner-registration"
                    className="transition hover:text-orange-300"
                  >
                    Become a Partner
                  </Link>
                </li>

                <li>
                  <Link
                    to="/track"
                    className="transition hover:text-orange-300"
                  >
                    Track Shipment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Our Services</h3>

              <ul className="space-y-3 text-sm text-blue-100">
                {services.map((service) => (
                  <li key={service.path}>
                    <Link
                      to={service.path}
                      className="transition hover:text-orange-300"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Follow Us</h3>

              <p className="mb-4 text-sm leading-6 text-blue-100">
                Stay connected with Apni Manzil for updates, news and
                logistics solutions.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500"
                >
                  <Instagram size={19} />
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500"
                >
                  <Facebook size={19} />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500"
                >
                  <Linkedin size={19} />
                </a>

                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  title="X"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-orange-500"
                >
                  <Twitter size={19} />
                </a>
              </div>

              <p className="mt-4 text-xs text-blue-200">
                Connect with us online.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact Us</h3>

              <p className="mb-4 text-sm leading-6 text-blue-100">
                Have questions about our services or need help with a
                shipment? We're here to help!
              </p>

              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Contact Us
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 flex flex-col gap-4 border-t border-white/20 pt-6 text-center text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>
              © {new Date().getFullYear()} Apni Manzil. All rights reserved.
            </p>

            <p>Global Logistics Network</p>
          </div>
        </div>
      </footer>

      {/* Dashboard Selection Modal */}
      {showDashboardModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowDashboardModal(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-modal-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-[#002D5E] px-5 py-4 text-white sm:px-6">
              <div>
                <h2
                  id="dashboard-modal-title"
                  className="text-lg font-bold sm:text-xl"
                >
                  Choose Your Dashboard
                </h2>

                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Select the account type you want to access.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDashboardModal(false)}
                aria-label="Close dashboard selection"
                className="rounded-lg p-2 transition hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              {/* Customer Dashboard */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-bold text-[#002D5E]">
                  <Users size={19} />
                  Customer Dashboard
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleDashboardSelection('/customer-dashboard')
                    }
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-orange-400 hover:bg-orange-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#002D5E]">
                      <CircleUserRound size={21} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">
                        Individual
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Personal bookings
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDashboardSelection('/customer-dashboard')
                    }
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-orange-400 hover:bg-orange-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <Briefcase size={21} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">
                        Business / MSME
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Business shipments
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200" />

              {/* Partner Dashboard */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-bold text-[#002D5E]">
                  <Truck size={19} />
                  Partner Dashboard
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleDashboardSelection('/vendor-dashboard')
                    }
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-orange-400 hover:bg-orange-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Truck size={21} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">
                        Transporter
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Manage transport leads
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDashboardSelection('/vendor-dashboard')
                    }
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-orange-400 hover:bg-orange-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                      <Building2 size={21} />
                    </div>

                    <div>
                      <p className="font-bold text-slate-800">
                        Service Partner
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Manage partner leads
                      </p>
                    </div>
                  </button>
                </div>

                <Link
                  to="/vendor-register"
                  onClick={() => setShowDashboardModal(false)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 font-bold text-white transition hover:bg-orange-600"
                >
                  Register as a Partner
                  <ArrowRight size={18} />
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setShowDashboardModal(false)}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;