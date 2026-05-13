const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// 1. Shiprocket Login Function (Tujha code)
const getShiprocketToken = async () => { ... };

// 2. Ha Route banva jo frontend call karel
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        // Shiprocket Serviceability API call yithe kara
        const shiprocketRes = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: req.body,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.json({ success: true, rates: shiprocketRes.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = app;