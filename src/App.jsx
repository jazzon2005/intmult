// src/App.jsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MainLayout } from './views/layouts/MainLayout';
import { OnboardingModal } from './views/components/OnboardingModal';
import { LogrosModal } from './views/components/LogrosModal';

import { MapaAcentos } from './views/pages/MapaAcentos';
import { PanelDesafios } from './views/pages/PanelDesafios';
import { Comunidad } from './views/pages/Comunidad';
import { Perfil } from './views/pages/Perfil';
import { Contacto } from './views/pages/Contacto';
import { LeccionDiaria } from './views/pages/LeccionDiaria';

const AppContent = () => {
  const { activeTab, isLogrosModalOpen, closeLogrosModal } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'mapa':
        return <MapaAcentos />;
      case 'desafios':
        return <PanelDesafios />;
      case 'comunidad':
        return <Comunidad />;
      case 'contacto':
        return <Contacto />;
      case 'perfil':
        return <Perfil />;
      case 'leccion':
        return <LeccionDiaria />;
      default:
        return <MapaAcentos />;
    }
  };

  return (
    <MainLayout>
      {renderPage()}
      <OnboardingModal />
      <LogrosModal isOpen={isLogrosModalOpen} onClose={closeLogrosModal} />
    </MainLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}