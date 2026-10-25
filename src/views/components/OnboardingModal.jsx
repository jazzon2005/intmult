// src/views/components/OnboardingModal.jsx
import React, { useState } from 'react';
import { LogIn, UserPlus, Sparkles, Lock, Mail, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ButtonCTA } from './ButtonCTA';
import './OnboardingModal.css';

export const OnboardingModal = () => {
  const { user, login, register } = useApp();
  const [mode, setMode] = useState('register'); // 'register' | 'login'

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  const [error, setError] = useState('');

  // Si ya hay usuario con sesión activa, el modal no se muestra
  if (user && user.isInitialized) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    try {
      if (mode === 'register') {
        if (!username.trim()) {
          setError('Ingresa un nombre de usuario.');
          return;
        }
        if (!isAdult) {
          setError('Debes confirmar que eres mayor de 18 años.');
          return;
        }
        register({ email, username, password });
      } else {
        login({ email, password });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="onboarding-icon">
          <Sparkles size={32} color="var(--color-rojo-terracota)" />
        </div>
        <h2>Voces de Colombia</h2>
        <p className="onboarding-subtitle">
          Aprende acentos, dialectos y modismos de todas las regiones colombianas.
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'register' ? 'auth-tab--active' : ''}`}
            onClick={() => {
              setMode('register');
              setError('');
            }}
          >
            Registrarse
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            Iniciar Sesión
          </button>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-group">
            <label htmlFor="authEmail">Correo Electrónico</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input
                id="authEmail"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="onboarding-input"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="authUsername">Nombre de Usuario</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  id="authUsername"
                  type="text"
                  placeholder="Ej. JuanPaisa"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="onboarding-input"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="authPassword">Contraseña</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                id="authPassword"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="onboarding-input"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="form-checkbox-group">
              <input
                type="checkbox"
                id="ageCheck"
                checked={isAdult}
                onChange={(e) => setIsAdult(e.target.checked)}
              />
              <label htmlFor="ageCheck">
                Confirmo que tengo <strong>18 años o más</strong> para acceder al contenido cultural.
              </label>
            </div>
          )}

          {error && <p className="onboarding-error">{error}</p>}

          <ButtonCTA fullWidth type="submit">
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {mode === 'register' ? <UserPlus size={18} /> : <LogIn size={18} />}
              {mode === 'register' ? 'CREAR MI CUENTA' : 'ENTRAR A MI CUENTA'}
            </span>
          </ButtonCTA>
        </form>
      </div>
    </div>
  );
};