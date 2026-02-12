import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const brokers = [
  { id: 1, name: "Emiliano", role: "Especialista em imóveis", creci: "18.865-J", image: "/emiliano.jpg" },
  { id: 2, name: "Junior", role: "Especialista em imóveis", creci: "18.865-J", image: "/junior.jpg" },
  { id: 3, name: "Natan Barreto", role: "Especialista em imóveis", creci: "18.865-J", image: "/natan.jpg" }
];

const BrokerGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <section className="bg-slate-50 py-12 lg:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="text-blue-600 font-black text-[9px] uppercase tracking-[0.4em] mb-3 block">
            Time Especialista
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Curadoria de <span className="text-blue-600">Resultados</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {brokers.map((broker) => (
            <motion.div
              key={broker.id}
              variants={itemVariants}
              className="group relative bg-white rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 transition-all duration-500 hover:shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="relative h-80 lg:h-96 overflow-hidden bg-slate-200">
                <img 
                  src={broker.image} 
                  alt={broker.name} 
                  // ✅ CORREÇÃO: grayscale-0 no mobile, lg:grayscale no PC
                  className="w-full h-full object-cover grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 transform-gpu"
                  style={{
                    willChange: 'filter, transform'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-100 shadow-sm z-10">
                  <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest">CRECI: {broker.creci}</p>
                </div>
              </div>

              <div className="p-6 lg:p-8 text-center bg-white relative z-10">
                <div className="flex justify-center gap-1 mb-2 text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" />
                  ))}
                </div>
                
                <h3 className="text-lg lg:text-xl font-black text-slate-900 mb-1 tracking-tight">
                  {broker.name}
                </h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter mb-1.5">
                  {broker.role}
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                  Corretor Parceiro
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 lg:mt-12 text-center"
        >
          <p className="text-slate-400 font-medium text-xs lg:text-sm tracking-wide">
            Especialistas focados na <span className="text-slate-900 font-bold border-b-2 border-blue-500/20 pb-0.5">segurança</span> da sua <span className="text-slate-900 font-black uppercase tracking-tighter">melhor escolha.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrokerGrid;