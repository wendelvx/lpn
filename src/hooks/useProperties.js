import { useState, useEffect } from 'react';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { properties, loading };
};