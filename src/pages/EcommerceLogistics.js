import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PackageCheck, ShoppingCart, Banknote, RefreshCcw, Box, 
  ChevronRight, Facebook, Instagram, Linkedin, Mail, Phone, Bot, CheckCircle,
  Twitter, MapPin, ArrowRight
} from 'lucide-react';

const EcommerceLogistics = () => {
  const navigate = useNavigate();

  const ecommerceServices = [
    {
      id: 1,
      title: "Order Fulfillment",
      desc: "तुमच्या ऑर्डर पिकिंगपासून पॅकिंग आणि शिपिंगपर्यंतची संपूर्ण जबाबदारी.",
      icon: <PackageCheck size={32} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Marketplace Shipping",
      desc: "Amazon, Flipkart आणि Shopify स्टोअर्ससोबत सोपे इंटिग्रेशन.",
      icon: <ShoppingCart size={32} className="text-sky-600" />,
      color: "bg-sky-50"
    },
    {
      id: 3,
      title: "COD Shipping",
      desc: "तुमच्या व्यवसायासाठी जलद Cash on Delivery पेमेंट सुविधा.",
      icon: <Banknote size={32} className="text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      id: 4,
      title: "Returns Management",
      desc: "RTO आणि रिव्हर्स लॉजिस्टिक्सचे सोपे व्यवस्थापन.",
      icon: <RefreshCcw size={32} className="text-orange-600" />,
      color: "bg-orange-50"
    },
    {
      id: 5,
      title: "Inventory Handling",
      desc: "स्मार्ट स्टॉक ट्रॅकिंग आणि इन्व्हेंटरी मॅनेजमेंट सिस्टम.",
      icon: <Box size={32} className="text-indigo-600" />,
      color: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="bg-[#002D5E] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-black leading-tight">
              E-commerce <span className="text-orange-400">Logistics</span>
            </h1>
            <p className="text-xl opacity-90 font-medium max-w-lg mx-auto md:mx-0">
              तुमचा ऑनलाइन व्यवसाय वाढवा भारताच्या सर्वात विश्वसनीय फुलफिलमेंट नेटवर्कसोबत.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition shadow-xl">
              Start Shipping Now
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
             <div className="relative">
                <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                <ShoppingCart size={180} className="text-white relative z-10" />
             </div>
          </div>
        </div>
      </div>

      {/* 2. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest">Select an E-commerce Service</h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecommerceServices.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col items-center text-center"
            >
              <div className={`${service.color} p-6 rounded-3xl mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                {service.desc}
              </p>
              <button className="w-full bg-slate-50 group-hover:bg-orange-500 group-hover:text-white text-slate-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2">
                Explore More <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALL TO ACTION BANNER */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
           <div className="md:w-2/3 space-y-6 text-white text-center md:text-left">
              <h2 className="text-4xl font-black leading-tight">Boost Your Online Sales with Our <span className="text-orange-400">Logistics Solutions!</span></h2>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                 <div className="flex items-center gap-2"><CheckCircle size={20} className="text-orange-400"/> <span className="font-bold">Lowest Rates</span></div>
                 <div className="flex items-center gap-2"><CheckCircle size={20} className="text-orange-400"/> <span className="font-bold">Fast Delivery</span></div>
              </div>
           </div>
           <div className="md:w-1/3 flex justify-center">
              <button className="bg-white text-[#002D5E] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition shadow-xl">
                Get Started
              </button>
           </div>
        </div>
      </div>

      {/* 4. PROFESSIONAL FOOTER */}
      <footer className="bg-[#001529] text-white pt-20 pb-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6 text-center md:text-left">
            <div className="text-2xl font-black flex items-center gap-2 justify-center md:justify-start cursor-pointer" onClick={() => navigate('/')}>
              <span className="bg-orange-500 text-white px-2 py-1 rounded-lg italic text-lg">AM</span>
              <span>Apni <span className="text-orange-400">Manzil</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's leading AI-powered logistics platform. Providing end-to-end e-commerce solutions for businesses of all sizes.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition"><Facebook size={20}/></a>
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition"><Instagram size={20}/></a>
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition"><Linkedin size={20}/></a>
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-orange-500 transition"><Twitter size={20}/></a>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-lg font-black border-b-2 border-orange-500 w-fit pr-4 pb-1 uppercase tracking-widest mx-auto md:mx-0">Solutions</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-bold">
              <li className="hover:text-orange-400 transition cursor-pointer flex items-center gap-2 justify-center md:justify-start"><ArrowRight size={14}/> Domestic Shipping</li>
              <li className="hover:text-orange-400 transition cursor-pointer flex items-center gap-2 justify-center md:justify-start"><ArrowRight size={14}/> Hyperlocal Delivery</li>
              <li className="hover:text-orange-400 transition cursor-pointer flex items-center gap-2 justify-center md:justify-start"><ArrowRight size={14}/> Warehouse Storage</li>
              <li className="hover:text-orange-400 transition cursor-pointer flex items-center gap-2 justify-center md:justify-start"><ArrowRight size={14}/> International Cargo</li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-lg font-black border-b-2 border-orange-500 w-fit pr-4 pb-1 uppercase tracking-widest mx-auto md:mx-0">Support</h4>
            <ul className="space-y-3 text-slate-400 text-sm font-bold">
              <li className="hover:text-orange-400 transition cursor-pointer justify-center md:justify-start">Help Center</li>
              <li className="hover:text-orange-400 transition cursor-pointer justify-center md:justify-start">Track Shipment</li>
              <li className="hover:text-orange-400 transition cursor-pointer justify-center md:justify-start">Terms & Conditions</li>
              <li className="hover:text-orange-400 transition cursor-pointer justify-center md:justify-start">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-lg font-black border-b-2 border-orange-500 w-fit pr-4 pb-1 uppercase tracking-widest mx-auto md:mx-0">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone size={18} className="text-orange-500"/> +91 98765 43210
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={18} className="text-orange-500"/> support@apnimanzil.co.in
              </li>
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin size={18} className="text-orange-500 shrink-0"/> 
                <span>Logistics Park, <br/>Sector 45, Pune - 411001</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">
            © 2026 Apni Manzil Logistics. Crafted with ❤️ for Indian Sellers.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default EcommerceLogistics;