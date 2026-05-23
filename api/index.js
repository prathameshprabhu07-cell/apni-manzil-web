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

// 1. सर्विसिबिलिटी चेक (Domestic)
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const { drop, weight, length, breadth, height, cod } = req.body;
        
        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: { 
                pickup_pincode: '400092', 
                delivery_pincode: String(drop), 
                weight: weight || 0.5,
                length: length || 10,
                breadth: breadth || 10,
                height: height || 10,
                cod: cod || 0
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // जर कुरिअर उपलब्ध नसतील तर फ्रंटएंडला स्पष्ट मेसेज पाठवू
        if (!response.data.data.available_courier_companies || response.data.data.available_courier_companies.length === 0) {
            return res.status(200).json({ success: false, message: "या पिनकोडसाठी कोणतीही कुरिअर सेवा उपलब्ध नाही." });
        }
        
        res.status(200).json({ success: true, rates: response.data.data });
    } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        res.status(500).json({ success: false, error: "API द्वारे माहिती मिळवण्यात अडचण येत आहे." });
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
            billing_pincode: String(req.body.delivery_pincode),
            pickup_location: "Home", 
            order_items: [{ name: req.body.product_name, sku: "SKU1", units: 1, selling_price: 100 }],
            weight: req.body.weight || 0.5,
            length: req.body.length || 10,
            breadth: req.body.breadth || 10,
            height: req.body.height || 10
        };
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, { 
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.response?.data?.message || err.message });
    }
});

// 3. हायपरलोकल रेट्स`
app.post('/api/hyperlocal/shiprocket-quick-rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const response = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: { 
                pickup_pincode: '400092',
                delivery_pincode: String(req.body.deliveryPincode),
                weight: req.body.weight || 0.5,
                length: req.body.length || 10,
                breadth: req.body.breadth || 10,
                height: req.body.height || 10
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        res.status(500).json({ success: false, error: "Shiprocket API call failed" });
    }
});

module.exports = app;