export default async function handler(req, res) {
  // CORS साठी हे आवश्यक आहे
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed - Please use POST' });
  }

  // तुझा पुढचा Nimbus चा लॉगिन आणि बुकिंग कोड...
}