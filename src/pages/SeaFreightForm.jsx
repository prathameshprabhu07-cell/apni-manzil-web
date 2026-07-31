import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Ship, ChevronRight, ArrowLeft } from 'lucide-react';
import { sendWhatsAppNotification } from '../utils/whatsapp';

const SeaFreightForm = () => {
  const navigate = useNavigate();
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

  const [formData, setFormData] = useState({
    // 1. Customer Details
    companyName: '',
    contactPerson: '',
    mobileNumber: '',
    emailAddress: '',
    gstNumber: '',
    iecNumber: '',

    // 2. Shipper Details
    shipperCompany: '',
    shipperName: '',
    shipperPhone: '',
    shipperEmail: '',
    shipperAddress: '',
    shipperCity: '',
    shipperState: '',
    shipperCountry: '',
    shipperZip: '',

    // 3. Consignee Details
    consigneeCompany: '',
    consigneeName: '',
    consigneePhone: '',
    consigneeEmail: '',
    consigneeAddress: '',
    consigneeCity: '',
    consigneeState: '',
    consigneeCountry: '',
    consigneeZip: '',

    // 4. Shipment Type & Service
    shipmentType: 'Export',
    serviceRequired: 'Port to Port',

    // 5. Cargo Details
    cargoType: 'General Cargo',
    cargoDescription: '',
    hsCode: '',
    numberOfPackages: '',
    grossWeight: '',
    netWeight: '',

    // 6. Container Requirement
    shipmentMode: 'FCL',
    containerType: '20 FT Dry Container',

    // 7. Port Details
    originPort: 'Mumbai (JNPT)',
    destinationCountry: '',
    destinationPortName: '',

    // 8. Pickup & Delivery
    pickupAddress: '',
    deliveryAddress: '',
    pickupDate: '',
    requiredDeliveryDate: '',

    // 9. Customs Details
    customsClearanceRequired: 'Yes',
    chaServiceRequired: 'Yes',
    licenseAvailable: 'Yes',

    // 11. Insurance
    insuranceRequired: 'Yes',
    cargoValue: '',
    currency: 'INR (₹)',

    // 12. Additional Requirements & Instructions
    temperatureControlled: false,
    fragile: false,
    dangerousGoods: false,
    stuffingRequired: false,
    warehousingRequired: false,
    palletsRequired: false,
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderId = "SEA-" + Math.floor(Math.random() * 100000);

    // व्हॉट्सॲप नोटिफिकेशन पाठवा
    sendWhatsAppNotification(
      formData.mobileNumber || "7378502356", 
      formData.contactPerson || "Sea Freight Client", 
      "Sea Freight Booking", 
      orderId
    );

    try {
      await axios.post(n8nUrl, {
        action: "Sea_Freight_Booking",
        orderId: orderId,
        ...formData,
        timestamp: new Date().toISOString()
      });
      alert(`Sea Freight बुकिंग यशस्वीरित्या नोंदवली आहे! तुमची ऑर्डर आयडी: ${orderId}`);
      navigate('/international-logistics');
    } catch (error) {
      console.error("n8n Error:", error);
      alert("डेटा पाठवताना तांत्रिक अडचण आली, कृपया पुन्हा प्रयत्न करा.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl border border-slate-100 p-8 md:p-12">
        
        {/* Back Button & Header */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#002D5E] mb-6 font-bold cursor-pointer"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex items-center gap-4 mb-8 border-b pb-6">
          <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
            <Ship size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#002D5E]">Sea Freight Booking Form</h1>
            <p className="text-slate-500 font-medium">Cost-effective shipping solutions for bulk and large cargo (FCL/LCL).</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* 1. Customer Details */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">1. Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="companyName" placeholder="Company Name / Full Name *" required value={formData.companyName} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="contactPerson" placeholder="Contact Person *" required value={formData.contactPerson} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="tel" name="mobileNumber" placeholder="Mobile Number *" required value={formData.mobileNumber} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="email" name="emailAddress" placeholder="Email Address *" required value={formData.emailAddress} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="gstNumber" placeholder="GST Number (Business)" value={formData.gstNumber} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="iecNumber" placeholder="IEC Number (Import/Export)" value={formData.iecNumber} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
            </div>
          </div>

          {/* 2. Shipper (Exporter) */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">2. Shipper (Exporter) Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="shipperCompany" placeholder="Company Name" value={formData.shipperCompany} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="shipperName" placeholder="Contact Person" value={formData.shipperName} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="tel" name="shipperPhone" placeholder="Mobile Number" value={formData.shipperPhone} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="email" name="shipperEmail" placeholder="Email" value={formData.shipperEmail} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="shipperAddress" placeholder="Complete Address" value={formData.shipperAddress} onChange={handleChange} className="md:col-span-2 p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="shipperCity" placeholder="City" value={formData.shipperCity} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="shipperState" placeholder="State" value={formData.shipperState} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="shipperCountry" placeholder="Country" value={formData.shipperCountry} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="shipperZip" placeholder="Postal / ZIP Code" value={formData.shipperZip} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
            </div>
          </div>

          {/* 3. Consignee (Importer) */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">3. Consignee (Importer) Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="consigneeCompany" placeholder="Company Name" value={formData.consigneeCompany} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="consigneeName" placeholder="Contact Person" value={formData.consigneeName} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="tel" name="consigneePhone" placeholder="Mobile Number" value={formData.consigneePhone} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="email" name="consigneeEmail" placeholder="Email" value={formData.consigneeEmail} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="consigneeAddress" placeholder="Complete Address" value={formData.consigneeAddress} onChange={handleChange} className="md:col-span-2 p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="consigneeCity" placeholder="City" value={formData.consigneeCity} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="consigneeState" placeholder="State / Province" value={formData.consigneeState} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="consigneeCountry" placeholder="Country" value={formData.consigneeCountry} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
              <input type="text" name="consigneeZip" placeholder="Postal / ZIP Code" value={formData.consigneeZip} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600" />
            </div>
          </div>

          {/* 4. Shipment Type & Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-slate-700 mb-2">Shipment Type</label>
              <select name="shipmentType" value={formData.shipmentType} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 bg-white">
                <option value="Export">Export</option>
                <option value="Import">Import</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-2">Service Required</label>
              <select name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 bg-white">
                <option value="Port to Port">Port to Port</option>
                <option value="Door to Port">Door to Port</option>
                <option value="Port to Door">Port to Door</option>
                <option value="Door to Door">Door to Door</option>
              </select>
            </div>
          </div>

          {/* 5. Cargo Details */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">5. Cargo Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-2">Cargo Type</label>
                <select name="cargoType" value={formData.cargoType} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 bg-white">
                  <option value="General Cargo">General Cargo</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Food Products">Food Products</option>
                  <option value="Textile">Textile</option>
                  <option value="Automobile Parts">Automobile Parts</option>
                  <option value="Dangerous Goods">Dangerous Goods</option>
                  <option value="Refrigerated Cargo">Refrigerated Cargo</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-2">HS Code (Optional)</label>
                <input type="text" name="hsCode" placeholder="Enter HS Code" value={formData.hsCode} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200" />
              </div>
              <input type="text" name="cargoDescription" placeholder="Cargo Description" value={formData.cargoDescription} onChange={handleChange} className="md:col-span-2 p-4 rounded-2xl border border-slate-200" />
              <input type="number" name="numberOfPackages" placeholder="Number of Packages" value={formData.numberOfPackages} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200" />
              <input type="number" name="grossWeight" placeholder="Gross Weight (KG)" value={formData.grossWeight} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200" />
            </div>
          </div>

          {/* 6. Container Requirement */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">6. Container Requirement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-2">Shipment Mode</label>
                <select name="shipmentMode" value={formData.shipmentMode} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 bg-white">
                  <option value="FCL">FCL (Full Container Load)</option>
                  <option value="LCL">LCL (Less than Container Load)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-2">Container Type</label>
                <select name="containerType" value={formData.containerType} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 bg-white">
                  <option value="20 FT Dry Container">20 FT Dry Container</option>
                  <option value="40 FT Dry Container">40 FT Dry Container</option>
                  <option value="40 HC Container">40 HC Container</option>
                  <option value="Reefer Container">Reefer Container (Refrigerated)</option>
                  <option value="Open Top Container">Open Top Container</option>
                  <option value="Flat Rack Container">Flat Rack Container</option>
                  <option value="ISO Tank Container">ISO Tank Container</option>
                </select>
              </div>
            </div>
          </div>

          {/* 7. Port Details */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">7. Port Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-2">Origin Port</label>
                <select name="originPort" value={formData.originPort} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 bg-white">
                  <option value="Mumbai (JNPT)">Mumbai (JNPT)</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mundra">Mundra</option>
                  <option value="Nhava Sheva">Nhava Sheva</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Cochin">Cochin</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <input type="text" name="destinationCountry" placeholder="Destination Country" value={formData.destinationCountry} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200" />
              <input type="text" name="destinationPortName" placeholder="Destination Port Name" value={formData.destinationPortName} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200" />
            </div>
          </div>

          {/* 12. Additional Requirements */}
          <div>
            <h3 className="text-xl font-black text-slate-800 mb-4">8. Additional Requirements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" name="temperatureControlled" checked={formData.temperatureControlled} onChange={handleChange} className="w-5 h-5 accent-indigo-600" /> Temperature Controlled
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" name="fragile" checked={formData.fragile} onChange={handleChange} className="w-5 h-5 accent-indigo-600" /> Fragile Goods
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" name="dangerousGoods" checked={formData.dangerousGoods} onChange={handleChange} className="w-5 h-5 accent-indigo-600" /> Dangerous Goods (DG)
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" name="stuffingRequired" checked={formData.stuffingRequired} onChange={handleChange} className="w-5 h-5 accent-indigo-600" /> Factory Stuffing Required
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" name="warehousingRequired" checked={formData.warehousingRequired} onChange={handleChange} className="w-5 h-5 accent-indigo-600" /> Warehousing Required
              </label>
              <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" name="palletsRequired" checked={formData.palletsRequired} onChange={handleChange} className="w-5 h-5 accent-indigo-600" /> Palletization Required
              </label>
            </div>
            <textarea name="specialInstructions" placeholder="Special Instructions (if any)" rows="3" value={formData.specialInstructions} onChange={handleChange} className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-indigo-600"></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-[#002D5E] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-600 transition shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            Submit Sea Freight Inquiry <ChevronRight size={18} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default SeaFreightForm;