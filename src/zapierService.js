// src/zapierService.js
export const sendToZapier = async (mainService, subService, extraData = {}) => {
  const url = "https://hooks.zapier.com/hooks/catch/27439476/uvg4w4t/";
  
  const payload = {
    main_service: mainService,
    sub_service: subService,
    ...extraData,
    timestamp: new Date().toLocaleString(),
    source: "Apni Manzil Web"
  };

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors", 
      body: JSON.stringify(payload),
    });
    console.log(`Zapier: ${mainService} - ${subService} चा डेटा पाठवला!`);
  } catch (err) {
    console.error("Zapier Error:", err);
  }
};