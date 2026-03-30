const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose'); // नवीन: डेटाबेससाठी
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());

// ==========================================
// नवीन: MONGODB CONNECTION (Packers & Movers डेटासाठी)
// ==========================================
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/apnimanzil_pm';
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected for Packers & Movers!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// पॅकर्स अँड मूव्हर्ससाठी डेटा साचा (Schema)
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

// ==========================================
// 1. NIMBUSPOST AUTHENTICATION (Courier Section)
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
// 2. API: COURIER TRACKING
// ==========================================
app.get('/api/track/:awb', async (req, res) => {
    const token = await getNimbusToken();
    if (!token) return res.status(500).json({ error: "Authentication Failed with NimbusPost" });

    try {
        const response = await axios.get(`https://api.nimbuspost.com/v1/shipments/track/${req.params.awb}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Tracking Data Not Found" });
    }
});

// ==========================================
// 3. API: CREATE COURIER ORDER
// ==========================================
app.post('/api/create-order', async (req, res) => {
    const token = await getNimbusToken();
    if (!token) return res.status(500).json({ error: "Authentication Failed" });

    try {
        const response = await axios.post('https://api.nimbuspost.com/v1/shipments/create', req.body, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Order Creation Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Order creation failed on NimbusPost server" });
    }
});

// ==========================================
// 4. नवीन API: PACKERS & MOVERS LEAD POSTING
// ==========================================
app.post('/api/packers/post-lead', async (req, res) => {
    try {
        const newLead = new PackersLead(req.body);
        await newLead.save();
        res.status(201).json({ success: true, message: "Packers & Movers lead saved across India!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 5. नवीन API: PARTNER FETCH LEADS (सर्व शहरांसाठी)
// ==========================================
app.get('/api/packers/leads/:city', async (req, res) => {
    try {
        const city = req.params.city;
        // शहराप्रमाणे फिल्टर (उदा. बोरीवली टाकलं तर तिथल्या सर्व लीड्स मिळतील)
        const leads = await PackersLead.find({ fromCity: new RegExp(city, 'i') }).sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Apni Manzil Master Backend (Courier + Packers) is Live!");
});

// ==========================================
// 6. SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Apni Manzil Backend running on port ${PORT}`);
    console.log(`=========================================`);
});