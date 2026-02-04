// front/src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-[100] border-b border-gray-100/50 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ajuste de altura dinâmica: menor no mobile para ganhar espaço de conteúdo */}
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Lado Esquerdo: Logo e Identidade */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 shrink-0"
          >
            {/* Logo escalável */}
            <img 
              src="/logo-corretor.png" 
              alt="Natan Corretor" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
            
            {/* Divisor e Texto: Ocultos em telas muito pequenas (xs) */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-6 w-[1px] bg-gray-200"></div>
              <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tighter lg:tracking-widest whitespace-nowrap">
                Negócios Imobiliários
              </span>
            </div>
          </motion.div>

          {/* Lado Direito: CTA Responsivo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <a 
              href="https://wa.me/558888337051" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl text-[11px] md:text-sm font-black transition-all shadow-lg shadow-green-100 hover:shadow-green-200 active:scale-95 whitespace-nowrap"
            >
              <MessageCircle size={18} className="group-hover:animate-bounce shrink-0" />
              <span className="inline">Contato</span>
              <span className="hidden md:inline">Direto</span>
            </a>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;