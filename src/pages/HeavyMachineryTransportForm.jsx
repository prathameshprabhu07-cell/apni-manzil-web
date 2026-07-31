import React, { useState } from 'react';
import { HardHat, Truck, ShieldCheck, CheckCircle } from 'lucide-react';

const HeavyMachineryTransportForm = () => {
  const [formData, setFormData] = useState({
    // 1. Customer Details
    fullName: '',
    contactPersonName: '',
    mobileNumber: '',
    emailId: '',
    gstNumber: '',
    businessType: 'Manufacturer',

    // 2. Pickup Location Details
    pickupCompanyName: '',
    pickupAddress: '',
    city: '',
    state: '',
    pincode: '',
    pickupContactPerson: '',
    pickupDateRequired: '',

    // 3. Delivery Location Details
    receiverCompanyName: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',
    deliveryContactPerson: '',

    // 4. Machinery Details
    machineCategory: 'CNC Machine',
    otherCategory: '', // 'Other' निवडल्यास लिहण्यासाठी इनपुट
    machineName: '',
    manufacturerName: '',
    quantity: '',
    machineWeight: '',
    length: '',
    width: '',
    height: '',
    machineValue: '',

    // 5. Loading & Unloading Requirement
    loadingMethod: 'Crane Required',
    unloadingMethod: 'Crane Required',

    // 6. Transport Requirement
    vehicleRequired: 'Open Truck',
    vehicleCapacity: '5 Ton',

    // 7. Route & Permission Details
    routeType: 'Within City',
    needPermit: 'No',
    specialPermission: [],

    // 8. Packaging & Safety
    packagingRequired: 'Wooden Packing',
    safetyRequirement: [],

    // 9. Insurance Details
    insuranceRequired: 'No',
    declaredValue: '',

    // 10. Special Instructions
    customerNotes: ''
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
    console.log("Heavy Machinery Booking Data:", formData);
    alert("Heavy Machinery Transport booking request submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 text-center">
          <h1 className="text-3xl font-black tracking-tight flex items-center justify-center gap-3">
            <HardHat size={36} className="text-yellow-400" />
            Heavy Machinery Transport Booking
          </h1>
          <p className="text-slate-300 mt-2 font-medium">Safe Transport of Heavy Equipment, Industrial Plants & Machinery</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* 1. Customer Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">1. Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Full Name / Company Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter company or full name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Contact Person Name *</label>
                <input type="text" name="contactPersonName" required value={formData.contactPersonName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Contact person name" />
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
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">GST Number</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter GST number" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Business Type</label>
                <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Factory">Factory</option>
                  <option value="Construction Company">Construction Company</option>
                  <option value="Industrial Supplier">Industrial Supplier</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Pickup Location Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">2. Pickup Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Company Name *</label>
                <input type="text" name="pickupCompanyName" required value={formData.pickupCompanyName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Pickup company name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pickup Date Required</label>
                <input type="date" name="pickupDateRequired" value={formData.pickupDateRequired} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" />
              </div>
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
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pickup Contact Person *</label>
                <input type="text" name="pickupContactPerson" required value={formData.pickupContactPerson} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Name and Phone" />
              </div>
            </div>
          </div>

          {/* 3. Delivery Location Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">3. Delivery Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Receiver Company Name *</label>
                <input type="text" name="receiverCompanyName" required value={formData.receiverCompanyName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Receiver company name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Delivery Contact Person *</label>
                <input type="text" name="deliveryContactPerson" required value={formData.deliveryContactPerson} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Name and Phone" />
              </div>
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
            </div>
          </div>

          {/* 4. Machinery Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">4. Machinery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Machine Category *</label>
                <select name="machineCategory" value={formData.machineCategory} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="CNC Machine">CNC Machine</option>
                  <option value="Industrial Equipment">Industrial Equipment</option>
                  <option value="Generator">Generator</option>
                  <option value="Lathe Machine">Lathe Machine</option>
                  <option value="Press Machine">Press Machine</option>
                  <option value="Construction Equipment">Construction Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.machineCategory === 'Other' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-orange-600 mb-2">Please Specify Other Category *</label>
                  <input type="text" name="otherCategory" required value={formData.otherCategory} onChange={handleChange} className="w-full bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-orange-500" placeholder="Specify machine category" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Machine Name / Model *</label>
                <input type="text" name="machineName" required value={formData.machineName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Machine name or model" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Manufacturer Name</label>
                <input type="text" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Manufacturer brand" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Quantity *</label>
                <input type="number" name="quantity" required value={formData.quantity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Quantity" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Machine Weight (KG / Ton) *</label>
                <input type="text" name="machineWeight" required value={formData.machineWeight} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="e.g. 5 Ton or 5000 KG" />
              </div>

              {/* Dimensions */}
              <div className="md:col-span-2 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Length (Feet)</label>
                  <input type="text" name="length" value={formData.length} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Length in ft" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Width (Feet)</label>
                  <input type="text" name="width" value={formData.width} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Width in ft" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Height (Feet)</label>
                  <input type="text" name="height" value={formData.height} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Height in ft" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Machine Value (₹)</label>
                <input type="number" name="machineValue" value={formData.machineValue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Enter machine value in INR" />
              </div>
            </div>
          </div>

          {/* 5. Loading & Unloading Requirement */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">5. Loading & Unloading Requirement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Loading Method</label>
                <select name="loadingMethod" value={formData.loadingMethod} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Crane Required">Crane Required</option>
                  <option value="Forklift Required">Forklift Required</option>
                  <option value="Hydra Required">Hydra Required</option>
                  <option value="Customer Arrangement Available">Customer Arrangement Available</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Unloading Method</label>
                <select name="unloadingMethod" value={formData.unloadingMethod} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Crane Required">Crane Required</option>
                  <option value="Forklift Required">Forklift Required</option>
                  <option value="Hydra Required">Hydra Required</option>
                  <option value="Customer Arrangement Available">Customer Arrangement Available</option>
                </select>
              </div>
            </div>
          </div>

          {/* 6. Transport Requirement */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">6. Transport Requirement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Vehicle Required</label>
                <select name="vehicleRequired" value={formData.vehicleRequired} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Open Truck">Open Truck</option>
                  <option value="Container Truck">Container Truck</option>
                  <option value="Trailer">Trailer</option>
                  <option value="Hydraulic Axle Trailer">Hydraulic Axle Trailer</option>
                  <option value="Low Bed Trailer">Low Bed Trailer</option>
                  <option value="Special Vehicle">Special Vehicle</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Vehicle Capacity</label>
                <select name="vehicleCapacity" value={formData.vehicleCapacity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="5 Ton">5 Ton</option>
                  <option value="10 Ton">10 Ton</option>
                  <option value="20 Ton">20 Ton</option>
                  <option value="40 Ton+">40 Ton+</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>
          </div>

          {/* 7. Route & Permission Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">7. Route & Permission Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Route Type</label>
                  <select name="routeType" value={formData.routeType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                    <option value="Within City">Within City</option>
                    <option value="State Transport">State Transport</option>
                    <option value="Pan India">Pan India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Need Permit?</label>
                  <select name="needPermit" value={formData.needPermit} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Special Permission Required</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Oversize Cargo Permit', 'Heavy Load Permit'].map((item) => (
                    <label key={item} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-medium cursor-pointer">
                      <input type="checkbox" name="specialPermission" value={item} checked={formData.specialPermission.includes(item)} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 8. Packaging & Safety */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">8. Packaging & Safety</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Packaging Required</label>
                <select name="packagingRequired" value={formData.packagingRequired} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500">
                  <option value="Wooden Packing">Wooden Packing</option>
                  <option value="Waterproof Cover">Waterproof Cover</option>
                  <option value="Anti-Rust Protection">Anti-Rust Protection</option>
                  <option value="No Packing Required">No Packing Required</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Safety Requirement</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Tie Down', 'Shock Protection', 'Special Handling'].map((item) => (
                    <label key={item} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-medium cursor-pointer">
                      <input type="checkbox" name="safetyRequirement" value={item} checked={formData.safetyRequirement.includes(item)} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 9. Insurance Details */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">9. Insurance Details</h2>
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

          {/* 11. Special Instructions */}
          <div>
            <h2 className="text-xl font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">11. Special Instructions</h2>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Customer Notes</label>
              <textarea name="customerNotes" rows="3" value={formData.customerNotes} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-blue-500" placeholder="Any specific instructions regarding loading, route, or timing..."></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition shadow-lg shadow-orange-100 cursor-pointer flex items-center justify-center gap-2">
              <CheckCircle size={20} /> SUBMIT REQUEST
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HeavyMachineryTransportForm;