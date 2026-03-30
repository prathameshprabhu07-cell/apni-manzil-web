const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose'); // डेटाबेससाठी
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

// ग्राहक लीड्ससाठी (Customer Leads)
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

// नवीन: पार्टनर नोंदणीसाठी (Partner Registration - 11 Steps)
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
  isVerified: { type: Boolean, default: false }, // मॅन्युअल अप्रूव्हलसाठी
  createdAt: { type: Date, default: Date.now }
}));

// ==========================================
// २. NIMBUSPOST AUTHENTICATION (Courier Section)
// ==========================================
const getNimbusToken = async () => {
    try {
        const response = await axios.post('https://api.nimbuspost.com/v1/users/login', {
            email: process.env.NIMBUS_EMAIL,
            password: process.env.NIMBUS_PASSWORD
        });
        return response.data.data; 
    } catch (error) {
        console.error("Nimbus Login Error:", error.response ? error.response.data : error.message);
        return null;
    }
};

// ==========================================
// ३. API: COURIER (Tracking & Order)
// ==========================================
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

app.post('/api/create-order', async (req, res) => {
    const token = await getNimbusToken();
    if (!token) return res.status(500).json({ error: "Authentication Failed" });
    try {
        const response = await axios.post('https://api.nimbuspost.com/v1/shipments/create', req.body, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) { res.status(500).json({ error: "Order Creation Failed" }); }
});

// ==========================================
// ४. API: PACKERS & MOVERS (Customer Leads)
// ==========================================
app.post('/api/packers/post-lead', async (req, res) => {
    try {
        const newLead = new PackersLead(req.body);
        await newLead.save();
        res.status(201).json({ success: true, message: "Lead saved successfully!" });
    } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.get('/api/packers/leads/:city', async (req, res) => {
    try {
        const leads = await PackersLead.find({ fromCity: new RegExp(req.params.city, 'i') }).sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// ५. नवीन API: PARTNER REGISTRATION (पार्टनर नोंदणी)
// ==========================================
app.post('/api/partners/register', async (req, res) => {
    try {
        const newPartner = new Partner(req.body);
        await newPartner.save();
        res.status(201).json({ success: true, message: "Partner registered! Waiting for approval." });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: "Mobile number already exists!" });
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Apni Manzil Master Backend is Live!");
});

// ==========================================
// ६. SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Apni Manzil Backend running on port ${PORT}`);
    console.log(`=========================================`);
});