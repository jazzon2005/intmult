// src/views/pages/PanelDesafios.jsx
import React from 'react';
import { Target, Lock, CheckCircle2, Zap, Flame, Award, Play } from 'lucide-react';
import { useUser } from '../../controllers/useUser';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { ButtonCTA } from '../components/ButtonCTA';
import './PanelDesafios.css';

export const PanelDesafios = () => {
  const { levelData, badgesList, streakText, exploredText } = useUser();
  const { challenges = [], setActiveTab } = useApp();

  return (
    <div className="panel-container">
      <h1 className="page-title">PANEL DE DESAFÍOS</h1>

      <div className="panel-grid">
        <div className="panel-column">
          <div className="panel-card">
            <h2 className="section-title">DESAFÍOS DISPONIBLES</h2>
            <div className="challenge-list">
              {(challenges || []).map((ch) => {
                const isAvailable = ch.status === 'available';
                const isCompleted = ch.status === 'completed';

                return (
                  <div key={ch.id} className="challenge-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isCompleted ? (
                        <CheckCircle2 size={16} color="var(--color-verde-selva)" />
                      ) : isAvailable ? (
                        <Target size={16} color="var(--color-rojo-terracota)" />
                      ) : (
                        <Lock size={16} color="var(--color-cafe-oscuro-muted)" />
                      )}
                      <div>
                        <span className="day-label">{ch.day}: </span>
                        <span className="challenge-text">{ch.title}</span>
                      </div>
                    </div>
                    <span className={`status-badge ${isAvailable ? 'status-badge--available' : ''}`}>
                      {isCompleted ? 'Completado' : isAvailable ? '¡Disponible!' : 'Bloqueado'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '24px' }}>
              <ButtonCTA onClick={() => setActiveTab('leccion')} fullWidth>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Play size={16} fill="currentColor" />
                  INICIAR DESAFÍO DEL DÍA
                </span>
              </ButtonCTA>
            </div>
          </div>
        </div>

        <div className="panel-column">
          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-verde-selva)" />
              <span className="card-label">COMPLETADOS</span>
            </div>
            <p className="completed-value">{exploredText}</p>
          </div>

          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} color="var(--color-amarillo-colombia)" />
              <span className="card-label">
                NIVEL: {(levelData?.levelTitle || 'EXPLORADOR').toUpperCase()} (NV. {levelData?.currentLevel || 1})
              </span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <ProgressBar
                value={levelData?.progressPercentage || 0}
                color="var(--color-neutral)"
                showPercentage={false}
              />
            </div>
          </div>

          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={16} color="var(--color-rojo-terracota)" />
              <span className="card-label">RACHA ACTIVA: {streakText}</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <ProgressBar
                value={80}
                color="var(--color-neutral)"
                showPercentage={false}
              />
            </div>
          </div>

          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="var(--color-azul-oceano)" />
              <span className="card-label">LOGROS DESBLOQUEADOS</span>
            </div>
            <div className="badge-row">
              {(badgesList || []).map((badge) => {
                const IconComp = badge.icon || Award;
                return (
                  <div
                    key={badge.id}
                    title={badge.name}
                    className={`achievement-icon ${badge.unlocked ? 'achievement-icon--unlocked' : ''}`}
                  >
                    <IconComp
                      size={20}
                      color={badge.unlocked ? 'var(--color-rojo-terracota)' : 'var(--color-cafe-oscuro-muted)'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};