const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// शिप रॉकेट ऑथेंटिकेशन
const getShiprocketToken = async () => {
    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: "pprabhu07@gmail.com",
        password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
    });
    return response.data.token;
};

// 1. सर्विसिबिलिटी चेक
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const { pickup, drop, weight } = req.body;
        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: { pickup_pincode: pickup, delivery_pincode: drop, weight: weight || 0.5 },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data?.message || err.message });
    }
});

// 2. ऑर्डर बुकिंग
app.post('/api/book-order', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const orderData = { 
            order_id: `AM_${Date.now()}`, 
            order_date: new Date().toISOString().split('T')[0],
            billing_customer_name: req.body.name,
            billing_address: req.body.address,
            billing_pincode: req.body.delivery_pincode,
            order_items: [{ name: req.body.product_name, sku: "SKU1", units: 1, selling_price: 100 }],
            weight: req.body.weight || 0.5 
        };
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, { 
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data?.message || err.message });
    }
});

// 3. हायपरलोकल रेट्स
app.post('/api/hyperlocal/shiprocket-quick-rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        // URL दुरुस्त केली आहे (Hyperlocal serviceability endpoint)
        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: { 
                pickup_pincode: req.body.pickupPincode,
                delivery_pincode: req.body.deliveryPincode,
                weight: req.body.weight || 0.5
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        console.error("Shiprocket API Error:", err.response?.data);
        res.status(500).json({ success: false, error: "Shiprocket API call failed" });
    }
});

module.exports = app;