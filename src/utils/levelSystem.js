// src/utils/levelSystem.js

// Calcula el XP acumulado total necesario para alcanzar un nivel (1 al 100)
export const getXPForLevel = (level) => {
  if (level <= 1) return 0;
  if (level > 100) level = 100;
  // Fórmula cuadrática progresiva
  return Math.floor(50 * Math.pow(level - 1, 2) + 100 * (level - 1));
};

// Devuelve el título del usuario según el rango de nivel
export const getLevelTitle = (level) => {
  if (level >= 100) return 'Leyenda del Habla Colombiana';
  if (level >= 80) return 'Gran Lingüista';
  if (level >= 60) return 'Políglota Criollo';
  if (level >= 40) return 'Erudito Regional';
  if (level >= 25) return 'Baqueano de Palabras';
  if (level >= 15) return 'Sabedor de Modismos';
  if (level >= 5) return 'Aprendiz de Jerga';
  return 'Novato Dialectal';
};

// Calcula los detalles de nivel y progreso porcentual según el XP total
export const getLevelDetails = (totalXP = 0) => {
  let level = 1;

  // Buscar el nivel actual recorriendo la escala (hasta 100)
  while (level < 100 && totalXP >= getXPForLevel(level + 1)) {
    level++;
  }

  const currentLevelBaseXP = getXPForLevel(level);
  const nextLevelXP = level < 100 ? getXPForLevel(level + 1) : currentLevelBaseXP;
  
  const xpInCurrentLevel = totalXP - currentLevelBaseXP;
  const xpRequiredForNext = nextLevelXP - currentLevelBaseXP;

  const progressPercentage =
    level >= 100
      ? 100
      : Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpRequiredForNext) * 100)));

  return {
    currentLevel: level,
    levelTitle: getLevelTitle(level),
    currentLevelBaseXP,
    nextLevelXP,
    xpInCurrentLevel,
    xpRequiredForNext,
    progressPercentage
  };
};