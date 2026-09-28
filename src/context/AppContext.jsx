// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_STATE, calculateLevel } from '../models/userModel';
import { REGIONS_DATA } from '../models/regionModel';
import { DAILY_CHALLENGES } from '../models/lessonModel';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Cargar estado guardado o usar valor por defecto
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('colombia_dialect_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  const [activeTab, setActiveTab] = useState('mapa'); // 'mapa' | 'desafios' | 'comunidad' | 'contacto'
  const [selectedRegionId, setSelectedRegionId] = useState('andina');

  // Sincronizar en localStorage cada vez que cambie el usuario
  useEffect(() => {
    localStorage.setItem('colombia_dialect_user', JSON.stringify(user));
  }, [user]);

  // Acciones de actualización del estado
  const acceptAgeWarning = () => {
    setUser((prev) => ({ ...prev, hasAcceptedAgeWarning: true }));
  };

  const addXp = (amount) => {
    setUser((prev) => {
      const newXp = prev.xp + amount;
      const { currentLevel, levelTitle } = calculateLevel(newXp);
      return {
        ...prev,
        xp: newXp,
        level: currentLevel,
        levelTitle,
      };
    });
  };

  const completeChallenge = (challengeId) => {
    setUser((prev) => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      return {
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
      };
    });
    addXp(50); // Recompensa de XP por completar
  };

  const selectedRegion = REGIONS_DATA[selectedRegionId] || REGIONS_DATA.andina;
  const userLevelData = calculateLevel(user.xp);

  return (
    <AppContext.Provider
      value={{
        user,
        userLevelData,
        activeTab,
        setActiveTab,
        selectedRegion,
        setSelectedRegionId,
        challenges: DAILY_CHALLENGES,
        acceptAgeWarning,
        addXp,
        completeChallenge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser utilizado dentro de un AppProvider');
  }
  return context;
};