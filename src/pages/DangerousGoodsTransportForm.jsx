import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ShieldAlert, ArrowLeft, Send } from 'lucide-react';
import { sendWhatsAppNotification } from '../utils/whatsapp';

const DangerousGoodsTransportForm = () => {
  const navigate = useNavigate();
  const n8nUrl = "http://localhost:5678/webhook/apni-manzil-logistics";

  const [formData, setFormData] = useState({
    // 1. Customer Details
    companyName: '',
    contactPerson: '',
    mobileNumber: '',
    emailId: '',
    gstNumber: '',
    businessType: 'Manufacturer',

    // 2. Pickup Details
    pickupCompanyName: '',
    pickupAddress: '',
    city: '',
    state: '',
    pincode: '',
    pickupDateTime: '',

    // 3. Delivery Details
    receiverCompanyName: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPincode: '',

    // 4. Dangerous Goods Details
    materialName: '',
    unNumber: '',
    hazardClass: 'Class 3: Flammable Liquids',
    packingGroup: 'PG II (Medium Danger)',

    // 5. Shipment Details
    quantity: '',
    weight: '',
    packageType: 'Drum',
    numberOfPackages: '',

    // 6. Transport Requirement
    vehicleType: 'DG Approved Truck',
    transportMode: 'Road',

    // 7. Safety & Compliance
    msdsAvailable: 'Yes',
    hazardLabelAvailable: 'Yes',
    emergencyContact: '',
    specialHandling: '',

    // 8. Documents (File names / placeholders)
    documents: {
      msdsCert: null,
      invoice: null,
      ewayBill: null,
      packingDecl: null,
      dgDeclForm: null,
      licensePermit: null
    },

    // 9. Insurance
    insuranceRequired: 'Yes',
    declaredValue: '',

    // 10. Additional Notes
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [name]: files[0] ? files[0].name : null }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderId = "DG-" + Math.floor(Math.random() * 100000);
    const serviceTitle = "Dangerous Goods Transport (" + formData.materialName + ")";

    const bookingPayload = {
      orderId,
      serviceTitle,
      ...formData,
      timestamp: new Date().toISOString()
    };

    // 1. Send WhatsApp Notification
    try {
      sendWhatsAppNotification(
        formData.mobileNumber || "7378502356", 
        formData.contactPerson || "DG Client", 
        serviceTitle, 
        orderId
      );
    } catch (err) {
      console.error("WhatsApp error:", err);
    }

    // 2. Send to n8n Webhook
    try {
      await fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });
    } catch (error) {
      console.error("Webhook error:", error);
    }

    setLoading(false);
    alert(`Dangerous Goods Transport Request (ID: ${orderId}) submitted successfully!`);
    navigate('/special-logistics');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 relative">
          <button 
            onClick={() => navigate('/special-logistics')}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition mb-6 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Special Logistics
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Flame size={40} className="text-yellow-300" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Apni Manzil Secure Transport</p>
              <h1 className="text-3xl font-black tracking-tight">Dangerous Goods Transport Booking</h1>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* 1. Customer / Company Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2 flex items-center gap-2">
              <ShieldAlert className="text-orange-500" size={20} /> 1. Customer / Company Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Company Name *</label>
                <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Enter company name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Contact Person Name *</label>
                <input type="text" name="contactPerson" required value={formData.contactPerson} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="10-digit mobile number" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email ID</label>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="company@domain.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">GST Number</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="GST Number" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Business Type</label>
                <select name="businessType" value={formData.businessType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Chemical Company">Chemical Company</option>
                  <option value="Pharma Company">Pharma Company</option>
                  <option value="Industrial Supplier">Industrial Supplier</option>
                  <option value="Exporter / Importer">Exporter / Importer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Pickup Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">2. Pickup Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Pickup Company Name *</label>
                <input type="text" name="pickupCompanyName" required value={formData.pickupCompanyName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Warehouse / Facility Name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Pickup Date & Time</label>
                <input type="datetime-local" name="pickupDateTime" value={formData.pickupDateTime} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Pickup Address *</label>
                <textarea name="pickupAddress" required rows="2" value={formData.pickupAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Detailed street address" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">City *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">State *</label>
                <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="State" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Pincode *</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Pincode" />
              </div>
            </div>
          </div>

          {/* 3. Delivery Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">3. Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Receiver Company Name *</label>
                <input type="text" name="receiverCompanyName" required value={formData.receiverCompanyName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Receiver Company" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Delivery Address *</label>
                <textarea name="deliveryAddress" required rows="2" value={formData.deliveryAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Destination address" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">City *</label>
                <input type="text" name="deliveryCity" required value={formData.deliveryCity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">State *</label>
                <input type="text" name="deliveryState" required value={formData.deliveryState} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="State" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Pincode *</label>
                <input type="text" name="deliveryPincode" required value={formData.deliveryPincode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Pincode" />
              </div>
            </div>
          </div>

          {/* 4. Dangerous Goods Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">4. Dangerous Goods Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Material Name *</label>
                <input type="text" name="materialName" required value={formData.materialName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Chemical / Substance Name" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">UN Number *</label>
                <input type="text" name="unNumber" required value={formData.unNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="e.g. UN1263" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Hazard Class</label>
                <select name="hazardClass" value={formData.hazardClass} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Class 1: Explosives">Class 1: Explosives</option>
                  <option value="Class 2: Gases">Class 2: Gases</option>
                  <option value="Class 3: Flammable Liquids">Class 3: Flammable Liquids</option>
                  <option value="Class 4: Flammable Solids">Class 4: Flammable Solids</option>
                  <option value="Class 5: Oxidizing Substances">Class 5: Oxidizing Substances</option>
                  <option value="Class 6: Toxic / Infectious Substances">Class 6: Toxic / Infectious Substances</option>
                  <option value="Class 7: Radioactive Material">Class 7: Radioactive Material</option>
                  <option value="Class 8: Corrosive Substances">Class 8: Corrosive Substances</option>
                  <option value="Class 9: Miscellaneous Dangerous Goods">Class 9: Miscellaneous Dangerous Goods</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Packing Group</label>
                <select name="packingGroup" value={formData.packingGroup} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="PG I (High Danger)">PG I (High Danger)</option>
                  <option value="PG II (Medium Danger)">PG II (Medium Danger)</option>
                  <option value="PG III (Low Danger)">PG III (Low Danger)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Shipment Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">5. Shipment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Quantity *</label>
                <input type="text" name="quantity" required value={formData.quantity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="e.g. 50 Units" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Weight (KG / Ton) *</label>
                <input type="text" name="weight" required value={formData.weight} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="e.g. 1500 KG" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Package Type</label>
                <select name="packageType" value={formData.packageType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Drum">Drum</option>
                  <option value="Cylinder">Cylinder</option>
                  <option value="Tank">Tank</option>
                  <option value="Box">Box</option>
                  <option value="Pallet">Pallet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Number of Packages *</label>
                <input type="number" name="numberOfPackages" required value={formData.numberOfPackages} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="e.g. 10" />
              </div>
            </div>
          </div>

          {/* 6. Transport Requirement */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">6. Transport Requirement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Vehicle Type Required</label>
                <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="DG Approved Truck">DG Approved Truck</option>
                  <option value="Tanker">Tanker</option>
                  <option value="Container Truck">Container Truck</option>
                  <option value="Reefer Vehicle">Reefer Vehicle (if required)</option>
                  <option value="Special Vehicle">Special Vehicle</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Transport Mode</label>
                <select name="transportMode" value={formData.transportMode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Road">Road</option>
                  <option value="Air">Air</option>
                  <option value="Rail">Rail</option>
                </select>
              </div>
            </div>
          </div>

          {/* 7. Safety & Compliance */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">7. Safety & Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">MSDS Available?</label>
                <select name="msdsAvailable" value={formData.msdsAvailable} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Hazard Label Available?</label>
                <select name="hazardLabelAvailable" value={formData.hazardLabelAvailable} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Emergency Contact Number</label>
                <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Emergency contact" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Special Handling Instructions</label>
                <input type="text" name="specialHandling" value={formData.specialHandling} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Any specific instructions" />
              </div>
            </div>
          </div>

          {/* 8. Documents Upload */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">8. Documents Upload</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">MSDS Certificate</label>
                <input type="file" name="msdsCert" onChange={handleFileChange} className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">Invoice</label>
                <input type="file" name="invoice" onChange={handleFileChange} className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">E-Way Bill</label>
                <input type="file" name="ewayBill" onChange={handleFileChange} className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">Packing Declaration</label>
                <input type="file" name="packingDecl" onChange={handleFileChange} className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">DG Declaration Form</label>
                <input type="file" name="dgDeclForm" onChange={handleFileChange} className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">License / Permit Docs</label>
                <input type="file" name="licensePermit" onChange={handleFileChange} className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
              </div>
            </div>
          </div>

          {/* 9. Insurance */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">9. Insurance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Insurance Required</label>
                <select name="insuranceRequired" value={formData.insuranceRequired} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Declared Value ₹</label>
                <input type="number" name="declaredValue" value={formData.declaredValue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Enter amount in ₹" />
              </div>
            </div>
          </div>

          {/* 10. Additional Notes */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800 border-b pb-2">10. Additional Notes</h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Special Instructions</label>
              <textarea name="additionalNotes" rows="3" value={formData.additionalNotes} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Write any other notes here..." />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 transition shadow-xl shadow-orange-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "Submitting Request..." : <><Send size={16} /> SUBMIT DG TRANSPORT REQUEST</>}
          </button>

        </form>
      </div>
    </div>
  );
};

export default DangerousGoodsTransportForm;