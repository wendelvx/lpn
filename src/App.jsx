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

  const handleBack = () => {
    setSelectedPropertyCode(null);
    // Pequeno delay para garantir que o elemento exista antes de scrollar
    setTimeout(() => {
      const element = document.getElementById('property-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* AnimatePresence permite animações ao montar/desmontar componentes */}
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
            className="flex-grow pt-16 sm:pt-20"
          >
            <PropertyDetails 
              propertyCode={selectedPropertyCode} 
              onBack={handleBack} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;