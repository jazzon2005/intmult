// src/views/components/LogrosModal.jsx
import React, { useState } from 'react';
import { Award, X, CheckCircle2, Lock } from 'lucide-react';
import { useUser } from '../../controllers/useUser';
import { BadgeDetailModal } from './BadgeDetailModal';
import './LogrosModal.css';

export const LogrosModal = ({ isOpen, onClose }) => {
  const { badgesList } = useUser();
  const [selectedBadge, setSelectedBadge] = useState(null);

  if (!isOpen) return null;

  const unlockedCount = badgesList.filter((b) => b.unlocked).length;

  return (
    <>
      <div className="logros-modal-overlay" onClick={onClose}>
        <div className="logros-modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="logros-modal-header">
            <div className="logros-modal-title">
              <Award size={24} color="var(--color-rojo-terracota)" />
              <h2>TODOS LOS LOGROS ({unlockedCount}/{badgesList.length})</h2>
            </div>
            <button className="btn-close-modal" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="logros-modal-grid">
            {badgesList.map((badge) => {
              const { id, icon: IconComp, name, unlocked } = badge;
              return (
                <div
                  key={id}
                  className={`logro-card ${unlocked ? 'logro-card--unlocked' : 'logro-card--locked'}`}
                  onClick={() => setSelectedBadge(badge)}
                >
                  <div className="logro-icon-wrapper">
                    <IconComp size={28} />
                    {unlocked ? (
                      <CheckCircle2 size={16} className="logro-status-icon logro-status-icon--check" />
                    ) : (
                      <Lock size={16} className="logro-status-icon logro-status-icon--lock" />
                    )}
                  </div>
                  <span className="logro-name">{name}</span>
                  <span className="logro-badge-tag">
                    {unlocked ? 'DESBLOQUEADO' : 'BLOQUEADO'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Detalle al seleccionar una insignia */}
      <BadgeDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </>
  );
};