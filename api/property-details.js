
export default async function handler(req, res) {
  const { JETIMOB_KEY } = process.env;
  const { code } = req.query; // Recebe o código do imóvel

  if (!code) return res.status(400).json({ error: 'Code is required' });

  try {
    const response = await fetch(`https://api.jetimob.com/webservice/${JETIMOB_KEY}/imoveis/codigo/${code}?v=4`);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch property details' });
  }
}