// front/src/components/PropertySkeleton.jsx
import React from 'react';

const PropertySkeleton = () => {
  // Criamos um array de 6 itens para simular o grid inicial
  const skeletonCards = Array(6).fill(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skeletonCards.map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
          {/* Espaço da Imagem */}
          <div className="bg-gray-200 h-64 w-full" />
          
          <div className="p-5">
            {/* Tag e Título */}
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />

            {/* Grid de Atributos */}
            <div className="flex justify-between py-4 border-y border-gray-50 mb-4">
              <div className="h-10 bg-gray-200 rounded w-12" />
              <div className="h-10 bg-gray-200 rounded w-12" />
              <div className="h-10 bg-gray-200 rounded w-12" />
            </div>

            {/* Preço */}
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-10 bg-gray-200 rounded-full w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertySkeleton;