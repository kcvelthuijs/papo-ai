import axios from 'axios';
import { create } from 'zustand';

import { getAllLessons } from '@workspace/connectors';

import type { LessonSummary, Exercise } from '@workspace/dtotypes';

import type { ExerciseEvaluation } from '@workspace/webtypes';
import { executeExercise } from '@exercises/logic';

type LessonState = {
  lessons: Record<string, LessonSummary>;
  exercises: Exercise[];

  currentLessonID?: string;
  currentLesson?: LessonSummary;

  currentExerciseIndex: number;
  currentExercise?: Exercise;

  results: ExerciseEvaluation[];

  isLoading: boolean;
  error?: string;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (id: string) => Promise<LessonSummary>;
  setCurrentLesson: (id: string) => Promise<void>;

  startLesson: () => void;
  submitAnswer: (answer: any) => Promise<void>;
  nextExercise: () => void;
};

export const useLessonStore = create<LessonState>((set, get) => ({
  lessons: {},
  exercises: [],

  currentLessonID: undefined,
  currentLesson: undefined,

  currentExerciseIndex: 0,
  currentExercise: undefined,

  results: [],

  isLoading: false,
  error: undefined,

  // -------------------------
  // LESSONS
  // -------------------------
  fetchAllLessons: async () => {
    set({ isLoading: true, error: undefined });

    try {
      const summaries = await getAllLessons();
      if (!summaries) return;
      const map = summaries.reduce(
        (acc, l) => {
          acc[l.id] = l;
          return acc;
        },
        {} as Record<string, LessonSummary>
      );

      set({
        lessons: map,
        isLoading: false
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message
      });
    }
  },

  getLessonByID: async (id: string) => {
    const cached = get().lessons[id];
    if (cached) return cached;
    set({ isLoading: true });

    const { data } = await axios.post<LessonSummary>('/api/lesson', {
      id
    });

    set((state) => ({
      lessons: {
        ...state.lessons,
        [id]: data
      },
      isLoading: false
    }));

    return data;
  },

  setCurrentLesson: async (id: string) => {
    const lesson = await get().getLessonByID(id);

    set({
      currentLessonID: id,
      currentLesson: lesson,
      currentExerciseIndex: 0,
      currentExercise: undefined,
      results: []
    });
  },

  // -------------------------
  // FLOW
  // -------------------------
  startLesson: () => {
    const lesson = get().currentLesson;
    if (!lesson) return;

    set({
      currentExerciseIndex: 0,
      currentExercise: undefined,
      results: []
    });
  },

  submitAnswer: async (answer: any) => {
    const exercise = get().currentExercise;
    if (!exercise) return;

    try {
      const evaluation = await executeExercise(exercise, answer);

      set((state) => ({
        results: [...state.results, evaluation]
      }));

      if (evaluation.nextAction === 'next exercise') {
        get().nextExercise();
      }
    } catch (err) {
      console.error('executeExercise failed:', err);
    }
  },

  nextExercise: () => {
    const { currentLesson, currentExerciseIndex } = get();
    if (!currentLesson) return;

    const nextIndex = currentExerciseIndex + 1;

    if (nextIndex >= get().exercises?.length) {
      console.log('Lesson completed');
      return;
    }

    set({
      currentExerciseIndex: nextIndex,
      currentExercise: get().exercises[nextIndex]
    });
  }
}));
