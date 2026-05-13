const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 1. Shiprocket Login Function (Direct Credentials Updated)
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu07@gmail.com", 
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        });
        return response.data.token;
    } catch (error) {
        // Log madhe kkharokhar kay chuktay te disel
        console.error("Shiprocket Login Error Details:", error.response?.data || error.message);
        throw new Error("Shiprocket Authentication Failed");
    }
};

// 2. Main Rates Route
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        
        const shiprocketRes = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: {
                pickup_pincode: req.body.pickup_pincode,
                delivery_pincode: req.body.delivery_pincode,
                weight: req.body.weight,
                cod: req.body.cod,
                length: req.body.length || 10,
                breadth: req.body.breadth || 10,
                height: req.body.height || 10
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });

        res.status(200).json({ 
            success: true, 
            rates: shiprocketRes.data 
        });
    } catch (err) {
        console.error("Detailed Backend Error:", err.response?.data || err.message);
        res.status(500).json({ 
            success: false, 
            message: "Backend Issue",
            error: err.response?.data || err.message 
        });
    }
});

// Vercel sathi he khup mavahtvache ahe
module.exports = app;