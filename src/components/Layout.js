import React from 'react';
import { 
  Menu, X, Phone, Globe, User, 
  Facebook, Instagram, Linkedin, Mail, 
  MapPin, ChevronRight, HelpCircle, ShieldCheck
} from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#001D3D]">
      
      {/* --- TOP BAR (Industrial Standard) --- */}
      <div className="bg-[#001D3D] text-white py-2 px-12 hidden md:flex justify-between items-center text-[10px] font-black tracking-[0.2em]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 border-r border-slate-700 pr-6">
            <Phone size={12} className="text-[#FF5E00]"/> 24/7 SUPPORT: +91 93703 43210
          </span>
          <span className="flex items-center gap-2">
            <Globe size={12} className="text-[#FF5E00]"/> GLOBAL LOGISTICS NETWORK
          </span>
        </div>
        <div className="flex gap-6">
          <a href="/track" className="hover:text-[#FF5E00] transition">TRACK SHIPMENT</a>
          <a href="/login" className="hover:text-[#FF5E00] transition text-[#FF5E00]">PARTNER LOGIN</a>
        </div>
      </div>

      {/* --- MAIN HEADER (Navbar) --- */}
      <nav className="bg-white border-b border-gray-200 py-5 px-12 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#001D3D] text-white px-3 py-1 font-black text-2xl italic border-r-4 border-[#FF5E00]">AM</div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Apni Manzil</span>
            <span className="text-[9px] font-black text-[#FF5E00] tracking-[0.3em] uppercase">Logistics & Supply Chain</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] text-[#001D3D]">
          <a href="/" className="hover:text-[#FF5E00] border-b-2 border-transparent hover:border-[#FF5E00] pb-1 transition-all">HOME</a>
          <a href="/services" className="hover:text-[#FF5E00] border-b-2 border-transparent hover:border-[#FF5E00] pb-1 transition-all">SERVICES</a>
          <a href="/partner" className="hover:text-[#FF5E00] border-b-2 border-transparent hover:border-[#FF5E00] pb-1 transition-all text-[#FF5E00]">BECOME A PARTNER</a>
          <a href="/about" className="hover:text-[#FF5E00] border-b-2 border-transparent hover:border-[#FF5E00] pb-1 transition-all">ABOUT US</a>
          <button className="bg-[#001D3D] text-white px-8 py-3 hover:bg-[#FF5E00] transition duration-300 flex items-center gap-2">
            <User size={14}/> DASHBOARD
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Menu size={24} />
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
            <h4 className="text-2xl font-black italic tracking-tighter">APNI MANZIL</h4>
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
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <HelpCircle size={12} className="text-[#FF5E00]"/> Help Center / FAQs
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <ShieldCheck size={12} className="text-[#FF5E00]"/> Safety Protocols
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <ChevronRight size={12} className="text-[#FF5E00]"/> Track Order
              </li>
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