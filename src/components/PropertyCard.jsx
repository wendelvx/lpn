
const PropertyCard = ({ property }) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-56">
        <img 
          src={property.imagens[0]?.link_thumb || 'placeholder.jpg'} 
          alt={property.subtipo}
          className="w-full h-full object-cover"
          loading="lazy" // RNF02: Performance
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          {property.contrato}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 uppercase">
          {property.subtipo} em {property.endereco_bairro}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {property.endereco_cidade} - {property.endereco_estado}
        </p>

        <div className="flex justify-between items-center border-t border-b py-3 my-4 text-gray-600 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold">{property.dormitorios || 0}</span>
            <span>Quartos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">{property.banheiros || 0}</span>
            <span>Banh.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">{property.area_util || property.area_total || 0} m²</span>
            <span>Área</span>
          </div>
        </div>

        <div className="text-2xl font-extrabold text-blue-700">
          {property.valor_venda_visivel ? formatter.format(property.valor_venda) : "Consulte-nos"}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;