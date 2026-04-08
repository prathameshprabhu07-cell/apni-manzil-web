import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { 
  Menu, X, Phone, Globe, User, 
  LogIn, UserPlus, LogOut, ChevronDown, Truck, Building2
} from 'lucide-react';

const Layout = ({ children }) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

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
          {!user ? (
            <>
              <Link to="/login" className="flex items-center gap-2 hover:text-[#FF5E00] transition-all uppercase font-black group">
                <LogIn size={14} /> Login
              </Link>
              <Link to="/register" className="flex items-center gap-2 text-[#FF5E00] hover:text-white transition-all uppercase border-l border-slate-700 pl-8 font-black group">
                <UserPlus size={14} /> Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-[#FF5E00] font-black uppercase italic border-r border-slate-700 pr-4">
                HI, {user.email.split('@')[0]}
              </span>
              <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-500 transition-all font-black uppercase cursor-pointer">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
          <Link to="/track" className="hover:text-[#FF5E00] transition uppercase border-l border-slate-700 pl-8 font-black">TRACK SHIPMENT</Link>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 py-5 px-12 flex justify-between items-center sticky top-0 z-[60] shadow-sm">
        <Link to="/" className="flex items-center gap-3">
          <img src="/favicon.png" alt="Logo" className="h-16 w-auto object-contain border-r-4 border-[#FF5E00] pr-3" />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Apni Manzil</span>
            <span className="text-[10px] font-black text-[#FF5E00] tracking-[0.3em] uppercase">Logistics & Supply Chain</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[13px] font-black tracking-[0.1em] text-[#001D3D]">
          <Link to="/" className="hover:text-[#FF5E00] transition-all">HOME</Link>
          <div className="relative cursor-pointer group py-2" onMouseEnter={() => setIsServiceOpen(true)} onMouseLeave={() => setIsServiceOpen(false)}>
            <div className="flex items-center gap-1 hover:text-[#FF5E00] transition-all">SERVICES <ChevronDown size={16} /></div>
            {isServiceOpen && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-4 border-[#FF5E00] py-4 z-[100]">
                {services.map((s, i) => (
                  <Link key={i} to={s.path} className="block px-6 py-4 text-slate-700 hover:bg-slate-50 hover:text-[#FF5E00] font-bold text-[14px]">{s.name}</Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/partner-registration" className="hover:text-[#FF5E00] transition-all text-[#FF5E00]">BECOME A PARTNER</Link>
          <button onClick={() => setShowDashboardModal(true)} className="border-2 border-[#001D3D] px-8 py-2.5 hover:bg-[#001D3D] hover:text-white transition-all uppercase font-black text-[13px] rounded-sm cursor-pointer shadow-sm">
            <User size={16}/> {user ? 'MY DASHBOARD' : 'DASHBOARD'}
          </button>
        </div>
      </nav>

      {/* --- 3-WAY MODAL (REPAIRED) --- */}
      {showDashboardModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl relative border-t-[8px] border-[#FF5E00] animate-in zoom-in duration-200">
            <button onClick={() => setShowDashboardModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-black cursor-pointer">
              <X size={28} />
            </button>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-[#001D3D] uppercase italic tracking-tighter">Choose Portal</h2>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Access your secure dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MSME / INDIVIDUAL BOX */}
              <div className="flex flex-col p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#FF5E00] transition-all group">
                <div className="bg-white p-4 rounded-xl w-fit mb-4 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors shadow-sm">
                  <User size={32} />
                </div>
                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-1">MSME / Individual</h3>
                <div className="mt-auto space-y-2">
                  <Link to="/login" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 bg-[#001D3D] text-white text-[11px] font-black uppercase rounded-lg hover:bg-black transition-all">Login</Link>
                  <Link to="/register" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 border-2 border-[#001D3D] text-[#001D3D] text-[11px] font-black uppercase rounded-lg hover:bg-[#001D3D] hover:text-white transition-all">Register</Link>
                </div>
              </div>

              {/* VENDOR BOX */}
              <div className="flex flex-col p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#FF5E00] transition-all group">
                <div className="bg-white p-4 rounded-xl w-fit mb-4 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors shadow-sm">
                  <Truck size={32} />
                </div>
                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-1">Vendor / Partner</h3>
                <div className="mt-auto space-y-2">
                  <Link to="/login" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 bg-[#001D3D] text-white text-[11px] font-black uppercase rounded-lg hover:bg-black transition-all">Login</Link>
                  <Link to="/register" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 border-2 border-[#001D3D] text-[#001D3D] text-[11px] font-black uppercase rounded-lg hover:bg-[#001D3D] hover:text-white transition-all">Register</Link>
                </div>
              </div>

              {/* EXIM BOX */}
              <div className="flex flex-col p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#FF5E00] transition-all group">
                <div className="bg-white p-4 rounded-xl w-fit mb-4 group-hover:bg-[#FF5E00] group-hover:text-white transition-colors shadow-sm">
                  <Globe size={32} />
                </div>
                <h3 className="font-black text-[#001D3D] uppercase text-sm mb-1">EXIM Client</h3>
                <div className="mt-auto space-y-2">
                  <Link to="/login" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 bg-[#001D3D] text-white text-[11px] font-black uppercase rounded-lg hover:bg-black transition-all">Login</Link>
                  <Link to="/register" onClick={() => setShowDashboardModal(false)} className="block w-full text-center py-2 border-2 border-[#001D3D] text-[#001D3D] text-[11px] font-black uppercase rounded-lg hover:bg-[#001D3D] hover:text-white transition-all">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow flex flex-col relative z-0">
        {children}
      </main>

      <footer className="bg-[#001D3D] text-white pt-20 pb-10 px-12 border-t-8 border-[#FF5E00] relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <h4 className="text-xl font-black mb-6 italic uppercase tracking-tighter">Apni Manzil</h4>
            <p className="text-slate-400 text-xs font-bold leading-loose uppercase tracking-widest italic">Simplifying Logistics for every destination.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;