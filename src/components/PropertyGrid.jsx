// front/src/components/PropertyGrid.jsx
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import PropertyCard from './PropertyCard';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import PropertySkeleton from './PropertySkeleton';

// Função auxiliar para o fetcher do SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const PropertyGrid = ({ onSelectProperty }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Reduzido para aumentar a velocidade de resposta

  const [filters, setFilters] = useState({
    type: '',
    neighborhood: '',
    purpose: '',
    maxPrice: ''
  });

  // Utilizando SWR para cache e carregamento inteligente
  const { data, error, isLoading } = useSWR(
    `/api/properties?page=${currentPage}&pageSize=${itemsPerPage}`,
    fetcher,
    { 
      revalidateOnFocus: false, // Não recarrega ao mudar de aba
      dedupingInterval: 60000   // Cache de 1 minuto para evitar requisições repetidas
    }
  );

  // Extraímos os dados do objeto retornado pela nossa API Proxy
  const properties = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Filtros aplicados localmente sobre os dados da página atual
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];
    return properties.filter(item => {
      const matchType = !filters.type || item.subtipo === filters.type;
      const matchNeighborhood = !filters.neighborhood || item.endereco_bairro === filters.neighborhood;
      const matchPurpose = !filters.purpose || item.contrato.includes(filters.purpose);
      const matchPrice = !filters.maxPrice || (item.valor_venda <= parseFloat(filters.maxPrice));
      return matchType && matchNeighborhood && matchPurpose && matchPrice;
    });
  }, [properties, filters]);

  // Lista de Bairros e Tipos para o FilterBar
  const neighborhoods = useMemo(() => 
    [...new Set(properties.map(p => p.endereco_bairro))].filter(Boolean).sort()
  , [properties]);

  const types = useMemo(() => 
    [...new Set(properties.map(p => p.subtipo))].filter(Boolean).sort()
  , [properties]);

  // Reseta para a página 1 ao filtrar
  useEffect(() => {
    if (filters.type || filters.neighborhood) {
       // setCurrentPage(1); 
    }
  }, [filters]);

  return (
    // Adicionado ID para a âncora de scroll e preenchimento responsivo
    <section id="property-grid" className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
      
      {/* Barra de Filtros (Sempre visível) */}
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        neighborhoods={neighborhoods}
        types={types}
      />

      {/* Lógica de Exibição: Skeleton vs Conteúdo Real */}
      {isLoading ? (
        <PropertySkeleton />
      ) : (
        <>
          {/* Grid Responsivo: 1 coluna (mobile), 2 colunas (tablet), 3 colunas (desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filteredProperties.map(item => (
              <PropertyCard 
                key={item.id_imovel} 
                property={item} 
                onSelect={onSelectProperty} 
              />
            ))}
          </div>

          {/* Paginação Centralizada com espaçamento adaptável */}
          <div className="mt-12 sm:mt-16">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                // Ajuste do scroll para considerar a Navbar fixa
                const element = document.getElementById('property-grid');
                const offset = element.offsetTop - 100;
                window.scrollTo({ top: offset, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Estado Vazio: Layout centralizado e moderno */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-16 sm:py-24 bg-gray-50 rounded-[2rem] sm:rounded-[3rem] mt-10 border border-dashed border-gray-200 px-6">
              <p className="text-gray-400 font-medium text-base sm:text-lg">
                Nenhum imóvel encontrado nesta página.
              </p>
            </div>
          )}
        </>
      )}

      {/* Erro: Estilização de alerta discreta */}
      {error && (
        <div className="text-center py-10 text-red-500 font-semibold bg-red-50 rounded-2xl border border-red-100 mt-6">
          Erro ao conectar com o catálogo. Por favor, tente novamente.
        </div>
      )}
    </section>
  );
};

export default PropertyGrid;