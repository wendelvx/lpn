import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import logomelo from '../assets/logomelo.png';

const Navbar = ({ onHomeClick }) => {
  const phoneNumber = "558897699917";
  const message = "Olá! Gostaria de falar com um especialista sobre os ativos do portfólio da Ítalo Mello Negócios.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleNavigate = (sectionId) => {
    onHomeClick(); // Reseta para a Home caso esteja em detalhes
    
    setTimeout(() => {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = element.offsetTop - 90;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const navLinks = [
    { name: 'Início', id: 'top' },
    { name: 'Venda', id: 'catalog' },
    { name: 'Locação', id: 'catalog' },
    { name: 'Sobre', id: 'about' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-xl py-4 shadow-lg shadow-slate-200/50 transition-all border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* 🏷️ Lado Esquerdo: Branding Ítalo Mello */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => handleNavigate('top')}
          >
            <div className="relative">
              <img 
                src={logomelo}
                alt="Ítalo Mello Negócios Imobiliários" 
                className="h-10 sm:h-14 md:h-16 w-auto object-contain brightness-0 opacity-90 transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-lg">
                <ShieldCheck size={10} />
              </div>
            </div>
            
            <div className="hidden xl:flex flex-col justify-center border-l border-slate-200 pl-5">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] leading-none mb-1.5">
                Diretoria Executiva
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                Ítalo Mello
              </span>
            </div>
          </motion.div>

          {/* 🧭 Navegação Central */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleNavigate(link.id)}
                className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* 💎 Lado Direito: Atendimento com Especialista */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 bg-slate-900 hover:bg-blue-700 text-white px-5 py-3 md:px-7 md:py-4 rounded-2xl text-[10px] md:text-xs font-black transition-all active:scale-95 overflow-hidden shadow-xl shadow-slate-200"
            >
              {/* Efeito de brilho executivo */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              />
              <MessageCircle size={18} className="group-hover:rotate-12 transition-transform shrink-0" />
              <span className="uppercase tracking-[0.15em]">Falar com Especialista</span>
            </a>
          </motion.div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;