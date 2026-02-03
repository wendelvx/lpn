
export default async function handler(req, res) {
  const { JETIMOB_KEY } = process.env;

  try {
    
    const response = await fetch(`https://api.jetimob.com/webservice/${JETIMOB_KEY}/imoveis/todos?v=4`);
    
    if (!response.ok) {
      throw new Error('Error fetching data from Jetimob');
    }

    const data = await response.json();

    return res.status(200).json(data.data || []);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}