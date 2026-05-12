// api/index.js मधील हे फंक्शन अपडेट करा
const getShiprocketToken = async () => {
    try {
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: "pprabhu2611@gmail.com",
            password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
        });
        
        if (response.data && response.data.token) {
            console.log("Shiprocket Token Generated Successfully!");
            return response.data.token;
        }
        return null;
    } catch (error) {
        console.error("Shiprocket Login Error:", error.response?.data || error.message);
        return null;
    }
};