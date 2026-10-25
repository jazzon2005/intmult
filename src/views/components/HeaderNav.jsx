// src/views/components/HeaderNav.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, LogIn, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './HeaderNav.css';

export const HeaderNav = () => {
  const { activeTab, setActiveTab, user, logout, openLogrosModal } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { id: 'mapa', label: 'MAPA' },
    { id: 'desafios', label: 'DESAFÍOS' },
    { id: 'comunidad', label: 'COMUNIDAD' },
    { id: 'contacto', label: 'CONTACTO' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-nav-container">
      <div className="header-nav-wrapper">
        <nav className="header-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-button ${isActive ? 'nav-button--active' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sección de perfil desplegable */}
        <div className="header-profile-section" ref={menuRef}>
          <button
            className={`profile-icon-btn ${activeTab === 'perfil' ? 'profile-icon-btn--active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            title={user ? user.name : 'Perfil'}
          >
            {user?.avatar ? (
              <span className="profile-avatar-circle">{user.avatar}</span>
            ) : (
              <User size={18} />
            )}
            <ChevronDown size={14} className={`menu-chevron ${menuOpen ? 'menu-chevron--open' : ''}`} />
          </button>

          {menuOpen && (
            <div className="profile-dropdown-menu">
              {user ? (
                <>
                  <div className="dropdown-user-info">
                    <span className="dropdown-user-name">{user.name}</span>
                    <span className="dropdown-user-email">{user.email}</span>
                  </div>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setActiveTab('perfil');
                      setMenuOpen(false);
                    }}
                  >
                    <User size={16} /> Ver mi Perfil
                  </button>

                  {/* NUEVO BOTÓN PARA VER LOGROS */}
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      openLogrosModal();
                      setMenuOpen(false);
                    }}
                  >
                    <Award size={16} color="var(--color-rojo-terracota)" /> Mis Logros
                  </button>

                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item dropdown-item--danger"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setActiveTab('perfil');
                    setMenuOpen(false);
                  }}
                >
                  <LogIn size={16} /> Iniciar Sesión / Registro
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};