import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileText, ShieldCheck, Upload, CheckCircle2, ChevronRight } from 'lucide-react';
import { sendWhatsAppNotification } from '../utils/whatsapp';

const CustomsClearanceForm = () => {
  const navigate = useNavigate();
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

  const [formData, setFormData] = useState({
    fullName: '',
    contactPerson: '',
    mobileNumber: '',
    emailId: '',
    gstNumber: '',
    iecNumber: '',
    shipmentType: 'Import',
    transportMode: 'Sea Freight',
    shipmentStatus: 'Not Sure',
    awbNumber: '',
    blNumber: '',
    courierTrackingNumber: '',
    containerNumber: '',
    productDescription: '',
    numberOfPackages: '',
    totalWeight: '',
    declaredValue: '',
    countryOfOrigin: '',
    countryOfDestination: '',
    portName: '',
    servicesRequired: [],
    documentsAvailable: [],
    problemDescription: '',
    invoiceFile: null,
    packingListFile: null,
    awbBlFile: null,
    trackingScreenshot: null,
    otherDocs: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const list = [...prev[category]];
      if (list.includes(value)) {
        return { ...prev, [category]: list.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...list, value] };
      }
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = "CC-" + Math.floor(Math.random() * 100000);
    const serviceTitle = "Customs Clearance Service";

    // १. व्हॉट्सॲप नोटिफिकेशन पाठवा
    sendWhatsAppNotification(formData.mobileNumber || "7378502356", formData.fullName || "Customs Client", serviceTitle, orderId);

    // २. n8n ला डेटा पाठवा
    try {
      await axios.post(n8nUrl, {
        action: "Customs_Clearance_Booking",
        orderId: orderId,
        ...formData,
        timestamp: new Date().toISOString()
      });
      alert(`Customs Clearance चौकशी यशस्वीरित्या सबमिट झाली! तुमच्या ऑर्डर आयडी: ${orderId}`);
      navigate('/customer-dashboard');
    } catch (error) {
      console.error("n8n Error:", error);
      alert("डेटा पाठवताना तांत्रिक अडचण आली, पण तुमची विनंती नोंदवली गेली आहे.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#001F3F] to-blue-800 text-white p-10 text-center relative">
          <div className="inline-block bg-purple-500/20 px-4 py-1 rounded-full border border-purple-400/30 mb-3">
            <p className="text-xs font-black text-purple-300 uppercase tracking-widest">EXIM & Compliance Support</p>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Customs Clearance Portal</h1>
          <p className="text-slate-200 mt-2 font-medium">Hassle-free documentation and fast clearance across Indian ports & airports.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          
          {/* 1. Customer Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Customer Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name / Company Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Enter company or full name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Contact Person *</label>
                <input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleInputChange} placeholder="Contact person name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleInputChange} placeholder="10-digit mobile number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email ID *</label>
                <input type="email" name="emailId" required value={formData.emailId} onChange={handleInputChange} placeholder="name@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">GST Number (Business असल्यास)</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} placeholder="GSTIN Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">IEC Number (Import/Export असल्यास)</label>
                <input type="text" name="iecNumber" value={formData.iecNumber} onChange={handleInputChange} placeholder="IEC Code" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
            </div>
          </div>

          {/* 2. Shipment Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Shipment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Shipment Type</label>
                <select name="shipmentType" value={formData.shipmentType} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium">
                  <option value="Import">Import</option>
                  <option value="Export">Export</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Transport Mode</label>
                <select name="transportMode" value={formData.transportMode} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium">
                  <option value="Air Cargo">✈️ Air Cargo</option>
                  <option value="Sea Freight">🚢 Sea Freight</option>
                  <option value="Road">🚛 Road</option>
                  <option value="International Courier">📦 International Courier</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current Shipment Status</label>
                <select name="shipmentStatus" value={formData.shipmentStatus} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium">
                  <option value="Shipment Dispatched">Shipment Dispatched</option>
                  <option value="Arrived at Port/Airport">Arrived at Port/Airport</option>
                  <option value="Held by Customs">Held by Customs</option>
                  <option value="Not Sure">Not Sure</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Shipment Reference Numbers */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Shipment Reference Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Air Waybill (AWB) Number (Air Cargo)</label>
                <input type="text" name="awbNumber" value={formData.awbNumber} onChange={handleInputChange} placeholder="AWB Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Bill of Lading (B/L) Number (Sea Freight)</label>
                <input type="text" name="blNumber" value={formData.blNumber} onChange={handleInputChange} placeholder="B/L Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Courier Tracking Number (Courier)</label>
                <input type="text" name="courierTrackingNumber" value={formData.courierTrackingNumber} onChange={handleInputChange} placeholder="Tracking Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Container Number (Sea - Optional)</label>
                <input type="text" name="containerNumber" value={formData.containerNumber} onChange={handleInputChange} placeholder="Container Number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
            </div>
          </div>

          {/* 4. Cargo Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Cargo Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Product Description *</label>
                <input type="text" name="productDescription" required value={formData.productDescription} onChange={handleInputChange} placeholder="e.g. Electronic components, garments" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Number of Packages *</label>
                <input type="number" name="numberOfPackages" required value={formData.numberOfPackages} onChange={handleInputChange} placeholder="e.g. 50 boxes / pallets" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Total Weight *</label>
                <input type="text" name="totalWeight" required value={formData.totalWeight} onChange={handleInputChange} placeholder="e.g. 500 kg" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Declared Value *</label>
                <input type="text" name="declaredValue" required value={formData.declaredValue} onChange={handleInputChange} placeholder="e.g. $10,000 / ₹8,50,000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Country of Origin *</label>
                <input type="text" name="countryOfOrigin" required value={formData.countryOfOrigin} onChange={handleInputChange} placeholder="e.g. China, USA, Germany" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Country of Destination *</label>
                <input type="text" name="countryOfDestination" required value={formData.countryOfDestination} onChange={handleInputChange} placeholder="e.g. India" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
              </div>
            </div>
          </div>

          {/* 5. Customs Location */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              Customs Location
            </h2>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Port / Airport Name *</label>
              <input type="text" name="portName" required value={formData.portName} onChange={handleInputChange} placeholder="उदाहरण: Mumbai JNPT, Mumbai Airport, Delhi IGI, Chennai Port" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 font-medium" />
            </div>
          </div>

          {/* 6. Service Required */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
              Service Required
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Import Customs Clearance",
                "Export Customs Clearance",
                "Documentation Support",
                "Duty Calculation",
                "Customs Consultation",
                "Delivery After Clearance"
              ].map((service, index) => (
                <label key={index} className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer hover:border-blue-600 transition">
                  <input 
                    type="checkbox" 
                    checked={formData.servicesRequired.includes(service)}
                    onChange={() => handleCheckboxChange('servicesRequired', service)}
                    className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                  />
                  <span className="font-bold text-slate-800 text-sm">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 7. Documents Available */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">7</span>
              Documents Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Commercial Invoice", "Packing List", "Air Waybill / Bill of Lading", 
                "IEC Certificate", "GST Certificate", "PAN Card", 
                "KYC Documents", "Certificate of Origin", "Insurance", "Other"
              ].map((doc, index) => (
                <label key={index} className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 cursor-pointer hover:border-blue-600 transition">
                  <input 
                    type="checkbox" 
                    checked={formData.documentsAvailable.includes(doc)}
                    onChange={() => handleCheckboxChange('documentsAvailable', doc)}
                    className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" 
                  />
                  <span className="font-bold text-slate-800 text-xs">{doc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 8. Problem Description */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">8</span>
              Problem Description
            </h2>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Describe your issue or custom requirement *</label>
              <textarea 
                rows="4" 
                name="problemDescription" 
                required 
                value={formData.problemDescription} 
                onChange={handleInputChange} 
                placeholder="उदा. Shipment customs मध्ये hold आहे. Documents complete नाहीत. Duty calculation हवी आहे. CHA हवा आहे." 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:outline-none focus:border-blue-600 font-medium"
              ></textarea>
            </div>
          </div>

          {/* 9. Upload Documents */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#002D5E] border-b pb-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">9</span>
              Upload Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Invoice</label>
                <input type="file" name="invoiceFile" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Packing List</label>
                <input type="file" name="packingListFile" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">AWB / B/L</label>
                <input type="file" name="awbBlFile" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tracking Screenshot</label>
                <input type="file" name="trackingScreenshot" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">इतर Documents (Other)</label>
                <input type="file" name="otherDocs" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#002D5E] text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition shadow-2xl flex items-center justify-center gap-3 cursor-pointer"
            >
              {isSubmitting ? "Submitting Inquiry..." : <>Submit Customs Clearance Inquiry <ChevronRight size={18} /></>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CustomsClearanceForm;