import axios from 'axios'

export default async function handler(req, res) {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }
  const { data } = await axios.post('https://52m63cshsk.hk.aircode.run/hello', { prompt }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res.status(200).json(data);
}
