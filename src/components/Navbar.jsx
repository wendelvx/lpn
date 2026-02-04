// front/src/components/Navbar.jsx
import React from 'react';
import natanlogo from '../assets/natanlogo.png';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-gray-100/50 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Altura ajustada para acomodar a logo maior com respiro */}
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Lado Esquerdo: Logo e Identidade */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:gap-5 shrink-0"
          >
            {/* Logo: Aumentada de h-8/10 para h-12/16 para maior destaque */}
            <img 
              src={natanlogo}
              alt="Natan Corretor" 
              className="h-12 md:h-16 w-auto object-contain" 
            />
            
            {/* Divisor e Texto: Mudado para Consultoria de Valor */}
            <div className="hidden sm:flex flex-col justify-center border-l border-gray-200 pl-4 h-10">
              <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-[0.2em] leading-none mb-1">
                Especialista
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tighter lg:tracking-widest whitespace-nowrap leading-none">
                Consultoria de Valor
              </span>
            </div>
          </motion.div>

          {/* Lado Direito: CTA Responsivo e Convidativo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <a 
              href="https://wa.me/558888337051" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-2xl text-xs md:text-sm font-black transition-all shadow-lg shadow-green-100 hover:shadow-green-200 active:scale-95 whitespace-nowrap"
            >
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform shrink-0" />
              <span className="inline">Falar com</span>
              <span className="hidden xs:inline md:inline">Especialista</span>
            </a>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;