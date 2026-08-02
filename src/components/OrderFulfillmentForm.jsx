import React, { useState } from 'react';

const OrderFulfillmentForm = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Fulfillment Data:", formData);
    alert('Order Fulfillment Inquiry Submitted Successfully!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '25px', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 📦 Order Fulfillment Banner Image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
          alt="Order Fulfillment Warehouse" 
          style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
        />
        <h2 style={{ color: '#2c3e50', margin: '10px 0' }}>📦 Order Fulfillment Services</h2>
        <p style={{ color: '#7f8c8d' }}>Scale your e-commerce business with our end-to-end warehousing and fulfillment solutions.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        
        {/* Company Name */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enter Company Name" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Contact Person */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Contact Person</label>
          <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="Your Name" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Mobile Number */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Mobile Number</label>
          <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required placeholder="9876543210" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Email */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="customer@company.com" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Pickup/Warehouse Address */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Pickup/Warehouse Address</label>
          <textarea name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} required rows="2" placeholder="Full warehouse address with Pincode" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}></textarea>
        </div>

        {/* Monthly Orders */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Monthly Orders</label>
          <select name="monthlyOrders" value={formData.monthlyOrders} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="100">100+</option>
            <option value="500">500+</option>
            <option value="1000">1000+</option>
            <option value="5000">5000+</option>
          </select>
        </div>

        {/* Product Category */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Product Category</label>
          <input type="text" name="productCategory" value={formData.productCategory} onChange={handleChange} placeholder="e.g. Apparel, Electronics" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* SKU Count */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>SKU (How many unique products)</label>
          <input type="text" name="skuCount" value={formData.skuCount} onChange={handleChange} placeholder="e.g. 50 SKUs" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Average Order Weight */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Average Order Weight</label>
          <input type="text" name="avgWeight" value={formData.avgWeight} onChange={handleChange} placeholder="e.g. 500g" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Average Parcel Dimensions */}
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Average Parcel Dimensions (L x B x H)</label>
          <input type="text" name="avgDimensions" value={formData.avgDimensions} onChange={handleChange} placeholder="e.g. 10 x 10 x 10 cm" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* Yes/No Dropdowns */}
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Packaging Required?</label>
          <select name="packagingRequired" value={formData.packagingRequired} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Label Printing Required?</label>
          <select name="labelPrinting" value={formData.labelPrinting} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Invoice Printing Required?</label>
          <select name="invoicePrinting" value={formData.invoicePrinting} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>COD Required?</label>
          <select name="codRequired" value={formData.codRequired} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Daily Pickup Required?</label>
          <select name="dailyPickup" value={formData.dailyPickup} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Submit Button */}
        <div style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '15px' }}>
          <button type="submit" style={{ background: '#27ae60', color: 'white', border: 'none', padding: '12px 30px', fontSize: '16px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
            Submit Fulfillment Request
          </button>
        </div>

      </form>
    </div>
  );
};

export default OrderFulfillmentForm;