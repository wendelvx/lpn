// front/src/components/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-12 mb-16">
      {/* Container de Botões para facilitar o alinhamento no mobile */}
      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 active:scale-95 transition-all text-sm font-bold text-gray-600"
        >
          <ChevronLeft size={18} />
          Anterior
        </button>
        
        {/* Indicador de página otimizado para mobile */}
        <div className="flex sm:hidden items-center justify-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
           <span className="text-xs font-bold text-gray-500">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 active:scale-95 transition-all text-sm font-bold text-gray-600"
        >
          Próxima
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Indicador de página completo para desktop */}
      <span className="hidden sm:inline font-bold text-gray-400 text-sm tracking-wide">
        Página <span className="text-blue-600">{currentPage}</span> de <span className="text-gray-700">{totalPages}</span>
      </span>
    </div>
  );
};

export default Pagination;