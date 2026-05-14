// src/zapierService.js
export const sendToZapier = async (mainService, subService, extraData = {}) => {
  
  // जर कुरियर किंवा शिपिंगचं काम असेल, तर Zapier कडे जाऊ नकोस
  if (mainService === "Logistics" || mainService === "Shipping") {
    console.log("Skipping Zapier for Logistics/Shipping to avoid 404.");
    return; // इथूनच परत जा
  }

  const url = "https://hooks.zapier.com/hooks/catch/27439476/uvczwl6/";
  
  const payload = {
    main_service: mainService,
    sub_service: subService,
    ...extraData,
    timestamp: new Date().toLocaleString(),
    source: "Apni Manzil Web"
  };

  try {
    // direct API call ऐवजी आपण बॅकएंडला सुद्धा पाठवू शकतो, 
    // पण तूर्तास हा no-cors मोड वापरूया
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