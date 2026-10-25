// src/data/questionsBank.js

export const QUESTIONS_BANK = [
  // --- REGIÓN CARIBE ---
  {
    id: 'car_01',
    regionId: 'caribe',
    type: 'significado', // Tipo 1: Significado de Modismo
    difficulty: 'facil', // +15 XP
    question: 'En la Costa Caribe, cuando alguien dice "¡Eche, no jode!", ¿qué actitud o emoción expresa?',
    options: ['Alegría extrema', 'Incredulidad o molestia', 'Un saludo formal', 'Tristeza profunda'],
    correctAnswer: 1,
    explanation: '"Eche" es una interjección icónica costeña usada para expresar incredulidad, desaprobación o molestia.'
  },
  {
    id: 'car_02',
    regionId: 'caribe',
    type: 'contexto', // Tipo 2: Situación Real
    difficulty: 'medio', // +30 XP
    question: 'Estás en Barranquilla y alguien te ofrece algo diciendo "Toma, para que no estés ' + 'mamando gallo' + '". ¿Qué significa "mamar gallo"?',
    options: ['Estar perdiendo el tiempo o molestando', 'Comer pollo asado', 'Madrugar a trabajar', 'Estar enfermo'],
    correctAnswer: 0,
    explanation: '"Mamar gallo" significa bromear, tomar del pelo o perder el tiempo sin hacer nada productivo.'
  },
  {
    id: 'car_03',
    regionId: 'caribe',
    type: 'identificacion', // Tipo 3: Reconocimiento Dialectal
    difficulty: 'dificil', // +50 XP
    question: '¿Qué rasgo fonético es el más representativo del acento costeño al hablar rápido?',
    options: ['Uso excesivo del voseo', 'Aspiración o elisión de la consonante "s"', 'Pronunciación marcada de la "r" arrastrada', 'Canto pausado al final de cada frase'],
    correctAnswer: 1,
    explanation: 'En el dialecto costeño es habitual la aspiración o elisión de la "s" (ej. "los costeños" suena "loh costeño").'
  },

  // --- REGIÓN ANDINA ---
  {
    id: 'and_01',
    regionId: 'andina',
    type: 'significado',
    difficulty: 'facil',
    question: 'En el dialecto Paisa, ¿qué significa la palabra "Parce" o "Parcero"?',
    options: ['Enemigo', 'Amigo cercano o compañero', 'Jefe de trabajo', 'Vecino desconocido'],
    correctAnswer: 1,
    explanation: '"Parce" o "Parcero" proviene del parlache antioqueño y significa amigo o compadre.'
  },
  {
    id: 'and_02',
    regionId: 'andina',
    type: 'contexto',
    difficulty: 'medio',
    question: 'Llegas a un restaurante en Bogotá y la mesera te dice: "¿Qué se le ofrece, su merced?". ¿Cómo se interpreta el uso de "su merced"?',
    options: ['Una burla antigua', 'Un trato de respeto y calidez tradicional', 'Una exigencia de dinero', 'Una orden formal'],
    correctAnswer: 1,
    explanation: '"Su merced" (o sumercé) es una fórmula de cortesía, respeto y cariño típica del altiplano cundiboyacense y Bogotá.'
  },
  {
    id: 'and_03',
    regionId: 'andina',
    type: 'significado',
    difficulty: 'dificil',
    question: 'En Santander, si alguien te dice "¡Deje de ser tan pingo!", ¿qué te está diciendo?',
    options: ['Que dejes de ser tonto o descuidado', 'Que camines más rápido', 'Que te vistas elegante', 'Que guardes silencio'],
    correctAnswer: 0,
    explanation: '"Pingo" en el habla santandereana se usa de forma coloquial para referirse a alguien bobo o tonto.'
  },

  // --- REGIÓN PACÍFICO ---
  {
    id: 'pac_01',
    regionId: 'pacifico',
    type: 'contexto',
    difficulty: 'facil',
    question: 'En Santiago de Cali es muy común escuchar la palabra "Chuspa". ¿A qué objeto se refieren?',
    options: ['A una billetera', 'A una bolsa de plástico', 'A una chaqueta de frío', 'A una gorra'],
    correctAnswer: 1,
    explanation: 'En el Valle del Cauca y el Pacífico, una "chuspa" es una bolsa plástica.'
  },
  {
    id: 'pac_02',
    regionId: 'pacifico',
    type: 'significado',
    difficulty: 'medio',
    question: 'En el dialecto caleño y del Pacífico, ¿qué significa la expresión "Bororó"?',
    options: ['Una fiesta muy animada', 'Un desorden, chisme o problema confuso', 'Un plato típico de pescado', 'Un peinado tradicional'],
    correctAnswer: 1,
    explanation: '"Bororó" hace referencia a un malentendido, altercado o enredo grande.'
  },

  // --- REGIÓN ORINOQUÍA ---
  {
    id: 'ori_01',
    regionId: 'orinoquia',
    type: 'significado',
    difficulty: 'facil',
    question: 'Un llanero te saluda diciendo: "¡Hola, camarita!". ¿Qué significa "camarita"?',
    options: ['Cámara fotográfica', 'Camarada, amigo o compañero de faena', 'Habitación pequeña', 'Persona desconocida'],
    correctAnswer: 1,
    explanation: '"Camarita" es un término afectuoso del llano para referirse a un amigo o camarada.'
  },
  {
    id: 'ori_02',
    regionId: 'orinoquia',
    type: 'contexto',
    difficulty: 'medio',
    question: 'En la cultura llanera, ¿a qué se refiere la expresión "Guate"?',
    options: ['A una persona del interior o de la cordillera', 'A un caballo de carreras', 'A un sombrero llanero', 'Al río Meta'],
    correctAnswer: 0,
    explanation: 'En los Llanos Orientales se le llama "Guate" a la persona proveniente de la zona Andina o del interior.'
  },

  // --- REGIÓN AMAZONÍA ---
  {
    id: 'ama_01',
    regionId: 'amazonia',
    type: 'significado',
    difficulty: 'facil',
    question: 'En la Amazonía colombiana, ¿qué es una "Maloca"?',
    options: ['Una fruta de la selva', 'Una canoa tradicional', 'Una casa comunitaria ancestral indígena', 'Un pez de río'],
    correctAnswer: 2,
    explanation: 'La maloca es la edificación comunitaria tradicional donde las comunidades amazónicas se reúnen y conviven.'
  },
  {
    id: 'ama_02',
    regionId: 'amazonia',
    type: 'identificacion',
    difficulty: 'dificil',
    question: '¿Qué característica influye más en el vocabulario único de la región Amazónica en Leticia?',
    options: ['El uso de modismos centroamericanos', 'La cercanía y frontera con Brasil y Perú (Portuñol y préstamos del quechua)', 'El acento paisa de los colonos', 'El inglés insular'],
    correctAnswer: 1,
    explanation: 'El dialecto amazónico fronterizo incorpora palabras del portugués brasileño y lenguas indígenas nativas.'
  }
];