import axios from 'axios'

export default async function handler(req, res) {
  const { prompt, image_model } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }
  const url = 'https://52m63cshsk.hk.aircode.run/hello';
  const { data } = await axios.post(url, req.body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res.status(200).json(data);
}
