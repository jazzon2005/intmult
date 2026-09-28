import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeaderNav } from '../components/HeaderNav';
import { ContentWarningModal } from '../components/ContentWarningModal';
import './MainLayout.css';

export const MainLayout = ({ children }) => {
  const { user, acceptAgeWarning } = useApp();

  return (
    <div className="main-layout">
      {!user.hasAcceptedAgeWarning && (
        <ContentWarningModal onAccept={acceptAgeWarning} />
      )}
      <HeaderNav />
      <main className="main-content">
        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  );
};