// front/src/components/Navbar.jsx
import React from 'react';
import natanlogo from '../assets/natanlogo.png';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-gray-100/50 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aumentei a altura da Navbar (h-24 md:h-28) para dar respiro à logo maior */}
        <div className="flex items-center justify-between h-24 md:h-28">
          
          {/* Lado Esquerdo: Logo e Identidade */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:gap-5 shrink-0"
          >
            {/* Logo: Agora h-14 no mobile e h-20 no desktop */}
            <img 
              src={natanlogo}
              alt="Natan Corretor" 
              className="h-14 md:h-20 w-auto object-contain" 
            />
            
            {/* Divisor e Texto: Consultoria de Valor (Escondido no mobile para priorizar a logo) */}
            <div className="hidden lg:flex flex-col justify-center border-l border-gray-200 pl-4 h-12">
              <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.2em] leading-none mb-1">
                Especialista
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tighter lg:tracking-widest whitespace-nowrap leading-none">
                Consultoria de Valor
              </span>
            </div>
          </motion.div>

          {/* Lado Direito: CTA Responsivo - Ajustado para não cortar no mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <a 
              href="https://wa.me/558888337051" 
              target="_blank" 
              rel="noopener noreferrer"
              /* Ajustado px-2.5 e text-[10px] no mobile para caber o texto completo */
              className="group flex items-center gap-1.5 md:gap-2 bg-green-500 hover:bg-green-600 text-white px-2.5 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] sm:text-xs md:text-sm font-black transition-all shadow-lg shadow-green-100 hover:shadow-green-200 active:scale-95 whitespace-nowrap"
            >
              <MessageCircle size={18} className="group-hover:rotate-12 transition-transform shrink-0 md:w-5 md:h-5" />
              <div className="flex flex-row gap-1">
                <span className="inline">Falar com</span>
                <span className="inline">Especialista</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;