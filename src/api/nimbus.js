// NimbusPost API Config
const NIMBUS_BASE_URL = "https://api.nimbuspost.com/api/v1";
// तुझी खरी API KEY इथे पेस्ट कर
const API_KEY = "YOUR_ACTUAL_NIMBUS_POST_API_KEY"; 

export const createNimbusOrder = async (orderData) => {
  try {
    const response = await fetch(`${NIMBUS_BASE_URL}/shipments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        "order_number": orderData.orderId || `AM-${Date.now()}`, 
        "shipping_charges": Number(orderData.price) || 0,
        "discount": 0,
        "payment_type": "prepaid", // जर युजरने आधी पैसे दिले असतील तर
        "consignee": {
          "name": orderData.receiverName,
          "address": orderData.deliveryAddress,
          "city": orderData.city || "Mumbai",
          "state": orderData.state || "Maharashtra",
          "pincode": orderData.pincode,
          "phone": orderData.receiverPhone,
          "email": orderData.receiverEmail || "customer@example.com"
        },
        "pickup_address": {
          // 'Mediator' म्हणून हा पत्ता तुमच्या हबचा किंवा मॅन्युफॅक्चररचा असेल
          "name": orderData.senderName || "Apni Manzil Hub",
          "pincode": orderData.senderPincode || "400001",
          "phone": orderData.senderPhone || "9999999999",
          "address": orderData.senderAddress || "Main Street, Area"
        },
        "order_items": [
          {
            "name": orderData.itemName || "General Goods",
            "qty": 1,
            "price": Number(orderData.price) || 0,
            "sku": "SKU001"
          }
        ],
        "weight": parseFloat(orderData.weight) || 0.5, // वजन नेहमी नंबरमध्ये हवे
        "length": Number(orderData.length) || 10,
        "width": Number(orderData.width) || 10,
        "height": Number(orderData.height) || 10,
        "is_return": 0 // ही नवीन ऑर्डर आहे, रिटर्न नाही
      })
    });

    const result = await response.json();

    // जर Nimbus कडून यश आले (status: true), तरच पुढचा डेटा पाठवा
    if (result.status) {
      console.log("Nimbus Booking Success:", result.data);
      return {
        success: true,
        awb: result.data.awb_number,
        label: result.data.label,
        courier: result.data.courier_name,
        fullResponse: result
      };
    } else {
      console.error("Nimbus Booking Failed:", result.message);
      return { success: false, message: result.message };
    }

  } catch (error) {
    console.error("NimbusPost API Error:", error);
    return { success: false, message: "Network Error" };
  }
};