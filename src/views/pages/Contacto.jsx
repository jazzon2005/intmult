import React, { useState } from 'react';
import { ButtonCTA } from '../components/ButtonCTA';
import './Contacto.css';

export const Contacto = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contacto-container">
      <div className="contacto-card">
        <h1 className="contacto-title">CONTACTO</h1>
        <p className="contacto-subtitle">
          ¿Tienes sugerencias sobre expresiones de tu región o consultas sobre la plataforma? Escríbenos.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <h3 style={{ color: 'var(--color-verde-selva)', marginBottom: '8px' }}>
              ¡Mensaje enviado con éxito! 🎉
            </h3>
            <p style={{ color: 'var(--color-cafe-oscuro-muted)', fontSize: '14px' }}>
              Gracias por ayudarnos a enriquecer el mapa de dialectos de Colombia.
            </p>
          </div>
        ) : (
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input type="text" id="nombre" required className="form-input" placeholder="Ej: María Rodríguez" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" required className="form-input" placeholder="correo@ejemplo.com" />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje o Expresión Regional</label>
              <textarea id="mensaje" required className="form-textarea" placeholder="Escribe tu mensaje aquí..."></textarea>
            </div>

            <ButtonCTA variant="primary" fullWidth>
              ENVIAR MENSAJE
            </ButtonCTA>
          </form>
        )}
      </div>
    </div>
  );
};