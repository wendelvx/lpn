import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star, Quote } from 'lucide-react';
import ownerImg from "../assets/profile.png"; 

const ExecutiveBio = () => {
  return (
    /* ADICIONADO: id="about" para a navegação do Navbar */
    <section id="about" className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Elemento Decorativo de Fundo */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Lado Esquerdo: Imagem com Moldura de Luxo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-1/2 max-w-md"
          >
            <div className="absolute inset-0 border-[12px] border-slate-900 rounded-[3rem] translate-x-6 translate-y-6 -z-10 hidden sm:block" />
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/5]">
              <img 
                src={ownerImg} 
                alt="Ítalo Mello - Diretor" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-8 text-white">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1 opacity-80">Fundador & Diretor</p>
                <h3 className="text-3xl font-black tracking-tight">Ítalo Mello</h3>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Conteúdo de Autoridade Máxima */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Star size={14} fill="currentColor" />
                Liderança e Visão de Mercado
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Assinatura de quem <br />
                <span className="text-blue-600">domina o setor</span>
              </h2>

              <div className="relative">
                <Quote className="absolute -top-4 -left-4 text-blue-100 w-12 h-12 -z-10" />
                <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                  "Na Ítalo Mello Negócios Imobiliários, nossa atuação vai além da venda; entregamos inteligência de mercado e curadoria rigorosa para garantir que cada ativo em nosso portfólio seja um investimento sólido."
                </p>
              </div>

              {/* Grid de Diferenciais Institucionais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">Gestão de Riscos</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">CRECI: 243.87J</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">Expertise Triple A</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">Negócios Estratégicos</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => window.open('https://wa.me/558897699917', '_blank')}
                  className="bg-slate-900 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-2xl shadow-slate-200 flex items-center gap-4 group text-xs uppercase tracking-widest"
                >
                  Conhecer Nossa Trajetória
                  <span className="group-hover:translate-x-2 transition-transform text-xl">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBio;