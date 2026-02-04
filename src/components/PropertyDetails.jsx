// front/src/components/PropertyDetails.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MessageCircle, MapPin, CheckCircle2, 
  Calendar, Bed, Bath, Car, ChevronLeft, ChevronRight, X, Maximize2
} from 'lucide-react';

const PropertyDetails = ({ propertyCode, onBack }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const brokerPhone = "558881626907"; 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/property-details?code=${propertyCode}`);
        const result = await response.json();
        
        if (result.data) {
          setProperty(result.data);
          result.data.imagens?.forEach((img) => {
            const prefetch = new Image();
            prefetch.src = img.link;
          });
        }
      } catch (error) {
        console.error("Error loading property details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    window.scrollTo(0, 0);
  }, [propertyCode]);

  const nextImage = (e) => {
    e?.stopPropagation();
    if (!property?.imagens) return;
    setCurrentIndex((prev) => (prev + 1) % property.imagens.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (!property?.imagens) return;
    setCurrentIndex((prev) => (prev - 1 + property.imagens.length) % property.imagens.length);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-blue-600"></div>
    </div>
  );

  if (!property) return <div className="py-20 text-center font-medium text-gray-500 px-4">Imóvel não encontrado.</div>;

  const shareMessage = `Olá! Tenho interesse no imóvel: ${property.subtipo} em ${property.endereco_bairro} (Cód: ${property.codigo}).`;
  const whatsappUrl = `https://wa.me/${brokerPhone}?text=${encodeURIComponent(shareMessage)}`;
  
  const currentMainImage = property.imagens?.[currentIndex]?.link || '';

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="bg-white min-h-screen pb-12 sm:pb-20 pt-20 sm:pt-24"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10"
            onClick={() => setIsExpanded(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md transition-all z-[210]"
              onClick={() => setIsExpanded(false)}
            >
              <X size={28} />
            </button>

            <div className="absolute inset-x-4 md:inset-x-10 flex justify-between items-center z-[210] pointer-events-none">
              <button onClick={prevImage} className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 pointer-events-auto transition-all">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextImage} className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 pointer-events-auto transition-all">
                <ChevronRight size={32} />
              </button>
            </div>

            <motion.img 
              key={currentIndex}
              src={currentMainImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              alt="Expanded view"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="mt-6 text-white/60 font-medium text-sm">
              {currentIndex + 1} / {property.imagens?.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack} 
          className="group mb-6 sm:mb-8 py-2 flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a listagem
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div 
                onClick={() => setIsExpanded(true)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-slate-900 aspect-video flex items-center justify-center cursor-zoom-in"
              >
                <AnimatePresence mode='wait'>
                  <motion.img 
                    key={currentIndex}
                    src={currentMainImage} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain" 
                    alt="Property Detail" 
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30">
                      <Maximize2 size={24} />
                   </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <button onClick={prevImage} className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all pointer-events-auto">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all pointer-events-auto">
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold">
                  {currentIndex + 1} / {property.imagens?.length}
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-4 scrollbar-hide snap-x">
                {property.imagens?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all snap-start ${
                      currentIndex === idx ? 'border-blue-600 scale-95 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img.link_thumb} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest">
                {property.contrato}
              </span>
              <span className="text-gray-300 font-bold">|</span>
              <span className="text-gray-400 text-xs sm:text-sm font-medium">REF: {property.codigo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
              {property.subtipo} <span className="text-blue-600">Exclusiva</span>
            </h1>
            
            {/* CORREÇÃO DO LOCALIZAÇÃO: Removido 'truncate' e adicionado 'whitespace-normal' */}
            <p className="text-gray-500 text-base sm:text-lg lg:text-xl flex items-start gap-2 mb-6 sm:mb-8 font-medium">
              <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
              <span className="whitespace-normal leading-snug">
                {property.endereco_bairro}, {property.endereco_cidade}
              </span>
            </p>

            <div className="bg-blue-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 sm:mb-10 border border-blue-100">
              <p className="text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 text-center lg:text-left">
                Valor de Investimento
              </p>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight text-center lg:text-left">
                {property.valor_venda 
                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.valor_venda) 
                  : "Sob Consulta"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 border border-gray-100">
                <div className="bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-sm text-blue-600 shrink-0"><Bed size={18} /></div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-bold">Quartos</p>
                  <p className="font-extrabold text-gray-800 text-sm sm:text-base truncate">{property.dormitorios || 0}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-3 sm:gap-4 border border-gray-100">
                <div className="bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-sm text-blue-600 shrink-0"><Car size={18} /></div>
                <div className="min-w-0">
                  <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase font-bold">Vagas</p>
                  <p className="font-extrabold text-gray-800 text-sm sm:text-base truncate">{property.garagens || 0}</p>
                </div>
              </div>
            </div>

            <div className="mb-8 sm:mb-10">
              <h3 className="font-black text-gray-900 mb-4 sm:mb-6 uppercase text-xs sm:text-sm tracking-widest flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0" /> Diferenciais
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.imovel_comodidades?.split(',').map((item, i) => (
                  <span key={i} className="bg-white border border-gray-100 text-gray-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-bold shadow-sm whitespace-normal">
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-10 sm:mb-12">
              <h3 className="font-black text-gray-900 mb-4 sm:mb-6 uppercase text-xs sm:text-sm tracking-widest flex items-center gap-2">
                <Calendar size={18} className="text-blue-600 shrink-0" /> Descrição
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line bg-gray-50/50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-dashed border-gray-200">
                {property.observacoes}
              </p>
            </div>

            <a 
              href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-xl transition-all active:scale-95 text-base sm:text-lg"
            >
              <MessageCircle size={22} className="sm:w-6 sm:h-6" />
              Falar com Corretor agora
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;