import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Globe, Warehouse as WarehouseIcon, Truck, 
  Zap, Award
} from 'lucide-react';

const VendorLandingPage = () => {
  const navigate = useNavigate();

  // ठराविक सर्व्हिस निवडून रजिस्ट्रेशन फॉर्मवर जाण्यासाठी
  const handleServiceSelect = (serviceName) => {
    navigate('/vendor-register', { state: { selectedCategory: serviceName } });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Hero Section */}
      <div className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="Logistics Fleet"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 space-y-6">
          <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-[0.2em] shadow-lg">
            Partner Program
          </span>
          <h1 className="text-4xl lg:text-6xl font-[950] italic uppercase tracking-tight leading-none">
            Become a <span className="text-orange-500">Partner</span>
          </h1>
          <p className="text-slate-300 max-w-xl text-sm lg:text-base font-medium leading-relaxed">
            Join Apni Manzil Partner Network and grow your business with verified leads and endless opportunities across India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <ShieldCheck className="text-orange-400 shrink-0" size={24}/>
              <div>
                <h4 className="font-extrabold text-xs uppercase">Verified Leads</h4>
                <p className="text-[11px] text-slate-300">Get genuine & quality leads</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Zap className="text-orange-400 shrink-0" size={24}/>
              <div>
                <h4 className="font-extrabold text-xs uppercase">Grow Business</h4>
                <p className="text-[11px] text-slate-300">Increase bookings & reach</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Award className="text-orange-400 shrink-0" size={24}/>
              <div>
                <h4 className="font-extrabold text-xs uppercase">Trusted Network</h4>
                <p className="text-[11px] text-slate-300">India's trusted platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Your Service Section */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-[950] italic uppercase tracking-tight text-[#002D5E]">Choose Your Service to Register</h2>
          <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          <p className="text-slate-500 text-sm font-bold">Select the service category that you provide and register with us.</p>
        </div>

        {/* 3 Main Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Packers & Movers */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-2xl">
            <div>
              <div className="h-52 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Packers and Movers"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-2xl text-orange-600 shadow-md">
                  <Truck size={24}/>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-[950] text-[#002D5E] uppercase italic">1. Packers & Movers</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Register as a Packers & Movers partner and get leads for home shifting, office shifting, vehicle transport and more.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button 
                onClick={() => handleServiceSelect('Packers & Movers')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
              >
                Register Now →
              </button>
            </div>
          </div>

          {/* Card 2: Warehouse */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-2xl">
            <div>
              <div className="h-52 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="Warehouse Storage"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-2xl text-blue-600 shadow-md">
                  <WarehouseIcon size={24}/>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-[950] text-[#002D5E] uppercase italic">2. Warehouse</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  List your warehouse or storage space with Apni Manzil and get genuine inquiries from corporate & retail customers.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button 
                onClick={() => handleServiceSelect('Warehouse')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
              >
                Register Now →
              </button>
            </div>
          </div>

          {/* Card 3: International Logistics */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-2xl">
            <div>
              <div className="h-52 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover" 
                  alt="International Logistics"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-2xl text-teal-600 shadow-md">
                  <Globe size={24}/>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-[950] text-[#002D5E] uppercase italic">3. International Logistics</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">
                  Join as an international logistics partner and offer global shipping, air freight, custom clearance and export solutions.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button 
                onClick={() => handleServiceSelect('International Logistics')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
              >
                Register Now →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-6 mt-24">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl lg:text-3xl font-[950] italic uppercase tracking-tight text-[#002D5E]">How It Works?</h2>
          <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto font-black">1</div>
            <h4 className="font-extrabold text-sm uppercase">1. Register</h4>
            <p className="text-xs text-slate-500 font-medium">Fill the registration form and submit your details.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto font-black">2</div>
            <h4 className="font-extrabold text-sm uppercase">2. Verification</h4>
            <p className="text-xs text-slate-500 font-medium">Our team will verify your documents and business details.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto font-black">3</div>
            <h4 className="font-extrabold text-sm uppercase">3. Approval</h4>
            <p className="text-xs text-slate-500 font-medium">Once verified, your partner account will be activated.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto font-black">4</div>
            <h4 className="font-extrabold text-sm uppercase">4. Get Leads</h4>
            <p className="text-xs text-slate-500 font-medium">Start receiving verified leads and grow your business.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PartnerRegistrationPage;