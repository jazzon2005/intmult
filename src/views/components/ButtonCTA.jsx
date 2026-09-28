import React from 'react';
import './ButtonCTA.css';

export const ButtonCTA = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  icon = null,
}) => {
  const classNames = [
    'btn-cta',
    disabled ? 'btn-cta--disabled' : `btn-cta--${variant}`,
    fullWidth ? 'btn-cta--full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} onClick={disabled ? undefined : onClick} disabled={disabled}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};