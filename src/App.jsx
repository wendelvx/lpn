// front/src/App.jsx
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main id="property-grid" className="py-20">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
            Imóveis em Destaque
          </h2>
        </div>
        
        <PropertyGrid />
      </main>

      {/* Footer simples para finalizar a Landing Page */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>© 2026 [Seu Nome] - Em parceria com Ítalo Mello Negócios Imobiliários</p>
      </footer>
    </div>
  );
}

export default App;