const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// १. CORS & Middleware
app.use(cors()); 
app.use(express.json());

// २. MONGODB CONNECTION (Serverless Optimization)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/apnimanzil_pm';
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Error:", err);
    }
};

// --- मॉडेल्स ---
const PackersLead = mongoose.models.PackersLead || mongoose.model('PackersLead', new mongoose.Schema({
    customerName: String, customerPhone: String, fromCity: String, toCity: String,
    houseType: String, moveDate: Date, status: { type: String, default: 'New' },
    createdAt: { type: Date, default: Date.now }
}));

const Partner = mongoose.models.Partner || mongoose.model('Partner', new mongoose.Schema({
    ownerName: String, companyName: String, phone: { type: String, unique: true },
    email: String, businessType: String, panNumber: String, gstNumber: String,
    serviceTypes: [String], cities: [String], vehicleTypes: [String], workerCount: Number,
    providesInsurance: String, isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}));

// ३. SHIPROCKET AUTH FUNCTION
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error("Shiprocket Login Error:", error.response?.data || error.message);
        return null;
    }
};

// ४. ROUTES

// --- A. GET RATES ---
app.post('/api/shiprocket/rates', async (req, res) => {
    await connectDB();
    const token = await getShiprocketToken();
    if (!token) return res.status(500).json({ success: false, message: "Shiprocket Login Failed" });

    try {
        const { pickup_pincode, delivery_pincode, weight, cod } = req.body;
        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: {
                pickup_postcode: pickup_pincode,
                delivery_postcode: delivery_pincode,
                weight: weight,
                cod: cod 
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json({ success: true, rates: response.data });
    } catch (error) {
        console.error("Shiprocket Rate API Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Rates fetching failed" });
    }
});

// --- B. CREATE ORDER ---
app.post('/api/shiprocket/create-order', async (req, res) => {
    await connectDB();
    const token = await getShiprocketToken();
    if (!token) return res.status(500).json({ success: false, message: "Shiprocket Authentication Failed" });

    try {
        const d = req.body;
        const orderPayload = {
            order_id: `ORDER-${Date.now()}`,
            order_date: new Date().toISOString().split('T')[0],
            pickup_location: "Primary",
            billing_customer_name: d.receiverName,
            billing_last_name: "",
            billing_address: d.receiverAddress,
            billing_city: "City",
            billing_pincode: d.dropPincode,
            billing_state: "State",
            billing_country: "India",
            billing_email: "customer@gmail.com",
            billing_phone: d.receiverPhone,
            shipping_is_billing: true,
            order_items: [{
                name: d.parcelType || "Parcel",
                sku: "SKU001",
                units: 1,
                selling_price: d.shipping_cost || 500
            }],
            payment_method: d.paymentMode === 'COD' ? 'COD' : 'Prepaid',
            sub_total: d.shipping_cost || 500,
            length: 10, breadth: 10, height: 10, weight: d.weight
        };

        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderPayload, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json({ success: true, awb_code: response.data.awb_code, order_id: response.data.order_id });
    } catch (error) {
        console.error("Shiprocket Booking Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Booking process failed" });
    }
});

// ५. EXPORT FOR VERCEL
module.exports = app;

// Local testing
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}