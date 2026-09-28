// src/controllers/useUser.js
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS_LIST } from '../models/userModel';

export const useUser = () => {
  const { user, userLevelData, acceptAgeWarning, addXp } = useApp();

  // Mapea los IDs de logros guardados a sus objetos completos
  const unlockedAchievementsList = ACHIEVEMENTS_LIST.map((achievement) => ({
    ...achievement,
    isUnlocked: user.unlockedAchievements.includes(achievement.id),
  }));

  const getStreakText = () => {
    return `${user.streakDays} DÍAS`;
  };

  const getExploredRegionsText = () => {
    return `${user.exploredRegionsCount} / ${user.totalRegionsCount} regiones exploradas`;
  };

  return {
    user,
    levelData: userLevelData,
    unlockedAchievementsList,
    streakText: getStreakText(),
    exploredText: getExploredRegionsText(),
    hasAcceptedWarning: user.hasAcceptedAgeWarning,
    acceptAgeWarning,
    addXp,
  };
};