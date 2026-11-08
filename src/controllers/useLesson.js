// src/controllers/useLesson.js
import { useState, useEffect, useCallback } from 'react';
import { QUESTIONS_BANK } from '../data/questionsBank';
import { useApp } from '../context/AppContext';

/**
 * Función auxiliar para mezclar un arreglo usando el algoritmo Fisher-Yates
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Mezcla las opciones de una pregunta y reasigna el índice `correctAnswer` a su nueva posición
 */
const randomizeQuestionOptions = (question) => {
  const correctOptionText = question.options[question.correctAnswer];
  const shuffledOptions = shuffleArray(question.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex
  };
};

export const useLesson = () => {
  const {
    recordAnswer,
    completeChallenge,
    setActiveTab,
    selectedRegionId,
    correctQuestionIds
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);

  // Genera la tanda de 5 preguntas y randomiza sus opciones de respuesta
  const loadQuestionsBatch = useCallback(() => {
    const basePool = selectedRegionId
      ? QUESTIONS_BANK.filter((q) => q.regionId === selectedRegionId)
      : [...QUESTIONS_BANK];

    const pendingQuestions = basePool.filter((q) => !correctQuestionIds.includes(q.id));
    const solvedQuestions = basePool.filter((q) => correctQuestionIds.includes(q.id));

    const shuffledPending = shuffleArray(pendingQuestions);
    const shuffledSolved = shuffleArray(solvedQuestions);

    const combined = [...shuffledPending, ...shuffledSolved].slice(0, 5);

    // Randomizar el orden de las 4 opciones A, B, C, D de cada pregunta seleccionada
    return combined.map(randomizeQuestionOptions);
  }, [selectedRegionId]);

  // Inicializar preguntas al cargar o cambiar de región
  useEffect(() => {
    setQuestionsList(loadQuestionsBatch());
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
  }, [selectedRegionId, loadQuestionsBatch]);

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

    recordAnswer(currentQuestion.id, currentQuestion.regionId, isCorrect, xpEarned);
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

  const restartLesson = () => {
    setQuestionsList(loadQuestionsBatch());
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