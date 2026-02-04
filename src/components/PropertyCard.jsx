// front/src/components/PropertyCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Car, ChevronRight } from 'lucide-react';

const PropertyCard = ({ property, onSelect }) => {
  // Formatador de moeda brasileira
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={() => onSelect(property.codigo)}
      className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 sm:hover:scale-[1.02] sm:hover:shadow-2xl cursor-pointer group border border-gray-100 flex flex-col h-full"
    >
      {/* Container da Imagem: Altura responsiva e fundo neutro para carregamento */}
      <div className="relative h-52 sm:h-64 overflow-hidden shrink-0 bg-gray-100">
        <img 
          /* AJUSTE DE RESOLUÇÃO: 
             Alterado de 'link_thumb' para 'link' para carregar a imagem em alta qualidade.
          */
          src={property.imagens?.[0]?.link || 'placeholder.jpg'} 
          alt={property.subtipo}
          /* AJUSTE DE ENQUADRAMENTO:
             'object-cover' preenche o espaço, 'object-center' garante o foco no meio.
          */
          className="w-full h-full object-cover object-center transition-transform duration-700 sm:group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badge de Contrato (Venda/Locação) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-lg uppercase tracking-wider">
          {property.contrato}
        </div>

        {/* Overlay gradiente (Sutil no Mobile, visível no Hover Desktop) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-[9px] sm:text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
            {property.tipo}
          </span>
        </div>
        
        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 uppercase truncate mb-1">
          {property.subtipo} em {property.endereco_bairro}
        </h3>
        
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 flex items-center gap-1">
          <span className="text-gray-300">📍</span> {property.endereco_cidade}
        </p>

        {/* Grid de Atributos com Ícones */}
        <div className="flex justify-between items-center border-t border-b border-gray-50 py-3 sm:py-4 my-auto text-gray-600">
          <div className="flex flex-col items-center gap-1 flex-1">
            <Bed size={16} className="text-blue-500 sm:w-[18px]" />
            <span className="font-bold text-gray-800 text-xs sm:text-sm">{property.dormitorios || 0}</span>
            <span className="text-[8px] sm:text-[9px] uppercase font-medium text-gray-400">Quartos</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 border-x border-gray-100 flex-1 px-2">
            <Bath size={16} className="text-blue-500 sm:w-[18px]" />
            <span className="font-bold text-gray-800 text-xs sm:text-sm">{property.banheiros || 0}</span>
            <span className="text-[8px] sm:text-[9px] uppercase font-medium text-gray-400">Banh.</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 flex-1">
            <Car size={16} className="text-blue-500 sm:w-[18px]" />
            <span className="font-bold text-gray-800 text-xs sm:text-sm">{property.garagens || 0}</span>
            <span className="text-[8px] sm:text-[9px] uppercase font-medium text-gray-400">Vagas</span>
          </div>
        </div>

        {/* Preço e Call to Action */}
        <div className="flex items-center justify-between mt-4 sm:mt-5">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-bold">Valor de Investimento</span>
            <div className="text-lg sm:text-2xl font-black text-blue-700 leading-none mt-1">
              {property.valor_venda_visivel ? formatter.format(property.valor_venda) : "Sob Consulta"}
            </div>
          </div>
          
          <div className="bg-gray-100 p-2 rounded-full sm:group-hover:bg-blue-600 sm:group-hover:text-white transition-colors shrink-0">
            <ChevronRight size={18} className="sm:w-[20px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;