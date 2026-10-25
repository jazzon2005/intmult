// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

const AppContext = createContext();

const MASTER_CHALLENGES = [
  { id: 'ch_day_1', day: 'DÍA 1', title: 'Acentos del Caribe' },
  { id: 'ch_day_2', day: 'DÍA 2', title: 'Modismos Paisas' },
  { id: 'ch_day_3', day: 'DÍA 3', title: 'Expresiones Caleñas' },
  { id: 'ch_day_4', day: 'DÍA 4', title: 'Jerga Bogotana' },
  { id: 'ch_day_5', day: 'DÍA 5', title: 'El uso de "¡A la orden!"' },
  { id: 'ch_day_6', day: 'DÍA 6', title: 'Dialecto Santandereano' }
];

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('mapa');
  const [userData, setUserData] = useState(() => userService.getActiveUserData());
  const [isLogrosModalOpen, setIsLogrosModalOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      userService.saveActiveUserData(userData);
    }
  }, [userData]);

  const completedList = userData?.completedChallenges || [];
  const challenges = MASTER_CHALLENGES.map((ch, idx) => {
    const isCompleted = completedList.includes(ch.id);
    const isNextAvailable =
      !isCompleted &&
      (idx === 0 || completedList.includes(MASTER_CHALLENGES[idx - 1].id));

    return {
      ...ch,
      status: isCompleted ? 'completed' : isNextAvailable ? 'available' : 'locked'
    };
  });

  const register = (credentials) => {
    const newAccount = userService.registerUser(credentials);
    setUserData(newAccount);
  };

  const login = (credentials) => {
    const account = userService.loginUser(credentials);
    setUserData(account);
  };

  const logout = () => {
    userService.logoutUser();
    setUserData(null);
    setActiveTab('mapa');
  };

  const recordAnswer = (regionId, isCorrect, xpReward = 15) => {
    if (!userData) return;

    setUserData((prev) => {
      if (!prev) return prev;

      const currentAcc = prev.regionAccuracy?.[regionId] || { correct: 0, total: 0 };
      const updatedAcc = {
        correct: currentAcc.correct + (isCorrect ? 1 : 0),
        total: currentAcc.total + 1
      };

      const addedXP = isCorrect ? xpReward : 0;
      const currentXP = prev.stats?.currentXP || 0;
      const nextXP = prev.stats?.nextLevelXP || 500;
      const newXP = currentXP + addedXP;

      let newLevel = prev.stats?.currentLevel || 1;
      let newLevelTitle = prev.stats?.levelTitle || 'Novato Dialectal';

      if (newXP >= nextXP) {
        newLevel += 1;
        newLevelTitle = 'Maestro Dialectal';
      }

      return {
        ...prev,
        regionAccuracy: {
          ...(prev.regionAccuracy || {}),
          [regionId]: updatedAcc
        },
        stats: {
          ...prev.stats,
          currentXP: newXP,
          currentLevel: newLevel,
          levelTitle: newLevelTitle
        }
      };
    });
  };

  const completeChallenge = (challengeId, regionId, xpEarned = 50) => {
    if (!userData) return;

    setUserData((prev) => {
      if (!prev) return prev;
      const currentCompleted = prev.completedChallenges || [];
      const isAlreadyCompleted = currentCompleted.includes(challengeId);
      const updatedChallenges = isAlreadyCompleted
        ? currentCompleted
        : [...currentCompleted, challengeId];

      const currentRegionProg = prev.regionProgress?.[regionId] || 0;
      const newRegionProg = Math.min(100, currentRegionProg + 20);

      return {
        ...prev,
        completedChallenges: updatedChallenges,
        regionProgress: {
          ...(prev.regionProgress || {}),
          [regionId]: newRegionProg
        },
        stats: {
          ...prev.stats,
          currentXP: (prev.stats?.currentXP || 0) + (isAlreadyCompleted ? 0 : xpEarned)
        }
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user: userData?.user || null,
        stats: userData?.stats || null,
        regionProgress: userData?.regionProgress || {},
        regionAccuracy: userData?.regionAccuracy || {},
        unlockedBadges: userData?.unlockedBadges || [],
        completedChallenges: userData?.completedChallenges || [],
        challenges,
        isLogrosModalOpen,
        openLogrosModal: () => setIsLogrosModalOpen(true),
        closeLogrosModal: () => setIsLogrosModalOpen(false),
        register,
        login,
        logout,
        recordAnswer,
        completeChallenge
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);