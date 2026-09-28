import React from 'react';
import { Flame, Zap, Map, Award, Palmtree, Coffee, Headphones, Lock } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';
import './Perfil.css';

export const Perfil = () => {
  // Datos simulados (idealmente vendrían de un custom hook como useUser)
  const regionProgress = [
    { name: 'Región Caribe', value: 85, color: 'var(--color-neutral)' },
    { name: 'Región Andina', value: 60, color: 'var(--color-neutral)' },
    { name: 'Región Pacífica', value: 30, color: 'var(--color-neutral)' },
    { name: 'Orinoquía', value: 10, color: 'var(--color-neutral)' },
    { name: 'Amazonía', value: 0, color: 'var(--color-neutral)' },
  ];

  const badges = [
    { id: 1, IconComponent: Palmtree, name: 'Master Costeño', unlocked: true },
    { id: 2, IconComponent: Coffee, name: 'Jerga Paisa', unlocked: true },
    { id: 3, IconComponent: Flame, name: 'Racha 3 Días', unlocked: true },
    { id: 4, IconComponent: Headphones, name: 'Buen Oído', unlocked: true },
    { id: 5, IconComponent: Map, name: 'Multicultural', unlocked: false },
    { id: 6, IconComponent: Lock, name: 'Bloqueado', unlocked: false },
  ];

  return (
    <div className="perfil-container">
      {/* Encabezado */}
      <div className="profile-header">
        <div className="profile-avatar">L</div>
        <div className="profile-info">
          <h1>NN</h1>
          <p className="profile-subtitle">Estudiante de Dialectología Colombiana • Unido en 2026</p>
          <span className="profile-badge">NIVEL 3: EXPLORADOR DIALECTAL</span>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card stat-card--red">
          <div className="stat-value">4 Días</div>
          <div className="stat-label">
            RACHA ACTIVA <Flame size={14} color="var(--color-rojo-terracota)" />
          </div>
        </div>
        <div className="stat-card stat-card--yellow">
          <div className="stat-value">1,450</div>
          <div className="stat-label">
            XP TOTAL <Zap size={14} color="var(--color-amarillo-colombia)" />
          </div>
        </div>
        <div className="stat-card stat-card--blue">
          <div className="stat-value">2 / 5</div>
          <div className="stat-label">
            REGIONES <Map size={14} color="var(--color-azul-oceano)" />
          </div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-value">6</div>
          <div className="stat-label">
            INSIGNIAS <Award size={14} color="var(--color-verde-selva)" />
          </div>
        </div>
      </div>

      {/* Progreso e Insignias */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">PROGRESO POR REGIÓN</h2>
          {regionProgress.map((region, idx) => (
            <ProgressBar 
              key={idx}
              label={region.name}
              value={region.value}
              color={region.color}
            />
          ))}
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-title">INSIGNIAS OBTENIDAS</h2>
          <div className="badges-grid">
            {badges.map(({ id, IconComponent, name, unlocked }) => (
              <div 
                key={id} 
                className={`badge-item ${unlocked ? 'badge-item--unlocked' : 'badge-item--locked'}`}
              >
                <IconComponent size={24} className="badge-icon" />
                <span className="badge-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};