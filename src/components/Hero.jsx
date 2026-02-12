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

  return (
    <header className="relative bg-white pt-36 pb-20 lg:pt-52 lg:pb-36 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-slate-50/50 -z-10 skew-x-0 lg:-skew-x-12 origin-top-right transition-all"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:gap-16">
        
        {/* 1. Lado Esquerdo: Conteúdo de Autoridade */}
        <div className="w-full lg:w-3/5 text-center lg:text-left z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center lg:items-start gap-3 mb-12"
          >
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] ml-1">
              Diretoria Executiva
            </span>
            <img 
              src={logomelo} 
              alt="Ítalo Mello Negócios Imobiliários" 
              className="h-12 sm:h-16 md:h-20 w-auto object-contain brightness-0 opacity-90 transition-all duration-500" 
            />
          </motion.div>

          {/* Headline: Foco em Segurança, Cuidado e Escolha Correta */}
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight"
          >
            Segurança e o cuidado <br />
            <span className="text-blue-600">com a sua melhor</span> escolha.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Há mais de <span className="text-slate-900 font-bold underline decoration-blue-500/30 underline-offset-4">15 anos</span>, a 
            <span className="text-slate-900 font-bold"> Ítalo Mello Negócios Imobiliários</span> atua com transparência e rigor técnico na região do Cariri. 
            Nossa curadoria é realizada com foco na preservação do seu patrimônio, assegurando que cada decisão seja pautada pela ética e pela total segurança jurídica.
          </motion.p>

          {/* Botões Gêmeos de Conversão */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
          >
            <button 
              onClick={scrollToCatalog}
              className="group w-full sm:w-auto bg-slate-900 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-2xl shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
            >
              <Building2 size={18} />
              Ver Imóveis para Venda
            </button>
            
            <button 
              onClick={scrollToCatalog}
              className="group w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-900 font-black py-5 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
            >
              <Key size={18} />
              Opções de Locação
            </button>
          </motion.div>

          {/* Prova Social de Autoridade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-slate-400 font-bold text-[10px] uppercase tracking-widest"
          >
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-blue-600" /> Experiência Comprovada</span>
            <span className="flex items-center gap-2 border-l border-slate-200 pl-6"><CheckCircle size={14} className="text-blue-600" /> Cuidado Patrimonial</span>
          </motion.div>
        </div>

        {/* 2. Lado Direito: O Diretor Ítalo Mello */}
        <div className="w-full lg:w-2/5 mt-20 lg:mt-0 relative flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 border-2 border-blue-600/10 rounded-[3rem] rotate-6 scale-105"></div>
            
            <div className="relative z-10 w-64 h-80 sm:w-80 sm:h-[450px] lg:w-[380px] lg:h-[520px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white bg-slate-100">
              <img 
                src={profileImg}
                alt="Ítalo Mello - Fundador" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-8">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em]">Gestão & Segurança</p>
                </div>
                <p className="text-white font-black text-2xl uppercase tracking-tighter">Ítalo Mello</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 hidden sm:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Consultoria Ativa</span>
              </div>
              <p className="text-slate-400 text-[9px] font-bold uppercase leading-tight text-center italic">Atendimento direto <br />com especialistas</p>
            </div>
          </motion.div>
        </div>

      </div>
    </header>
  );
};

export default Hero;