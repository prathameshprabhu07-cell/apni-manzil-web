const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());

// ==========================================
// १. MONGODB CONNECTION
// ==========================================
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/apnimanzil_pm';
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- मॉडेल्स (Models) ---
const PackersLead = mongoose.model('PackersLead', new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  fromCity: String,
  toCity: String,
  houseType: String,
  moveDate: Date,
  status: { type: String, default: 'New' },
  createdAt: { type: Date, default: Date.now }
}));

const Partner = mongoose.model('Partner', new mongoose.Schema({
  ownerName: String,
  companyName: String,
  phone: { type: String, unique: true },
  email: String,
  businessType: String,
  panNumber: String,
  gstNumber: String,
  serviceTypes: [String],
  cities: [String],
  vehicleTypes: [String],
  workerCount: Number,
  providesInsurance: String,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}));

// ==========================================
// २. SHIPROCKET AUTHENTICATION & RATES
// ==========================================

const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error("Shiprocket Login Error:", error.response ? error.response.data : error.message);
        return null;
    }
};

// Frontend sathi mukhya route (Rate check karnyasathi)
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
        console.error("Shiprocket Rate API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: "Rates fetching failed" });
    }
});

// ==========================================
// ३. NIMBUSPOST (Tracking & Other)
// ==========================================
const getNimbusToken = async () => {
    try {
        const response = await axios.post('https://api.nimbuspost.com/v1/users/login', {
            email: process.env.NIMBUS_EMAIL,
            password: process.env.NIMBUS_PASSWORD
        });
        return response.data.data; 
    } catch (error) {
        return null;
    }
};

app.get('/api/track/:awb', async (req, res) => {
    const token = await getNimbusToken();
    if (!token) return res.status(500).json({ error: "Authentication Failed" });
    try {
        const response = await axios.get(`https://api.nimbuspost.com/v1/shipments/track/${req.params.awb}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) { res.status(500).json({ error: "Tracking Error" }); }
});

// ==========================================
// ४. PACKERS & MOVERS & PARTNERS
// ==========================================
app.post('/api/packers/post-lead', async (req, res) => {
    try {
        const newLead = new PackersLead(req.body);
        await newLead.save();
        res.status(201).json({ success: true, message: "Lead saved successfully!" });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.post('/api/partners/register', async (req, res) => {
    try {
        const newPartner = new Partner(req.body);
        await newPartner.save();
        res.status(201).json({ success: true, message: "Partner registered!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Apni Manzil Master Backend is Live with Shiprocket & Nimbus!");
});

// ==========================================
// ५. SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Apni Manzil Backend running on port ${PORT}`);
    console.log(`=========================================`);
});