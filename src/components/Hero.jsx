import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Key, CheckCircle, ShieldCheck } from 'lucide-react';
import profileImg from "../assets/profile.png"; 
import logomelo from "../assets/logomelo.png";

const Hero = () => {
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    const offset = (element?.offsetTop || 0) - 100;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  // Variantes para efeito cascata (Premium Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <header className="relative bg-white pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
      {/* Background Decor com animação sutil */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-slate-50/50 -z-10 skew-x-0 lg:-skew-x-12 origin-top-right" 
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:gap-12">
        
        {/* 1. Lado Esquerdo: Conteúdo de Autoridade */}
        <div className="w-full lg:w-3/5 text-center lg:text-left z-10">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start"
          >
            {/* Branding */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start gap-2 mb-8 lg:mb-10">
              <img 
                src={logomelo} 
                alt="Ítalo Mello Negócios Imobiliários" 
                className="h-10 sm:h-14 md:h-16 w-auto object-contain brightness-0 opacity-90" 
              />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.5em] ml-1">
                Diretor Executivo
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Segurança e o cuidado <br />
              <span className="text-blue-600">com a sua melhor</span> escolha.
            </motion.h1>
            
            {/* Texto de Apoio */}
            <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Há mais de <span className="text-slate-900 font-bold border-b-2 border-blue-500/20 pb-0.5">15 anos</span>, a 
              <span className="text-slate-900 font-bold"> Ítalo Mello Negócios Imobiliários</span> atua com rigor técnico na região do Cariri. 
              Nossa curadoria é realizada com foco na preservação do seu patrimônio e na total segurança jurídica.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <button 
                onClick={scrollToCatalog}
                className="group w-full sm:w-auto bg-slate-900 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 text-xs tracking-widest uppercase"
              >
                <Building2 size={16} className="group-hover:translate-y-[-2px] transition-transform" />
                Imóveis para Venda
              </button>
              
              <button 
                onClick={scrollToCatalog}
                className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 text-xs tracking-widest uppercase"
              >
                <Key size={16} />
                Opções de Locação
              </button>
            </motion.div>

            {/* Badges de Confiança */}
            <motion.div variants={itemVariants} className="mt-8 lg:mt-10 flex items-center justify-center lg:justify-start gap-5 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600" /> +15 Anos de Mercado</span>
              <span className="h-4 w-px bg-slate-200 hidden sm:block"></span>
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600" /> CRECI: 18.865-J</span>
            </motion.div>
          </motion.div>
        </div>

        {/* 2. Lado Direito: Perfil com Revelação Lateral */}
        <div className="w-full lg:w-2/5 mt-12 lg:mt-0 relative flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 border-2 border-blue-600/10 rounded-[2.5rem] rotate-3 scale-105"></div>
            
            <div className="relative z-10 w-56 h-72 sm:w-72 sm:h-96 lg:w-80 lg:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img 
                src={profileImg}
                alt="Ítalo Mello" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <p className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">Diretor</p>
                </div>
                <p className="text-white font-black text-xl sm:text-2xl uppercase tracking-tighter">Ítalo Mello</p>
              </div>
            </div>

            {/* Especialista Imobiliário Badge (Pop-in atrasado) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-50 z-20"
            >
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
                  Especialista Imobiliário
                </span>
              </div>
              <p className="text-slate-400 text-[8px] sm:text-[9px] font-bold uppercase leading-tight italic">
                Atendimento direto
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </header>
  );
};

export default Hero;