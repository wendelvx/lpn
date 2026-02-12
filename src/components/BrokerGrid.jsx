import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const brokers = [
  {
    id: 1,
    name: "Emiliano",
    role: "Especialista em imóveis",
    creci: "00.000-F", // Ajuste para o CRECI real se necessário
    image: "/emiliano.jpg", // Busca na pasta public
  },
  {
    id: 2,
    name: "Junior",
    role: "Especialista em imóveis",
    creci: "00.000-F",
    image: "/junior.jpg",
  },
  {
    id: 3,
    name: "Natan Barreto",
    role: "Especialista em imóveis",
    creci: "00.000-F",
    image: "/natan.jpg",
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
              Time Especialista
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Curadoria de <span className="text-blue-600">Resultados</span>
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
              {/* Imagem do Corretor */}
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={broker.image} 
                  alt={broker.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                
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
                  Corretor Parceiro
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé da Seção */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 font-medium text-sm">
            Especialistas focados na segurança da sua escolha. 
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrokerGrid;