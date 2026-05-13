const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// 1. Shiprocket Login (Tujhya Credentials sah)
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu07@gmail.com", // Tujha API Email
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ" // Tujha API Password
        });
        return response.data.token;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error("Shiprocket Authentication Failed");
    }
};

// 2. Full Order Booking Route (Screenshots pramane)
app.post('/api/book-order', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        
        const orderData = {
            order_id: `AM_${Date.now()}`, 
            order_date: new Date().toISOString().split('T')[0],
            pickup_location: "Primary", // DASHBOARD MADHE HE NAV CHECK KAR
            billing_customer_name: req.body.name, // Customer Name
            billing_last_name: "",
            billing_address: req.body.address, // Full Address
            billing_city: req.body.city,
            billing_pincode: req.body.delivery_pincode,
            billing_state: req.body.state,
            billing_country: "India",
            billing_phone: req.body.phone,
            shipping_is_billing: true,
            order_items: [
                {
                    name: req.body.product_name, // Product Name (Screenshot 1000232116.jpg)
                    sku: "SKU001",
                    units: parseInt(req.body.quantity) || 1,
                    selling_price: req.body.price, // Unit Price
                    discount: 0,
                    tax: 0
                }
            ],
            payment_method: req.body.cod === 1 ? "COD" : "Prepaid",
            sub_total: req.body.price,
            length: req.body.length || 10,
            breadth: req.body.breadth || 10,
            height: req.body.height || 10,
            weight: req.body.weight // Dead Weight (Screenshot 1000232115.jpg)
        };

        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        res.status(200).json({ success: true, booking: response.data });
    } catch (err) {
        console.error("Booking Error:", err.response?.data || err.message);
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});

module.exports = app;