import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const brokers = [
  {
    id: 1,
    name: "Ricardo Mello",
    role: "Especialista em imóveis",
    creci: "12.345-F",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Ana Beatriz",
    role: "Especialista em imóveis",
    creci: "23.456-F",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Marcos Oliveira",
    role: "Especialista em imóveis",
    creci: "34.567-F",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
  }
];

const BrokerGrid = () => {
  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
              Ecossistema de Elite
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Especialistas em <span className="text-blue-600">Resultados</span>
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
          </motion.div>
        </div>

        {/* Grid de Corretores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {brokers.map((broker, index) => (
            <motion.div
              key={broker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:-translate-y-2"
            >
              {/* Imagem do Corretor com Overlay */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={broker.image} 
                  alt={broker.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                
                {/* Badge de CRECI */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">CRECI: {broker.creci}</p>
                </div>
              </div>

              {/* Informações */}
              <div className="p-8 text-center">
                <div className="flex justify-center gap-1 mb-3 text-blue-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">
                  {broker.name}
                </h3>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter mb-2">
                  {broker.role}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Consultor Parceiro
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé da Seção */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 font-medium text-sm">
            Quer fazer parte do nosso ecossistema? 
            <button className="ml-2 text-blue-600 font-black hover:underline underline-offset-4 transition-all">
              Seja um corretor parceiro.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrokerGrid;