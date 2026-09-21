import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  Building2,
  Package,
  Warehouse,
  Globe,
  X,
} from 'lucide-react';

const VendorLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showTruckOptions, setShowTruckOptions] = React.useState(false);

  const handleServiceSelect = (serviceName) => {
    if (serviceName === 'Warehouse') {
      navigate('/warehouse-register', {
        state: { selectedCategory: serviceName },
      });
    } else if (serviceName === 'Truck Transport') {
      setShowTruckOptions(true);
    } else {
      navigate('/vendor-register', {
        state: { selectedCategory: serviceName },
      });
    }
  };

  const handleTruckPartnerSelect = (partnerType) => {
    navigate('/vendor-register', {
      state: {
        selectedCategory: 'Truck Transport',
        truckPartnerType: partnerType,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <Truck className="w-4 h-4" />
            APNI MANZIL PARTNER NETWORK
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Grow Your Logistics Business
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-50 leading-relaxed">
            Join Apni Manzil and connect your logistics business with customers
            looking for reliable transportation and logistics services.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white">
              ✓ Get Customer Leads
            </div>

            <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white">
              ✓ Grow Your Business
            </div>

            <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white">
              ✓ Expand Your Network
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Become Our Logistics Partner
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Select your service category and start receiving relevant
              business opportunities through Apni Manzil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Packers & Movers */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600518464441-9154a6bafc5e?auto=format&fit=crop&q=80&w=800"
                  alt="Packers and Movers"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Packers & Movers
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Register your Packers & Movers business and get customer
                  enquiries for residential and commercial shifting.
                </p>

                <button
                  onClick={() => handleServiceSelect('Packers & Movers')}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Warehouse */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586528116493-da8b8f2a1b8c?auto=format&fit=crop&q=80&w=800"
                  alt="Warehouse"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Warehouse className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Warehouse
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  List your warehouse and connect with businesses looking for
                  storage and fulfillment solutions.
                </p>

                <button
                  onClick={() => handleServiceSelect('Warehouse')}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* International Logistics */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=800"
                  alt="International Logistics"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  International Logistics
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Connect with customers looking for international shipping,
                  freight forwarding and export-import logistics.
                </p>

                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 font-semibold py-3 rounded-xl cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Truck Transport */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800"
                  alt="Truck Transport"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Truck Transport
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Register as a Truck Transport partner and get leads for full
                  truck load, part load, goods transportation and commercial
                  freight requirements.
                </p>

                <button
                  onClick={() => handleServiceSelect('Truck Transport')}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Truck Partner Type Modal */}
      {showTruckOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">

          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Close */}
            <button
              onClick={() => setShowTruckOptions(false)}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 md:px-10 py-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-blue-100 text-sm">
                    Truck Transport Partner
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold">
                    Select Your Partner Type
                  </h2>
                </div>
              </div>

              <p className="text-blue-100 text-sm md:text-base">
                Choose the option that best describes your transportation
                business.
              </p>
            </div>

            {/* Cards */}
            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-6">

              {/* Truck Owner / Fleet Owner */}
              <div className="group border-2 border-gray-200 hover:border-blue-500 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors">
                  <Truck className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Truck Owner / Fleet Owner
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  I own one or more trucks / vehicles and want to provide
                  transportation services through Apni Manzil.
                </p>

                <div className="space-y-2 mb-7 text-sm text-gray-600">
                  <div>✓ Own Truck / Fleet</div>
                  <div>✓ Vehicle Details</div>
                  <div>✓ Driver Details</div>
                  <div>✓ Routes & Capacity</div>
                </div>

                <button
                  onClick={() =>
                    handleTruckPartnerSelect('Truck Owner / Fleet Owner')
                  }
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
                >
                  Continue as Truck Owner
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Transporter / Logistics Company */}
              <div className="group border-2 border-gray-200 hover:border-orange-500 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg">

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors">
                  <Building2 className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Transporter / Logistics Company
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  I operate a transportation business or manage attached
                  vehicles and provide logistics services to customers.
                </p>

                <div className="space-y-2 mb-7 text-sm text-gray-600">
                  <div>✓ Attached / Managed Vehicles</div>
                  <div>✓ Multiple Routes</div>
                  <div>✓ FTL / PTL Services</div>
                  <div>✓ Business Transportation</div>
                </div>

                <button
                  onClick={() =>
                    handleTruckPartnerSelect(
                      'Transporter / Logistics Company'
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
                >
                  Continue as Transporter
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            <div className="px-6 md:px-10 pb-7 text-center">
              <p className="text-xs text-gray-500">
                You can provide your business and vehicle details after
                selecting your partner type.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default VendorLandingPage;