import type { LessonSummary } from '@workspace/dtotypes';
import type { Exercise } from '@workspace/dtotypes';

export const mockLessonSummary: LessonSummary = {
  id: 'lesson-verb-ser',
  title: 'Ser presente',
  description: '',
  type: 'grammar',
  level: 'A1',
  image: 'mulher-cafe.png',
};

export const mockExercises: Exercise[] = [
  {
    id: 'ex-1',
    type: 'verb-click-test',

    // UI info
    title: 'Conjugate "ser"',
    description: 'Click the correct forms',

    // inhoud
    infinitive: 'ser',

    forms: {
      eu: 'sou',
      tu: 'és',
      ele: 'é',
      nós: 'somos',
      vocês: 'são',
      eles: 'são',
    },
  } as any, // tijdelijk als je types nog niet strak zijn
];

export const mockLesson = {
  ...mockLessonSummary,
  exercises: mockExercises,
};
