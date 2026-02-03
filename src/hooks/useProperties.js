// front/src/hooks/useProperties.js
import { useState, useEffect } from 'react';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/properties');
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        // Exibe o erro real no console para debug
        console.error("Failed to load properties:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { properties, loading };
};