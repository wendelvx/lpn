// front/src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import profileImg from "../assets/profile.jpeg";
import logomelo from "../assets/logomelo.png";
import logonatan from "../assets/natanlogo.png";

const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById('property-grid');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative bg-white pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Background Decor - Ajustado para não causar scroll horizontal no mobile */}
      <div className="absolute top-0 right-0 w-full sm:w-1/3 h-full bg-blue-50/20 -z-10 skew-x-0 sm:skew-x-12 origin-top-right"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:gap-12 xl:gap-16">
        
        {/* Coluna da Esquerda: Textos e Branding */}
        <div className="w-full lg:w-3/5 text-center lg:text-left z-10">
          
          {/* SEÇÃO DE LOGOS: Empilhamento inteligente no mobile */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 mb-8 sm:mb-10"
          >
            {/* Logo Ítalo Mello */}
            <div className="flex flex-col items-center lg:items-start gap-1.5 group">
              <span className="text-[8px] sm:text-[9px] uppercase font-bold text-blue-600 tracking-[0.3em] opacity-70">
                Parceria Institucional
              </span>
              <img 
                src={logomelo} 
                alt="Ítalo Mello" 
                className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>

            {/* Divisor: Oculto no mobile extremo, visível a partir de SM */}
            <div className="hidden sm:block h-10 lg:h-12 w-[1px] bg-gray-200 mt-5"></div>

            {/* Logo Natan */}
            <div className="flex flex-col items-center lg:items-start gap-1.5 group">
              <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-400 tracking-[0.3em] opacity-60">
                Corretor Responsável
              </span>
              <img 
                src={logonatan} 
                alt="Natan Logo" 
                className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.2] lg:leading-[1.1] mb-6 tracking-tight"
          >
            A chave para o seu <br className="hidden sm:block lg:block" />
            <span className="text-blue-600">novo capítulo</span> está aqui.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Consultoria especializada em Juazeiro do Norte e região. 
            Segurança jurídica e atendimento exclusivo em cada negociação, 
            com o respaldo da Ítalo Mello Negócios Imobiliários.
          </motion.p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProperties}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 sm:px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 mx-auto lg:mx-0 text-sm sm:text-base"
          >
            Explorar Imóveis
            <span className="text-xl">→</span>
          </motion.button>
        </div>

        {/* Coluna da Direita: Perfil e Badge */}
        <div className="w-full lg:w-2/5 mt-12 sm:mt-16 lg:mt-0 relative flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Moldura Decorativa - Ajustada para não vazar da tela */}
            <div className="absolute inset-0 border-2 border-blue-100 rounded-[2.5rem] sm:rounded-[3rem] rotate-3 sm:rotate-6"></div>
            
            {/* Foto de Perfil Adaptável */}
            <div className="relative z-10 w-56 h-72 xs:w-64 xs:h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[480px] xl:w-[380px] xl:h-[520px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-gray-50">
              <img 
                src={profileImg}
                alt="Corretor de Imóveis" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* BADGE: Visível a partir de tablets (sm) para evitar poluição no celular */}
            <div className="absolute -bottom-4 -right-4 sm:bottom-10 sm:-right-6 bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl z-20 border border-gray-50 max-w-[140px] sm:max-w-none">
              <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5 sm:mb-1">
                Especialista em
              </p>
              <p className="text-blue-600 font-black text-sm sm:text-xl leading-tight">
                Negócios <br /> Imobiliários
              </p>
              <div className="hidden sm:flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] sm:text-[9px] font-bold text-gray-800 uppercase tracking-tighter">
                  Consultoria Ativa
                </span>
              </div>
            </div>

            {/* Glow de fundo - Opacidade reduzida no mobile */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-blue-100 rounded-full blur-2xl sm:blur-3xl -z-10 opacity-30 sm:opacity-50"></div>
          </motion.div>
        </div>

      </div>
    </header>
  );
};

export default Hero;