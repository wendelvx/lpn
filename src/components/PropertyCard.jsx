import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Car, ChevronRight, Ruler, Star } from 'lucide-react';

const PropertyCard = ({ property, onSelect }) => {
  const isVenda = property.contrato?.includes('Venda');

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={() => onSelect(property.codigo)}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* 📸 Image Container com Zoom Soft */}
      <div className="relative h-64 overflow-hidden bg-slate-200">
        <motion.img 
          src={property.imagens?.[0]?.link || 'placeholder.jpg'} 
          alt={property.subtipo}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badge Flutuante (Glassmorphism) */}
        <div className={`absolute top-4 left-4 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border ${
          isVenda 
          ? 'bg-amber-500/90 text-white border-amber-400' 
          : 'bg-slate-900/80 text-white border-slate-700'
        }`}>
          {isVenda ? 'Oportunidade de Venda' : 'Disponível para Locação'}
        </div>

        {/* Tag de Exclusividade (Opcional - Simulação) */}
        {property.exclusivo && (
          <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-amber-500">
            <Star size={16} fill="currentColor" />
          </div>
        )}

        {/* Overlay sutil de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 📄 Conteúdo do Imóvel */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
            {property.tipo}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            REF: {property.codigo}
          </span>
        </div>
        
        <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {property.subtipo} <span className="font-light text-slate-400">em</span> {property.endereco_bairro}
        </h3>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-6 font-medium">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          {property.endereco_cidade}
        </div>

        {/* 📐 Atributos High-Contrast */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-50 mb-6">
          <div className="flex flex-col items-center gap-1">
            <Bed size={18} className="text-slate-900" />
            <span className="font-black text-slate-900 text-sm">{property.dormitorios || 0}</span>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Quartos</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 border-x border-slate-100">
            <Bath size={18} className="text-slate-900" />
            <span className="font-black text-slate-900 text-sm">{property.banheiros || 0}</span>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Banh.</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <Car size={18} className="text-slate-900" />
            <span className="font-black text-slate-900 text-sm">{property.garagens || 0}</span>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Vagas</span>
          </div>
        </div>

        {/* 💰 Preço e CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">
              {isVenda ? 'Valor de Investimento' : 'Aluguel Mensal'}
            </span>
            <div className="text-2xl font-black text-slate-900 leading-none">
              {property.valor_venda_visivel 
                ? formatter.format(isVenda ? property.valor_venda : property.valor_locacao || property.valor_venda) 
                : "Sob Consulta"
              }
            </div>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-slate-900 text-white p-3 rounded-2xl group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
          >
            <ChevronRight size={20} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;