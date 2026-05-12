import type {
  CheckGapExercise,
  LessonSummary,
  VerbFormTable,
} from '@workspace/dtotypes';
import type { Exercise } from '@workspace/dtotypes';

export const mockLessonSummary: LessonSummary = {
  id: 'lesson-verb-1',
  title: 'Ser presente',
  description: '',
  type: 'grammar',
  level: 'A1',
  image: 'mulher-cafe.png',
};

const verbSer: VerbFormTable = {
  infinitive: 'ser',
  tense: 'presente',
  forms: {
    p1ev: 'sou',
    p2ev: 'és',
    p3ev: 'é',
    p1mv: 'somos',
    p2mv: 'são',
    p3mv: 'são',
  },
};

export const mockVerbExercises: Exercise[] = [
  {
    id: 'ex-1',
    type: 'verb-click-learn',
    title: 'Conjugate "ser"',
    description: 'Click the correct forms',
    infinitive: verbSer.infinitive,
    forms: verbSer.forms,
  } as any,
  {
    id: 'ex-2',
    type: 'verb-click-test',
    title: 'Conjugate "ser"',
    description: 'Select the correct forms',
    infinitive: verbSer.infinitive,
    forms: verbSer.forms,
  } as any,
  {
    id: 'ex-3',
    type: 'verb-type-test',
    title: 'Conjugate "ser"',
    description: 'Type the correct forms',
    infinitive: verbSer.infinitive,
    forms: verbSer.forms,
  } as any,
];

export const mockLesson = {
  ...mockLessonSummary,
  exercises: mockVerbExercises,
};

export const mockGapExercises: Exercise[] = [
  {
    id: 'ex-5',
    type: 'gap-click-test',
    title: 'Ser ou Estar',
    description: 'Select the correct verb',
    phraseIndex: 0,
    phrases: [
      {
        id: 's3',
        textParts: ['O quadro da sala', 'limpo'],
        translation: 'Het bord in de klas is schoon',
        gaps: [{ id: 'g1', correct: 'é', alt: ['está'] }],
      },
      {
        id: 's4',
        textParts: ['O pai', 'em casa.'],
        translation: 'Vader is thuis.',
        gaps: [{ id: 'g2', correct: 'está', alt: ['é'] }],
      },
      {
        id: 's5',
        textParts: ['Os prédios', 'altos'],
        translation: 'De gebouwen zijn hoog.',
        gaps: [{ id: 'g3', correct: 'são', alt: ['estão'] }],
      },
      {
        id: 's6',
        textParts: ['O Banco', 'fechado.'],
        translation: 'De bank is gesloten.',
        gaps: [{ id: 'g4', correct: 'está', alt: ['é'] }],
      },
    ],
  } as CheckGapExercise,
  {
    id: 'ex-4',
    type: 'gap-type-test',
    title: 'Verbos regulares -er',
    description: 'Select the correct verb',
    phraseIndex: 0,
    phrases: [
      {
        id: 's1',
        textParts: ['Eu ', 'só português, mas ele', 'também francês.'],
        translation: 'Ik spreek alleen Portugees, maar hij spreekt ook Frans.',
        gaps: [
          { id: 'g1', correct: 'falo', hint: 'falar (eu)' },
          { id: 'g2', correct: 'fala', hint: 'falar (ele)' },
        ],
      },
      {
        id: 's2',
        textParts: ['Nós ', ' agora'],
        translation: 'Wij eten nu.',
        gaps: [{ id: 'g3', correct: 'comemos', hint: 'comer (nós)' }],
      },
    ],
  } as CheckGapExercise,
];
