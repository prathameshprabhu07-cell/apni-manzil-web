const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// 1. NIMBUSPOST AUTHENTICATION (टोकन मिळवण्यासाठी)
// ==========================================
const getNimbusToken = async () => {
    try {
        const response = await axios.post('https://api.nimbuspost.com/v1/users/login', {
            email: process.env.NIMBUS_EMAIL,
            password: process.env.NIMBUS_PASSWORD
        });
        // लॉगिन यशस्वी झाल्यास टोकन परत करतो
        return response.data.data; 
    } catch (error) {
        console.error("Nimbus Login Error:", error.response ? error.response.data : error.message);
        return null;
    }
};

// ==========================================
// 2. API: TRACKING (पार्सल ट्रॅक करण्यासाठी)
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
// 3. API: CREATE ORDER (नवीन ऑर्डर बुक करण्यासाठी)
// ==========================================
app.post('/api/create-order', async (req, res) => {
    const token = await getNimbusToken();
    if (!token) return res.status(500).json({ error: "Authentication Failed" });

    try {
        // req.body मध्ये आपण React मधून पाठवलेला डेटा असेल
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
// 4. SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Apni Manzil Backend running on port ${PORT}`);
    console.log(`=========================================`);
});