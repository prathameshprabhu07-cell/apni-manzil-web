// src/zapierService.js
export const sendToZapier = async (mainService, subService, extraData = {}) => {
  // तुझी नवीन अपडेटेड लिंक खाली दिली आहे
  const url = "https://hooks.zapier.com/hooks/catch/27439476/uvczwl6/";
  
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