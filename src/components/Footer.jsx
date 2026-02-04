// front/src/components/Footer.jsx
import React from 'react';
import natanlogo from '../assets/natanlogo.png';
import { MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal: 1 coluna no mobile, 3 a partir do tablet (md) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          
          {/* Coluna 1: Branding e Descrição */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src={natanlogo}
              alt="Broker Logo White" 
              className="h-10 sm:h-12 w-auto mb-6 object-contain" 
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Especialista em realizar sonhos através de consultoria imobiliária personalizada e segura, em parceria com Ítalo Mello Negócios Imobiliários.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-6 text-lg tracking-tight">Links Rápidos</h4>
            <ul className="text-gray-400 space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  Início
                </a>
              </li>
              <li>
                <a href="#property-grid" className="hover:text-blue-400 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                  Ver Imóveis
                </a>
              </li>
              <li>
                <a href="https://italomello.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                  <ExternalLink size={14} />
                  Sobre a Ítalo Mello
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Localização e CRECI */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-6 text-lg tracking-tight">Localização</h4>
            <div className="flex flex-col items-center md:items-start gap-3 text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-500 shrink-0" />
                Juazeiro Do Norte - Ceará
              </p>
              <div className="mt-2 py-1 px-3 bg-gray-800 rounded-lg border border-gray-700">
                <p className="font-semibold text-gray-300">CRECI: 243.87J</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Direitos Autorais e Rodapé Final */}
        <div className="pt-8 text-center">
          <p className="text-gray-500 text-[10px] sm:text-xs tracking-wider uppercase">
            © {currentYear} [Seu Nome]. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-[9px] mt-2">
            Desenvolvido com foco em excelência imobiliária.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;