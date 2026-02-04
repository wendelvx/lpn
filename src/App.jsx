// front/src/App.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetails from './components/PropertyDetails';
import Footer from './components/Footer';

function App() {
  // Estado que controla se estamos vendo a lista ou um imóvel específico
  const [selectedPropertyCode, setSelectedPropertyCode] = useState(null);

  // Função para lidar com a seleção e subir o scroll suavemente
  const handleSelectProperty = (code) => {
    setSelectedPropertyCode(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para voltar à listagem (Home)
  const handleBack = () => {
    if (selectedPropertyCode === null) {
       // Se já estiver na home, apenas rola para o grid
       const element = document.getElementById('property-grid');
       element?.scrollIntoView({ behavior: 'smooth' });
       return;
    }

    setSelectedPropertyCode(null);
    // Pequeno delay para garantir que o componente PropertyGrid seja montado antes de scrollar
    setTimeout(() => {
      const element = document.getElementById('property-grid');
      if (element) {
        // Compensação para a Navbar fixa
        const offset = element.offsetTop - 120;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar com função para voltar ao início ao clicar na logo (opcional no componente) */}
      <Navbar onHomeClick={() => setSelectedPropertyCode(null)} />

      <AnimatePresence mode="wait">
        {!selectedPropertyCode ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            <Hero />
            {/* py-12 no mobile e py-20 no desktop para respiro ideal */}
            <main id="property-grid" className="py-12 sm:py-16 md:py-20">
              <PropertyGrid onSelectProperty={handleSelectProperty} />
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            /* AJUSTE DE PADDING: pt-24 md:pt-28 para não cobrir o conteúdo com a Navbar alta */
            className="flex-grow pt-24 sm:pt-28 md:pt-32"
          >
            <PropertyDetails 
              propertyCode={selectedPropertyCode} 
              onBack={handleBack} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER: Agora recebe a função de navegação para o link "Ver Imóveis" */}
      <Footer onNavigateToGrid={handleBack} />
    </div>
  );
}

export default App;