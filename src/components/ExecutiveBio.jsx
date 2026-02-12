import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star, Quote } from 'lucide-react';
import ownerImg from "../assets/profile.png"; 

const ExecutiveBio = () => {
  // Variantes otimizadas para performance mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, 
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="about" className="relative overflow-hidden bg-white py-12 lg:py-20">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Lado Esquerdo: Imagem (Colorida no Mobile / Grayscale no PC) */}
          <div className="relative w-full lg:w-1/2 max-w-sm lg:max-w-md">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="relative transform-gpu" 
            >
              <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/5] bg-slate-100">
                <img 
                  src={ownerImg} 
                  alt="Ítalo Mello - Diretor" 
                  className="w-full h-full object-cover grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-700 transform-gpu"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 text-white">
                  <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-1 opacity-80">Fundador & Diretor</p>
                  <h3 className="text-2xl font-black tracking-tight">Ítalo Mello</h3>
                </div>
              </div>

              {/* Badge Pop-in suave */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 z-20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
                    Especialista Imobiliário
                  </span>
                </div>
                <p className="text-slate-400 text-[8px] font-bold uppercase leading-tight italic text-center">Atendimento direto</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Lado Direito: Conteúdo */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase tracking-widest mx-auto lg:mx-0">
                <Star size={12} fill="currentColor" />
                Compromisso com o seu Patrimônio
              </motion.div>

              {/* ✅ CORREÇÃO AQUI: Fechamento </motion.h2> */}
              <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                A segurança de quem <br />
                <span className="text-blue-600">cuida de cada detalhe.</span>
              </motion.h2>

              <motion.div variants={itemVariants} className="relative pt-2">
                <Quote className="absolute -top-2 -left-4 text-blue-100 w-10 h-10 -z-10 hidden lg:block" />
                <p className="text-base lg:text-lg text-slate-600 leading-relaxed font-medium italic">
                  "Na <span className="text-slate-900 font-bold">Ítalo Mello Negócios Imobiliários</span>, nossa missão é garantir que sua transição patrimonial seja cercada de cuidado e total segurança jurídica."
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
                <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Gestão de Riscos</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">CRECI: 18.865-J</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Análise Técnica</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Negócios Estratégicos</p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="pt-6">
                <button 
                  onClick={() => window.open('https://wa.me/558897699917', '_blank')}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest"
                >
                  Falar com o Especialista
                  <span className="text-lg">→</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBio;