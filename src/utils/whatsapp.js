// src/utils/WhatsApp.js

/**
 * Apni Manzil - Universal WhatsApp Notification Logic
 * @param {string} phone - कस्टमरचा मोबाईल नंबर
 * @param {string} name - कस्टमरचे नाव
 * @param {string} service - बुक केलेली सर्विस (उदा. Truck Transport)
 * @param {string} orderId - जनरेट झालेला ऑर्डर आयडी
 */

export const sendWhatsAppNotification = (phone, name, service, orderId) => {
    const businessName = "APNI MANZIL LOGISTICS";
    const adminNumber = "917378502356"; // तुझा स्वतःचा नंबर (अलर्टसाठी)

    // १. कस्टमरला जाणारा प्रोफेशनल मेसेज
    const customerMessage = 
        `*${businessName}* 🚚%0A%0A` +
        `नमस्ते *${name}*,%0A` +
        `तुमची *${service}* ची बुकिंग यशस्वी झाली आहे! 🎉%0A%0A` +
        `📦 *Order ID:* ${orderId}%0A` +
        `✅ *Status:* Confirmed%0A` +
        `📍 *Apni Manzil* वर विश्वास ठेवल्याबद्दल धन्यवाद!%0A%0A` +
        `आमचा प्रतिनिधी लवकरच तुम्हाला कॉल करेल. काही शंका असल्यास आम्हाला संपर्क करा.`;

    // २. तुला (Admin ला) येणारा नवीन ऑर्डरचा अलर्ट
    const adminAlert = 
        `*NEW BOOKING RECEIVED* 🚨%0A%0A` +
        `👤 *Customer:* ${name}%0A` +
        `📞 *Phone:* ${phone}%0A` +
        `🚚 *Service:* ${service}%0A` +
        `🆔 *ID:* ${orderId}`;

    // व्हॉट्सॲप वेब/ॲपची लिंक तयार करणे
    const customerUrl = `https://wa.me/91${phone}?text=${customerMessage}`;
    const adminUrl = `https://wa.me/${adminNumber}?text=${adminAlert}`;

    // --- EXECUTION ---
    
    // १. कस्टमरसाठी व्हॉट्सॲप विंडो उघडा
    window.open(customerUrl, '_blank');

    // २. (Optional) तुला स्वतःला मेसेज हवा असेल तर खालची लाईन अन-कमेंट कर
    // setTimeout(() => { window.open(adminUrl, '_blank'); }, 2000);
};