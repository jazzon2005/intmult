// src/models/lessonModel.js

export const DAILY_CHALLENGES = [
  { id: 'lun', day: 'Lunes', title: 'Acento Santandereano', status: 'available', regionId: 'andina' },
  { id: 'mar', day: 'Martes', title: 'Acento Costeño (Caribe)', status: 'available', regionId: 'caribe' },
  { id: 'mie', day: 'Miércoles', title: 'Acento Paisa (Andino)', status: 'available', regionId: 'andina' },
  { id: 'jue', day: 'Jueves', title: 'Acento Valluno (Pacífico)', status: 'locked', regionId: 'pacifico' },
  { id: 'vie', day: 'Viernes', title: 'Acento Llanero (Orinoquía)', status: 'locked', regionId: 'orinoquia' },
];

export const LESSON_SAMPLE = {
  id: 'les_costeno_01',
  regionId: 'caribe',
  title: 'LECCIÓN DIARIA',
  question: '¿Qué significa la expresión costeña "Echa\'o pa\' lante"?',
  audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_market.ogg', // Audio temporal de prueba
  options: [
    { id: 'opt_1', text: 'Una persona perezosa', isCorrect: false },
    { id: 'opt_2', text: 'Alguien emprendedor y animado', isCorrect: true },
    { id: 'opt_3', text: 'Un habitante de la montaña', isCorrect: false },
  ],
  culturalContext: 'En la región Caribe, referirse a alguien como "echa\'o pa\' lante" es un elogio que resalta su capacidad de superar la adversidad con trabajo duro y actitud positiva.',
  isAdultContent: false,
};