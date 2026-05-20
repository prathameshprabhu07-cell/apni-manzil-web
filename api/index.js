const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// ===================================================
// SHIPROCKET LOGISTICS INTEGRATION
// ===================================================

// 1. Shiprocket Login Function
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

// 2. Rates / Serviceability Route
app.post('/api/rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        
        const pickupPincode = req.body.pickup_pincode || req.body.pickup;
        const deliveryPincode = req.body.delivery_pincode || req.body.drop;
        const packageWeight = req.body.weight || req.body.dimensions;

        console.log(`🔍 Fetching rates from: ${pickupPincode} to: ${deliveryPincode}`);

        const shiprocketRes = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
            params: {
                pickup_pincode: Number(pickupPincode),
                delivery_pincode: Number(deliveryPincode),
                weight: parseFloat(packageWeight) || 0.5,
                cod: Number(req.body.cod) || 0,
                length: 10, breadth: 10, height: 10
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("✅ SHIPROCKET_RATES_RESPONSE:", JSON.stringify(shiprocketRes.data, null, 2));
        res.status(200).json({ success: true, rates: shiprocketRes.data });

    } catch (err) {
        console.error("❌ SHIPROCKET_RATES_ERROR:", JSON.stringify(err.response?.data, null, 2) || err.message);
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});

// 3. Order Booking Route
app.post('/api/book-order', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        
        const pickupPincode = req.body.pickup_pincode || req.body.pickup || req.body.pickupAddress;
        const deliveryPincode = req.body.delivery_pincode || req.body.drop || req.body.dropAddress;
        const packageWeight = req.body.weight || req.body.dimensions;

        const orderData = {
            order_id: `AM_${Date.now()}`,
            order_date: new Date().toISOString().split('T')[0],
            pickup_location: "Primary", 
            billing_customer_name: req.body.name || "Customer",
            billing_last_name: "",
            billing_address: req.body.address || "Complete Delivery Address",
            billing_city: req.body.city || "Mumbai",
            billing_pincode: Number(deliveryPincode),
            billing_state: req.body.state || "Maharashtra",
            billing_country: "India",
            billing_phone: req.body.phone || "7378502356",
            shipping_is_billing: true,
            order_items: [
                {
                    name: req.body.product_name || "Konkani Product",
                    sku: `SKU_${Math.floor(Math.random() * 10000)}`,
                    units: parseInt(req.body.quantity) || 1,
                    selling_price: parseFloat(req.body.price) || 100,
                    discount: 0, tax: 0
                }
            ],
            payment_method: Number(req.body.cod) === 1 ? "Postpaid" : "Prepaid",
            sub_total: parseFloat(req.body.price) || 100,
            length: 10, breadth: 10, height: 10,
            weight: parseFloat(packageWeight) || 0.5
        };

        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderData, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("🚀 ORDER_BOOKED_SUCCESS:", response.data);
        res.status(200).json({ success: true, booking: response.data });

    } catch (err) {
        console.error("❌ SHIPROCKET_BOOKING_ERROR:", JSON.stringify(err.response?.data, null, 2) || err.message);
        res.status(500).json({ success: false, error: err.response?.data || err.message });
    }
});


// ===================================================
// HYPERLOCAL LOGISTICS AGGREGATORS (DIRECT BACKUPS)
// ===================================================

// 4. Borzo (WeFast) Live Operational Route
app.post('/api/hyperlocal/borzo-rates', async (req, res) => {
    try {
        const { pickupAddress, pickupPincode, deliveryAddress, deliveryPincode, packageType } = req.body;
        const BORZO_API_URL = "https://robot.borzadeliveries.com/api/business/1.1/calculate-price";
        const BORZO_AUTH_TOKEN = "BORZO_LIVE_TOKEN_APNI_MANZIL"; 

        const payload = {
            matter: packageType || "Parcel",
            points: [
                { address: `${pickupAddress || "Pickup"}, ${pickupPincode}`, pincode: pickupPincode },
                { address: `${deliveryAddress || "Delivery"}, ${deliveryPincode}`, pincode: deliveryPincode }
            ],
            vehicle_type_id: 7 
        };

        console.log(`[Hyperlocal API] Triggering Borzo calculations for route: ${pickupPincode} -> ${deliveryPincode}`);
        const response = await axios.post(BORZO_API_URL, payload, {
            headers: { 'X-DV-Auth-Token': BORZO_AUTH_TOKEN, 'Content-Type': 'application/json' }
        });

        const data = response.data;
        if (data.is_successful) {
            return res.status(200).json({
                success: true,
                partner: "Borzo (WeFast)",
                delivery_fee: data.order.delivery_fee,
                currency: "INR",
                eta: "2-3 Hours",
                status: "Available"
            });
        } else {
            return res.status(400).json({ success: false, message: data.errors ? data.errors[0] : "Service unreachable." });
        }
    } catch (error) {
        console.error("❌ CRITICAL_BORZO_BRIDGE_ERROR:", error.message);
        return res.status(500).json({ success: false, message: "Internal server bridge failure." });
    }
});

// 5. Dunzo For Business Bridge Placeholder
app.post('/api/hyperlocal/dunzo-rates', (req, res) => {
    res.json({ success: true, partner: "Dunzo For Business", delivery_fee: "Calculating...", eta: "Processing", status: "Coming Soon" });
});

// 6. Shadowfax Local Bridge Placeholder
app.post('/api/hyperlocal/shadowfax-rates', (req, res) => {
    res.json({ success: true, partner: "Shadowfax Local", delivery_fee: "Calculating...", eta: "Processing", status: "Coming Soon" });
});


// ===================================================
// 7. NEW MASTER ROUTE: SHIPROCKET QUICK HYPERLOCAL
// ===================================================
// This route uses your active token to fetch Dunzo, Borzo & Shadowfax rates instantly!
app.post('/api/hyperlocal/shiprocket-quick-rates', async (req, res) => {
    try {
        const token = await getShiprocketToken();
        const { pickupPincode, deliveryPincode, weight, packageType } = req.body;

        console.log(`[SR Quick Hub] Requesting hyperlocal multi-fleet serviceability: ${pickupPincode} -> ${deliveryPincode}`);

        // Hit the official Shiprocket Hyperlocal/Local serviceability cluster
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/courier/serviceability/local', {
            pickup_pincode: Number(pickupPincode),
            delivery_pincode: Number(deliveryPincode),
            weight: parseFloat(weight) || 0.5,
            declared_value: 100,
            commodity_type: packageType || "Parcel"
        }, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("✅ SHIPROCKET_QUICK_RESPONSE:", JSON.stringify(response.data, null, 2));
        
        res.status(200).json({ 
            success: true, 
            source: "Shiprocket Quick Engine",
            data: response.data 
        });

    } catch (err) {
        console.error("❌ SHIPROCKET_QUICK_ERROR:", JSON.stringify(err.response?.data, null, 2) || err.message);
        res.status(500).json({ 
            success: false, 
            error: err.response?.data || err.message,
            message: "Failed to fetch aggregated hyperlocal matrices via Shiprocket Quick."
        });
    }
});

module.exports = app;