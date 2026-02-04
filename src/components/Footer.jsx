// front/src/components/Footer.jsx
import React from 'react';
import natanlogo from '../assets/natanlogo.png';
import { MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          
          {/* Coluna 1: Branding - Logo Aumentada */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src={natanlogo}
              alt="Natan Corretor" 
              /* Aumento de escala: h-16 no mobile, h-20 em tablets e h-24 em desktops */
              className="h-16 sm:h-20 md:h-24 w-auto mb-6 object-contain brightness-0 invert opacity-90 transition-all" 
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Especialista em realizar sonhos através de consultoria imobiliária personalizada e segura, em parceria com Ítalo Mello Negócios Imobiliários.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-6 text-lg tracking-tight uppercase text-blue-500 text-[10px] tracking-[0.3em]">
              Navegação
            </h4>
            <ul className="text-gray-400 space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                  Início
                </a>
              </li>
              <li>
                <a href="#property-grid" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                  Ver Imóveis
                </a>
              </li>
              <li>
                <a href="https://italomello.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ExternalLink size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  Sobre a Ítalo Mello
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Localização e CRECI */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-6 text-lg tracking-tight uppercase text-blue-500 text-[10px] tracking-[0.3em]">
              Contato Oficial
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
          <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
            <div className="h-[1px] w-8 bg-gray-700"></div>
            <p className="text-gray-600 text-[9px] italic uppercase tracking-tighter">
              Excelência técnica em consultoria imobiliária
            </p>
            <div className="h-[1px] w-8 bg-gray-700"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;