import type { LessonSummary, VerbFormTable } from '@workspace/dtotypes';
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

export const mockExercises: Exercise[] = [
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
  exercises: mockExercises,
};
