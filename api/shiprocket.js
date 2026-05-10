// api/shiprocket.js
export default async function handler(req, res) {
  // Tujhe details mi ithe set kele ahet
  const API_EMAIL = "pprabhu07@gmail.com"; 
  const API_PASSWORD = "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ";

  try {
    // 1. Shiprocket Login karun Token milvane
    const authRes = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: API_EMAIL, password: API_PASSWORD })
    });
    const authData = await authRes.json();
    const token = authData.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication Failed" });
    }

    if (req.method === 'POST') {
      const { pickup_details, delivery_pincode, weight, cod } = req.body;

      // 2. Dynamic Pickup Location Add karne
      // Ya mule Mumbai, Delhi kinva kutlyahi city cha address auto-save hoil
      const addPickupRes = await fetch('https://apiv2.shiprocket.in/v1/external/settings/company/addpickup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "pickup_location": `CUST_${Date.now()}`, // Unique nickname
          "address": pickup_details.address,
          "city": pickup_details.city,
          "state": pickup_details.state,
          "pincode": pickup_details.pincode,
          "phone": pickup_details.phone,
          "name": pickup_details.name
        })
      });

      const pickupData = await addPickupRes.json();

      // 3. Serviceability (Rates) Check karne
      const rateRes = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability?pickup_postcode=${pickup_details.pincode}&delivery_postcode=${delivery_pincode}&weight=${weight}&cod=${cod}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const rateData = await rateRes.json();
      
      return res.status(200).json({
        success: true,
        pickup_info: pickupData,
        rates: rateData
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}