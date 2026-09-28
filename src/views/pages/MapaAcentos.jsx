import React from 'react';
import { MapPin, Palmtree, Waves, Compass, Play } from 'lucide-react';
import { useRegion } from '../../controllers/useRegion';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { ButtonCTA } from '../components/ButtonCTA';
import './MapaAcentos.css';

const regionIcons = {
  andina: MapPin,
  caribe: Palmtree,
  pacifico: Waves,
  orinoquia: Compass,
};

export const MapaAcentos = () => {
  const { currentRegion, selectRegion } = useRegion();
  const { setActiveTab } = useApp();

  const CurrentRegionIcon = regionIcons[currentRegion.id] || Compass;

  return (
    <div className="mapa-container">
      <h1 className="page-title">MAPA DE ACENTOS</h1>

      <div className="map-card">
        <div className="map-placeholder">
          <p className="map-instruction">Selecciona una región en el mapa:</p>
          <div className="region-buttons-group">
            <button
              onClick={() => selectRegion('andina')}
              className={`region-tag ${currentRegion.id === 'andina' ? 'region-tag--andina' : ''}`}
            >
              <MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Andina
            </button>
            <button
              onClick={() => selectRegion('caribe')}
              className={`region-tag ${currentRegion.id === 'caribe' ? 'region-tag--caribe' : ''}`}
            >
              <Palmtree size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Caribe
            </button>
            <button
              onClick={() => selectRegion('pacifico')}
              className={`region-tag ${currentRegion.id === 'pacifico' ? 'region-tag--pacifico' : ''}`}
            >
              <Waves size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Pacífico
            </button>
            <button
              onClick={() => selectRegion('orinoquia')}
              className={`region-tag ${currentRegion.id === 'orinoquia' ? 'region-tag--orinoquia' : ''}`}
            >
              <Compass size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Orinoquía
            </button>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div className="region-badge-row">
            <CurrentRegionIcon size={28} color="var(--color-rojo-terracota)" />
            <div>
              <span className="region-subtext">REGIÓN</span>
              <h3 className="region-name">{currentRegion.name}</h3>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <ProgressBar
              label="ESTADÍSTICAS"
              value={currentRegion.stats}
              color="var(--color-neutral)"
            />
            <ProgressBar
              label="PROGRESO"
              value={currentRegion.progress}
              color="var(--color-neutral)"
            />
            <ProgressBar
              label="DIFICULTAD"
              value={currentRegion.difficulty}
              color="var(--color-neutral)"
            />
          </div>
        </div>

        <div className="info-card info-card--flex">
          <div>
            <h2 className="accent-title">{currentRegion.accent.toUpperCase()}</h2>
            <div className="accent-divider" />
            <p className="accent-description">{currentRegion.description}</p>
          </div>

          <ButtonCTA onClick={() => setActiveTab('desafios')} fullWidth>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Play size={16} fill="currentColor" />
              COMENZAR DESAFÍO
            </span>
          </ButtonCTA>
        </div>
      </div>
    </div>
  );
};