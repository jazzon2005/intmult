import React from 'react';
import './ProgressBar.css';

export const ProgressBar = ({
  label,
  value = 0,
  color = 'var(--color-amarillo-colombia)',
  showPercentage = true,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-container">
      {label && (
        <div className="progress-label-row">
          <span className="progress-label">{label}</span>
          {showPercentage && <span className="progress-percentage">{clampedValue}%</span>}
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${clampedValue}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};