// src/views/pages/MapaAcentos.jsx
import React from 'react';
import { MapPin, Palmtree, Waves, Compass, Play, Trees } from 'lucide-react';
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
  amazonia: Trees,
};

export const MapaAcentos = () => {
  const { currentRegion, selectRegion } = useRegion();
  const { setActiveTab } = useApp();

  const region = currentRegion || {
    id: 'andina',
    name: 'Región Andina',
    accent: 'Acento Rolo / Paisa / Santandereano',
    description: 'Cargando información de la región...',
    precision: 0,
    progress: 0,
    difficulty: 0,
  };

  const CurrentRegionIcon = regionIcons[region.id] || MapPin;

  return (
    <div className="mapa-container">
      <h1 className="page-title">MAPA DE ACENTOS</h1>

      <div className="map-card">
        <div className="map-placeholder">
          <p className="map-instruction">Selecciona una región en el mapa:</p>
          <div className="region-buttons-group">
            <button
              onClick={() => selectRegion('andina')}
              className={`region-tag ${region.id === 'andina' ? 'region-tag--andina' : ''}`}
            >
              <MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Andina
            </button>
            <button
              onClick={() => selectRegion('caribe')}
              className={`region-tag ${region.id === 'caribe' ? 'region-tag--caribe' : ''}`}
            >
              <Palmtree size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Caribe
            </button>
            <button
              onClick={() => selectRegion('pacifico')}
              className={`region-tag ${region.id === 'pacifico' ? 'region-tag--pacifico' : ''}`}
            >
              <Waves size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Región Pacífico
            </button>
            <button
              onClick={() => selectRegion('orinoquia')}
              className={`region-tag ${region.id === 'orinoquia' ? 'region-tag--orinoquia' : ''}`}
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
              <h3 className="region-name">{region.name}</h3>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            {/* Etiqueta actualizada a PRECISIÓN */}
            <ProgressBar
              label="PRECISIÓN"
              value={region.precision}
              color="var(--color-neutral)"
            />
            <ProgressBar
              label="PROGRESO"
              value={region.progress}
              color="var(--color-neutral)"
            />
            <ProgressBar
              label="DIFICULTAD"
              value={region.difficulty}
              color="var(--color-neutral)"
            />
          </div>
        </div>

        <div className="info-card info-card--flex">
          <div>
            <h2 className="accent-title">{region.accent ? region.accent.toUpperCase() : ''}</h2>
            <div className="accent-divider" />
            <p className="accent-description">{region.description}</p>
          </div>

          <ButtonCTA onClick={() => setActiveTab('leccion')} fullWidth>
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