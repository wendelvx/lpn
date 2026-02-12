import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExecutiveBio from './components/ExecutiveBio'; 
import BrokerGrid from './components/BrokerGrid';     
import PropertyGrid from './components/PropertyGrid';
import PropertyDetails from './components/PropertyDetails';
import Footer from './components/Footer';

function App() {
  const [selectedPropertyCode, setSelectedPropertyCode] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSelectProperty = (code) => {
    setSelectedPropertyCode(code);
    window.scrollTo({ top: 0, behavior: 'instant' }); // Mudado para instant para evitar scroll visual na troca
  };

  const handleBack = () => {
    if (selectedPropertyCode === null) {
      const element = document.getElementById('catalog');
      element?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSelectedPropertyCode(null);
    
    setTimeout(() => {
      const element = document.getElementById('catalog');
      if (element) {
        const offset = element.offsetTop - 100;
        window.scrollTo({ top: offset, behavior: 'instant' });
      }
    }, 10); // Reduzido timeout para ser imperceptível
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[110]"
        style={{ scaleX }}
      />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-50" />

      <Navbar onHomeClick={() => setSelectedPropertyCode(null)} />

      {/* Removido o mode="wait" para evitar o gap visual (blink) */}
      <AnimatePresence>
        {!selectedPropertyCode ? (
          <motion.div
            key="landing"
            className="flex-grow"
            // Removidas as props initial, animate e exit que causavam o fade total
          >
            <Hero />
            <ExecutiveBio />

            <main id="catalog" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
               <div className="container mx-auto">
                  <header className="mb-8 lg:mb-12 text-center lg:text-left">
                    <div>
                      <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
                        Portfólio de <span className="text-blue-500 font-medium">Ativos</span>
                      </h2>
                      <p className="text-slate-400 max-w-xl font-medium text-base lg:text-lg leading-relaxed">
                        Curadoria técnica de imóveis com alto potencial de valorização.
                      </p>
                    </div>
                  </header>
                  <PropertyGrid onSelectProperty={handleSelectProperty} />
               </div>
            </main>

            <BrokerGrid />
          </motion.div>
        ) : (
          <motion.div
            key="details"
            className="flex-grow pt-20 lg:pt-28"
            // Transição mais sutil apenas para os detalhes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <PropertyDetails 
              propertyCode={selectedPropertyCode} 
              onBack={handleBack} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavigateToGrid={handleBack} />
    </div>
  );
}

export default App;