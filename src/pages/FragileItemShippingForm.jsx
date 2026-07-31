import React, { useState } from 'react';
import { ShieldAlert, Package, Truck, FileText, Upload, CheckCircle } from 'lucide-react';

const FragileItemShippingForm = () => {
  const [formData, setFormData] = useState({
    // 1. Customer Details
    fullName: '',
    mobileNumber: '',
    emailId: '',
    gstNumber: '',
    customerType: 'Individual',

    // 2. Pickup Details
    pickupAddress: '',
    city: '',
    state: '',
    pincode: '',
    pickupDateTime: '',
    contactPersonName: '',

    // 3. Delivery Details
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',
    receiverDetails: '',

    // 4. Item Details
    itemCategory: 'Glass Items',
    otherCategory: '', // ✅ 'Other' निवडल्यास लिहण्यासाठी नवीन फिल्ड
    itemName: '',
    quantity: '',
    approxWeight: '',
    length: '',
    width: '',
    height: '',
    itemValue: '',

    // 5. Fragile Handling Requirement
    fragilityLevel: 'Normal Fragile',
    handlingRequired: [],

    // 6. Packaging Details
    currentPackaging: 'Customer Packed',
    packagingRequired: [],

    // 7. Transport Requirement
    vehicleType: 'Mini Truck',
    servicePriority: 'Normal',

    // 8. Additional Information
    floorPickup: 'No',
    liftAvailable: 'No',
    specialInstructions: '',

    // 9. Insurance
    insuranceRequired: 'No',
    declaredValue: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const currentList = formData[name] || [];
      if (checked) {
        setFormData({ ...formData, [name]: [...currentList, value] });
      } else {
        setFormData({ ...formData, [name]: currentList.filter((item) => item !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Fragile item shipping booking submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
          <h1 className="text-3xl font-black tracking-tight flex items-center justify-center gap-3">
            <ShieldAlert size={36} className="text-yellow-400" />
            Fragile Item Shipping & Special Handling
          </h1>
          <p className="text-blue-100 mt-2 font-medium">Safe, Secure & Professional Transport for Delicate Goods</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* 1. Customer Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">1. Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Full Name / Company Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter mobile number" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email ID</label>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">GST Number (Optional)</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter GST number" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Customer Type</label>
                <select name="customerType" value={formData.customerType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="E-commerce Seller">E-commerce Seller</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Pickup Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">2. Pickup Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pickup Address *</label>
                <textarea name="pickupAddress" required rows="2" value={formData.pickupAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter complete pickup address"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">State *</label>
                <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="State" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pincode *</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Pincode" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pickup Date & Time</label>
                <input type="datetime-local" name="pickupDateTime" value={formData.pickupDateTime} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Contact Person Name</label>
                <input type="text" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Name of contact person at pickup" />
              </div>
            </div>
          </div>

          {/* 3. Delivery Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">3. Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Delivery Address *</label>
                <textarea name="deliveryAddress" required rows="2" value={formData.deliveryAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter complete delivery address"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">City *</label>
                <input type="text" name="deliveryCity" required value={formData.deliveryCity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">State *</label>
                <input type="text" name="deliveryState" required value={formData.deliveryState} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="State" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pincode *</label>
                <input type="text" name="deliveryPincode" required value={formData.deliveryPincode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Pincode" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Receiver Name & Mobile Number *</label>
                <input type="text" name="receiverDetails" required value={formData.receiverDetails} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Name and Phone" />
              </div>
            </div>
          </div>

          {/* 4. Item Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">4. Item Details (Important)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Item Category */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Item Category *</label>
                <select name="itemCategory" value={formData.itemCategory} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Glass Items">Glass Items</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Machinery Parts">Machinery Parts</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Artwork / Antiques">Artwork / Antiques</option>
                  <option value="Medical Equipment">Medical Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* ✅ जर 'Other' निवडले तर दिसणारा स्पेशल इनपुट बॉक्स */}
              {formData.itemCategory === 'Other' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-orange-600 mb-2">Please Specify Other Category *</label>
                  <input 
                    type="text" 
                    name="otherCategory" 
                    required 
                    value={formData.otherCategory} 
                    onChange={handleChange} 
                    className="w-full bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-orange-500" 
                    placeholder="Enter item category type" 
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Item Name *</label>
                <input type="text" name="itemName" required value={formData.itemName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Name or description of item" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Quantity *</label>
                <input type="number" name="quantity" required value={formData.quantity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Qty" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Approx Weight (KG)</label>
                <input type="number" name="approxWeight" value={formData.approxWeight} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Weight in KG" />
              </div>
              
              {/* Dimensions */}
              <div className="md:col-span-2 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Length</label>
                  <input type="text" name="length" value={formData.length} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Length" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Width</label>
                  <input type="text" name="width" value={formData.width} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Width" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Height</label>
                  <input type="text" name="height" value={formData.height} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Height" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Item Value (₹) *</label>
                <input type="number" name="itemValue" required value={formData.itemValue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter approximate item value in INR" />
              </div>

            </div>
          </div>

          {/* 5. Fragile Handling Requirement */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">5. Fragile Handling Requirement</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Item Fragility Level</label>
                <select name="fragilityLevel" value={formData.fragilityLevel} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Normal Fragile">Normal Fragile</option>
                  <option value="Highly Fragile">Highly Fragile</option>
                  <option value="Extremely Sensitive">Extremely Sensitive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Handling Required</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Handle With Care', 'No Stacking', 'Shock Protection', 'Waterproof Packaging', 'Temperature Protection'].map((item) => (
                    <label key={item} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-medium cursor-pointer">
                      <input type="checkbox" name="handlingRequired" value={item} checked={formData.handlingRequired.includes(item)} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6. Packaging Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">6. Packaging Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Current Packaging</label>
                <select name="currentPackaging" value={formData.currentPackaging} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Customer Packed">Customer Packed</option>
                  <option value="Require Professional Packing Service">Require Professional Packing Service</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Packaging Required</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Bubble Wrap', 'Wooden Crate Packing', 'Foam Protection', 'Thermal Protection'].map((item) => (
                    <label key={item} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-medium cursor-pointer">
                      <input type="checkbox" name="packagingRequired" value={item} checked={formData.packagingRequired.includes(item)} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 7. Transport Requirement */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">7. Transport Requirement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Vehicle Type</label>
                <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Mini Truck">Mini Truck</option>
                  <option value="Pickup Van">Pickup Van</option>
                  <option value="Dedicated Vehicle">Dedicated Vehicle</option>
                  <option value="Air Cargo">Air Cargo</option>
                  <option value="Courier Service">Courier Service</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Service Priority</label>
                <select name="servicePriority" value={formData.servicePriority} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Normal">Normal</option>
                  <option value="Express">Express</option>
                  <option value="Same Day">Same Day</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* 8. Additional Information */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">8. Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Floor Pickup Available?</label>
                <select name="floorPickup" value={formData.floorPickup} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Lift Available?</label>
                <select name="liftAvailable" value={formData.liftAvailable} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Special Instructions</label>
                <input type="text" name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Example: Do not tilt, keep upright" />
              </div>
            </div>
          </div>

          {/* 9. Insurance */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">9. Insurance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Insurance Required?</label>
                <select name="insuranceRequired" value={formData.insuranceRequired} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Declared Value (₹)</label>
                <input type="number" name="declaredValue" value={formData.declaredValue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter amount in INR" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition shadow-lg shadow-orange-100 cursor-pointer flex items-center justify-center gap-2">
              <CheckCircle size={20} /> Submit Fragile Shipping Request
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FragileItemShippingForm;