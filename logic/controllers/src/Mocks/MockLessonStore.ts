import { create } from 'zustand';

import type {
  LessonDetails,
  LessonSummary,
  Exercise,
  VerbAnswer,
  ExerciseEvaluation,
  ExerciseExitReason,
} from '@workspace/dtotypes';

import { executeExercise } from '@exercises/logic';
import {
  mockGapExercises,
  mockDialogExercise,
  mockVerbExercises,
  mockVocabularioExercise,
} from './LessonMock';

// -------------------------
// MOCK LESSON (gebruik LessonDetails type)
// -------------------------
const mockVerbLesson: LessonDetails = {
  id: 'lesson-verb-1',
  type: 'grammar',
  title: 'Ser - presente',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: 'Verb click test mock lesson.',
  exercises: mockVerbExercises,
};
const mockVerbSummary: LessonSummary = {
  id: 'lesson-verb-1',
  type: 'grammar',
  title: 'Ser - presente',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: 'Mock lesson summary.',
};
const mockGapLesson: LessonDetails = {
  id: 'lesson-gap-1',
  type: 'grammar',
  title: 'Ser ou estar?',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: 'Select the correct verb.',
  exercises: mockGapExercises,
};
const mockGapSummary: LessonSummary = {
  id: 'lesson-gap-1',
  type: 'grammar',
  title: 'Ser ou estar?',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: 'Select the correct verb.',
};
const mockDialogSummary: LessonSummary = {
  id: 'lesson-1',
  type: 'diálogo',
  title: 'Conhecer-se.',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: '...',
};
const mockDialogLesson: LessonDetails = {
  id: 'lesson-1',
  type: 'diálogo',
  title: 'Conhecer-se',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: '...',
  exercises: [mockDialogExercise],
};

const mockVocabularioSummary: LessonSummary = {
  id: 'flash-card-1',
  type: 'vocabulário',
  level: 'A1',
  title: 'exterior da casa',
  description: 'Nomes dos elementos da casa e do que a rodeia.',
  image: 'mulher-cafe.png',
};
const mockVocabularioLesson: LessonDetails = {
  id: 'flash-card-1',
  level: 'A1',
  type: 'vocabulário',
  title: 'exterior da casa',
  description: 'Nomes dos elementos da casa e do que a rodeia.',
  image: 'mulher-cafe.png',
  exercises: mockVocabularioExercise,
};
// -------------------------
// STORE
// -------------------------
type LessonState = {
  lessonSummaries: Record<string, LessonSummary>;
  lessonDetails: Record<string, LessonDetails>;

  currentLessonID?: string;
  currentLesson?: LessonDetails;

  currentExerciseIndex: number;
  currentExercise?: Exercise;

  results: ExerciseEvaluation[];

  isLoading: boolean;
  error?: string;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (id: string) => Promise<LessonDetails>;
  setCurrentLesson: (id: string) => Promise<void>;
  startLesson: () => Promise<void>;
  setExercise: (exerciseId: number) => Promise<void>;
  startExercise: () => Promise<void>;
  submitAnswer: (answer: VerbAnswer) => Promise<ExerciseEvaluation>;
  completeExercise: (reason: ExerciseExitReason) => Promise<void>;
  nextExercise: () => void;
};

// -------------------------
// STORE
// -------------------------
export const useMockLessonStore = create<LessonState>((set, get) => ({
  lessonSummaries: {
    [mockVerbSummary.id]: mockVerbSummary,
    [mockGapSummary.id]: mockGapSummary,
    [mockDialogSummary.id]: mockDialogSummary,
    [mockVocabularioSummary.id]: mockVocabularioSummary,
  },
  lessonDetails: {
    [mockVerbLesson.id]: mockVerbLesson,
    [mockGapLesson.id]: mockGapLesson,
    [mockDialogLesson.id]: mockDialogLesson,
    [mockVocabularioLesson.id]: mockVocabularioLesson,
  },

  currentLessonID: undefined,
  currentLesson: undefined,
  currentExerciseIndex: 0,
  currentExercise: undefined,
  results: [],
  isLoading: false,
  error: undefined,

  // -------------------------
  // FETCH ALL LESSONS
  // -------------------------
  fetchAllLessons: async () => {
    set({ isLoading: true });

    // fake latency
    await new Promise((r) => setTimeout(r, 200));

    set({
      lessonSummaries: {
        [mockVerbSummary.id]: mockVerbSummary,
        [mockGapSummary.id]: mockGapSummary,
        [mockDialogSummary.id]: mockDialogSummary,
      },
      isLoading: false,
    });
  },

  // -------------------------
  // GET LESSON BY ID
  // -------------------------
  getLessonByID: async (id: string) => {
    set({ isLoading: true });

    console.log('getLessonByID', id);
    // fake latency
    await new Promise((r) => setTimeout(r, 200));

    const selectedLesson = get().lessonDetails[id];
    if (!selectedLesson) {
      throw new Error('Lesson not found');
    }

    set((state) => ({
      lessonDetails: {
        ...state.lessonDetails,
        [id]: selectedLesson,
      },
      currentLesson: selectedLesson,
      currentLessonID: id,
      isLoading: false,
    }));
    get().startLesson();
    return selectedLesson;
  },

  // -------------------------
  // SET CURRENT LESSON
  // -------------------------
  setCurrentLesson: async (id: string) => {
    console.log('setCurrentLesson', id);
    const lesson = await get().getLessonByID(id);

    set({
      currentLessonID: id,
      currentLesson: lesson,
      currentExerciseIndex: 0,
      currentExercise: lesson.exercises[0],
      results: [],
    });
    await get().startLesson();
  },

  // -------------------------
  // START LESSON
  // -------------------------
  startLesson: async () => {
    const lesson = get().currentLesson;
    console.log('startLesson', lesson);
    if (!lesson) return;
    await get().setExercise(0);
  },

  // -------------------------
  // SET EXERCISE
  // -------------------------
  setExercise: async (exerciseId: number) => {
    const lesson = get().currentLesson;
    const exercises = lesson?.exercises;
    if (!exercises) {
      console.log('no exercises');
      return;
    }

    if (exerciseId < exercises.length) {
      set({
        currentExerciseIndex: exerciseId,
        currentExercise: exercises[exerciseId],
        results: [],
      });
      await get().startExercise();
    }
  },

  // -------------------------
  // START EXERCISE
  // -------------------------
  startExercise: async () => {
    const currentExercise = get().currentExercise;
    if (!currentExercise) {
      console.log('no current exercise');
      return;
    }
    set({
      currentExercise: {
        ...currentExercise,
        state: 'active',
      },
    });
    console.log('currentExercise', currentExercise);
  },

  // -------------------------
  // SUBMIT ANSWER
  // -------------------------
  submitAnswer: async (answer: any): Promise<ExerciseEvaluation> => {
    const exercise = get().currentExercise;
    if (!exercise) throw 'Current exercise is undefined';

    const evaluation = await executeExercise(exercise, answer);
    set((state) => ({
      results: [...state.results, evaluation],
    }));
    return evaluation;
  },

  // -------------------------
  // COMPLETE EXERCISE
  // -------------------------
  completeExercise: async (reason: ExerciseExitReason): Promise<void> => {
    const exercise = get().currentExercise;
    if (!exercise) throw 'Current exercise is undefined';

    // TO-DO: Show an overview of exercise results

    // next exercise
    get().nextExercise();
  },

  // -------------------------
  // NEXT EXERCISE
  // -------------------------
  nextExercise: () => {
    const { currentLesson, currentExerciseIndex } = get();
    if (!currentLesson) return;

    const nextIndex = currentExerciseIndex + 1;

    if (nextIndex < currentLesson.exercises.length) {
      get().setExercise(nextIndex);
    } else {
      console.log('Lesson completed');
      set({
        currentLesson: undefined,
        currentLessonID: '',
      });
    }
  },
}));
