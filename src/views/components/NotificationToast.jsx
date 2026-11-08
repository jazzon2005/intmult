// src/views/components/NotificationToast.jsx
import React, { useEffect } from 'react';
import { Award, Zap, X } from 'lucide-react';
import './NotificationToast.css';

export const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500); // Se oculta automáticamente tras 4.5 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!notification) return null;

  const { type, title, message } = notification;

  return (
    <div className={`toast-card toast-card--${type}`}>
      <div className="toast-icon-wrapper">
        {type === 'levelup' ? (
          <Zap size={22} color="#ffffff" />
        ) : (
          <Award size={22} color="#ffffff" />
        )}
      </div>

      <div className="toast-content">
        <span className="toast-tag">
          {type === 'levelup' ? '¡NIVEL AUMENTADO!' : '¡LOGRO DESBLOQUEADO!'}
        </span>
        <h4 className="toast-title">{title}</h4>
        <p className="toast-message">{message}</p>
      </div>

      <button className="toast-close-btn" onClick={onClose} aria-label="Cerrar">
        <X size={16} />
      </button>
    </div>
  );
};