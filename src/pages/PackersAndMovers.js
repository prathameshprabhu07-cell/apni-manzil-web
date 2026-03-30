import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // १. axios इम्पोर्ट करा
import { Home, Building2, Sofa, Truck, ShieldCheck, Clock, BadgeIndianRupee, ArrowRight, X } from 'lucide-react';

const PackersAndMovers = () => {
  const navigate = useNavigate();

  // २. फॉर्मचा डेटा साठवण्यासाठी स्टेट
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    fromCity: '',
    toCity: '',
    houseType: '1BHK',
    moveDate: ''
  });

  // ३. बॅकएंडला डेटा पाठवण्याचे फंक्शन
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/packers/post-lead', formData);
      if (res.data.success) {
        alert("तुमची रॅक्युयरमेंट संपूर्ण भारतात पोस्ट झाली आहे! ✅");
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("सर्व्हर एरर! कृपया backend चालू आहे का ते तपासा.");
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { id: 1, title: "House Shifting", desc: "Home Relocation", icon: <Home className="text-blue-600" size={32} /> },
    { id: 2, title: "Office Shifting", desc: "Office Relocation", icon: <Building2 className="text-orange-600" size={32} /> },
    { id: 3, title: "Furniture Moving", desc: "Heavy Item Moving", icon: <Sofa className="text-blue-500" size={32} /> },
    { id: 4, title: "Vehicle Transport", desc: "Car & Bike Moving", icon: <Truck className="text-indigo-600" size={32} /> },
    { id: 5, title: "Storage with Movers", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
    { id: 6, title: "Commercial Moving", desc: "Safe & Secure Storage", icon: <ShieldCheck className="text-green-600" size={32} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">
      
      {/* --- FORM MODAL (हे नवीन जोडले आहे, तुझ्या डिझाइनच्या वर दिसेल) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500"><X /></button>
            <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase italic">Quick Quote Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold" 
                onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
              <input required type="text" placeholder="Phone Number" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold" 
                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="From City" className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold text-sm" 
                  onChange={(e) => setFormData({...formData, fromCity: e.target.value})} />
                <input required type="text" placeholder="To City" className="p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 ring-orange-500 font-bold text-sm" 
                  onChange={(e) => setFormData({...formData, toCity: e.target.value})} />
              </div>
              <select className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-500" 
                onChange={(e) => setFormData({...formData, houseType: e.target.value})}>
                <option>1BHK</option><option>2BHK</option><option>3BHK</option><option>Few Items</option><option>Office</option>
              </select>
              <input required type="date" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-500" 
                onChange={(e) => setFormData({...formData, moveDate: e.target.value})} />
              <button disabled={loading} type="submit" className="w-full bg-[#ff5e00] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all active:scale-95">
                {loading ? "Posting..." : "Confirm & Get Rates"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Navbar */}
      <nav className="flex justify-between items-center py-4 px-12 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 text-2xl font-bold text-[#004080]">
          <span className="bg-[#ff5e00] text-white px-2 py-1 rounded">AM</span> Apni Manzil
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-blue-600">Services ▾</a>
          <a href="#" className="hover:text-blue-600">Track Shipment</a>
          <a href="#" className="hover:text-blue-600">Logistics Partner</a>
          <a href="#" className="hover:text-blue-600">Help</a>
          <button className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50">Login</button>
          <button className="px-6 py-2 bg-[#004080] text-white rounded-full font-bold">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">Home / Truck & Movers</p>
            <h1 className="text-5xl font-black mb-4">Packers & Movers</h1>
            <p className="text-xl font-medium opacity-90 italic">Reliable Relocation Services for Your Home or Office</p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
             <img src="https://images.unsplash.com/photo-1600518464441-9154a4dba246?auto=format&fit=crop&q=80&w=800" 
                  alt="Relocation" className="rounded-2xl shadow-2xl border-4 border-white/20" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex-grow">
        <h2 className="text-2xl font-black text-slate-800 text-center mb-12 uppercase tracking-wide">Select a Relocation Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{s.title}</h3>
              <p className="text-sm text-slate-500 mb-6">{s.desc}</p>
              <button 
                onClick={() => setIsModalOpen(true)} // ४. क्लिक केल्यावर फॉर्म उघडेल
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition uppercase tracking-wider"
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Banner */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-blue-700 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-2xl text-white">
          <div className="md:w-1/3">
             <img src="https://images.unsplash.com/photo-1549194388-2469d59ec75c?auto=format&fit=crop&q=80&w=400" 
                  alt="Worker" className="rounded-3xl shadow-lg" />
          </div>
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-3xl font-black">Get Your Free Moving Quote!</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 font-bold"><ShieldCheck className="text-orange-400"/> Professional Service</div>
              <div className="flex items-center gap-3 font-bold"><Clock className="text-orange-400"/> Safe & Secure</div>
              <div className="flex items-center gap-3 font-bold"><BadgeIndianRupee className="text-orange-400"/> Affordable Pricing</div>
            </div>
            <p className="text-blue-100 italic">Hassle-Free Moving Experience Guaranteed!</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition flex items-center gap-3 group">
              Get Quote Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer (Designing kept exactly same as your code) */}
      <footer className="bg-[#0056b3] text-white py-16 px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="bg-[#ff5e00] text-white px-2 py-1 rounded text-sm">AM</span> Apni Manzil
            </div>
            <p className="text-xs leading-relaxed opacity-80">
              India's leading AI-powered logistics platform. One solution for all your special delivery needs.
            </p>
          </div>
          {/* ... बाकीचा फटर सेम राहील ... */}
          <div className="space-y-4">
            <h4 className="font-bold border-b-2 border-[#ff5e00] w-fit pb-1">Contact Us</h4>
            <ul className="text-sm space-y-3 opacity-80">
              <li>📞 +91 93703 43210</li>
              <li>📧 support@apnimanzil.co.in</li>
              <li>📍 Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-white/10 text-[10px] tracking-widest opacity-60">
          © 2026 APNI MANZIL. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

export default PackersAndMovers;