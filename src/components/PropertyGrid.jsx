// front/src/components/PropertyGrid.jsx
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import PropertyCard from './PropertyCard';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import PropertySkeleton from './PropertySkeleton';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PropertyGrid = ({ onSelectProperty }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Quantos cards aparecem por vez

  const [filters, setFilters] = useState({
    type: '',
    city: '',
    neighborhood: '',
    purpose: '',
    maxPrice: ''
  });

  // SOLUÇÃO: Buscamos 100 imóveis de uma vez para popular os filtros e permitir busca real
  const { data, error, isLoading } = useSWR(
    `/api/properties?page=1&pageSize=100`, 
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  const allProperties = data?.data || [];

  // 1. Lógica de Filtragem: Filtrar sobre TODOS os 100 imóveis recebidos
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(allProperties)) return [];
    return allProperties.filter(item => {
      const matchType = !filters.type || item.subtipo === filters.type;
      const matchCity = !filters.city || item.endereco_cidade === filters.city;
      const matchNeighborhood = !filters.neighborhood || item.endereco_bairro === filters.neighborhood;
      const matchPurpose = !filters.purpose || (item.contrato && item.contrato.includes(filters.purpose));
      const matchPrice = !filters.maxPrice || (item.valor_venda <= parseFloat(filters.maxPrice));
      
      return matchType && matchCity && matchNeighborhood && matchPurpose && matchPrice;
    });
  }, [allProperties, filters]);

  // 2. Lógica de Paginação Local: Cortar a lista filtrada para exibir apenas 12
  const propertiesToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;

  // 3. Metadados para os Selects: Gerados a partir de TODOS os imóveis
  const cities = useMemo(() => 
    [...new Set(allProperties.map(p => p.endereco_cidade))].filter(Boolean).sort()
  , [allProperties]);

  const neighborhoods = useMemo(() => {
    const source = filters.city 
      ? allProperties.filter(p => p.endereco_cidade === filters.city)
      : allProperties;
    return [...new Set(source.map(p => p.endereco_bairro))].filter(Boolean).sort();
  }, [allProperties, filters.city]);

  const types = useMemo(() => 
    [...new Set(allProperties.map(p => p.subtipo))].filter(Boolean).sort()
  , [allProperties]);

  // Resetar página e bairro ao mudar cidade ou outros filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, neighborhood: '' }));
  }, [filters.city]);

  return (
    <section id="property-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
      
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        cities={cities}
        neighborhoods={neighborhoods}
        types={types}
      />

      {isLoading ? (
        <PropertySkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {propertiesToDisplay.map(item => (
              <PropertyCard 
                key={item.id_imovel} 
                property={item} 
                onSelect={onSelectProperty} 
              />
            ))}
          </div>

          <div className="mt-12 sm:mt-16">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                const element = document.getElementById('property-grid');
                const offset = (element?.offsetTop || 0) - 100;
                window.scrollTo({ top: offset, behavior: 'smooth' });
              }}
            />
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16 sm:py-24 bg-gray-50 rounded-[2rem] sm:rounded-[3rem] mt-10 border border-dashed border-gray-200 px-6">
              <p className="text-gray-400 font-medium text-base sm:text-lg">
                Nenhum imóvel encontrado com esses filtros.
              </p>
            </div>
          )}
        </>
      )}

      {error && (
        <div className="text-center py-10 text-red-500 font-semibold bg-red-50 rounded-2xl border border-red-100 mt-6">
          Erro ao conectar com o catálogo. Por favor, tente novamente.
        </div>
      )}
    </section>
  );
};

export default PropertyGrid;