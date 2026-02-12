import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from './PropertyCard';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import PropertySkeleton from './PropertySkeleton';
import { LayoutGrid, Key, Building2 } from 'lucide-react';

// 1. IMPORTAÇÃO DIRETA DO MOCK
// Certifique-se de que o caminho está correto conforme sua estrutura de pastas
import mockData from '../data/mock_properties.json'; 

const PropertyGrid = ({ onSelectProperty }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [activeTab, setActiveTab] = useState('Venda');

  const [filters, setFilters] = useState({
    type: '',
    city: '',
    neighborhood: '',
    maxPrice: ''
  });

  // 2. DADOS LOCAIS (Substituindo useSWR por enquanto)
  const allProperties = mockData?.data || [];
  const isLoading = false; // Como o dado é local, o carregamento é instantâneo
  const error = null;

  // 3. Lógica de Filtragem (Ajustada para Case-Sensitivity)
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(allProperties)) return [];
    
    return allProperties.filter(item => {
      // Filtro de Aba: Garantimos que o "contrato" bata exatamente com a aba ativa
      const matchPurpose = item.contrato === activeTab;
      
      const matchType = !filters.type || item.subtipo === filters.type;
      const matchCity = !filters.city || item.endereco_cidade === filters.city;
      const matchNeighborhood = !filters.neighborhood || item.endereco_bairro === filters.neighborhood;
      const matchPrice = !filters.maxPrice || (item.valor_venda <= parseFloat(filters.maxPrice));
      
      return matchPurpose && matchType && matchCity && matchNeighborhood && matchPrice;
    });
  }, [allProperties, filters, activeTab]);

  const propertiesToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;

  // Metadados dinâmicos baseados no Mock
  const cities = useMemo(() => 
    [...new Set(allProperties.filter(p => p.contrato === activeTab).map(p => p.endereco_cidade))].filter(Boolean).sort()
  , [allProperties, activeTab]);

  const types = useMemo(() => 
    [...new Set(allProperties.filter(p => p.contrato === activeTab).map(p => p.subtipo))].filter(Boolean).sort()
  , [allProperties, activeTab]);

  const neighborhoods = useMemo(() => {
    const source = filters.city 
      ? allProperties.filter(p => p.endereco_cidade === filters.city && p.contrato === activeTab)
      : allProperties.filter(p => p.contrato === activeTab);
    return [...new Set(source.map(p => p.endereco_bairro))].filter(Boolean).sort();
  }, [allProperties, filters.city, activeTab]);

  useEffect(() => { setCurrentPage(1); }, [filters, activeTab]);
  useEffect(() => { setFilters(prev => ({ ...prev, neighborhood: '' })); }, [filters.city]);

  return (
    <section id="property-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
      
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-[2rem] border border-slate-200 shadow-inner">
          <button
            onClick={() => setActiveTab('Venda')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black transition-all ${
              activeTab === 'Venda' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 size={18} /> Comprar
          </button>
          <button
            onClick={() => setActiveTab('Locação')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black transition-all ${
              activeTab === 'Locação' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key size={18} /> Alugar
          </button>
        </div>
      </div>

      <FilterBar 
        filters={filters} setFilters={setFilters} 
        cities={cities} neighborhoods={neighborhoods} types={types}
      />

      <div className="mb-8 flex items-center justify-between">
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          {filteredProperties.length} Imóveis para {activeTab === 'Venda' ? 'Investimento' : 'Moradia'}
        </p>
        <div className="h-px flex-grow mx-6 bg-slate-100 hidden sm:block"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {propertiesToDisplay.map(item => (
            <PropertyCard key={item.id_imovel} property={item} onSelect={onSelectProperty} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 sm:mt-16">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] mt-10 border border-dashed border-slate-200">
          <p className="text-slate-500 font-bold text-lg">Nenhuma oportunidade encontrada nesta categoria.</p>
        </div>
      )}
    </section>
  );
};

export default PropertyGrid;