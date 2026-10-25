// src/views/components/BadgeDetailModal.jsx
import React from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import './BadgeDetailModal.css';

export const BadgeDetailModal = ({ badge, onClose }) => {
  if (!badge) return null;

  const {
    icon: IconComp,
    name,
    description,
    unlocked,
    reqCurrent,
    reqTarget,
    reqUnit,
    progressPercent
  } = badge;

  return (
    <div className="badge-detail-overlay" onClick={onClose}>
      <div className="badge-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="badge-detail-close" onClick={onClose} title="Cerrar">
          <X size={20} />
        </button>

        <div className={`badge-detail-icon-circle ${unlocked ? 'unlocked' : 'locked'}`}>
          <IconComp size={48} />
        </div>

        <span className={`badge-detail-status ${unlocked ? 'unlocked' : 'locked'}`}>
          {unlocked ? '¡LOGRO DESBLOQUEADO!' : 'LOGRO BLOQUEADO'}
        </span>

        <h3 className="badge-detail-title">{name}</h3>
        <p className="badge-detail-desc">{description}</p>

        <div className="badge-detail-progress-box">
          <div className="badge-detail-progress-header">
            <span>Progreso Requerido</span>
            <strong>
              {unlocked ? '100%' : `${reqCurrent} / ${reqTarget}${reqUnit}`}
            </strong>
          </div>
          <div className="badge-detail-progress-track">
            <div
              className={`badge-detail-progress-fill ${unlocked ? 'unlocked' : ''}`}
              style={{ width: `${unlocked ? 100 : progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};