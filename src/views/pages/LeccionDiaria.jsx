// src/views/pages/LeccionDiaria.jsx
import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Trophy,
  Sparkles,
  RotateCcw,
  Map,
  Play
} from 'lucide-react';
import { useLesson } from '../../controllers/useLesson';
import { useApp } from '../../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { ButtonCTA } from '../components/ButtonCTA';
import './LeccionDiaria.css';

export const LeccionDiaria = () => {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOption,
    isSubmitted,
    score,
    handleSelectOption,
    handleSubmit,
    handleNext,
    restartLesson
  } = useLesson();

  const { setActiveTab } = useApp();
  const [isCompleted, setIsCompleted] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);
  const [successCard, setSuccessCard] = useState(false);

  if (!currentQuestion) {
    return (
      <div className="leccion-container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Cargando desafío...</h2>
      </div>
    );
  }

  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const onCheckAnswer = () => {
    handleSubmit();
    if (selectedOption === currentQuestion.correctAnswer) {
      setSuccessCard(true);
      setTimeout(() => setSuccessCard(false), 500);
    } else {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 450);
    }
  };

  const onAdvance = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setIsCompleted(true);
    } else {
      handleNext();
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    restartLesson();
  };

  // --- PANTALLA FINAL DE CELEBRACIÓN ---
  if (isCompleted) {
    const accuracy = Math.round((score / totalQuestions) * 100);

    return (
      <div className="leccion-container">
        <div className="completion-card">
          <div className="completion-icon-wrapper">
            <Trophy size={36} color="var(--color-verde-selva)" />
          </div>

          <h1 className="completion-title">¡DESAFÍO COMPLETADO!</h1>
          <p className="completion-subtitle">
            Demostraste un gran dominio del léxico y modismos colombianos.
          </p>

          <div className="completion-stats-row">
            <div className="completion-stat-box">
              <div className="completion-stat-value">{score} / {totalQuestions}</div>
              <div className="completion-stat-label">ACIERTOS</div>
            </div>
            <div className="completion-stat-box">
              <div className="completion-stat-value">{accuracy}%</div>
              <div className="completion-stat-label">PRECISIÓN</div>
            </div>
            <div className="completion-stat-box">
              <div className="completion-stat-value" style={{ color: 'var(--color-amarillo-colombia)' }}>
                +50 XP
              </div>
              <div className="completion-stat-label">GANADOS</div>
            </div>
          </div>

          <div className="completion-actions">
            <ButtonCTA
              onClick={() => {
                setIsCompleted(false);
                handleNext();
              }}
              fullWidth
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Play size={18} fill="currentColor" /> SIGUIENTE LECCIÓN
              </span>
            </ButtonCTA>

            <button
              className="btn-outline"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'var(--color-cafe-oscuro-muted)'
              }}
              onClick={handleRestart}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <RotateCcw size={18} /> REINICIAR ESTA LECCIÓN
              </span>
            </button>

            <button
              className="btn-outline"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'var(--color-cafe-oscuro-muted)'
              }}
              onClick={() => setActiveTab('mapa')}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                 VOLVER AL MAPA
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PREGUNTA INTERACTIVA ---
  return (
    <div className="leccion-container">
      {/* Encabezado y Barra de Progreso */}
      <div className="leccion-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--color-rojo-terracota)' }}>
            {(currentQuestion?.regionId || 'DESAFÍO GENERAL').toUpperCase()}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-cafe-oscuro-muted)' }}>
            Pregunta {currentIndex + 1} de {totalQuestions}
          </span>
        </div>
        <ProgressBar value={progressPercentage} color="var(--color-rojo-terracota)" showPercentage={false} />
      </div>

      {/* Tarjeta con animaciones de Acierto o Error */}
      <div
        className={`question-card ${shakeCard ? 'question-card--shake' : ''} ${successCard ? 'question-card--success' : ''}`}
        style={{ marginTop: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <HelpCircle size={18} color="var(--color-rojo-terracota)" />
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-cafe-oscuro-muted)', textTransform: 'uppercase' }}>
            Dificultad: {currentQuestion?.difficulty || 'Normal'}
          </span>
        </div>

        <h2 style={{ fontSize: '18px', color: 'var(--color-cafe-oscuro)', marginBottom: '20px', lineHeight: '1.4' }}>
          {currentQuestion?.question}
        </h2>

        {/* Opciones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(currentQuestion?.options || []).map((option, idx) => {
            let optionStyle = {
              padding: '12px 16px',
              borderRadius: '8px',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'rgba(62, 39, 35, 0.2)',
              backgroundColor: 'var(--color-blanco)',
              textAlign: 'left',
              cursor: isSubmitted ? 'default' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            };

            if (selectedOption === idx) {
              optionStyle.borderColor = 'var(--color-azul-oceano)';
              optionStyle.backgroundColor = 'rgba(41, 128, 185, 0.08)';
            }

            if (isSubmitted) {
              if (idx === currentQuestion.correctAnswer) {
                optionStyle.borderColor = 'var(--color-verde-selva)';
                optionStyle.backgroundColor = 'rgba(39, 174, 96, 0.12)';
                optionStyle.color = 'var(--color-verde-selva)';
                optionStyle.fontWeight = '800';
              } else if (selectedOption === idx) {
                optionStyle.borderColor = 'var(--color-rojo-terracota)';
                optionStyle.backgroundColor = 'rgba(211, 84, 0, 0.12)';
                optionStyle.color = 'var(--color-rojo-terracota)';
              }
            }

            return (
              <button
                key={idx}
                style={optionStyle}
                onClick={() => handleSelectOption(idx)}
                disabled={isSubmitted}
              >
                <span style={{ opacity: 0.6 }}>{String.fromCharCode(65 + idx)}.</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Visual de Respuesta */}
        {isSubmitted && (
          <div
            className={`feedback-box ${isCorrect ? 'feedback-box--success' : ''}`}
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: isCorrect ? 'rgba(39, 174, 96, 0.12)' : 'rgba(211, 84, 0, 0.12)',
              borderLeft: `5px solid ${isCorrect ? 'var(--color-verde-selva)' : 'var(--color-rojo-terracota)'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {isCorrect ? (
                <>
                  <CheckCircle2 size={22} color="var(--color-verde-selva)" />
                  <strong style={{ color: 'var(--color-verde-selva)', fontSize: '15px' }}>
                    ¡Excelente acierto!
                  </strong>
                  <Sparkles size={18} color="var(--color-amarillo-colombia)" />
                </>
              ) : (
                <>
                  <XCircle size={22} color="var(--color-rojo-terracota)" />
                  <strong style={{ color: 'var(--color-rojo-terracota)', fontSize: '15px' }}>
                    ¡Casi! Revisa la explicación:
                  </strong>
                </>
              )}
            </div>
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--color-cafe-oscuro)', lineHeight: '1.45' }}>
              {currentQuestion?.explanation}
            </p>
          </div>
        )}

        {/* Botón de Acción Principal */}
        <div style={{ marginTop: '24px' }}>
          {!isSubmitted ? (
            <ButtonCTA onClick={onCheckAnswer} disabled={selectedOption === null} fullWidth>
              COMPROBAR RESPUESTA
            </ButtonCTA>
          ) : (
            <ButtonCTA onClick={onAdvance} fullWidth>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                CONTINUAR <ArrowRight size={18} />
              </span>
            </ButtonCTA>
          )}
        </div>
      </div>
    </div>
  );
};