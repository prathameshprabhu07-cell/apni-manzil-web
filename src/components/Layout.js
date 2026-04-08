import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Phone, Globe, User, 
  Facebook, Instagram, Linkedin, Mail, 
  MapPin, ChevronRight, HelpCircle, ShieldCheck, ChevronDown,
  LayoutDashboard, Truck, LogIn, UserPlus 
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const navigate = useNavigate();

  const services = [
    { name: 'Truck Transport', path: '/truck-transport' },
    { name: 'Packers & Movers', path: '/packers-movers' },
    { name: 'Warehouse Storage', path: '/warehouse-storage' },
    { name: 'Courier Service', path: '/courier-service' },
    { name: 'Special Logistics', path: '/special-logistics' },
    { name: 'AI Smart Logistics', path: '/ai-smart-logistics' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#001D3D] relative">
      
      {/* --- TOP BAR --- */}
      {/* झेड-इंडेक्स ५० केला आहे जेणेकरून हे बटण क्लिक होतील */}
      <div className="bg-[#001D3D] text-white py-3 px-12 hidden md:flex justify-between items-center text-[12px] font-bold tracking-[0.15em] relative z-[51]">
        <div className="flex gap-8">
          <span className="flex items-center gap-2 border-r border-slate-700 pr-8">
            <Phone size={14} className="text-[#FF5E00]"/> 24/7 SUPPORT: +91 73785 02356
          </span>
          <span className="flex items-center gap-2">
            <Globe size={14} className="text-[#FF5E00]"/> GLOBAL LOGISTICS NETWORK
          </span>
        </div>
        
        <div className="flex gap-8 items-center">
          <button 
            onClick={() => setShowDashboardModal(true)} 
            className="flex items-center gap-2 hover:text-[#FF5E00] transition-all uppercase font-black group cursor-pointer"
          >
            <LogIn size={14} className="group-hover:-translate-x-1 transition-transform" /> Login
          </button>
          
          <button 
            onClick={() => setShowDashboardModal(true)} 
            className="flex items-center gap-2 text-[#FF5E00] hover:text-white transition-all uppercase border-l border-slate-700 pl-8 font-black group cursor-pointer"
          >
            <UserPlus size={14} className="group-hover:scale-110 transition-transform" /> Sign Up
          </button>
          
          <Link to="/track" className="hover:text-[#FF5E00] transition uppercase border-l border-slate-700 pl-8 font-black">TRACK SHIPMENT</Link>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 py-5 px-12 flex justify-between items-center sticky top-0 z-[60] shadow-sm">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/favicon.png" 
            alt="Logo" 
            className="h-16 w-auto object-contain border-r-4 border-[#FF5E00] pr-3" 
          />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Apni Manzil</span>
            <span className="text-[10px] font-black text-[#FF5E00] tracking-[0.3em] uppercase">Logistics & Supply Chain</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[13px] font-black tracking-[0.1em] text-[#001D3D]">
          <Link to="/" className="hover:text-[#FF5E00] transition-all">HOME</Link>
          
          <div 
            className="relative cursor-pointer group py-2"
            onMouseEnter={() => setIsServiceOpen(true)}
            onMouseLeave={() => setIsServiceOpen(false)}
          >
            <div className="flex items-center gap-1 hover:text-[#FF5E00] transition-all">
              SERVICES <ChevronDown size={16} className={`transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isServiceOpen && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-4 border-[#FF5E00] py-4 z-[100] animate-in fade-in slide-in-from-top-2">
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    to={service.path} 
                    className="block px-6 py-4 text-slate-700 hover:bg-slate-50 hover:text-[#FF5E00] transition-all border-b border-slate-50 last:border-0 font-bold text-[14px]"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/partner-registration" className="hover:text-[#FF5E00] transition-all text-[#FF5E00]">BECOME A PARTNER</Link>
          <Link to="/about-us" className="hover:text-[#FF5E00] transition-all">ABOUT US</Link>
          
          <button 
            onClick={() => setShowDashboardModal(true)}
            className="border-2 border-[#001D3D] text-[#001D3D] px-8 py-2.5 hover:bg-[#001D3D] hover:text-white transition-all duration-300 flex items-center gap-2 uppercase font-black text-[13px] rounded-sm tracking-wider shadow-sm hover:shadow-md cursor-pointer"
          >
            <User size={16}/> DASHBOARD
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden cursor-pointer z-[110]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>

      {/* --- MOBILE MENU (दुरुस्ती: z-index वाढवला आहे) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-white z-[105] p-6 pt-32 animate-in slide-in-from-right">
          <div className="flex flex-col gap-6 text-lg font-black uppercase italic">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <hr />
            <div className="flex flex-col gap-4">
               <button onClick={() => { setShowDashboardModal(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 text-[#001D3D] text-left">
                 <LogIn size={20} /> Login / Sign Up
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 3-WAY MODAL (z-index सर्वात जास्त ठेवला आहे जेणेकरून तो सर्वांच्या वर येईल) --- */}
      {showDashboardModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl relative border-t-[8px] border-[#FF5E00] animate-in zoom-in duration-200">
            <button onClick={() => setShowDashboardModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-black cursor-pointer">
              <X size={28} />
            </button>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-[#001D3D] uppercase italic tracking-tighter">Choose Portal</h2>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Access your secure dashboard or create an account</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MSME / INDIVIDUAL */}
              <div className="flex flex-col p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#FF5E00] transition-all group">
                <div className="bg-white p-4 rounded-xl w-fit mb-4 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors shadow-sm">
                  <User size={32} />
                </div>
                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-1">MSME / Individual</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-6 leading-tight">For Regular Bookings & Small Businesses</p>
                <div className="mt-auto space-y-2">
                  <Link to="/customer-dashboard" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 bg-[#001D3D] text-white text-[11px] font-black uppercase rounded-lg hover:bg-black transition-all">Login</Link>
                  <Link to="/msme-registration" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 border-2 border-[#001D3D] text-[#001D3D] text-[11px] font-black uppercase rounded-lg hover:bg-[#001D3D] hover:text-white transition-all">Register</Link>
                </div>
              </div>

              {/* VENDOR / PARTNER */}
              <div className="flex flex-col p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#FF5E00] transition-all group">
                <div className="bg-white p-4 rounded-xl w-fit mb-4 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors shadow-sm">
                  <Truck size={32} />
                </div>
                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-1">Vendor / Partner</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-6 leading-tight">For Fleet Owners & Transport Agencies</p>
                <div className="mt-auto space-y-2">
                  <Link to="/vendor-dashboard" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 bg-[#001D3D] text-white text-[11px] font-black uppercase rounded-lg hover:bg-black transition-all">Login</Link>
                  <Link to="/partner-registration" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 border-2 border-[#001D3D] text-[#001D3D] text-[11px] font-black uppercase rounded-lg hover:bg-[#001D3D] hover:text-white transition-all">Register</Link>
                </div>
              </div>

              {/* EXIM CLIENT */}
              <div className="flex flex-col p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#FF5E00] transition-all group">
                <div className="bg-white p-4 rounded-xl w-fit mb-4 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors shadow-sm">
                  <Globe size={32} />
                </div>
                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-1">EXIM Client</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-6 leading-tight">For Global Trade & Import Export</p>
                <div className="mt-auto space-y-2">
                  <Link to="/exim-login" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 bg-[#001D3D] text-white text-[11px] font-black uppercase rounded-lg hover:bg-black transition-all">Login</Link>
                  <Link to="/importexport" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 border-2 border-[#001D3D] text-[#001D3D] text-[11px] font-black uppercase rounded-lg hover:bg-[#001D3D] hover:text-white transition-all">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow flex flex-col relative z-0">
        {children}
      </main>

      {/* Footer (Same as yours) */}
      <footer className="bg-[#001D3D] text-white pt-20 pb-10 px-12 border-t-8 border-[#FF5E00] relative z-10">
        {/* ... Footer content same ... */}
      </footer>
    </div>
  );
};

export default Layout;