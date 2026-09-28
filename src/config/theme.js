// src/config/theme.js

/**
 * Tokens de diseño de la plataforma basados en la guía de estilo oficial.
 */
export const THEME = {
  colors: {
    // Fondos y Estructura
    beigeArena: '#EFEBE4',    // Fondo general y tarjetas
    beigeArenaLight: '#FAF6F0',
    cafeOscuro: '#3E2723',     // Textos principales y títulos
    cafeOscuroMuted: '#5D4A44',// Textos secundarios y bordes sutiles

    // Acciones y Estados
    verdeSelva: '#2E7D32',     // Botones CTA y estados de éxito
    amarilloColombia: '#FFCD00',// Barras de progreso y XP
    azulOceano: '#003087',     // Menú activo y selección de ubicación
    rojoTerracota: '#D84315',   // Dificultad, alertas y rachas
    rojoAlerta: '#C8102E',      // Alertas de contenido +18
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
    weights: {
      regular: 400,
      semiBold: 600,
      bold: 700,
      black: 900,
    },
  },
  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    full: '9999px',
  },
  shadows: {
    card: '0 4px 12px rgba(62, 39, 35, 0.08)',
    button: '0 4px 0px rgba(0, 0, 0, 0.15)',
  },
};