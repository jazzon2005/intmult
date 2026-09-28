// src/controllers/useRegion.js
import { useApp } from '../context/AppContext';
import { REGIONS_DATA } from '../models/regionModel';

export const useRegion = () => {
  const { selectedRegion, setSelectedRegionId } = useApp();

  const handleSelectRegion = (regionId) => {
    if (REGIONS_DATA[regionId]) {
      setSelectedRegionId(regionId);
    }
  };

  const getAllRegions = () => {
    return Object.values(REGIONS_DATA);
  };

  return {
    currentRegion: selectedRegion,
    allRegions: getAllRegions(),
    selectRegion: handleSelectRegion,
  };
};