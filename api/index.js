const getShiprocketToken = async () => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
            data: {
                email: "pprabhu2611@gmail.com",
                password: "aK&Iq6OX9B55JkbPsngHMidw#ilFrKhQ"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.token) {
            console.log("Shiprocket Login Success!");
            return response.data.token;
        }
        return null;
    } catch (error) {
        console.error("Shiprocket Login Error Details:", error.response?.data || error.message);
        return null;
    }
};