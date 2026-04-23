import { create } from 'zustand';

import type {
  LessonDetails,
  LessonSummary,
  Exercise,
  CheckVerbExercise,
  VerbAnswer,
  PronounId,
} from '@workspace/dtotypes';

import type { CheckVerbFeedback } from '@workspace/dtotypes';

type State = {
  lesson: LessonDetails;
  currentExercise: Exercise;
  results: CheckVerbFeedback[];

  submitAnswer: (answer: VerbAnswer) => void;
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
  exercises: [
    {
      id: 'verb-ser-presente',
      type: 'verb-click-test',
      title: 'Conjugate ser',
      description: 'Escolha a conjugação correta',
      verb: {
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
      },
    },
  ],
};
const mockSummary: LessonSummary = {
  id: 'lesson-verb-1',
  type: 'grammar',
  title: 'Ser – presente',
  level: 'A1',
  image: '',
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

  results: CheckVerbFeedback[];

  isLoading: boolean;
  error?: string;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (id: string) => Promise<LessonDetails>;
  setCurrentLesson: (id: string) => Promise<void>;
  startLesson: () => void;
  submitAnswer: (answer: VerbAnswer) => void;
  nextExercise: () => void;
};

// -------------------------
// CHECK LOGIC (inline mock)
// -------------------------

function checkVerb(
  exercise: CheckVerbExercise,
  answer: VerbAnswer,
): CheckVerbFeedback {
  const correctValue = exercise.verb.forms[answer.pronounId as PronounId];

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
    console.log('currentLesson', lesson);
  },

  // -------------------------
  // START LESSON
  // -------------------------
  startLesson: () => {
    const lesson = get().currentLesson;
    console.log('startLesson', lesson);
    if (!lesson) return;

    set({
      currentExerciseIndex: 0,
      currentExercise: lesson.exercises[0],
      results: [],
    });
    console.log('currentExercise', lesson.exercises[0]);
  },

  // -------------------------
  // SUBMIT ANSWER
  // -------------------------
  submitAnswer: (answer: VerbAnswer) => {
    const exercise = get().currentExercise as CheckVerbExercise;
    if (!exercise) return;

    const result = checkVerb(exercise, answer);

    set((state) => ({
      results: [...state.results, result],
    }));
  },

  // -------------------------
  // NEXT EXERCISE
  // -------------------------
  nextExercise: () => {
    const { currentLesson, currentExerciseIndex } = get();
    if (!currentLesson) return;

    const nextIndex = currentExerciseIndex + 1;

    if (nextIndex >= currentLesson.exercises.length) {
      console.log('Lesson completed');
      return;
    }

    set({
      currentExerciseIndex: nextIndex,
      currentExercise: currentLesson.exercises[nextIndex],
    });
  },
}));
