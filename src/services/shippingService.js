const NIMBUS_URL = "https://api.nimbuspost.com/v1";

export const getNimbusToken = async () => {
    try {
        const response = await fetch(`${NIMBUS_URL}/user/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': 'c1c8a6d992152752ca5817f3f70e37915987414252867' 
            },
            body: JSON.stringify({
                email: "7378502356+3564@automaticsignup.com",
                password: "nW92zoLzkh" 
            })
        });
        const result = await response.json();
        return result.status ? result.data : null;
    } catch (error) {
        console.error("Nimbus Login Error:", error);
        return null;
    }
};

export const getAllShippingRates = async (origin, destination, weight) => {
    const nimbusToken = await getNimbusToken();
    let combinedRates = [];

    if (nimbusToken) {
        try {
            const res = await fetch(`${NIMBUS_URL}/courier/serviceability`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${nimbusToken}`
                },
                body: JSON.stringify({
                    "origin": origin,
                    "destination": destination,
                    "weight": parseFloat(weight), // String चे Number मध्ये रूपांतर केले
                    "payment_method": "PREPAID",
                    "order_type": "DOMESTIC"
                })
            });

            const result = await res.json();
            
            // NimbusPost च्या रिस्पॉन्समध्ये डेटा 'data' फील्डमध्ये असतो
            if(result.status && result.data) {
                const formatted = result.data.map(item => ({
                    // NimbusPost मध्ये 'name' ऐवजी 'courier_name' असू शकते, म्हणून दोन्ही चेक करूया
                    name: item.courier_name || item.name || "Standard Courier",
                    // रेट्स 'total_amount' किंवा 'rate' मध्ये असतात
                    rate: item.total_amount || item.rate || item.charge,
                    etd: item.expected_delivery_date || "3-5 Days",
                    source: 'NimbusPost' 
                }));
                combinedRates = [...formatted];
            }
        } catch (e) { 
            console.error("Nimbus Fetch Error", e); 
        }
    }

    // सर्वात स्वस्त रेट्स सॉर्ट करणे आणि 'null' किंवा चुकीचे रेट्स काढून टाकणे
    return combinedRates
        .filter(c => c.rate !== undefined && c.rate !== null)
        .sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
};