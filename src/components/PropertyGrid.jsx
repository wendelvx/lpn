import { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from './PropertyCard';

const PropertyGrid = () => {
  const { properties, loading } = useProperties();
  const [filterType, setFilterType] = useState('');

  const filteredList = properties.filter(item => 
    filterType === '' || item.subtipo.toLowerCase() === filterType.toLowerCase()
  );

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="container mx-auto px-4">
      {/* Exemplo simples de seletor de filtro */}
      <div className="mb-8 flex justify-center">
        <select 
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Todos os Tipos</option>
          <option value="Casa">Casas</option>
          <option value="Apartamento">Apartamentos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredList.map(item => (
          <PropertyCard key={item.id_imovel} property={item} />
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;