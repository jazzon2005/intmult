// src/controllers/useUser.js
import { useApp } from '../context/AppContext';
import { getLevelDetails } from '../utils/levelSystem';
import {
  Palmtree,
  Coffee,
  Flame,
  Headphones,
  Map,
  Lock,
  Compass,
  Trees,
  BookOpen,
  Zap,
  Award,
  Target,
  Calendar,
  Sun,
  Moon,
  CheckCircle,
  Crown,
  Star
} from 'lucide-react';

const BADGES_CATALOG = [
  // ==================== DOMINIO REGIONAL ====================
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

  // ==================== HITOS DE NIVEL ====================
  {
    id: 'nivel_5',
    icon: Zap,
    name: 'Aprendiz de Jerga',
    description: 'Supera el Nivel 5 de conocimiento dialectal.',
    getRequirement: (data, level) => ({
      current: level,
      target: 5,
      unit: ' Nivel'
    })
  },
  {
    id: 'nivel_25',
    icon: Star,
    name: 'Baqueano de Palabras',
    description: 'Alcanza el Nivel 25 acumulando experiencia.',
    getRequirement: (data, level) => ({
      current: level,
      target: 25,
      unit: ' Nivel'
    })
  },
  {
    id: 'nivel_50',
    icon: Award,
    name: 'Políglota Supremo',
    description: 'Llega a la mitad del camino alcanzando el Nivel 50.',
    getRequirement: (data, level) => ({
      current: level,
      target: 50,
      unit: ' Nivel'
    })
  },
  {
    id: 'nivel_100',
    icon: Crown,
    name: 'Leyenda Dialectal',
    description: 'Alcanza la máxima distinción: Nivel 100.',
    getRequirement: (data, level) => ({
      current: level,
      target: 100,
      unit: ' Nivel'
    })
  },

  // ==================== PREGUNTAS Y VOLUMEN ====================
  {
    id: 'lexico_hierro',
    icon: CheckCircle,
    name: 'Léxico de Hierro',
    description: 'Responde correctamente 25 preguntas del banco.',
    getRequirement: (data) => ({
      current: (data.correctQuestionIds || []).length,
      target: 25,
      unit: ' aciertos'
    })
  },
  {
    id: 'diccionario_humano',
    icon: BookOpen,
    name: 'Diccionario Humano',
    description: 'Responde correctamente 75 preguntas del banco.',
    getRequirement: (data) => ({
      current: (data.correctQuestionIds || []).length,
      target: 75,
      unit: ' aciertos'
    })
  },

  // ==================== PRECISIÓN Y DESTREZA ====================
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
    id: 'oido_certero',
    icon: Target,
    name: 'Oído Certero',
    description: 'Logra más del 80% de precisión global en tus respuestas.',
    getRequirement: (data) => {
      let total = 0;
      let correct = 0;
      Object.values(data.regionAccuracy || {}).forEach((acc) => {
        total += acc.total || 0;
        correct += acc.correct || 0;
      });
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      return { current: accuracy, target: 80, unit: '%' };
    }
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

  // ==================== RACHAS Y HÁBITOS ====================
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
  {
    id: 'semana_dialectal',
    icon: Calendar,
    name: 'Semana Dialectal',
    description: 'Completa los 6 desafíos principales del panel.',
    getRequirement: (data) => ({
      current: (data.completedChallenges || []).length,
      target: 6,
      unit: ' desafíos'
    })
  },
  {
    id: 'madrugador',
    icon: Sun,
    name: 'Madrugador Dialectal',
    description: 'Completa una respuesta o lección antes de las 8:00 AM.',
    getRequirement: (data) => ({
      current: (data.unlockedBadges || []).includes('madrugador') ? 1 : 0,
      target: 1,
      unit: ''
    })
  },
  {
    id: 'buho_sabiduria',
    icon: Moon,
    name: 'Búho del Conocimiento',
    description: 'Practica y completa preguntas después de las 10:00 PM.',
    getRequirement: (data) => ({
      current: (data.unlockedBadges || []).includes('buho_sabiduria') ? 1 : 0,
      target: 1,
      unit: ''
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
  const {
    user,
    stats,
    regionProgress,
    regionAccuracy,
    correctQuestionIds,
    unlockedBadges,
    completedChallenges
  } = useApp();

  const currentXP = stats?.currentXP || 0;
  const levelData = getLevelDetails(currentXP);

  const badgesList = BADGES_CATALOG.map((badge) => {
    const req = badge.getRequirement(
      {
        regionProgress,
        stats,
        regionAccuracy,
        correctQuestionIds,
        unlockedBadges,
        completedChallenges
      },
      levelData.currentLevel
    );

    const isUnlocked =
      (unlockedBadges || []).includes(badge.id) || (req.target > 0 && req.current >= req.target);

    const progressPercent =
      req.target > 0 ? Math.min(100, Math.round((req.current / req.target) * 100)) : 0;

    return {
      ...badge,
      unlocked: isUnlocked,
      reqCurrent: req.current,
      reqTarget: req.target,
      reqUnit: req.unit,
      progressPercent
    };
  });

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