import { create } from 'zustand';

import type {
  LessonDetails,
  LessonSummary,
  Exercise,
  CheckVerbExercise,
  VerbAnswer,
  PronounId,
  ExerciseEvaluation,
} from '@workspace/dtotypes';

import type { CheckVerbFeedback } from '@workspace/dtotypes';
import { executeExercise } from '@exercises/logic';

import { mockExercises } from './LessonMock';

type State = {
  lesson: LessonDetails;
  currentExercise: Exercise;
  results: ExerciseEvaluation[];

  submitAnswer: (answer: VerbAnswer) => Promise<ExerciseEvaluation>;
};

// -------------------------
// MOCK LESSON (gebruik LessonDetails type)
// -------------------------
const mockLesson: LessonDetails = {
  id: 'lesson-verb-1',
  type: 'grammar',
  title: 'Ser - presente',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: 'Verb click test mock lesson',
  exercises: mockExercises,
};
const mockSummary: LessonSummary = {
  id: 'lesson-verb-1',
  type: 'grammar',
  title: 'Ser – presente',
  level: 'A1',
  image: 'mulher-cafe.png',
  description: 'Mock lesson summary',
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
  nextExercise: () => void;
};

// -------------------------
// CHECK LOGIC (inline mock)
// -------------------------
function checkVerb(
  exercise: CheckVerbExercise,
  answer: VerbAnswer,
): CheckVerbFeedback {
  const correctValue: string =
    exercise.forms[answer.pronounId as PronounId] ?? '';

  const isCorrect =
    answer.value.trim().toLowerCase() === correctValue?.trim().toLowerCase();

  return {
    isCorrect,
    id: answer.pronounId,
    value: answer.value as any,
    correctValue,
  };
}

// -------------------------
// STORE
// -------------------------
export const useMockLessonStore = create<LessonState>((set, get) => ({
  lessonSummaries: {
    [mockSummary.id]: mockSummary,
  },

  lessonDetails: {
    [mockLesson.id]: mockLesson,
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
        [mockSummary.id]: mockSummary,
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

    if (id !== mockLesson.id) {
      throw new Error('Lesson not found');
    }

    set((state) => ({
      lessonDetails: {
        ...state.lessonDetails,
        [id]: mockLesson,
      },
      isLoading: false,
    }));

    return mockLesson;
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
  submitAnswer: async (answer: VerbAnswer): Promise<ExerciseEvaluation> => {
    const exercise = get().currentExercise;
    if (!exercise) throw 'Current exercise is undefined';

    try {
      const evaluation = await executeExercise(exercise, answer);
      set((state) => ({
        results: [...state.results, evaluation],
      }));
      console.log('MockLessonStore - nextAction', evaluation.nextAction);
      switch (evaluation.nextAction) {
        case 'next':
          console.log('MockLesson', 'Next exercise');
          get().nextExercise();
          break;

        default:
          break;
      }
      return evaluation;
    } catch (err) {
      throw 'executeExercise failed:';
    }
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
    }
  },
}));
