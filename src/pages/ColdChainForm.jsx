import React, { useState } from 'react';
import { Truck, Thermometer, ShieldCheck, Upload, FileText, CheckCircle } from 'lucide-react';

const ColdChainForm = () => {
  const [formData, setFormData] = useState({
    // 1. Customer Info
    fullName: '',
    mobile: '',
    email: '',
    gstNumber: '',
    businessType: 'Food Manufacturer',

    // 2. Pickup Details
    pickupLocation: '',
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupPincode: '',
    pickupDateTime: '',

    // 3. Delivery Details
    deliveryLocation: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',
    deliveryDate: '',

    // 4. Product Details
    productCategory: 'Fruits & Vegetables',
    productName: '',
    quantity: '',
    weight: '',
    packages: '',

    // 5. Temperature
    temperatureRange: 'Chilled (2°C - 8°C)',

    // 6. Vehicle
    vehicleType: 'Reefer Van',
    vehicleSize: 'Small',

    // 7. Additional
    packagingRequired: 'No',
    insuranceRequired: 'No',
    specialInstructions: '',

    // 8. Documents
    invoiceFile: null,
    productSheetFile: null,
    licenseFile: null
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
    console.log("Cold Chain Form Submitted:", formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto my-16 p-10 bg-white rounded-2xl shadow-xl border-t-8 border-[#FF5E00] text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-[#001D3D] uppercase italic tracking-tighter mb-2">Booking Request Received!</h2>
        <p className="text-slate-600 font-bold text-sm mb-6">Thank you for submitting your cold chain logistics request. Our operations team will review your temperature requirements and contact you shortly.</p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="bg-[#001D3D] text-white px-8 py-3 rounded-lg font-black uppercase text-xs hover:bg-[#FF5E00] transition-all cursor-pointer">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 md:p-12 bg-white rounded-3xl shadow-2xl border-t-[10px] border-[#FF5E00] text-[#001D3D]">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Thermometer size={32} className="text-[#FF5E00]" />
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">Cold Chain Logistics Booking</h1>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Temperature-Controlled Safe Transportation & Storage</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* 1. Customer Information */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">1</span>
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Full Name / Company Name *</label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="e.g. Apni Manzil Agro" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Mobile Number *</label>
              <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Email ID</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="example@domain.com" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">GST Number (Optional)</label>
              <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="27AAAAA0000A1Z5" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase mb-1">Business Type *</label>
              <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none">
                <option value="Food Manufacturer">Food Manufacturer</option>
                <option value="Pharma Company">Pharma Company</option>
                <option value="Agriculture/Farm">Agriculture/Farm</option>
                <option value="Restaurant/Hotel">Restaurant/Hotel</option>
                <option value="E-commerce Seller">E-commerce Seller</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Pickup Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">2</span>
            Pickup Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Pickup Location / Hub *</label>
              <input type="text" name="pickupLocation" required value={formData.pickupLocation} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Area / Landmark" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase mb-1">Pickup Address *</label>
              <input type="text" name="pickupAddress" required value={formData.pickupAddress} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Complete Street Address" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Pickup City *</label>
              <input type="text" name="pickupCity" required value={formData.pickupCity} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="City" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Pickup State *</label>
              <input type="text" name="pickupState" required value={formData.pickupState} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="State" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Pickup Pincode *</label>
              <input type="text" name="pickupPincode" required value={formData.pickupPincode} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Pincode" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Pickup Date & Time *</label>
              <input type="datetime-local" name="pickupDateTime" required value={formData.pickupDateTime} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" />
            </div>
          </div>
        </div>

        {/* 3. Delivery Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">3</span>
            Delivery Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Delivery Location *</label>
              <input type="text" name="deliveryLocation" required value={formData.deliveryLocation} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Area / Landmark" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase mb-1">Delivery Address *</label>
              <input type="text" name="deliveryAddress" required value={formData.deliveryAddress} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Complete Street Address" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Delivery City *</label>
              <input type="text" name="deliveryCity" required value={formData.deliveryCity} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="City" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Delivery State *</label>
              <input type="text" name="deliveryState" required value={formData.deliveryState} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="State" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Delivery Pincode *</label>
              <input type="text" name="deliveryPincode" required value={formData.deliveryPincode} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Pincode" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-black uppercase mb-1">Required Delivery Date *</label>
              <input type="date" name="deliveryDate" required value={formData.deliveryDate} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" />
            </div>
          </div>
        </div>

        {/* 4. Product Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">4</span>
            Product Details (Important)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Product Category *</label>
              <select name="productCategory" value={formData.productCategory} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none">
                <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                <option value="Dairy Products">Dairy Products</option>
                <option value="Meat & Seafood">Meat & Seafood</option>
                <option value="Frozen Food">Frozen Food</option>
                <option value="Pharma / Medicine">Pharma / Medicine</option>
                <option value="Vaccines">Vaccines</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Product Name *</label>
              <input type="text" name="productName" required value={formData.productName} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="e.g. Fresh Milk / Frozen Seafood" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Quantity *</label>
              <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="e.g. 500 Units" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Weight (KG/Ton) *</label>
              <input type="text" name="weight" required value={formData.weight} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="e.g. 2.5 Tons" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase mb-1">Number of Boxes / Packages *</label>
              <input type="number" name="packages" required value={formData.packages} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="e.g. 120" />
            </div>
          </div>
        </div>

        {/* 5. Temperature Requirement */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">5</span>
            Temperature Requirement
          </h3>
          <label className="block text-xs font-black uppercase mb-3">Select Temperature Range *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Ambient (15°C - 25°C)",
              "Chilled (2°C - 8°C)",
              "Frozen (-18°C to -25°C)",
              "Deep Frozen (-25°C and below)"
            ].map((temp, idx) => (
              <label key={idx} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.temperatureRange === temp ? 'border-[#FF5E00] bg-orange-50 font-black' : 'border-slate-200 bg-white font-bold'}`}>
                <input type="radio" name="temperatureRange" value={temp} checked={formData.temperatureRange === temp} onChange={handleChange} className="accent-[#FF5E00]" />
                <span className="text-sm">{temp}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 6. Vehicle Requirement */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">6</span>
            Vehicle Requirement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase mb-2">Vehicle Type *</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none">
                <option value="Reefer Van">Reefer Van</option>
                <option value="Reefer Truck">Reefer Truck</option>
                <option value="Cold Storage">Cold Storage</option>
                <option value="Air Cargo (Temperature Controlled)">Air Cargo (Temperature Controlled)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-2">Vehicle Capacity *</label>
              <select name="vehicleSize" value={formData.vehicleSize} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* 7. Additional Requirements */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">7</span>
            Additional Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Packaging Required?</label>
              <select name="packagingRequired" value={formData.packagingRequired} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Insurance Required?</label>
              <select name="insuranceRequired" value={formData.insuranceRequired} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase mb-1">Special Instructions</label>
            <textarea name="specialInstructions" rows="3" value={formData.specialInstructions} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-lg font-bold text-sm focus:border-[#FF5E00] outline-none" placeholder="Example: Maintain strictly 5°C temperature throughout transit"></textarea>
          </div>
        </div>

        {/* 8. Document Upload */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-black uppercase italic text-[#001D3D] mb-4 border-b border-slate-300 pb-2 flex items-center gap-2">
            <span className="bg-[#FF5E00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center not-italic font-black">8</span>
            Document Upload
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Invoice Upload</label>
              <input type="file" name="invoiceFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Product Details Sheet</label>
              <input type="file" name="productSheetFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">License (FSSAI / Pharma)</label>
              <input type="file" name="licenseFile" onChange={handleChange} className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-black file:bg-[#001D3D] file:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-[#001D3D] text-white py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-[#FF5E00] transition-all shadow-lg cursor-pointer">
          Confirm & Submit Cold Chain Request
        </button>

      </form>
    </div>
  );
};

export default ColdChainForm;