const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// MongoDB Connection Logic
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

// Shiprocket Auth
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

// Routes
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
        res.status(500).json({ success: false, message: "Rates fetching failed" });
    }
});

// Export for Vercel
module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}