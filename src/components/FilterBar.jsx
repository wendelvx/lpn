// front/src/components/FilterBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, Tag, CircleDollarSign } from 'lucide-react';

const FilterBar = ({ filters, setFilters, neighborhoods, types }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      // Ajuste de margem e arredondamento responsivo
      className="bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-blue-100/50 mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 border border-gray-50"
    >
      {/* Filtro: Tipo de Imóvel */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
          <Home size={14} className="text-blue-500" />
          Tipo
        </label>
        <div className="relative">
          <select 
            name="type" 
            value={filters.type} 
            onChange={handleChange}
            // text-base no mobile evita zoom automático do navegador
            className="w-full p-3.5 sm:p-3 bg-gray-50 border-none rounded-2xl text-gray-700 text-base sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer transition-all hover:bg-gray-100"
          >
            <option value="">Todos os tipos</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Filtro: Localização */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
          <MapPin size={14} className="text-blue-500" />
          Localização
        </label>
        <div className="relative">
          <select 
            name="neighborhood" 
            value={filters.neighborhood} 
            onChange={handleChange}
            className="w-full p-3.5 sm:p-3 bg-gray-50 border-none rounded-2xl text-gray-700 text-base sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer transition-all hover:bg-gray-100"
          >
            <option value="">Todos os bairros</option>
            {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Filtro: Finalidade */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
          <Tag size={14} className="text-blue-500" />
          Finalidade
        </label>
        <div className="relative">
          <select 
            name="purpose" 
            value={filters.purpose} 
            onChange={handleChange}
            className="w-full p-3.5 sm:p-3 bg-gray-50 border-none rounded-2xl text-gray-700 text-base sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer transition-all hover:bg-gray-100"
          >
            <option value="">Comprar ou Alugar</option>
            <option value="Compra">Venda</option>
            <option value="Locação">Locação</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Filtro: Preço */}
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
          <CircleDollarSign size={14} className="text-blue-500" />
          Investimento Máx.
        </label>
        <input 
          type="number" 
          name="maxPrice"
          placeholder="Ex: 850.000"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full p-3.5 sm:p-3 bg-gray-50 border-none rounded-2xl text-gray-700 text-base sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:bg-gray-100 placeholder:text-gray-300"
        />
      </div>
    </motion.div>
  );
};

export default FilterBar;