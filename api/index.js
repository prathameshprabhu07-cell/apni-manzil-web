const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Connectivity sathi mavahtvache
const app = express();

app.use(express.json());
app.use(cors()); // Frontend sobat connect honyasathi

// 1. Shiprocket Login (Updated with Headers)
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu07@gmail.com",
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.token;
    } catch (error) {
        console.error("SHIPROCKET_AUTH_ERROR:", error.response?.data || error.message);
        throw new Error("Shiprocket Authentication Failed");
    }
};

// 2. Full Order Booking Route
app.post('/api/book-order', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        
        const orderData = {
            order_id: `AM_${Date.now()}`, 
            order_date: new Date().toISOString().split('T')[0],
            pickup_location: "Primary", 
            billing_customer_name: req.body.name, 
            billing_last_name: "",
            billing_address: req.body.address, 
            billing_city: req.body.city,
            billing_pincode: req.body.delivery_pincode,
            billing_state: req.body.state,
            billing_country: "India",
            billing_phone: req.body.phone,
            shipping_is_billing: true,
            order_items: [
                {
                    name: req.body.product_name || "Konkani Product", 
                    sku: `SKU_${Date.now()}`,
                    units: parseInt(req.body.quantity) || 1,
                    selling_price: req.body.price, 
                    discount: 0,
                    tax: 0
                }
            ],
            payment_method: req.body.cod === 1 ? "COD" : "Prepaid",
            sub_total: req.body.price,
            length: parseFloat(req.body.length) || 10,
            breadth: parseFloat(req.body.breadth) || 10,
            height: parseFloat(req.body.height) || 10,
            weight: parseFloat(req.body.weight)
        };

        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ success: true, booking: response.data });
    } catch (err) {
        console.error("Booking Error Detail:", err.response?.data || err.message);
        res.status(500).json({ 
            success: false, 
            message: "Booking Failed",
            error: err.response?.data || err.message 
        });
    }
});

// Vercel sathi export garjeche ahe
module.exports = app;