const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Shiprocket Token Function
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu2611@gmail.com",
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        });
        return response.data.token;
    } catch (error) {
        return null;
    }
};

// EXACT ROUTE: आता हा /api/rates असा असेल
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        if (!token) return res.status(401).json({ success: false, message: "Auth Failed" });

        const { pickup_pincode, delivery_pincode, weight, length, breadth, height, cod } = req.body;

        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: {
                pickup_postcode: pickup_pincode,
                delivery_postcode: delivery_pincode,
                weight: parseFloat(weight) || 0.5,
                cod: cod || 0,
                length: parseInt(length) || 10,
                breadth: parseInt(breadth) || 10,
                height: parseInt(height) || 10
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });

        res.json({ success: true, rates: response.data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Shiprocket Error" });
    }
});

module.exports = app;