// src/nimbusService.js
const API_URL = "https://api.nimbuspost.com/v1";

/**
 * 1. Login Function: Gets the Bearer Token from NimbusPost
 */
export const getNimbusToken = async () => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // --- INSERT YOUR API KEY BELOW ---
                'x-api-key': '9c1c8a6d992152752ca5817f3f70e37915987414252867' 
            },
            body: JSON.stringify({
                email: "7378502356+3301@automaticsignup.com",
                // --- INSERT YOUR PASSWORD BELOW ---
                password: "G09Jv4ToXn" 
            })
        });

        const result = await response.json();
        
        if(result.status) {
            // Returns the token string (e.g., "eyJhbG...")
            return result.data; 
        } else {
            console.error("Nimbus Login Failed:", result.message);
            return null;
        }
    } catch (error) {
        console.error("Nimbus Network/Server Error:", error);
        return null;
    }
};

/**
 * 2. Serviceability Function: Gets live shipping rates for a route
 */
export const fetchShippingRates = async (token, origin, destination, weight, payment) => {
    try {
        const response = await fetch(`${API_URL}/courier/serviceability`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "origin": origin,
                "destination": destination,
                "weight": weight,
                "payment_method": payment.toUpperCase(), // "PREPAID" or "COD"
                "order_type": "DOMESTIC"
            })
        });

        const result = await response.json();

        if(result.status && result.data) {
            return result.data; // This is an array of courier companies and prices
        } else {
            return [];
        }
    } catch (error) {
        console.error("Fetch Rates Error:", error);
        return [];
    }
};