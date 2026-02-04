// front/src/components/WhatsAppButton.jsx
import React from 'react';

const WhatsAppButton = ({ phoneNumber }) => {
  return (
    <a 
      href={`https://wa.me/${phoneNumber}`}
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 z-50"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        className="w-8 h-8" 
      />
    </a>
  );
};

export default WhatsAppButton;