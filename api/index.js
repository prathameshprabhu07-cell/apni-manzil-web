const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose'); // एरर टाळण्यासाठी हे असणे गरजेचे आहे
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// १. Shiprocket Token Function
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu2611@gmail.com",
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        });
        return response.data.token;
    } catch (error) {
        console.error("SHIPROCKET AUTH ERROR:", error.response?.data || error.message);
        return null;
    }
};

// २. Rates API
app.post('/api/shiprocket/rates', async (req, res) => {
    try {
        const { pickup_pincode, delivery_pincode, weight, length, breadth, height, cod } = req.body;
        
        const token = await getShiprocketToken();
        if (!token) return res.status(401).json({ success: false, message: "Shiprocket Login Failed" });

        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: {
                pickup_postcode: pickup_pincode,
                delivery_postcode: delivery_pincode,
                weight: parseFloat(weight),
                cod: cod || 0,
                length: parseInt(length) || 10,
                breadth: parseInt(breadth) || 10,
                height: parseInt(height) || 10
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });

        res.json({ success: true, rates: response.data });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.response?.data?.message || "Internal Server Error" 
        });
    }
});

// Vercel साठी Export
module.exports = app;

// Local testing साठी (Optional)
if (process.env.NODE_ENV !== 'production') {
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}