import React from 'react';
import { Play, Volume2, X } from 'lucide-react';
import { useLesson } from '../../controllers/useLesson';
import { useApp } from '../../context/AppContext';
import { ButtonCTA } from '../components/ButtonCTA';
import './LeccionDiaria.css';

export const LeccionDiaria = () => {
  const { lesson, selectedOptionId, isSubmitted, isCorrect, isPlayingAudio, playAudio, selectOption, checkAnswer } = useLesson();
  const { setActiveTab } = useApp();

  return (
    <div className="lesson-container">
      <div className="lesson-progress-row">
        <button className="lesson-close-btn" onClick={() => setActiveTab('desafios')}>
          <X size={20} />
        </button>
        <div className="lesson-progress-track">
          <div className="lesson-progress-fill" style={{ width: '60%' }} />
        </div>
      </div>

      <h2 className="lesson-header-title">{lesson.title}</h2>

      <div className="question-card">
        <h1 className="question-text">{lesson.question}</h1>

        <button className="audio-button" onClick={playAudio}>
          {isPlayingAudio ? (
            <Volume2 size={18} color="var(--color-rojo-terracota)" />
          ) : (
            <Play size={18} color="var(--color-rojo-terracota)" />
          )}
          <span>{isPlayingAudio ? 'Reproduciendo...' : 'Escuchar pronunciación regional'}</span>
        </button>

        <p className="question-instruction">Selecciona la opción que mejor describe su contexto de uso:</p>
      </div>

      <div className="options-grid">
        {lesson.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => selectOption(option.id)}
              className={`option-card ${isSelected ? 'option-card--selected' : ''}`}
            >
              <span className="option-text">{option.text}</span>
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div className={`feedback-box ${isCorrect ? 'feedback-box--correct' : 'feedback-box--incorrect'}`}>
          <h4>{isCorrect ? '¡Correcto! +50 XP 🎉' : 'Respuesta incorrecta'}</h4>
          <p className="context-text">{lesson.culturalContext}</p>
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <ButtonCTA
          onClick={isSubmitted ? () => setActiveTab('desafios') : checkAnswer}
          disabled={!selectedOptionId}
          fullWidth
        >
          {isSubmitted ? 'CONTINUAR' : 'COMPROBAR RESPUESTA'}
        </ButtonCTA>
      </div>
    </div>
  );
};