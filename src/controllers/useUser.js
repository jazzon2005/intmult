// src/controllers/useUser.js
import { useApp } from '../context/AppContext';
import { Palmtree, Coffee, Flame, Headphones, Map, Lock, Compass, Trees, BookOpen } from 'lucide-react';

const BADGES_CATALOG = [
  // Dominio Regional
  {
    id: 'master_costeno',
    icon: Palmtree,
    name: 'Costeño de Cepa',
    description: 'Alcanza el 100% de progreso en la Región Caribe.',
    getRequirement: (data) => ({
      current: data.regionProgress?.caribe || 0,
      target: 100,
      unit: '%'
    })
  },
  {
    id: 'jerga_paisa',
    icon: Coffee,
    name: 'Montañero Paisa',
    description: 'Alcanza el 100% de progreso en la Región Andina.',
    getRequirement: (data) => ({
      current: data.regionProgress?.andina || 0,
      target: 100,
      unit: '%'
    })
  },
  {
    id: 'sabor_pacifico',
    icon: Headphones,
    name: 'Sabor Pacífico',
    description: 'Alcanza el 100% de progreso en la Región Pacífica.',
    getRequirement: (data) => ({
      current: data.regionProgress?.pacifico || 0,
      target: 100,
      unit: '%'
    })
  },
  {
    id: 'baqueano_llano',
    icon: Compass,
    name: 'Baqueano del Llano',
    description: 'Alcanza el 100% de progreso en la Región Orinoquía.',
    getRequirement: (data) => ({
      current: data.regionProgress?.orinoquia || 0,
      target: 100,
      unit: '%'
    })
  },
  {
    id: 'guardian_selva',
    icon: Trees,
    name: 'Guardián Amazónico',
    description: 'Alcanza el 100% de progreso en la Región Amazonía.',
    getRequirement: (data) => ({
      current: data.regionProgress?.amazonia || 0,
      target: 100,
      unit: '%'
    })
  },

  // Rachas
  {
    id: 'racha_3_dias',
    icon: Flame,
    name: 'Fiebre Dialectal',
    description: 'Mantén una racha activa de 3 días consecutivos.',
    getRequirement: (data) => ({
      current: Math.min(3, data.stats?.streakDays || 1),
      target: 3,
      unit: ' días'
    })
  },
  {
    id: 'racha_7_dias',
    icon: Flame,
    name: 'Imparable',
    description: 'Mantén una racha activa de 7 días consecutivos.',
    getRequirement: (data) => ({
      current: Math.min(7, data.stats?.streakDays || 1),
      target: 7,
      unit: ' días'
    })
  },

  // Destreza y Precisión
  {
    id: 'buen_oido',
    icon: Headphones,
    name: 'Oído Fino',
    description: 'Completa una lección respondiendo todas las preguntas correctamente.',
    getRequirement: (data) => ({
      current: (data.unlockedBadges || []).includes('buen_oido') ? 1 : 0,
      target: 1,
      unit: ''
    })
  },
  {
    id: 'poliglota_criollo',
    icon: Map,
    name: 'Políglota Criollo',
    description: 'Completa al menos un desafío en las 5 regiones del país.',
    getRequirement: (data) => {
      const explored = Object.values(data.regionProgress || {}).filter((p) => p > 0).length;
      return { current: explored, target: 5, unit: ' regiones' };
    }
  },
  {
    id: 'enciclopedia',
    icon: BookOpen,
    name: 'Enciclopedia Viviente',
    description: 'Acumula un total de 500 XP en tu cuenta.',
    getRequirement: (data) => ({
      current: Math.min(500, data.stats?.currentXP || 0),
      target: 500,
      unit: ' XP'
    })
  },
  {
    id: 'locked_badge',
    icon: Lock,
    name: 'Logro Secreto',
    description: 'Insignia misteriosa. ¡Sigue practicando para descubrirla!',
    getRequirement: () => ({ current: 0, target: 1, unit: '' })
  }
];

export const useUser = () => {
  const { user, stats, regionProgress, regionAccuracy, unlockedBadges, completedChallenges } = useApp();

  const badgesList = BADGES_CATALOG.map((badge) => {
    const req = badge.getRequirement({ regionProgress, stats, unlockedBadges });
    const isUnlocked =
      (unlockedBadges || []).includes(badge.id) || (req.target > 0 && req.current >= req.target);

    const progressPercent = req.target > 0 ? Math.min(100, Math.round((req.current / req.target) * 100)) : 0;

    return {
      ...badge,
      unlocked: isUnlocked,
      reqCurrent: req.current,
      reqTarget: req.target,
      reqUnit: req.unit,
      progressPercent
    };
  });

  const levelData = {
    currentLevel: stats?.currentLevel || 1,
    levelTitle: stats?.levelTitle || 'Novato Dialectal',
    progressPercentage: Math.min(
      100,
      Math.round(((stats?.currentXP || 0) / (stats?.nextLevelXP || 500)) * 100)
    )
  };

  return {
    user,
    stats,
    regionProgress,
    regionAccuracy,
    badgesList,
    levelData,
    completedCount: (completedChallenges || []).length,
    streakText: `${stats?.streakDays || 1} Días`,
    exploredText: `${(completedChallenges || []).length} Desafíos`
  };
};