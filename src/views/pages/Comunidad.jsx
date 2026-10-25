import React from 'react';
import { Users, Compass, Headphones } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ButtonCTA } from '../components/ButtonCTA';
import './Comunidad.css';

export const Comunidad = () => {
  const { setActiveTab, user } = useApp();
  return (
    <div className="comunidad-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-illustration">
          <Users size={48} color="var(--color-rojo-terracota)" />
          Red de Dialectología
        </div>
        <div className="hero-content">
          <h1>La mejor manera de aprender acentos colombianos</h1>
          <div className="hero-actions">
            <ButtonCTA onClick={() => setActiveTab('mapa')} fullWidth variant="primary">
              EMPEZAR AHORA
            </ButtonCTA>
            <button className="btn-outline" onClick={() => setActiveTab('perfil')}>
              {user?.isInitialized ? `VER PERFIL (${user.name})` : 'CREAR PERFIL'}
            </button>
          </div>
        </div>
      </section>

      {/* Últimas Noticias */}
      <section>
        <h2 className="section-heading">ÚLTIMAS NOTICIAS</h2>
        <div className="grid-3">
          <div className="card-base news-card">
            <h3 className="news-title">¿Qué significa la palabra 'Parce' en Medellín?</h3>
            <p className="news-meta">Lectura 3 min • Región Andina</p>
          </div>
          <div className="card-base news-card">
            <h3 className="news-title">Origen de la jerga Caleña y el uso del 'Ve'</h3>
            <p className="news-meta">Lectura 4 min • Región Pacífica</p>
          </div>
          <div className="card-base news-card">
            <h3 className="news-title">Modismos indispensables del Caribe Colombiano</h3>
            <p className="news-meta">Lectura 5 min • Región Caribe</p>
          </div>
        </div>
      </section>

      {/* Exploración Cultural */}
      <section>
        <h2 className="section-heading">EXPLORACIÓN CULTURAL</h2>
        <div className="exploration-row">
          <div className="exploration-text">
            <h3>Aprende el Contexto de Uso</h3>
            <p>Descubre no solo el significado de una palabra, sino la intención, la entonación y las situaciones adecuadas para usarla respetando la cultura de cada región.</p>
          </div>
          <div className="exploration-image">
            <Compass size={40} color="var(--color-azul-oceano)" />
          </div>
        </div>
        <div className="exploration-row">
          <div className="exploration-image">
            <Headphones size={40} color="var(--color-azul-oceano)" />
          </div>
          <div className="exploration-text">
            <h3>Grabaciones Fonéticas Reales</h3>
            <p>Escucha voces nativas de distintas partes de Colombia para afinar tu oído y entender las variaciones tonales entre la cordillera, la costa y los llanos.</p>
          </div>
        </div>
      </section>

      {/* Opiniones de la comunidad */}
      <section>
        <h2 className="section-heading">OPINIONES DE LA COMUNIDAD</h2>
        <div className="grid-3">
          <div className="card-base review-card">
            <div className="review-avatar">J</div>
            <p className="review-text">"Excelente para entender los dichos de mis compañeros de trabajo."</p>
          </div>
          <div className="card-base review-card">
            <div className="review-avatar">L</div>
            <p className="review-text">"La interfaz es muy clara y los desafíos diarios enganchan bastante."</p>
          </div>
          <div className="card-base review-card">
            <div className="review-avatar">M</div>
            <p className="review-text">"Me encanta que expliquen la historia detrás de cada expresión regional."</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <h2>Aprende dialectos con Voces de Colombia</h2>
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <ButtonCTA variant="primary" fullWidth>EMPEZAR AHORA</ButtonCTA>
        </div>
      </section>
    </div>
  );
};