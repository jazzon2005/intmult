// src/controllers/useLesson.js
import { useState, useMemo } from 'react';
import { QUESTIONS_BANK } from '../data/questionsBank';
import { useApp } from '../context/AppContext';

export const useLesson = (regionIdFilter = null) => {
  const { recordAnswer, completeChallenge, setActiveTab } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Obtener pool de preguntas (Filtrado por región o Desafío Diario variado)
  const questionsList = useMemo(() => {
    if (regionIdFilter) {
      return QUESTIONS_BANK.filter((q) => q.regionId === regionIdFilter);
    }
    return [...QUESTIONS_BANK].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [regionIdFilter]);

  const currentQuestion = questionsList[currentIndex] || questionsList[0];

  const handleSelectOption = (index) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setIsSubmitted(true);

    const xpTable = { facil: 15, medio: 30, dificil: 50 };
    const xpEarned = xpTable[currentQuestion.difficulty] || 15;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    recordAnswer(currentQuestion.regionId, isCorrect, xpEarned);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      completeChallenge('ch_day_1', currentQuestion.regionId, 50);
      setActiveTab('desafios');
    }
  };

  // Reiniciar la lección desde la pregunta 1
  const restartLesson = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
  };

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questionsList.length,
    selectedOption,
    isSubmitted,
    score,
    handleSelectOption,
    handleSubmit,
    handleNext,
    restartLesson
  };
};