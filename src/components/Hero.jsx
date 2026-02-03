import React from 'react';

const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById('property-grid');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 lg:flex lg:items-center lg:gap-12">
        
        {/* Left Column: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
            {/* RF02: Branding Section */}
            <img src="/logo-corretor.png" alt="Logo Corretor" className="h-12 w-auto" />
            <div className="h-10 w-[1px] bg-gray-300"></div>
            <img src="/logo-italo-mello.png" alt="Ítalo Mello Negócios Imobiliários" className="h-8 w-auto opacity-80" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Encontre o seu <span className="text-blue-600">imóvel ideal</span> com quem entende do mercado.
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl">
            Especialista em negócios imobiliários de alto padrão, oferecendo segurança 
            e transparência em cada contrato através da parceria com a Ítalo Mello.
          </p>

          {/* RF01: Call to Action */}
          <button 
            onClick={scrollToProperties}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Ver Imóveis Disponíveis
          </button>
        </div>

        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/corretor-perfil.jpg" 
              alt="Foto Profissional do Corretor" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-full -z-0 blur-3xl opacity-50"></div>
        </div>

      </div>
    </header>
  );
};

export default Hero;