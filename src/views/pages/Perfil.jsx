// src/views/pages/Perfil.jsx
import React, { useState } from 'react';
import { Flame, Zap, Map, Award, ExternalLink } from 'lucide-react';
import { useUser } from '../../controllers/useUser';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { BadgeDetailModal } from '../components/BadgeDetailModal';
import './Perfil.css';

const REGION_CONFIG = [
  { id: 'caribe', name: 'Región Caribe', color: 'var(--color-azul-oceano)' },
  { id: 'andina', name: 'Región Andina', color: 'var(--color-rojo-terracota)' },
  { id: 'pacifico', name: 'Región Pacífica', color: 'var(--color-verde-selva)' },
  { id: 'orinoquia', name: 'Orinoquía', color: 'var(--color-amarillo-colombia)' },
  { id: 'amazonia', name: 'Amazonía', color: 'var(--color-neutral-border)' }
];

export const Perfil = () => {
  const { user, stats, regionProgress, badgesList, levelData } = useUser();
  const { openLogrosModal } = useApp();
  const [selectedBadge, setSelectedBadge] = useState(null);

  if (!user) return null;

  const unlockedBadges = badgesList.filter((b) => b.unlocked);
  const lockedBadges = badgesList.filter((b) => !b.unlocked);
  const displayedBadges = [...unlockedBadges, ...lockedBadges].slice(0, 6);

  const currentXP = stats?.currentXP || 0;
  const nextLevelXP = stats?.nextLevelXP || 500;

  return (
    <div className="perfil-container">
      {/* Encabezado del Perfil con Barra de Experiencia */}
      <div className="profile-header">
        <div className="profile-avatar">{user.avatar}</div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-subtitle">
            {user.email} • {user.role || 'Explorador Dialectal'}
          </p>

          {/* Barra de Experiencia y Nivel */}
          <div className="profile-xp-wrapper">
            <div className="profile-xp-header">
              <span className="profile-badge">
                NIVEL {levelData.currentLevel}: {levelData.levelTitle.toUpperCase()}
              </span>
              <span className="profile-xp-text">
                <strong>{currentXP.toLocaleString()}</strong> / {nextLevelXP.toLocaleString()} XP
              </span>
            </div>
            <div className="profile-xp-track">
              <div
                className="profile-xp-fill"
                style={{ width: `${levelData.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card stat-card--red">
          <div className="stat-value">{stats?.streakDays || 1} Días</div>
          <div className="stat-label">
            RACHA ACTIVA <Flame size={14} color="var(--color-rojo-terracota)" />
          </div>
        </div>

        <div className="stat-card stat-card--yellow">
          <div className="stat-value">{currentXP.toLocaleString()}</div>
          <div className="stat-label">
            XP TOTAL <Zap size={14} color="var(--color-amarillo-colombia)" />
          </div>
        </div>

        <div className="stat-card stat-card--blue">
          <div className="stat-value">
            {stats?.exploredRegionsCount || 0} / {stats?.totalRegionsCount || 5}
          </div>
          <div className="stat-label">
            REGIONES          </div>
        </div>

        <div className="stat-card stat-card--green">
          <div className="stat-value">{unlockedBadges.length}</div>
          <div className="stat-label">
            INSIGNIAS <Award size={14} color="var(--color-verde-selva)" />
          </div>
        </div>
      </div>

      {/* Progreso e Insignias */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">PROGRESO POR REGIÓN</h2>
          {REGION_CONFIG.map((reg) => (
            <ProgressBar
              key={reg.id}
              label={reg.name}
              value={regionProgress[reg.id] || 0}
              color={reg.color}
            />
          ))}
        </div>

        <div className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="dashboard-card-title" style={{ margin: 0 }}>INSIGNIAS OBTENIDAS</h2>
            <button
              onClick={openLogrosModal}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-rojo-terracota)',
                fontWeight: '800',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              VER TODAS ({badgesList.length}) <ExternalLink size={14} />
            </button>
          </div>

          <div className="badges-grid">
            {displayedBadges.map((badge) => {
              const { id, icon: IconComp, name, unlocked } = badge;
              return (
                <div
                  key={id}
                  className={`badge-item ${unlocked ? 'badge-item--unlocked' : 'badge-item--locked'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedBadge(badge)}
                >
                  <IconComp size={24} className="badge-icon" />
                  <span className="badge-name">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Detalle de la Insignia */}
      <BadgeDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </div>
  );
};