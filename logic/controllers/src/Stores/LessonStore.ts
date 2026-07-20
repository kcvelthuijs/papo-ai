import { create } from 'zustand';

import type {
  LessonSummary,
  Exercise,
  ExerciseData,
  ExerciseExitReason,
} from '@workspace/dtotypes';

import {
  getAllLessons,
  getLessonByID,
  getExercisesByLessonID,
} from '@workspace/connectors';

import type { ExerciseEvaluation } from '@workspace/webtypes';

import { executeExercise, ExerciseFromExerciseData } from '@exercises/logic';

type LessonState = {
  lessons: Record<string, LessonSummary>;
  exerciseCache: Record<string, Exercise[]>;
  exercises: Exercise[];

  currentLessonID?: string;
  currentLesson?: LessonSummary;

  currentExerciseIndex: number;
  currentExercise?: Exercise;

  results: ExerciseEvaluation[];

  isLoading: boolean;
  error?: string;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (id: string) => Promise<LessonSummary | undefined>;
  setCurrentLesson: (lessonId: string) => Promise<void>;

  startLesson: () => void;
  setExercise: (exerciseId: number) => Promise<void>;
  startExercise: () => Promise<void>;

  submitAnswer: (answer: any) => Promise<ExerciseEvaluation>;
  completeExercise: (reason: ExerciseExitReason) => Promise<void>;
  nextExercise: () => void;
};

export const useLessonStore = create<LessonState>((set, get) => ({
  lessons: {},
  exerciseCache: {},
  exercises: [],

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
    set({ isLoading: true, error: undefined });

    try {
      const summaries = await getAllLessons();
      if (summaries) {
        const map = summaries.reduce(
          (acc, l) => {
            acc[l.id] = l;
            return acc;
          },
          {} as Record<string, LessonSummary>,
        );

        set({
          lessons: map,
        });
      }
    } catch (err: any) {
      set({
        error: err?.message,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  // -------------------------
  // GET LESSON BY ID
  // -------------------------
  getLessonByID: async (id: string) => {
    const cached = get().lessons[id];
    if (cached) return cached;

    set({ isLoading: true });
    const lesson = await getLessonByID(id);
    if (lesson) {
      set((state) => ({
        lessons: {
          ...state.lessons,
          [id]: lesson,
        },
        isLoading: false,
      }));
    }
    return lesson;
  },

  // -------------------------
  // SET CURRENT LESSON
  // -------------------------
  setCurrentLesson: async (lessonId: string) => {
    set({
      isLoading: true,
      error: undefined,
    });

    try {
      const lesson = await get().getLessonByID(lessonId);
      if (!lessonId) {
        throw new Error(`Lesson ${lessonId} not found`);
      }

      let exercises = get().exerciseCache[lessonId];
      if (!exercises) {
        const exerciseData: ExerciseData[] | undefined =
          await getExercisesByLessonID(Number(lessonId));
        if (!exerciseData) {
          throw new Error(`No exercises found on lesson ${lessonId}.`);
        }

        // transformeer data en verwijder lege exercises
        exercises = exerciseData
          .map((e) => ExerciseFromExerciseData(e))
          .filter((e): e is Exercise => e !== undefined);

        set((state) => ({
          ...state.exerciseCache,
          [lessonId]: exercises!,
        }));
      }

      set({
        currentLessonID: lessonId,
        currentLesson: lesson,
        exercises,
        currentExerciseIndex: 0,
        currentExercise: exercises?.[0],
        results: [],
        isLoading: false,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message,
      });
    }
  },

  // -------------------------
  // START LESSON
  // -------------------------
  startLesson: async () => {
    const lesson = get().currentLesson;
    if (!lesson) return;
    await get().setExercise(0);
  },

  // -------------------------
  // SET EXERCISE
  // -------------------------
  setExercise: async (exerciseId: number) => {
    const lesson = get().currentLesson;
    const exercises = get().exercises;
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
    if (!exercise) throw new Error('Current exercise is undefined.');

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
    if (nextIndex < get().exercises.length) {
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
