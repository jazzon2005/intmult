// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProfile from '../data/userProfile.json';

const STORAGE_KEY = 'voces_colombia_user_data_v1';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error al parsear localStorage:', e);
      }
    }
    return initialProfile;
  });

  // Sincronizar automáticamente con localStorage ante cualquier cambio de estado
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
  }, [profileData]);

  // Sumar XP al usuario y verificar subida de nivel
  const addXP = (amount) => {
    setProfileData((prev) => {
      let newXP = prev.user.xp + amount;
      let newLevel = prev.user.currentLevel;
      let nextLevelXP = prev.user.xpNextLevel;

      if (newXP >= nextLevelXP) {
        newLevel += 1;
        nextLevelXP = Math.floor(nextLevelXP * 1.5);
      }

      return {
        ...prev,
        user: {
          ...prev.user,
          xp: newXP,
          currentLevel: newLevel,
          xpNextLevel: nextLevelXP,
        },
      };
    });
  };

  // Registrar un desafío completado y actualizar el progreso de la región
  const completeChallenge = (challengeId, regionId, earnedXP = 50) => {
    setProfileData((prev) => {
      const alreadyCompleted = prev.completedChallenges.includes(challengeId);
      if (alreadyCompleted) return prev;

      const updatedChallenges = [...prev.completedChallenges, challengeId];
      const currentRegion = prev.regionsProgress[regionId] || { progress: 0, stats: 0, difficulty: 50 };
      const newRegionProgress = Math.min(100, currentRegion.progress + 15);

      return {
        ...prev,
        user: {
          ...prev.user,
          xp: prev.user.xp + earnedXP,
          completedChallengesCount: prev.user.completedChallengesCount + 1,
        },
        completedChallenges: updatedChallenges,
        regionsProgress: {
          ...prev.regionsProgress,
          [regionId]: {
            ...currentRegion,
            progress: newRegionProgress,
          },
        },
      };
    });
  };

  // Reiniciar datos al JSON original
  const resetProfile = () => {
    setProfileData(initialProfile);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserContext.Provider
      value={{
        user: profileData.user,
        regionsProgress: profileData.regionsProgress,
        completedChallenges: profileData.completedChallenges,
        unlockedBadges: profileData.unlockedBadges,
        badgesCatalog: profileData.badgesCatalog,
        addXP,
        completeChallenge,
        resetProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserData debe ser usado dentro de un UserProvider');
  }
  return context;
};