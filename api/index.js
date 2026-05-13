const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu07@gmail.com",
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        });
        return response.data.token;
    } catch (error) {
        console.error("AUTH_ERROR:", error.response?.data || error.message);
        throw error;
    }
};

// Rates Route
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: req.body,
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.status(200).json({ success: true, rates: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});

// Order Booking Route
app.post('/api/book-order', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        // (Tu mashi dilela orderData ithe vapar)
        res.status(200).json({ success: true, message: "Order creation logic here" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});

module.exports = app;