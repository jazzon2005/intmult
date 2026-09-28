// src/controllers/useLesson.js
import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { LESSON_SAMPLE } from '../models/lessonModel';

export const useLesson = (lessonData = LESSON_SAMPLE) => {
  const { completeChallenge } = useApp();
  
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const audioRef = useRef(new Audio(lessonData.audioUrl));

  // Maneja la reproducción del audio regional
  const playAudio = () => {
    if (isPlayingAudio) return;
    
    setIsPlayingAudio(true);
    audioRef.current.play()
      .then(() => {
        // Simulación o evento real de finalización
        audioRef.current.onended = () => setIsPlayingAudio(false);
      })
      .catch(() => {
        // En caso de bloqueo por el navegador, resetea el estado
        setIsPlayingAudio(false);
      });
  };

  // Selección de una alternativa de respuesta
  const selectOption = (optionId) => {
    if (isSubmitted) return; // Bloquea si ya respondió
    setSelectedOptionId(optionId);
  };

  // Verificación de la respuesta
  const checkAnswer = () => {
    if (!selectedOptionId || isSubmitted) return;

    const selectedOption = lessonData.options.find((opt) => opt.id === selectedOptionId);
    const correct = selectedOption?.isCorrect ?? false;

    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      completeChallenge(lessonData.id);
    }
  };

  const resetLesson = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setIsPlayingAudio(false);
  };

  return {
    lesson: lessonData,
    selectedOptionId,
    isSubmitted,
    isCorrect,
    isPlayingAudio,
    playAudio,
    selectOption,
    checkAnswer,
    resetLesson,
  };
};