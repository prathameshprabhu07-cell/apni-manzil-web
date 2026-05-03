// src/zapierService.js
export const sendToZapier = async (data) => {
  const url = "https://hooks.zapier.com/hooks/catch/27439476/uvg4w4t/";
  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors", 
      body: JSON.stringify(data),
    });
    console.log("Zapier Notification Sent!");
  } catch (err) {
    console.error("Zapier Error:", err);
  }
};