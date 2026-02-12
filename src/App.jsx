import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExecutiveBio from './components/ExecutiveBio'; // NOVO: Autoridade
import BrokerGrid from './components/BrokerGrid';     // NOVO: Ecossistema
import PropertyGrid from './components/PropertyGrid';
import PropertyDetails from './components/PropertyDetails';
import Footer from './components/Footer';

function App() {
  const [selectedPropertyCode, setSelectedPropertyCode] = useState(null);

  const handleSelectProperty = (code) => {
    setSelectedPropertyCode(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans selection:bg-gold-500 selection:text-white">
      {/* Background sutil para o tom Executive Dark */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-50" />

      <Navbar onHomeClick={() => setSelectedPropertyCode(null)} />

      <AnimatePresence mode="wait">
        {!selectedPropertyCode ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-grow"
          >
            {/* 1. Impacto Inicial */}
            <Hero />

            {/* 2. Prova Social e Autoridade (The Owner) */}
            <section className="py-16 bg-white">
              <ExecutiveBio />
            </section>

            {/* 3. Catálogo Premium (Antigo PropertyGrid) */}
            <main id="catalog" className="py-20 px-4">
               <div className="container mx-auto">
                  <header className="mb-12 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      Curadoria <span className="text-blue-500">Exclusiva</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl font-medium">
                      Imóveis selecionados sob rigorosos critérios de liquidez e alto padrão.
                    </p>
                  </header>
                  <PropertyGrid onSelectProperty={handleSelectProperty} />
               </div>
            </main>

            {/* 4. Ecossistema (O Time) */}
            <section className="py-20 bg-slate-50">
              <BrokerGrid />
            </section>

          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="flex-grow pt-24"
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