// src/models/userModel.js

export const INITIAL_USER_STATE = {
  hasAcceptedAgeWarning: false,
  xp: 450,
  level: 3,
  levelTitle: 'Explorador Dialectal',
  streakDays: 4,
  exploredRegionsCount: 3,
  totalRegionsCount: 7,
  unlockedAchievements: ['first_step', 'caribe_explorer', 'streak_master'],
  completedChallenges: ['lun', 'mar', 'mie'],
};

export const ACHIEVEMENTS_LIST = [
  { id: 'first_step', title: 'Primeros Pasos', icon: '🌱', description: 'Completaste tu primera lección regional' },
  { id: 'caribe_explorer', title: 'Sabor Costeño', icon: '🌴', description: 'Dominas las expresiones del Caribe' },
  { id: 'streak_master', title: 'Constancia', icon: '🔥', description: 'Mantuviste una racha de 4 días' },
  { id: 'paisa_master', title: 'Parce Oficial', icon: '☕', description: 'Completaste los desafíos Paisas' },
];

/**
 * Calcula el nivel actual del usuario en función de la XP acumulada
 */
export const calculateLevel = (xp) => {
  const xpPerLevel = 150;
  const currentLevel = Math.floor(xp / xpPerLevel) + 1;
  const xpInCurrentLevel = xp % xpPerLevel;
  const progressPercentage = Math.min(100, Math.round((xpInCurrentLevel / xpPerLevel) * 100));

  let levelTitle = 'Principiante Dialectal';
  if (currentLevel >= 3) levelTitle = 'Explorador Dialectal';
  if (currentLevel >= 5) levelTitle = 'Maestro de Modismos';
  if (currentLevel >= 10) levelTitle = 'Políglota Colombiano';

  return { currentLevel, progressPercentage, levelTitle, xpInCurrentLevel, xpPerLevel };
};