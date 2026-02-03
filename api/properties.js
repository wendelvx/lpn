
export default async function handler(req, res) {
  const { JETIMOB_KEY } = process.env;

  console.log("Checking API Key:", JETIMOB_KEY ? "Key found" : "Key MISSING");

  if (!JETIMOB_KEY) {
    return res.status(500).json({ error: 'JETIMOB_KEY is not defined in environment variables' });
  }

  try {
    const apiUrl = `https://api.jetimob.com/webservice/${JETIMOB_KEY}/imoveis/todos?v=4`;
    

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Jetimob API Error:", response.status, errorData);
      return res.status(response.status).json({ error: 'Jetimob API rejected the request' });
    }

    const data = await response.json();
    console.log("Data received successfully!");

    return res.status(200).json(data.data || []);
  } catch (error) {
    console.error("Proxy Function Crash:", error.message);
    return res.status(500).json({ error: error.message });
  }
}