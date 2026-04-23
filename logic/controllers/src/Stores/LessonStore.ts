import axios from 'axios';
import { create } from 'zustand';

import { getAllLessons } from '@workspace/connectors';

import type { LessonSummary, LessonDetails } from '@workspace/dtotypes';
import type { Exercise } from '@workspace/dtotypes';
import type { ExerciseResult } from '@workspace/webtypes';

import { executeExercise } from '@exercises/logic';

type LessonState = {
  lessonSummaries: Record<string, LessonSummary>;
  lessonDetails: Record<string, LessonDetails>;

  currentLessonID?: string;
  currentLesson?: LessonDetails;

  currentExerciseIndex: number;
  currentExercise?: Exercise;

  results: ExerciseResult[];

  isLoading: boolean;
  error?: string;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (id: string) => Promise<LessonDetails>;
  setCurrentLesson: (id: string) => Promise<void>;

  startLesson: () => void;
  submitAnswer: (answer: any) => Promise<void>;
  nextExercise: () => void;
};

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonSummaries: {},
  lessonDetails: {},

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
        {} as Record<string, LessonSummary>,
      );

      set({
        lessonSummaries: map,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message,
      });
    }
  },

  getLessonByID: async (id: string) => {
    const cached = get().lessonDetails[id];
    if (cached) return cached;
    set({ isLoading: true });

    const { data } = await axios.post<LessonDetails>('/api/lesson', {
      id,
    });

    set((state) => ({
      lessonDetails: {
        ...state.lessonDetails,
        [id]: data,
      },
      isLoading: false,
    }));

    return data;
  },

  setCurrentLesson: async (id: string) => {
    const lesson = await get().getLessonByID(id);

    set({
      currentLessonID: id,
      currentLesson: lesson,
      currentExerciseIndex: 0,
      currentExercise: lesson.exercises?.[0],
      results: [],
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
      currentExercise: lesson.exercises[0],
      results: [],
    });
  },

  submitAnswer: async (answer: any) => {
    const exercise = get().currentExercise;
    if (!exercise) return;

    try {
      const evaluation = await executeExercise(exercise, answer);

      set((state) => ({
        results: [...state.results, evaluation.result],
      }));

      if (evaluation.nextAction === 'next-exercise') {
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
