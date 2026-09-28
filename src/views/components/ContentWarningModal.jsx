import React from 'react';
import './ContentWarningModal.css';

export const ContentWarningModal = ({ onAccept }) => {
  return (
    <div className="warning-overlay">
      <div className="warning-modal">
        <div className="warning-badge">+18</div>
        <h2 className="warning-title">Advertencia de Contenido</h2>
        <p className="warning-description">
          Esta plataforma explora el lenguaje real y cotidiano de las distintas regiones de Colombia. 
          Incluye modismos, expresiones vulgares, groserías y frases de doble sentido explicadas 
          en su contexto cultural y social.
        </p>
        <p className="warning-subtext">
          Al ingresar, confirmas que tienes 18 años o más y aceptas explorar el contenido con fines educativos.
        </p>
        <button className="warning-button" onClick={onAccept}>
          Soy mayor de 18 años — Entrar
        </button>
      </div>
    </div>
  );
};