import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MessageCircle, MapPin, CheckCircle2, 
  ShieldCheck, Bed, Bath, Car, ChevronLeft, ChevronRight, X, Maximize2, Share2
} from 'lucide-react';

// 1. IMPORTAÇÃO DO MOCK (Ajuste o caminho se necessário)
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
        // 2. BUSCA LOCAL NO MOCK
        // Procuramos o imóvel pelo código recebido via prop
        const foundProperty = mockData.data.find(p => p.codigo === propertyCode);
        
        if (foundProperty) {
          setProperty(foundProperty);
          // Prefetch de imagens para transições suaves
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
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );

  if (!property) return (
    <div className="py-20 text-center flex flex-col items-center gap-4">
      <p className="font-bold text-slate-400 italic">Ativo não localizado no portfólio atual.</p>
      <button onClick={onBack} className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline">
        Voltar para a listagem
      </button>
    </div>
  );

  const isVenda = property.contrato?.includes('Venda');
  const shareMessage = `Olá! Solicito consultoria exclusiva para o imóvel: ${property.subtipo} em ${property.endereco_bairro} (Ref: ${property.codigo}).`;
  const whatsappUrl = `https://wa.me/${brokerPhone}?text=${encodeURIComponent(shareMessage)}`;
  const currentMainImage = property.imagens?.[currentIndex]?.link || '';

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="bg-slate-50 min-h-screen pb-20"
    >
      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <button className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all">
              <X size={32} />
            </button>
            <motion.img 
              key={currentIndex} src={currentMainImage}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex gap-8 mt-10">
              <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev - 1 + property.imagens.length) % property.imagens.length); }} className="p-4 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all"><ChevronLeft size={32} /></button>
              <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev + 1) % property.imagens.length); }} className="p-4 rounded-full bg-white/5 text-white hover:bg-white/10 transition-all"><ChevronRight size={32} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header de Navegação */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-[0.2em] hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
            Voltar ao Portfólio
          </button>
          <button className="p-3 bg-white rounded-full shadow-sm text-slate-400 hover:text-blue-600 transition-all border border-slate-100">
            <Share2 size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Galeria */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div 
                onClick={() => setIsExpanded(true)}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-200 aspect-video flex items-center justify-center cursor-zoom-in"
              >
                <AnimatePresence mode='wait'>
                  <motion.img 
                    key={currentIndex} src={currentMainImage} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black tracking-widest text-slate-900 shadow-xl border border-white">
                  {currentIndex + 1} / {property.imagens?.length} FOTOS
                </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {property.imagens?.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      currentIndex === idx ? 'border-blue-600 scale-95 shadow-lg' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img.link_thumb} className="w-full h-full object-cover" alt="preview" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dados do Ativo */}
          <div className="lg:col-span-5">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  isVenda ? 'bg-amber-100 text-amber-700' : 'bg-slate-900 text-white'
                }`}>
                  {property.contrato}
                </span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Cód: {property.codigo}</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
                {property.subtipo} <br />
                <span className="text-blue-600">Curadoria Triple A</span>
              </h1>
              
              <div className="flex items-start gap-3 text-slate-500 font-medium">
                <div className="mt-1 bg-blue-50 p-2 rounded-lg text-blue-600">
                  <MapPin size={20} />
                </div>
                <span className="text-lg leading-relaxed">
                  {property.endereco_bairro}, {property.endereco_cidade}
                </span>
              </div>
            </header>

            {/* Ticket de Investimento */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] mb-10 shadow-2xl shadow-slate-200">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
                {isVenda ? 'Ticket de Investimento' : 'Valor da Locação'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-blue-400 text-2xl font-black">R$</span>
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
                  {property.valor_venda 
                    ? new Intl.NumberFormat('pt-BR').format(property.valor_venda) 
                    : "Sob Consulta"}
                </span>
              </div>
            </div>

            {/* Grid de Atributos */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-5 shadow-sm">
                <div className="bg-slate-50 p-3 rounded-2xl text-slate-900"><Bed size={22} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Dormitórios</p>
                  <p className="text-xl font-black text-slate-900">{property.dormitorios || 0}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center gap-5 shadow-sm">
                <div className="bg-slate-50 p-3 rounded-2xl text-slate-900"><Car size={22} /></div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Vagas</p>
                  <p className="text-xl font-black text-slate-900">{property.garagens || 0}</p>
                </div>
              </div>
            </div>

            {/* Diferenciais */}
            <div className="mb-10">
              <h3 className="text-slate-900 font-black uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-blue-600" /> Atributos de Valor
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.imovel_comodidades?.split(',').map((item, i) => (
                  <span key={i} className="bg-white border border-slate-100 text-slate-600 px-5 py-2.5 rounded-2xl text-[11px] font-bold shadow-sm">
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Descrição / Consultoria */}
            <div className="mb-12">
              <h3 className="text-slate-900 font-black uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-3">
                <ShieldCheck size={18} className="text-blue-600" /> Parecer Consultivo (Ítalo Mello)
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-8 rounded-[2rem] border border-dashed border-slate-200">
                {property.observacoes}
              </p>
            </div>

            {/* CTA Final */}
            <a 
              href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 w-full bg-blue-600 hover:bg-slate-900 text-white font-black py-6 rounded-3xl shadow-xl shadow-blue-100 transition-all active:scale-95 text-lg uppercase tracking-widest"
            >
              <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
              Solicitar Consultoria Private
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;