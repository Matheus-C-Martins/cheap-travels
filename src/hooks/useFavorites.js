import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cheap-travels-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (dealId) => {
    setFavorites(prev => {
      if (prev.includes(dealId)) {
        return prev.filter(id => id !== dealId);
      }
      return [...prev, dealId];
    });
  };

  const isFavorite = (dealId) => favorites.includes(dealId);

  const clearFavorites = () => setFavorites([]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
}