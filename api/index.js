const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// १. CORS Configuration (Vercel साठी हे महत्त्वाचे आहे)
app.use(cors()); 
app.use(express.json());

// २. MONGODB CONNECTION
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/apnimanzil_pm';
// Vercel वर वारंवार कनेक्शन होऊ नये म्हणून ही अट घातली आहे
if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI)
      .then(() => console.log("✅ MongoDB Connected"))
      .catch(err => console.error("❌ MongoDB Error:", err));
}

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

// ३. SHIPROCKET AUTH
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

// ४. ROUTES (Vercel वर 'POST' नीट चालण्यासाठी हे असेच हवे)
app.post('/api/shiprocket/rates', async (req, res) => {
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

// ५. EXPORT FOR VERCEL (सर्वात महत्त्वाचे)
// Vercel वर 'app.listen' काम करत नाही, म्हणून module.exports हवेच.
module.exports = app;

// स्थानिक चाचणीसाठी (Local Testing)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}