import React from 'react';
import { useApp } from '../../context/AppContext';
import './HeaderNav.css';

export const HeaderNav = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'mapa', label: 'MAPA' },
    { id: 'desafios', label: 'DESAFÍOS' },
    { id: 'comunidad', label: 'COMUNIDAD' },
    { id: 'contacto', label: 'CONTACTO' },
    { id: 'perfil', label: 'PERFIL' },
  ];

  return (
    <header className="header-nav-container">
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
    </header>
  );
};