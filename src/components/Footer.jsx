// front/src/components/Footer.jsx
import React from 'react';
import natanlogo from '../assets/natanlogo.png';
import { MapPin, Instagram, ChevronRight } from 'lucide-react';

const Footer = ({ onNavigateToGrid }) => {
  const currentYear = new Date().getFullYear();

  const handleVerImoveis = (e) => {
    e.preventDefault();
    if (onNavigateToGrid) {
      // Chama a função que reseta o estado no App.jsx
      onNavigateToGrid();
    } else {
      // Fallback caso já esteja na home
      const element = document.getElementById('property-grid');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          
          {/* Coluna 1: Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src={natanlogo}
              alt="Natan Corretor" 
              className="h-16 sm:h-20 md:h-24 w-auto mb-6 object-contain brightness-0 invert opacity-90 transition-all" 
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
             Sua ponte para investimentos seguros e moradias de alto padrão na região do Cariri.
            </p>
          </div>

          {/* Coluna 2: Navegação e Redes Sociais */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-6 text-lg tracking-tight uppercase text-blue-500 text-[10px] tracking-[0.3em]">
              Navegação
            </h4>
            <ul className="text-gray-400 space-y-4 text-sm font-medium">
              <li>
                <a href="/" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-blue-500" />
                  Início
                </a>
              </li>
              <li>
                {/* Botão que reseta o estado de visualização */}
                <button 
                  onClick={handleVerImoveis}
                  className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group"
                >
                  <ChevronRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                  Ver Imóveis
                </button>
              </li>
              
              {/* Instagram Natan */}
              <li>
                <a href="https://www.instagram.com/natan.s.barreto.m/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <Instagram size={14} className="text-blue-500" />
                  Instagram Natan Barreto
                </a>
              </li>

              {/* Instagram Ítalo */}
              <li>
                <a href="https://www.instagram.com/italomellonegociosimobiliarios/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <Instagram size={14} className="text-blue-500" />
                  Instagram Ítalo Mello
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Registro e Localização */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-6 text-lg tracking-tight uppercase text-blue-500 text-[10px] tracking-[0.3em]">
              Registro e Localização
            </h4>
            <div className="flex flex-col items-center md:items-start gap-3 text-gray-400 text-sm">
              <p className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                Juazeiro Do Norte - Ceará
              </p>
              <div className="mt-2 py-2.5 px-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                <p className="font-black text-gray-200 tracking-[0.2em] text-xs">CRECI: 243.87J</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Direitos Autorais */}
        <div className="pt-8 text-center">
          <p className="text-gray-500 text-[10px] sm:text-xs tracking-widest uppercase font-medium">
            © {currentYear} Natan de Sá Barreto Menezes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;