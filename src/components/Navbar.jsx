// front/src/components/Navbar.jsx
import React from 'react';
import natanlogo from '../assets/natanlogo.png';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Navbar = ({ onHomeClick }) => {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-gray-100/50 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Altura ajustada para destacar a marca e dar respiro */}
        <div className="flex items-center justify-between h-24 md:h-28">
          
          {/* Lado Esquerdo: Logo e Identidade Estratégica */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:gap-5 shrink-0 cursor-pointer"
            onClick={onHomeClick}
          >
            {/* Logo: h-14 no mobile e h-20 no desktop para máxima visibilidade */}
            <img 
              src={natanlogo}
              alt="Natan Corretor" 
              className="h-14 md:h-20 w-auto object-contain" 
            />
            
            {/* Divisor e Texto: Mudado para Estrategista (mais técnico e forte) */}
            <div className="hidden lg:flex flex-col justify-center border-l border-gray-200 pl-4 h-12">
              <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.2em] leading-none mb-1">
                Estrategista
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tighter lg:tracking-widest whitespace-nowrap leading-none">
                Consultoria Imobiliária
              </span>
            </div>
          </motion.div>

          {/* Lado Direito: CTA Convidativo com Efeito Shine */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <a 
              href="https://wa.me/558888337051" 
              target="_blank" 
              rel="noopener noreferrer"
              /* Gradiente verde e overflow-hidden para o brilho interno */
              className="group relative flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 rounded-xl md:rounded-2xl text-[10px] sm:text-xs md:text-sm font-black transition-all shadow-lg shadow-green-100 hover:shadow-green-200 active:scale-95 whitespace-nowrap overflow-hidden"
            >
              {/* Efeito de Brilho (Shine) que passa pelo botão automaticamente */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
              />

              <MessageCircle size={18} className="group-hover:rotate-12 transition-transform shrink-0 md:w-5 md:h-5" />
              
              {/* Texto ajustado para ser mais convidativo e caber no mobile */}
              <div className="flex flex-row sm:gap-1 items-center">
                <span className="inline">Agendar</span>
                <span className="inline">Consultoria</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;