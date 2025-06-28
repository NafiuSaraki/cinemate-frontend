import { createContext, useState, useContext } from 'react';

const FavContext = createContext();
export const useFav = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const saveMovie = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  return (
    <FavContext.Provider value={{ favorites, saveMovie }}>
      {children}
    </FavContext.Provider>
  );
};