const axios = require('axios');

async function bookNimbusShipment() {
  try {
    const response = await axios.post(
      'https://api.nimbuspost.com/v1/shipments', 
      {
        "order_number": "APN-1001",
        "shipping_charges": 0,
        "discount": 0,
        "cod_charges": 0,
        "payment_type": "prepaid",
        "package_weight": 0.5,
        "package_length": 10,
        "package_breadth": 10,
        "package_height": 10,
        "consignee": {
          "name": "Prathamesh",
          "email": "customer@gmail.com",
          "phone": "9876543210",
          "address": "MG Road, Near Central Mall",
          "city": "Mumbai",
          "state": "Maharashtra",
          "pincode": "110001",
          "country": "India"
        },
        "pickup_location": {
          "name": "Apni Manzil Warehouse",
          "phone": "9876543210",
          "address": "Warehouse Address",
          "city": "Mumbai",
          "state": "Maharashtra",
          "pincode": "400001",
          "country": "India"
        },
        "order_items": [
          {
            "name": "Test Product",
            "qty": 1,
            "price": 500,
            "sku": "TEST-SKU-1"
          }
        ],
        "courier_id": "1"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'Gjwlx2SUCkkzB_FY-ISyab2wbh9xRD1b'
        }
      }
    );

    console.log("Booking Response:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.log("Booking Error Data:", error.response.data);
    } else {
      console.log("Error:", error.message);
    }
  }
}

bookNimbusShipment();