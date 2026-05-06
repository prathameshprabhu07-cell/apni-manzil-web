// api/nimbus.js मध्ये हा बदल करा
} catch (error) {
    // एररचे डिटेल्स प्रिंट करा
    const errorData = error.response ? error.response.data : error.message;
    console.error("Nimbus API Error:", errorData);
    
    // युजरला नेमकी चूक पाठवा
    return res.status(500).json({ 
        message: "Internal Server Error", 
        details: errorData 
    });
}