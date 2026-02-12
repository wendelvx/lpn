import React from 'react';
import logomelo from '../assets/logomelo.png';
import { MapPin, Instagram, ChevronRight, ShieldCheck } from 'lucide-react';

const Footer = ({ onNavigateToGrid }) => {
  const currentYear = new Date().getFullYear();

  const handleVerImoveis = (e) => {
    e.preventDefault();
    if (onNavigateToGrid) {
      onNavigateToGrid();
    } else {
      const element = document.getElementById('catalog');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/5 pb-16">
          
          {/* Coluna 1: Branding Institucional (Ítalo Mello) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src={logomelo}
              alt="Ítalo Mello Negócios Imobiliários" 
              className="h-16 sm:h-20 w-auto mb-8 brightness-0 invert opacity-100 transition-all" 
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Referência em curadoria de ativos imobiliários e segurança jurídica na região do Cariri. 
              Transformando investimentos em patrimônios sólidos.
            </p>
          </div>

          {/* Coluna 2: Acesso Rápido e Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-black mb-8 text-blue-500 text-[10px] tracking-[0.4em] uppercase">
              Navegação
            </h4>
            <ul className="w-full flex flex-col items-center md:items-start space-y-5 text-sm font-bold text-slate-300">
              <li>
                <a href="/" className="hover:text-white transition-colors flex items-center gap-2 group tracking-widest text-[11px] uppercase">
                  <ChevronRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                  Início
                </a>
              </li>
              <li>
                <button 
                  onClick={handleVerImoveis}
                  className="hover:text-white transition-colors flex items-center gap-2 group tracking-widest text-[11px] uppercase"
                >
                  <ChevronRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                  Portfólio de Imóveis
                </button>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/italomellonegociosimobiliarios/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <Instagram size={16} />
                  </div>
                  @italomellonegocios
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Registro e Localização Triple A */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-black mb-8 text-blue-500 text-[10px] tracking-[0.4em] uppercase">
              Sede e Credibilidade
            </h4>
            <div className="flex flex-col items-center md:items-start gap-6 w-full">
              <div className="flex items-start gap-3 text-slate-300 group cursor-default">
                <MapPin size={20} className="text-blue-600 shrink-0" />
                <p className="text-xs font-bold leading-relaxed uppercase tracking-widest">
                  Juazeiro do Norte <br /> 
                  <span className="text-slate-500">Ceará, Brasil</span>
                </p>
              </div>

              {/* Selo de Registro Profissional */}
              <div className="py-3.5 px-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner flex items-center gap-3">
                <ShieldCheck size={20} className="text-blue-500" />
                <div>
                  <p className="font-black text-white tracking-[0.2em] text-[10px] leading-none mb-1">CRECI: 18.865-J</p>
                  <p className="text-[8px] text-slate-500 uppercase font-black tracking-tighter">Conselho Regional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Direitos Autorais e Assinatura */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-black">
            © {currentYear} Ítalo Mello Negócios Imobiliários.
          </p>
          <p className="text-slate-800 text-[8px] font-black uppercase tracking-widest">
            Excellence in Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;