import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Routing साठी आवश्यक
import { 
  Menu, X, Phone, Globe, User, 
  Facebook, Instagram, Linkedin, Mail, 
  MapPin, ChevronRight, HelpCircle, ShieldCheck, ChevronDown
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // तुझ्या App.js मधील Routes नुसार सर्व्हिसेसची लिस्ट
  const services = [
    { name: 'Truck Transport', path: '/truck-transport' },
    { name: 'Packers & Movers', path: '/packers-movers' },
    { name: 'Warehouse Storage', path: '/warehouse-storage' },
    { name: 'Courier Service', path: '/courier-service' },
    { name: 'Special Logistics', path: '/special-logistics' },
    { name: 'AI Smart Logistics', path: '/ai-smart-logistics' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#001D3D]">
      
      {/* --- TOP BAR (Industrial Standard) --- */}
      <div className="bg-[#001D3D] text-white py-2 px-12 hidden md:flex justify-between items-center text-[10px] font-black tracking-[0.2em]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 border-r border-slate-700 pr-6">
            <Phone size={12} className="text-[#FF5E00]"/> 24/7 SUPPORT: +91 73785 02356
          </span>
          <span className="flex items-center gap-2">
            <Globe size={12} className="text-[#FF5E00]"/> GLOBAL LOGISTICS NETWORK
          </span>
        </div>
        <div className="flex gap-6">
          {/* <a> ऐवजी <Link> वापरला जेणेकरून पेज रीलोड होणार नाही */}
          <Link to="/track" className="hover:text-[#FF5E00] transition uppercase">TRACK SHIPMENT</Link>
          <Link to="/login" className="hover:text-[#FF5E00] transition text-[#FF5E00] uppercase">PARTNER LOGIN</Link>
        </div>
      </div>

      {/* --- MAIN HEADER (Navbar) --- */}
      <nav className="bg-white border-b border-gray-200 py-5 px-12 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-[#001D3D] text-white px-3 py-1 font-black text-2xl italic border-r-4 border-[#FF5E00]">AM</div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Apni Manzil</span>
            <span className="text-[9px] font-black text-[#FF5E00] tracking-[0.3em] uppercase">Logistics & Supply Chain</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] text-[#001D3D]">
          <Link to="/" className="hover:text-[#FF5E00] transition-all">HOME</Link>
          
          {/* SERVICES DROPDOWN - नवीन ॲड केले */}
          <div 
            className="relative cursor-pointer group py-2"
            onMouseEnter={() => setIsServiceOpen(true)}
            onMouseLeave={() => setIsServiceOpen(false)}
          >
            <div className="flex items-center gap-1 hover:text-[#FF5E00] transition-all">
              SERVICES <ChevronDown size={14} className={`transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isServiceOpen && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-4 border-[#FF5E00] py-4 z-[100] animate-in fade-in slide-in-from-top-2">
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    to={service.path} 
                    className="block px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#FF5E00] transition-all border-b border-slate-50 last:border-0"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/partner-registration" className="hover:text-[#FF5E00] transition-all text-[#FF5E00]">BECOME A PARTNER</Link>
          <Link to="/about-us" className="hover:text-[#FF5E00] transition-all">ABOUT US</Link>
          
          <Link to="/msme">
            <button className="bg-[#001D3D] text-white px-8 py-3 hover:bg-[#FF5E00] transition duration-300 flex items-center gap-2 uppercase">
              <User size={14}/> DASHBOARD
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>

      {/* --- DYNAMIC CONTENT --- */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* --- FOOTER (Corporate Design) --- */}
      <footer className="bg-[#001D3D] text-white pt-16 pb-8 px-12 border-t-8 border-[#FF5E00]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* १. ब्रँड आणि सोशल मीडिया */}
          <div className="space-y-6">
            <h4 className="text-2xl font-black italic tracking-tighter uppercase">APNI MANZIL</h4>
            <p className="text-[10px] font-bold text-slate-400 leading-loose uppercase tracking-tighter">
              Providing end-to-end logistics solutions across India. Technology driven, reliability focused.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#FF5E00] transition transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#FF5E00] transition transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#FF5E00] transition transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* २. हेल्प आणि सपोर्ट */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-black tracking-[0.3em] text-[#FF5E00] uppercase">Help & Support</h5>
            <ul className="text-[10px] font-bold space-y-3 text-slate-300 uppercase tracking-widest">
              <Link to="/help" className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <HelpCircle size={12} className="text-[#FF5E00]"/> Help Center / FAQs
              </Link>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <ShieldCheck size={12} className="text-[#FF5E00]"/> Safety Protocols
              </li>
              <Link to="/track" className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <ChevronRight size={12} className="text-[#FF5E00]"/> Track Order
              </Link>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <ChevronRight size={12} className="text-[#FF5E00]"/> Report a Problem
              </li>
            </ul>
          </div>

          {/* ३. कायदेशीर माहिती (Compliance) */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-black tracking-[0.3em] text-[#FF5E00] uppercase">Compliance</h5>
            <ul className="text-[10px] font-bold space-y-3 text-slate-300 uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition">GST Information</li>
              <li className="hover:text-white cursor-pointer transition">Cookie Policy</li>
            </ul>
          </div>

          {/* ४. संपर्क तपशील (Contact) */}
          <div className="space-y-4">
            <h5 className="text-[11px] font-black tracking-[0.3em] text-[#FF5E00] uppercase">Contact Details</h5>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest space-y-4">
              <p className="flex items-start gap-3 leading-loose">
                <MapPin size={14} className="text-[#FF5E00] shrink-0" />
                Corporate Office: Mumbai, Maharashtra, India
              </p>
              <p className="flex items-center gap-3">
                <Mail size={14} className="text-[#FF5E00] shrink-0" />
                help@apnimanzil.co.in
              </p>
              <p className="flex items-center gap-3">
                <Phone size={14} className="text-[#FF5E00] shrink-0" />
                +91 73785 02356
              </p>
            </div>
          </div>
        </div>

        {/* कॉपीराईट बार */}
        <div className="text-center border-t border-slate-800 pt-8">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.6em]">
            © 2026 APNI MANZIL LOGISTICS GROUP • PRIVATE & CONFIDENTIAL
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;