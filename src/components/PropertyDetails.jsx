// front/src/components/PropertyDetails.jsx
import React, { useEffect, useState, useCallback } from 'react';
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
  const [imgLoading, setImgLoading] = useState(true); // Novo estado para controlar o loading da imagem no modal

  const brokerPhone = "558881626907"; 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/property-details?code=${propertyCode}`);
        const result = await response.json();
        
        if (result.data) {
          setProperty(result.data);
          // Otimização de Cache: Prefetching das imagens em alta resolução
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

  // UseCallback para evitar re-criação de funções e re-renders desnecessários
  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    if (!property?.imagens) return;
    setImgLoading(true); // Ativa o loading ao trocar
    setCurrentIndex((prev) => (prev + 1) % property.imagens.length);
  }, [property]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    if (!property?.imagens) return;
    setImgLoading(true);
    setCurrentIndex((prev) => (prev - 1 + property.imagens.length) % property.imagens.length);
  }, [property]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
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
      {/* MODAL DE IMAGEM EXPANDIDA OTIMIZADO */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            {/* Botão Fechar */}
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md z-[210]">
              <X size={28} />
            </button>

            {/* Navegação Modal */}
            <div className="absolute inset-x-4 md:inset-x-10 flex justify-between items-center z-[210] pointer-events-none">
              <button onClick={prevImage} className="p-3 rounded-full bg-white/10 text-white pointer-events-auto hover:bg-white/20 transition-all">
                <ChevronLeft size={32} />
              </button>
              <button onClick={nextImage} className="p-3 rounded-full bg-white/10 text-white pointer-events-auto hover:bg-white/20 transition-all">
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Container da Imagem com Skeleton Embutido */}
            <div className="relative w-full max-h-[80vh] flex items-center justify-center">
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <motion.img 
                key={currentIndex}
                src={currentMainImage}
                onLoad={() => setImgLoading(false)} // Só mostra quando carregar 100%
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: imgLoading ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                alt="Property View"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Contador Estilizado (Não pula mais!) */}
            <div className="mt-8 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              <span className="text-white font-bold text-sm tracking-widest">
                {currentIndex + 1} <span className="text-white/40 mx-1">/</span> {property.imagens?.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... Restante do código do Hero e Grid (Mantidos) ... */}
        <button 
          onClick={onBack} 
          className="group mb-6 sm:mb-8 py-2 flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a listagem
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Lado Esquerdo: Galeria Principal */}
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
                    alt="Property" 
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30">
                      <Maximize2 size={24} />
                   </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none">
                  <button onClick={prevImage} className="p-2 sm:p-3 rounded-full bg-white/20 text-white pointer-events-auto hover:bg-white/40">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="p-2 sm:p-3 rounded-full bg-white/20 text-white pointer-events-auto hover:bg-white/40">
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold">
                  {currentIndex + 1} / {property.imagens?.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {property.imagens?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setImgLoading(true); setCurrentIndex(idx); }}
                    className={`flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border-2 transition-all snap-start ${
                      currentIndex === idx ? 'border-blue-600 scale-95 shadow-md' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={img.link_thumb} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito: Infos (Ajustado com sua nova mensagem VIP) */}
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
            
            <p className="text-gray-500 text-base sm:text-lg lg:text-xl flex items-start gap-2 mb-6 sm:mb-8 font-medium">
              <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
              <span className="whitespace-normal leading-snug">
                {property.endereco_bairro}, {property.endereco_cidade}
              </span>
            </p>

            <div className="bg-blue-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 border border-blue-100">
              <p className="text-blue-600 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-2 text-center lg:text-left">
                Investimento Magnífico
              </p>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 tracking-tight text-center lg:text-left">
                {property.valor_venda 
                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.valor_venda) 
                  : "Sob Consulta"}
              </div>
            </div>

            {/* ... Restante das Comodidades e Descrição (Mantidos) ... */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100">
                <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600 shrink-0"><Bed size={18} /></div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Quartos</p>
                  <p className="font-extrabold text-gray-800 text-base">{property.dormitorios || 0}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100">
                <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600 shrink-0"><Car size={18} /></div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Vagas</p>
                  <p className="font-extrabold text-gray-800 text-base">{property.garagens || 0}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-black text-gray-900 mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
                <Calendar size={18} className="text-blue-600 shrink-0" /> Descrição Estratégica
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line bg-gray-50/50 p-6 rounded-3xl border border-dashed border-gray-200">
                {property.observacoes}
              </p>
            </div>

            <a 
              href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-4 sm:py-5 rounded-2xl shadow-xl transition-all active:scale-95 text-base sm:text-lg"
            >
              <MessageCircle size={22} />
              Solicitar Atendimento VIP
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;