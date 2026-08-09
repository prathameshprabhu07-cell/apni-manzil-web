// src/utils/paymentService.js

// Function to dynamically load the Razorpay SDK script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Global Payment Handler function to be used across any service
export const handleGlobalPayment = async ({
  amount,
  serviceName,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure
}) => {
  const res = await loadRazorpayScript();

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const options = {
    key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
    amount: Math.round(amount * 100), // Convert amount to Paise (* 100)
    currency: "INR",
    name: "Apni Manzil",
    description: `Payment for ${serviceName}`,
    handler: async function (response) {
      // Triggered when payment is successful
      if (onSuccess) {
        onSuccess(response.razorpay_payment_id);
      }
    },
    prefill: {
      name: customerName || "Customer",
      email: customerEmail || "support@apnimanzil.com",
      contact: customerPhone || "9999999999",
    },
    theme: {
      color: "#F97316", // Brand Theme Color (Orange)
    },
  };

  const paymentObject = new window.Razorpay(options);
  
  // Triggered when payment fails
  paymentObject.on("payment.failed", function (response) {
    if (onFailure) {
      onFailure(response.error);
    } else {
      alert(`Payment Failed: ${response.error.description}`);
    }
  });

  // Open the Razorpay checkout modal
  paymentObject.open();
};