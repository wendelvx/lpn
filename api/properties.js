// front/api/properties.js
export default async function handler(req, res) {
  const { JETIMOB_KEY } = process.env;
  const { page = 1, pageSize = 12 } = req.query;

  try {
    const response = await fetch(`https://api.jetimob.com/webservice/${JETIMOB_KEY}/imoveis/todos?v=4&page=${page}&pageSize=${pageSize}`);
    const result = await response.json();

    // --- TÉCNICA 1: EDGE CACHING ---
    // s-maxage=60: Cacheia na Vercel por 60 segundos
    // stale-while-revalidate=600: Se o cache vencer, serve o antigo enquanto busca o novo em background
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');

    // --- TÉCNICA 2: DATA THINNING (LIMPEZA DE DADOS) ---
    // Removemos campos pesados que o Card não usa (rural, proprietarios, etc)
    const cleanedData = result.data.map(property => ({
      codigo: property.codigo,
      subtipo: property.subtipo,
      endereco_bairro: property.endereco_bairro,
      endereco_cidade: property.endereco_cidade,
      valor_venda: property.valor_venda,
      valor_venda_visivel: property.valor_venda_visivel,
      dormitorios: property.dormitorios,
      banheiros: property.banheiros,
      garagens: property.garagens,
      contrato: property.contrato,
      imagens: [property.imagens[0]] // Enviamos apenas a PRIMEIRA imagem para o catálogo
    }));

    return res.status(200).json({
      data: cleanedData,
      totalPages: result.totalPages
    });
  } catch (error) {
    return res.status(500).json({ error: 'Timeout or Fetch Error' });
  }
}