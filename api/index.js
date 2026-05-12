const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
    mongoose.connect(mongoURI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.error("MongoDB Connection Error:", err));
}

// Shiprocket Login Function
async function getShiprocketToken() {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error("Shiprocket Login Failed:", error.response?.data || error.message);
        return null;
    }
}

// Rates Route
app.post('/api/shiprocket/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        if (!token) {
            return res.status(500).json({ error: "Shiprocket Authentication Failed" });
        }

        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: req.body,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Rates Fetching Error:", error.response?.data || error.message);
        res.status(500).json({ 
            error: "Failed to fetch rates", 
            details: error.response?.data || error.message 
        });
    }
});

module.exports = app;