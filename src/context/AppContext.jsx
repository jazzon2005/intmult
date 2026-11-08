// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { getLevelDetails } from '../utils/levelSystem';
import { QUESTIONS_BANK } from '../data/questionsBank';
import { NotificationToast } from '../views/components/NotificationToast';

const AppContext = createContext();

const MASTER_CHALLENGES = [
  { id: 'ch_day_1', day: 'DÍA 1', title: 'Acentos del Caribe', regionId: 'caribe' },
  { id: 'ch_day_2', day: 'DÍA 2', title: 'Modismos Paisas', regionId: 'andina' },
  { id: 'ch_day_3', day: 'DÍA 3', title: 'Expresiones Caleñas', regionId: 'pacifico' },
  { id: 'ch_day_4', day: 'DÍA 4', title: 'Jerga Bogotana', regionId: 'andina' },
  { id: 'ch_day_5', day: 'DÍA 5', title: 'Vocabulario del Llano', regionId: 'orinoquia' },
  { id: 'ch_day_6', day: 'DÍA 6', title: 'Saberes Amazónicos', regionId: 'amazonia' }
];

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('mapa');
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [userData, setUserData] = useState(() => userService.getActiveUserData());
  const [isLogrosModalOpen, setIsLogrosModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const startRegionLesson = (regionId = null) => {
    setSelectedRegionId(regionId);
    setActiveTab('leccion');
  };

  const triggerToast = (toastData) => {
    setNotification(toastData);
  };

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
    setSelectedRegionId(null);
    setActiveTab('mapa');
  };

  const recordAnswer = (questionId, regionId, isCorrect, xpReward = 15) => {
    if (!userData) return;

    setUserData((prev) => {
      if (!prev) return prev;

      const currentAcc = prev.regionAccuracy?.[regionId] || { correct: 0, total: 0 };
      const updatedAcc = {
        correct: currentAcc.correct + (isCorrect ? 1 : 0),
        total: currentAcc.total + 1
      };

      const currentCorrectIds = prev.correctQuestionIds || [];
      const updatedCorrectIds =
        isCorrect && !currentCorrectIds.includes(questionId)
          ? [...currentCorrectIds, questionId]
          : currentCorrectIds;

      // CALCULAR PROGRESO REAL DE LA REGIÓN (Preguntas acertadas de la región / Total en banco)
      const totalRegionQuestions = QUESTIONS_BANK.filter((q) => q.regionId === regionId).length || 20;
      const correctInRegionCount = updatedCorrectIds.filter((qId) => {
        const q = QUESTIONS_BANK.find((item) => item.id === qId);
        return q && q.regionId === regionId;
      }).length;

      const calculatedRegionProgress = Math.min(
        100,
        Math.round((correctInRegionCount / totalRegionQuestions) * 100)
      );

      const addedXP = isCorrect ? xpReward : 0;
      const currentXP = (prev.stats?.currentXP || 0) + addedXP;
      const oldLevel = prev.stats?.currentLevel || 1;
      
      const levelDetails = getLevelDetails(currentXP);

      if (levelDetails.currentLevel > oldLevel) {
        triggerToast({
          type: 'levelup',
          title: `¡Subiste al Nivel ${levelDetails.currentLevel}!`,
          message: `Nuevo rango desbloqueado: ${levelDetails.levelTitle}`
        });
      }

      const currentHour = new Date().getHours();
      const updatedUnlockedBadges = [...(prev.unlockedBadges || [])];

      if (currentHour < 8 && !updatedUnlockedBadges.includes('madrugador')) {
        updatedUnlockedBadges.push('madrugador');
        triggerToast({
          type: 'badge',
          title: '¡Logro Desbloqueado!',
          message: 'Madrugador Dialectal'
        });
      } else if (currentHour >= 22 && !updatedUnlockedBadges.includes('buho_sabiduria')) {
        updatedUnlockedBadges.push('buho_sabiduria');
        triggerToast({
          type: 'badge',
          title: '¡Logro Desbloqueado!',
          message: 'Búho del Conocimiento'
        });
      }

      return {
        ...prev,
        correctQuestionIds: updatedCorrectIds,
        unlockedBadges: updatedUnlockedBadges,
        regionAccuracy: {
          ...(prev.regionAccuracy || {}),
          [regionId]: updatedAcc
        },
        regionProgress: {
          ...(prev.regionProgress || {}),
          [regionId]: Math.max(prev.regionProgress?.[regionId] || 0, calculatedRegionProgress)
        },
        stats: {
          ...prev.stats,
          currentXP,
          currentLevel: levelDetails.currentLevel,
          levelTitle: levelDetails.levelTitle,
          nextLevelXP: levelDetails.nextLevelXP
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
      const newRegionProg = Math.min(100, currentRegionProg + 25);
      const currentXP = (prev.stats?.currentXP || 0) + (isAlreadyCompleted ? 0 : xpEarned);
      const oldLevel = prev.stats?.currentLevel || 1;

      const levelDetails = getLevelDetails(currentXP);

      if (levelDetails.currentLevel > oldLevel) {
        triggerToast({
          type: 'levelup',
          title: `¡Subiste al Nivel ${levelDetails.currentLevel}!`,
          message: `Nuevo rango desbloqueado: ${levelDetails.levelTitle}`
        });
      }

      return {
        ...prev,
        completedChallenges: updatedChallenges,
        regionProgress: {
          ...(prev.regionProgress || {}),
          [regionId]: Math.max(currentRegionProg, newRegionProg)
        },
        stats: {
          ...prev.stats,
          currentXP,
          currentLevel: levelDetails.currentLevel,
          levelTitle: levelDetails.levelTitle,
          nextLevelXP: levelDetails.nextLevelXP
        }
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedRegionId,
        startRegionLesson,
        triggerToast,
        user: userData?.user || null,
        stats: userData?.stats || null,
        regionProgress: userData?.regionProgress || {},
        regionAccuracy: userData?.regionAccuracy || {},
        correctQuestionIds: userData?.correctQuestionIds || [],
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

      <div className="toast-container-fixed">
        {notification && (
          <NotificationToast
            notification={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);