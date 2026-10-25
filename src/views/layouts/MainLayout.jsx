// src/views/layouts/MainLayout.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeaderNav } from '../components/HeaderNav';
import { ContentWarningModal } from '../components/ContentWarningModal';
import './MainLayout.css';

export const MainLayout = ({ children }) => {
  const { user } = useApp();

  return (
    <div className="main-layout">
      <HeaderNav />
      <main className="layout-content">
        {children}
      </main>
      {user && !user?.hasAcceptedAgeWarning && <ContentWarningModal />}
    </div>
  );
};