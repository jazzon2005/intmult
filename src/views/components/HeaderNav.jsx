// src/views/components/HeaderNav.jsx
import React, { useState } from 'react';
import {
  Menu,
  X,
  MapPin,
  BookOpen,
  Trophy,
  Users,
  Mail,
  User,
  LogOut,
  ChevronDown,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './HeaderNav.css';

export const HeaderNav = () => {
  const { activeTab, setActiveTab, user, openLogrosModal, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'mapa', label: 'Mapa de Acentos', icon: MapPin },
    { id: 'leccion', label: 'Lección Diaria', icon: BookOpen },
    { id: 'desafios', label: 'Desafíos', icon: Trophy },
    { id: 'comunidad', label: 'Comunidad', icon: Users },
    { id: 'contacto', label: 'Contacto', icon: Mail }
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    logout();
  };

  return (
    <header className="header-nav-container">
      <div className="header-nav-wrapper">
        {/* Marca / Logo visible en móvil y escritorio */}
        <div className="header-brand" onClick={() => handleSelectTab('mapa')}>
          <span className="brand-title">VOCES DE COLOMBIA</span>
        </div>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="header-nav header-nav--desktop">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleSelectTab(id)}
              className={`nav-button ${activeTab === id ? 'nav-button--active' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* PERFIL DESKTOP */}
        {user && (
          <div className="header-profile-section header-profile--desktop">
            <button
              className={`profile-icon-btn ${isProfileDropdownOpen ? 'profile-icon-btn--active' : ''}`}
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="profile-avatar-circle">{user.avatar || 'U'}</div>
              <ChevronDown
                size={16}
                className={`menu-chevron ${isProfileDropdownOpen ? 'menu-chevron--open' : ''}`}
              />
            </button>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown-menu">
                <div className="dropdown-user-info">
                  <span className="dropdown-user-name">{user.name}</span>
                  <span className="dropdown-user-email">{user.email}</span>
                </div>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item"
                  onClick={() => handleSelectTab('perfil')}
                >
                  <User size={16} /> Ver Perfil
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    openLogrosModal();
                  }}
                >
                  <Award size={16} /> Ver Logros
                </button>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item dropdown-item--danger"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        )}

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          className="hamburger-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENÚ HAMBURGUESA DESPLEGABLE Y FIJO (MÓVIL) */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-links">
              {navItems.map(({ id, label, icon: IconComp }) => (
                <button
                  key={id}
                  onClick={() => handleSelectTab(id)}
                  className={`mobile-menu-item ${activeTab === id ? 'mobile-menu-item--active' : ''}`}
                >
                  <IconComp size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* SECCIÓN PERFIL AL FINAL DEL MENÚ HAMBURGUESA */}
            {user && (
              <div className="mobile-menu-footer">
                <div className="dropdown-divider" />
                <button
                  onClick={() => handleSelectTab('perfil')}
                  className={`mobile-menu-item mobile-menu-item--profile ${activeTab === 'perfil' ? 'mobile-menu-item--active' : ''}`}
                >
                  <div className="profile-avatar-circle">{user.avatar || 'U'}</div>
                  <div className="mobile-user-details">
                    <span className="mobile-user-name">{user.name}</span>
                    <span className="mobile-user-sub">Ver Perfil</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openLogrosModal();
                  }}
                  className="mobile-menu-item"
                >
                  <Award size={18} />
                  <span>Mis Logros</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="mobile-menu-item mobile-menu-item--danger"
                >
                  <LogOut size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};