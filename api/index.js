const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
// CORS मध्ये तुझ्या मूळ वेबसाईटची लिंक इथे टाक, उदा. https://apni-manzil-web.vercel.app
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    credentials: true
}));

// ===================================================
// SHIPROCKET LOGISTICS INTEGRATION
// ===================================================

const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu07@gmail.com",
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        });
        return response.data.token;
    } catch (error) {
        console.error("❌ SHIPROCKET_AUTH_ERROR:", error.response?.data || error.message);
        throw new Error("Shiprocket Auth Failed");
    }
};

// 1. Rates Route
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const pickupPincode = req.body.pickup_pincode || req.body.pickup;
        const deliveryPincode = req.body.delivery_pincode || req.body.drop;
        const packageWeight = req.body.weight || 0.5;

        const shiprocketRes = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: { pickup_pincode: Number(pickupPincode), delivery_pincode: Number(deliveryPincode), weight: parseFloat(packageWeight) },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        res.status(200).json({ success: true, rates: shiprocketRes.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});

// 2. Order Booking Route
app.post('/api/book-order', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const orderData = { 
            order_id: `AM_${Date.now()}`, 
            order_date: new Date().toISOString().split('T')[0],
            billing_customer_name: req.body.name || "Customer",
            billing_address: req.body.address || "Mumbai",
            billing_pincode: Number(req.body.delivery_pincode),
            order_items: [{ name: req.body.product_name || "Product", sku: "SKU1", units: 1, selling_price: 100 }],
            weight: parseFloat(req.body.weight) || 0.5 
        };
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, { 
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        res.status(200).json({ success: true, booking: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});

// 3. HYPERLOCAL RATES
app.post('/api/hyperlocal/shiprocket-quick-rates', async (req, res) => {
    const { pickupPincode, deliveryPincode, weight, packageType } = req.body;
    try {
        const token = await getShiprocketToken();
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/courier/serviceability/local', {
            pickup_pincode: Number(pickupPincode),
            delivery_pincode: Number(deliveryPincode),
            weight: parseFloat(weight) || 0.5,
            commodity_type: packageType || "Parcel"
        }, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: "Shiprocket API failed." });
    }
});

// Vercel साठी export आवश्यक आहे
module.exports = app;