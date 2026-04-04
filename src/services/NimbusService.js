import NimbusService from './services/NimbusService';

const testFirstOrder = async () => {
    const myOrder = {
        "order_number": "AM-TEST-001",
        "shipping_charges": 0,
        "payment_method": "Prepaid",
        "order_type": "Forward",
        "pickup_address_id": "1", // Note: Ensure you have at least one pickup address in Nimbus Dashboard
        "consignee": {
            "name": "Test User",
            "address": "123, Logistics Park",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400001",
            "phone": "7378502356"
        },
        "order_items": [{
            "name": "Sample Box",
            "qty": 1,
            "price": 100,
            "sku": "SB-01"
        }],
        "weight": 0.5,
        "length": 10,
        "breadth": 10,
        "height": 10
    };

    try {
        const response = await NimbusService.createOrder(myOrder);
        if(response.status) {
            console.log("Success! Order Created. AWB:", response.data.awb_number);
            alert("Order Generated Successfully!");
        }
    } catch (err) {
        console.log("Error details in Console.");
    }
};