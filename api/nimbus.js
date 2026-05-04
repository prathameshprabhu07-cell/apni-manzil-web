const axios = require('axios');

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { endpoint, data } = req.body;
    
    // १. Nimbus Login
    const authRes = await axios.post('https://api.nimbuspost.com/v1/login', {
      email: "7378502356+3802@automaticsignup.com",
      password: "xa6KSELPyH"
    });
    
    const token = authRes.data.data;

    // २. Call Nimbus API
    const nimbusRes = await axios.post(`https://api.nimbuspost.com/v1/${endpoint}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.status(200).json(nimbusRes.data);
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
}