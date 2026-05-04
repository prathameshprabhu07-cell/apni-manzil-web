const axios = require('axios');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { endpoint, data } = req.body;
    
    const authRes = await axios.post('https://api.nimbuspost.com/v1/login', {
      email: "7378502356+3802@automaticsignup.com",
      password: "xa6KSELPyH"
    });
    
    const token = authRes.data.data;

    const nimbusRes = await axios.post(`https://api.nimbuspost.com/v1/${endpoint}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.status(200).json(nimbusRes.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}