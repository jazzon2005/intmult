// src/controllers/useRegion.js
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const REGIONS_DATA = {
  andina: {
    id: 'andina',
    name: 'Región Andina',
    accent: 'Acento Rolo / Paisa / Santandereano',
    description: 'Caracterizada por la diversidad de acentos de la cordillera, incluyendo el uso de "usted" y variaciones tonales marcadas.',
    difficulty: 50
  },
  caribe: {
    id: 'caribe',
    name: 'Región Caribe',
    accent: 'Acento Costeño',
    description: 'Reconocida por su ritmo rápido, la aspiración de la "s" y una rica variedad de modismos de la costa atlántica.',
    difficulty: 40
  },
  pacifico: {
    id: 'pacifico',
    name: 'Región Pacífica',
    accent: 'Acento Caleño / Chocoano',
    description: 'Destaca por su musicalidad, el uso característico del "voseo" y expresiones afrocolombianas autóctonas.',
    difficulty: 65
  },
  orinoquia: {
    id: 'orinoquia',
    name: 'Región Orinoquía',
    accent: 'Acento Llanero',
    description: 'Inspirado en la cultura del llano, con entonación cantada y términos vinculados a la ganadería y la naturaleza.',
    difficulty: 55
  },
  amazonia: {
    id: 'amazonia',
    name: 'Región Amazonía',
    accent: 'Acento Amazónico',
    description: 'Dialecto influenciado por la frontera selvática y comunidades indígenas, de entonación pausada.',
    difficulty: 70
  }
};

export const useRegion = () => {
  const { regionProgress, regionAccuracy } = useApp();
  const [selectedRegionId, setSelectedRegionId] = useState('andina');

  const baseRegion = REGIONS_DATA[selectedRegionId] || REGIONS_DATA.andina;

  // Cálculo de PRECISIÓN (%)
  const accData = regionAccuracy?.[selectedRegionId] || { correct: 0, total: 0 };
  const calculatedPrecision =
    accData.total > 0 ? Math.round((accData.correct / accData.total) * 100) : 0;

  const currentRegion = {
    ...baseRegion,
    progress: regionProgress?.[selectedRegionId] ?? 0,
    precision: calculatedPrecision
  };

  const selectRegion = (regionId) => {
    if (REGIONS_DATA[regionId]) {
      setSelectedRegionId(regionId);
    }
  };

  return {
    currentRegion,
    selectRegion,
    regionProgress
  };
};