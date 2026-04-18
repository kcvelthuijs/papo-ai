import axios from 'axios';
import { create } from 'zustand';
import type { LessonSummary } from '@workspace/dtotypes/src/Interfaces/lesson';
import { getAllLessons } from '@workspace/connectors/src/Lessons/LessonConnector';

import { lessonEngine } from '../Engines/LessonEngine';
import type { Exercise } from '@workspace/dtotypes/src/Types/Exercise';
import type { ExerciseResult } from '@workspace/webtypes/src/Types/Interfaces/Exercise';
import type { LessonEngineEvaluation } from '@workspace/webtypes/src/Types/Interfaces/Lesson';

// LessonDetails bestaat uit de summary en de oefeningen
type LessonDetails = LessonSummary & {
  exercises: Exercise[];
};

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

  hasImage: boolean;
  hasText: boolean;
  hasAudio: boolean;
  hasDialogue: boolean;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (lessonID: string) => Promise<LessonDetails>;
  setCurrentLesson: (lessonID: string) => Promise<void>;
  startLesson: () => void;
  submitAnswer: (answer: any) => void;
  nextExercise: () => void;
};

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonSummaries: {},
  lessonDetails: {},

  currentLessonID: undefined,
  currentLesson: undefined,

  currentExerciseIndex: 0,
  currentExercise: undefined,

  results: [] as ExerciseResult[],

  isLoading: false,
  error: undefined,

  hasImage: true,
  hasText: true,
  hasAudio: false,
  hasDialogue: false,

  // -------------------------
  // DATA LOADING (blijft grotendeels hetzelfde)
  // -------------------------

  fetchAllLessons: async () => {
    set({ isLoading: true, error: undefined });

    try {
      const summaries = await getAllLessons();

      if (summaries) {
        const summaryDict = summaries.reduce(
          (acc, lesson) => {
            acc[lesson.id] = lesson;
            return acc;
          },
          {} as Record<string, LessonSummary>
        );

        set({
          lessonSummaries: summaryDict,
          isLoading: false
        });
      }
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message ?? 'Fout bij het laden van de lessen'
      });
    }
  },

  getLessonByID: async (lessonID: string) => {
    const existing = get().lessonDetails[lessonID];

    if (existing) {
      return existing;
    }

    set({ isLoading: true, error: undefined });

    try {
      const { data } = await axios.post<LessonDetails>('/api/lesson', {
        id: lessonID
      });

      set((state) => ({
        lessonDetails: {
          ...state.lessonDetails,
          [lessonID]: data
        },
        isLoading: false
      }));

      return data;
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message ?? 'Kon les niet laden'
      });
      throw err;
    }
  },

  // -------------------------
  // LES SELECTIE
  // -------------------------

  setCurrentLesson: async (lessonID: string) => {
    const lesson = await get().getLessonByID(lessonID);

    set({
      currentLessonID: lessonID,
      currentLesson: lesson,
      currentExerciseIndex: 0,
      currentExercise: lesson.exercises[0],
      results: []
    });

    const summary = get().lessonSummaries[lessonID];

    switch (summary?.type) {
      case 'notícias':
      case 'previsão':
        set({
          hasImage: true,
          hasAudio: true,
          hasText: true,
          hasDialogue: false
        });
        break;

      case 'diálogo':
        set({
          hasImage: true,
          hasText: true,
          hasAudio: true,
          hasDialogue: false
        });
        break;
    }
  },

  // -------------------------
  // LES FLOW (NIEUW)
  // -------------------------

  startLesson: () => {
    const lesson = get().currentLesson;
    if (!lesson) return;

    const firstExercise = lesson.exercises[0];
    if (firstExercise) {
      set({
        currentExerciseIndex: 0,
        currentExercise: firstExercise,
        results: []
      });
      lessonEngine.startExercise(firstExercise);
    }
  },

  submitAnswer: async (answer: any) => {
    const { currentExercise } = get();
    if (!currentExercise) return;

    const { result, nextAction } = (await lessonEngine.evaluate(
      currentExercise,
      answer
    )) as LessonEngineEvaluation;

    set((state) => ({
      results: [...state.results, result]
    }));

    switch (nextAction) {
      case 'next-exercise':
        get().nextExercise();
        break;

      case 'retry':
        // niets doen → zelfde exercise blijft actief
        break;

      case 'stay':
        // bijv. dialogue / multi-step
        break;
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

    const nextExercise = currentLesson.exercises[nextIndex];
    if (nextExercise) {
      set({
        currentExerciseIndex: nextIndex,
        currentExercise: nextExercise
      });
      lessonEngine.startExercise(nextExercise);
    }
  }
}));
