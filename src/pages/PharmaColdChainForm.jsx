import React, { useState } from 'react';
import { ShieldCheck, Thermometer, Truck, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const PharmaColdChainForm = () => {
  const [formData, setFormData] = useState({
    // 1. Company Details
    companyName: '',
    contactPerson: '',
    mobileNumber: '',
    emailId: '',
    gstNumber: '',
    drugLicenseNumber: '',
    companyType: 'Pharma Manufacturer',

    // 2. Pickup Details
    pickupCompanyName: '',
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupPincode: '',
    pickupDateTime: '',

    // 3. Delivery Details
    receiverName: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',
    requiredDeliveryDate: '',

    // 4. Medicine Details
    productType: 'Tablets / Capsules',
    productName: '',
    batchNumber: '',
    quantity: '',
    totalWeight: '',
    numberOfBoxes: '',

    // 5. Temperature Requirement
    temperatureRequirement: 'Chilled (2°C – 8°C)',

    // 6. Transport Requirement
    vehicleType: 'Temperature Controlled Reefer Vehicle',
    requiredService: 'Normal Delivery',

    // 7. Compliance & Safety
    temperatureDataLogger: 'Yes',
    packagingType: 'Insulated Box',
    insuranceRequired: 'Yes',
    specialHandlingInstructions: '',

    // 8. Documents
    invoiceFile: null,
    eWayBillFile: null,
    drugLicenseFile: null,
    productInstructionsFile: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pharma Logistics Form Submitted:", formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto my-16 p-10 bg-white rounded-3xl shadow-xl border-t-8 border-blue-600 text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-[#001D3D] uppercase italic tracking-tighter mb-2">Pharma Booking Confirmed!</h2>
        <p className="text-slate-600 font-bold text-sm mb-6">Your temperature-controlled pharmaceutical shipment request has been registered securely. Our specialized pharma logistics team will connect with you shortly.</p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="bg-[#001D3D] text-white px-8 py-3 rounded-xl font-black uppercase text-xs hover:bg-blue-600 transition-all cursor-pointer">
          Book Another Shipment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 md:p-12 bg-white rounded-3xl shadow-2xl border-t-[10px] border-blue-700 text-[#001D3D]">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 mb-2">
          <ShieldCheck size={36} className="text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">Pharma & Vaccine Cold Chain Logistics</h1>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Secure, Temperature-Validated Supply Chain for Pharmaceuticals</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* 1. Customer / Company Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">1</span>
            Customer / Company Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Company Name *</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="e.g. Apex Pharma Ltd" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Contact Person Name *</label>
              <input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Full Name" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Mobile Number *</label>
              <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Email ID</label>
              <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="pharma@domain.com" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">GST Number</label>
              <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="27AAAAA0000A1Z5" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Drug License Number (जर लागू असेल)</label>
              <input type="text" name="drugLicenseNumber" value={formData.drugLicenseNumber} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="DL Number" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase mb-1">Company Type *</label>
              <select name="companyType" value={formData.companyType} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Pharma Manufacturer">Pharma Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Hospital">Hospital</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Research Lab">Research Lab</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Pickup Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">2</span>
            Pickup Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Pickup Company Name *</label>
              <input type="text" name="pickupCompanyName" required value={formData.pickupCompanyName} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Warehouse / Plant Name" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Pickup Address *</label>
              <input type="text" name="pickupAddress" required value={formData.pickupAddress} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Complete Street Address" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">City *</label>
              <input type="text" name="pickupCity" required value={formData.pickupCity} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="City" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">State *</label>
              <input type="text" name="pickupState" required value={formData.pickupState} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="State" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Pincode *</label>
              <input type="text" name="pickupPincode" required value={formData.pickupPincode} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Pincode" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Pickup Date & Time</label>
              <input type="datetime-local" name="pickupDateTime" value={formData.pickupDateTime} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" />
            </div>
          </div>
        </div>

        {/* 3. Delivery Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">3</span>
            Delivery Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Receiver Name *</label>
              <input type="text" name="receiverName" required value={formData.receiverName} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Hospital / Distributor / Receiver Name" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Delivery Address *</label>
              <input type="text" name="deliveryAddress" required value={formData.deliveryAddress} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Complete Street Address" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">City *</label>
              <input type="text" name="deliveryCity" required value={formData.deliveryCity} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="City" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">State *</label>
              <input type="text" name="deliveryState" required value={formData.deliveryState} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="State" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Pincode *</label>
              <input type="text" name="deliveryPincode" required value={formData.deliveryPincode} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Pincode" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Required Delivery Date</label>
              <input type="date" name="requiredDeliveryDate" value={formData.requiredDeliveryDate} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" />
            </div>
          </div>
        </div>

        {/* 4. Medicine Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">4</span>
            Medicine Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Product Type *</label>
              <select name="productType" value={formData.productType} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Tablets / Capsules">Tablets / Capsules</option>
                <option value="Injection">Injection</option>
                <option value="Vaccine">Vaccine</option>
                <option value="Insulin">Insulin</option>
                <option value="Biological Products">Biological Products</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Product Name *</label>
              <input type="text" name="productName" required value={formData.productName} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Medicine / Vaccine Name" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Batch Number</label>
              <input type="text" name="batchNumber" value={formData.batchNumber} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="Batch No" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Quantity *</label>
              <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="e.g. 1000 Units / Vials" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Total Weight</label>
              <input type="text" name="totalWeight" value={formData.totalWeight} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="e.g. 50 KG" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Number of Boxes</label>
              <input type="number" name="numberOfBoxes" value={formData.numberOfBoxes} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="e.g. 5" />
            </div>
          </div>
        </div>

        {/* 5. Temperature Requirement (खूप महत्त्वाचे) */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">5</span>
            Temperature Requirement (खूप महत्त्वाचे)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Ambient (15°C – 25°C)",
              "Controlled Room Temperature (20°C – 25°C)",
              "Chilled (2°C – 8°C)",
              "Frozen (-15°C ते -25°C)",
              "Ultra Frozen (-70°C पर्यंत)"
            ].map((temp, idx) => (
              <label key={idx} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.temperatureRequirement === temp ? 'border-blue-600 bg-blue-50 font-black' : 'border-slate-200 bg-white font-bold'}`}>
                <input type="radio" name="temperatureRequirement" value={temp} checked={formData.temperatureRequirement === temp} onChange={handleChange} className="accent-blue-600" />
                <span className="text-sm">{temp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 6. Transport Requirement */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">6</span>
            Transport Requirement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase mb-2">Vehicle Type *</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Temperature Controlled Reefer Vehicle">Temperature Controlled Reefer Vehicle</option>
                <option value="Pharma Van">Pharma Van</option>
                <option value="Air Cargo (Cold Chain)">Air Cargo (Cold Chain)</option>
                <option value="Express Delivery">Express Delivery</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-2">Required Service *</label>
              <select name="requiredService" value={formData.requiredService} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Normal Delivery">Normal Delivery</option>
                <option value="Priority Delivery">Priority Delivery</option>
                <option value="Same Day Delivery">Same Day Delivery</option>
                <option value="Emergency Delivery">Emergency Delivery</option>
              </select>
            </div>
          </div>
        </div>

        {/* 7. Compliance & Safety */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">7</span>
            Compliance & Safety
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Temperature Data Logger Required?</label>
              <select name="temperatureDataLogger" value={formData.temperatureDataLogger} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Packaging Type</label>
              <select name="packagingType" value={formData.packagingType} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Insulated Box">Insulated Box</option>
                <option value="Gel Pack">Gel Pack</option>
                <option value="Dry Ice">Dry Ice</option>
                <option value="Customer Packaging">Customer Packaging</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Insurance Required?</label>
              <select name="insuranceRequired" value={formData.insuranceRequired} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase mb-1">Special Handling Instructions</label>
            <textarea name="specialHandlingInstructions" rows="3" value={formData.specialHandlingInstructions} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-blue-600 outline-none" placeholder="e.g., Handle with extreme care, do not tilt..."></textarea>
          </div>
        </div>

        {/* 8. Document Upload */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">8</span>
            Document Upload
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Invoice</label>
              <input type="file" name="invoiceFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">E-Way Bill (जर लागेल तर)</label>
              <input type="file" name="eWayBillFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Drug License</label>
              <input type="file" name="drugLicenseFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Product Handling Instructions</label>
              <input type="file" name="productInstructionsFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-[#001D3D] text-white py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-blue-600 transition-all shadow-lg cursor-pointer">
          Confirm & Submit Pharma Logistics Booking
        </button>

      </form>
    </div>
  );
};

export default PharmaColdChainForm;