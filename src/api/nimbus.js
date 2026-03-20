// Rate Calculator API Call
const calculateShippingRate = async (data) => {
    try {
        const response = await axios.post('https://api.nimbuspost.com/v1/shipping-rates', {
            origin: data.pickupPincode,
            destination: data.deliveryPincode,
            weight: data.weight,
            payment_method: "prepaid" // किंवा cod
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.NIMBUS_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Rate API Error:", error);
    }
};