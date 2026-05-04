const axios = require('axios');

export default async function handler(req, res) {
  // CORS Permissions
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { endpoint, data } = req.body;
    
    // १. सुरक्षितपणे बॅकएंडवरून लॉगिन करणे
    const authRes = await axios.post('https://api.nimbuspost.com/v1/login', {
      email: "7378502356+3802@automaticsignup.com",
      password: "xa6KSELPyH"
    });
    
    const token = authRes.data.data;

    // २. टोकन वापरून निंबसपोस्टला रिक्वेस्ट पाठवणे
    const nimbusRes = await axios.post(`https://api.nimbuspost.com/v1/${endpoint}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.status(200).json(nimbusRes.data);
  } catch (error) {
    console.error("Backend Error:", error.response ? error.response.data : error.message);
    return res.status(500).json({ error: "Nimbus API Error", details: error.message });
  }
}