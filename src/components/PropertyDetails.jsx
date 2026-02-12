import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, UserCheck, MapPin, CheckCircle2, 
  ShieldCheck, Bed, Bath, Car, ChevronLeft, ChevronRight, X, Maximize2, Share2
} from 'lucide-react';

import mockData from '../data/mock_properties.json';

const PropertyDetails = ({ propertyCode, onBack }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const brokerPhone = "558897699917"; 

  useEffect(() => {
    const loadDetails = () => {
      setLoading(true);
      try {
        const foundProperty = mockData.data.find(p => p.codigo === propertyCode);
        if (foundProperty) {
          setProperty(foundProperty);
          foundProperty.imagens?.forEach((img) => {
            const prefetch = new Image();
            prefetch.src = img.link;
          });
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do ativo:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [propertyCode]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );

  if (!property) return <div className="py-20 text-center font-bold text-slate-400">Ativo não localizado.</div>;

  const isVenda = property.contrato?.includes('Venda');
  const shareMessage = `Olá! Gostaria de falar com o consultor sobre o imóvel: ${property.subtipo} (Ref: ${property.codigo}).`;
  const whatsappUrl = `https://wa.me/${brokerPhone}?text=${encodeURIComponent(shareMessage)}`;
  const currentMainImage = property.imagens?.[currentIndex]?.link || '';

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="bg-slate-50 min-h-screen pb-12 sm:pb-20"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center p-2 sm:p-4"
            onClick={() => setIsExpanded(false)}
          >
            <button className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white bg-white/10 p-3 sm:p-4 rounded-full hover:bg-white/20 transition-all z-10">
              <X size={24} />
            </button>
            <motion.img 
              key={currentIndex} src={currentMainImage}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex gap-6 sm:gap-10 mt-6 sm:mt-10">
              <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev - 1 + property.imagens.length) % property.imagens.length); }} className="p-3 sm:p-4 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all"><ChevronLeft size={28} /></button>
              <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev + 1) % property.imagens.length); }} className="p-3 sm:p-4 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all"><ChevronRight size={28} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Navigation Mobile Friendly */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-2 text-slate-500 font-black text-[10px] sm:text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <button className="p-2.5 bg-white rounded-full shadow-sm text-slate-400 hover:text-blue-600 transition-all border border-slate-100">
            <Share2 size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* 📸 Galeria Adaptativa */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32 space-y-4 sm:space-y-6">
              <div 
                onClick={() => setIsExpanded(true)}
                className="group relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl bg-slate-200 aspect-[4/3] sm:aspect-video flex items-center justify-center cursor-zoom-in"
              >
                <AnimatePresence mode='wait'>
                  <motion.img 
                    key={currentIndex} src={currentMainImage} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors" />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest text-slate-900 shadow-lg border border-white">
                  {currentIndex + 1} / {property.imagens?.length} FOTOS
                </div>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
                {property.imagens?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all snap-start ${
                      currentIndex === idx ? 'border-blue-600 scale-95 shadow-md' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img.link_thumb} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 📄 Informações do Ativo */}
          <div className="lg:col-span-5">
            <header className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  isVenda ? 'bg-amber-100 text-amber-700' : 'bg-slate-900 text-white'
                }`}>
                  {property.contrato}
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400 text-[9px] font-bold tracking-widest uppercase">REF: {property.codigo}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4 sm:mb-6">
                {property.subtipo} <br className="hidden sm:block" />
                <span className="text-blue-600 font-medium">Curadoria Especializada</span>
              </h1>
              
              <div className="flex items-start gap-2 text-slate-500 font-medium">
                <MapPin size={18} className="text-blue-600 shrink-0 mt-1" />
                <span className="text-base sm:text-lg leading-snug">
                  {property.endereco_bairro}, {property.endereco_cidade}
                </span>
              </div>
            </header>

            {/* 💰 Preço (Responsivo) */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] mb-8 shadow-xl shadow-slate-200">
              <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.3em] mb-2 sm:mb-3">
                {isVenda ? 'Investimento Estimado' : 'Valor da Locação'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-blue-400 text-xl sm:text-2xl font-black">R$</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter">
                  {property.valor_venda 
                    ? new Intl.NumberFormat('pt-BR').format(property.valor_venda) 
                    : "Sob Consulta"}
                </span>
              </div>
            </div>

            {/* 📐 Atributos (Grid 2 colunas no mobile) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100 flex items-center gap-3 sm:gap-5 shadow-sm">
                <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-slate-900"><Bed size={20} /></div>
                <div>
                  <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-black tracking-widest">Quartos</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900">{property.dormitorios || 0}</p>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-100 flex items-center gap-3 sm:gap-5 shadow-sm">
                <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-slate-900"><Car size={20} /></div>
                <div>
                  <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-black tracking-widest">Vagas</p>
                  <p className="text-lg sm:text-xl font-black text-slate-900">{property.garagens || 0}</p>
                </div>
              </div>
            </div>

            {/* Diferenciais (Flex wrap para mobile) */}
            <div className="mb-8">
              <h3 className="text-slate-900 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" /> Atributos do Imóvel
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.imovel_comodidades?.split(',').map((item, i) => (
                  <span key={i} className="bg-white border border-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] sm:text-[11px] font-bold shadow-sm">
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Análise Técnica */}
            <div className="mb-10">
              <h3 className="text-slate-900 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-600" /> Análise do Especialista
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-dashed border-slate-200">
                {property.observacoes}
              </p>
            </div>

            {/* 👤 CTA HUMANO: UserCheck icon + Texto Direto */}
            <a 
              href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full bg-blue-600 hover:bg-slate-900 text-white font-black py-5 sm:py-6 rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-100 transition-all active:scale-95 text-base sm:text-lg uppercase tracking-widest"
            >
              <UserCheck size={24} className="group-hover:scale-110 transition-transform" />
              <span>Falar com o Consultor</span>
            </a>
            
            <p className="text-center mt-4 text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">
              Ítalo Mello Negócios Imobiliários
            </p>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;