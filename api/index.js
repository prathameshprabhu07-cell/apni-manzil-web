const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// १. Middleware
app.use(cors()); 
app.use(express.json());

// २. MONGODB CONNECTION (Serverless Optimized)
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    // जर URI नसेल तर कनेक्ट करण्याचा प्रयत्न करू नका
    if (!mongoURI) {
        console.warn("⚠️ MONGODB_URI missing in Environment Variables.");
        return;
    }
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
    }
};

// ३. SHIPROCKET AUTH FUNCTION
const getShiprocketToken = async () => {
    try {
        console.log("Attempting Shiprocket Login...");
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error("❌ Shiprocket Auth Failed:", error.response?.data || error.message);
        return null;
    }
};

// ४. ROUTES

// A. GET RATES (Courier Serviceability)
app.post('/api/shiprocket/rates', async (req, res) => {
    try {
        await connectDB();
        
        const { pickup_pincode, delivery_pincode, weight, cod } = req.body;
        
        if (!pickup_pincode || !delivery_pincode || !weight) {
            return res.status(400).json({ success: false, message: "Missing required fields (Pincodes or Weight)" });
        }

        const token = await getShiprocketToken();
        if (!token) {
            return res.status(500).json({ success: false, message: "Shiprocket Login Failed. Check Env Variables." });
        }

        console.log(`Fetching rates for: ${pickup_pincode} to ${delivery_pincode}`);

        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: {
                pickup_postcode: pickup_pincode,
                delivery_postcode: delivery_pincode,
                weight: weight,
                cod: cod || 0 
            },
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ success: true, rates: response.data });

    } catch (error) {
        console.error("❌ Shiprocket API Error:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || "Internal Server Error in fetching rates";
        res.status(error.response?.status || 500).json({ 
            success: false, 
            message: errorMessage,
            details: error.response?.data || null 
        });
    }
});

// B. CREATE ORDER
app.post('/api/shiprocket/create-order', async (req, res) => {
    try {
        await connectDB();
        const token = await getShiprocketToken();
        if (!token) return res.status(500).json({ success: false, message: "Auth Failed" });

        const orderData = req.body;
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error("❌ Booking Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Booking Failed", details: error.response?.data });
    }
});

// ५. EXPORT FOR VERCEL
module.exports = app;

// Local Testing
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
}