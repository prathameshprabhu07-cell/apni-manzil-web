import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  PackageCheck, ShoppingCart, Banknote, RefreshCcw, Box, 
  ChevronRight, CheckCircle, MapPin, ArrowRight, Phone
} from 'lucide-react';

// ✅ Fix: Updated file path case-sensitivity
import { sendWhatsAppNotification } from '../utils/whatsapp';

const EcommerceLogistics = () => {
  const navigate = useNavigate();

  // 📦 Order Fulfillment Form State
  const [showFulfillmentModal, setShowFulfillmentModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobileNumber: '',
    email: '',
    pickupAddress: '',
    monthlyOrders: '100',
    productCategory: '',
    skuCount: '',
    avgWeight: '',
    avgDimensions: '',
    packagingRequired: 'Yes',
    labelPrinting: 'Yes',
    invoicePrinting: 'Yes',
    codRequired: 'Yes',
    dailyPickup: 'Yes'
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Function to handle booking/queries (Updated to route to a separate page)
  const handleEcommerceQuery = (serviceTitle) => {
    if (serviceTitle === "Order Fulfillment") {
      // ✅ फक्त येथे बदल केला आहे: Modal उघडण्याऐवजी नवीन पेजवर नेईल
      navigate('/order-fulfillment');
      return;
    }

    // If the user clicks Marketplace Shipping, navigate directly to the dedicated page
    if (serviceTitle === "Marketplace Shipping") {
      navigate('/marketplace-shipping');
      return;
    }

    const customerName = "E-com Vendor";
    const orderId = "EC-" + Math.floor(Math.random() * 100000);
    const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

    // Send data to n8n
    axios.post(n8nUrl, {
      service: serviceTitle,
      customerName: customerName,
      orderId: orderId,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      alert(`Your inquiry for ${serviceTitle} has been successfully sent!`);
    })
    .catch((error) => {
      console.error("Error sending to n8n:", error);
      alert("Error occurred while sending the inquiry.");
    });
  };

  const handleFulfillmentSubmit = (e) => {
    e.preventDefault();
    const orderId = "OF-" + Math.floor(Math.random() * 100000);
    const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

    axios.post(n8nUrl, {
      service: "Order Fulfillment",
      ...formData,
      orderId: orderId,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      alert('Order Fulfillment Inquiry Submitted Successfully!');
      setShowFulfillmentModal(false);
    })
    .catch((error) => {
      console.error("Error sending to n8n:", error);
      alert("Error occurred while sending the inquiry.");
    });
  };

  const ecommerceServices = [
    {
      id: 1,
      title: "Order Fulfillment",
      desc: "Complete responsibility from order picking to packing and shipping.",
      icon: <PackageCheck size={32} className="text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Marketplace Shipping",
      desc: "Easy integration with Amazon, Flipkart, and Shopify stores.",
      icon: <ShoppingCart size={32} className="text-sky-600" />,
      color: "bg-sky-50"
    },
    {
      id: 3,
      title: "COD Shipping",
      desc: "Fast Cash on Delivery payment facility for your business.",
      icon: <Banknote size={32} className="text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      id: 4,
      title: "Returns Management",
      desc: "Simple management of RTO and reverse logistics.",
      icon: <RefreshCcw size={32} className="text-orange-600" />,
      color: "bg-orange-50"
    },
    {
      id: 5,
      title: "Inventory Handling",
      desc: "Smart stock tracking and inventory management system.",
      icon: <Box size={32} className="text-indigo-600" />,
      color: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-[#002D5E] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-black leading-tight">
              E-commerce <span className="text-orange-400">Logistics</span>
            </h1>
            <p className="text-xl opacity-90 font-medium max-w-lg mx-auto md:mx-0">
              Grow your online business with India's most reliable fulfillment network.
            </p>

            <button 
              onClick={() => handleEcommerceQuery("Order Fulfillment")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest transition shadow-xl cursor-pointer"
            >
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

      {/* 2. Services Section */}
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
              <button 
                onClick={() => handleEcommerceQuery(service.title)}
                className="w-full bg-slate-50 group-hover:bg-orange-500 group-hover:text-white text-slate-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore More <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Detailed Information Section */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-12">
          {[
            { title: "Order Fulfillment", desc: "Complete responsibility from order picking to packing and shipping. We handle your entire fulfillment process with care, ensuring every package is meticulously prepared and dispatched to your customers quickly and accurately." },
            { title: "Marketplace Shipping", desc: "Easy integration with Amazon, Flipkart, and Shopify stores. Seamlessly connect your online storefronts with our logistics platform to automate shipping, streamline order management, and provide reliable delivery across all your sales channels." },
            { title: "COD Shipping", desc: "Fast Cash on Delivery payment facility for your business. Enhance your customer experience and boost your sales with our secure and rapid COD processing, ensuring your cash flow remains consistent and hassle-free." },
            { title: "Returns Management", desc: "Simple management of RTO and reverse logistics. We turn the challenge of returns into a streamlined process, efficiently handling pickups and processing reverse logistics so you can focus on growing your business." },
            { title: "Inventory Handling", desc: "Smart stock tracking and inventory management system. Gain full control and visibility over your stock with our intelligent tracking solutions, helping you optimize inventory levels and prevent stockouts in real-time." }
          ].map((item, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-6 hover:bg-slate-50 p-4 transition-all rounded-r-2xl">
              <h4 className="text-xl font-black text-slate-800 mb-2">{item.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Call to Action Banner */}
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
               <button 
                onClick={() => handleEcommerceQuery("Order Fulfillment")}
                className="bg-white text-[#002D5E] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition shadow-xl cursor-pointer"
               >
                  Get Started
               </button>
            </div>
        </div>
      </div>

      {/* 5. Final branded section */}
      <div 
        className="w-full h-[550px] flex items-start justify-center text-center pt-[60px] relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/truck-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#002D5E'
        }}
      >
        <div className="max-w-5xl px-6 relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-[950] uppercase tracking-[3px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
            One Solution for All Logistics
          </h2>
        </div>
      </div>

      {/* Order Fulfillment Modal / Form (कोड कमी केलेला नाही) */}
      {showFulfillmentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-6 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowFulfillmentModal(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-10 h-10 rounded-full font-bold flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
                alt="Order Fulfillment Warehouse" 
                className="w-full h-40 object-cover rounded-2xl mb-4"
              />
              <h2 className="text-2xl font-black text-slate-800">📦 Order Fulfillment</h2>
              <p className="text-slate-500 text-sm">Please fill in your details below</p>
            </div>

            <form onSubmit={handleFulfillmentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-bold text-sm mb-1 text-slate-700">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleFormChange} required placeholder="Enter Company Name" className="w-full p-3 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Contact Person</label>
                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleFormChange} required placeholder="Your Name" className="w-full p-3 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Mobile Number</label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleFormChange} required placeholder="9876543210" className="w-full p-3 border rounded-xl" />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-sm mb-1 text-slate-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} required placeholder="customer@company.com" className="w-full p-3 border rounded-xl" />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-sm mb-1 text-slate-700">Pickup/Warehouse Address</label>
                <textarea name="pickupAddress" value={formData.pickupAddress} onChange={handleFormChange} required rows="2" placeholder="Full warehouse address with Pincode" className="w-full p-3 border rounded-xl"></textarea>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Monthly Orders</label>
                <select name="monthlyOrders" value={formData.monthlyOrders} onChange={handleFormChange} className="w-full p-3 border rounded-xl">
                  <option value="100">100+</option>
                  <option value="500">500+</option>
                  <option value="1000">1000+</option>
                  <option value="5000">5000+</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Product Category</label>
                <input type="text" name="productCategory" value={formData.productCategory} onChange={handleFormChange} placeholder="e.g. Apparel, Electronics" className="w-full p-3 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">SKU (How many unique products)</label>
                <input type="text" name="skuCount" value={formData.skuCount} onChange={handleFormChange} placeholder="e.g. 50 SKUs" className="w-full p-3 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Average Order Weight</label>
                <input type="text" name="avgWeight" value={formData.avgWeight} onChange={handleFormChange} placeholder="e.g. 500g" className="w-full p-3 border rounded-xl" />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-sm mb-1 text-slate-700">Average Parcel Dimensions (L x B x H)</label>
                <input type="text" name="avgDimensions" value={formData.avgDimensions} onChange={handleFormChange} placeholder="e.g. 10 x 10 x 10 cm" className="w-full p-3 border rounded-xl" />
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Packaging Required?</label>
                <select name="packagingRequired" value={formData.packagingRequired} onChange={handleFormChange} className="w-full p-3 border rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Label Printing Required?</label>
                <select name="labelPrinting" value={formData.labelPrinting} onChange={handleFormChange} className="w-full p-3 border rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">Invoice Printing Required?</label>
                <select name="invoicePrinting" value={formData.invoicePrinting} onChange={handleFormChange} className="w-full p-3 border rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1 text-slate-700">COD Required?</label>
                <select name="codRequired" value={formData.codRequired} onChange={handleFormChange} className="w-full p-3 border rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-sm mb-1 text-slate-700">Daily Pickup Required?</label>
                <select name="dailyPickup" value={formData.dailyPickup} onChange={handleFormChange} className="w-full p-3 border rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2 text-center mt-4">
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-black uppercase tracking-widest transition cursor-pointer">
                  Submit Fulfillment Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EcommerceLogistics;