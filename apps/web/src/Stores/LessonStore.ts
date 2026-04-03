import axios from "axios";
import { create } from "zustand";
import type {
  LessonSummary,
  LessonResponse,
} from "@workspace/dtotypes/src/Interfaces/lesson";

type LessonState = {
  lessonSummaries: Record<string, LessonSummary>;
  lessonDetails: Record<string, LessonResponse>;
  currentLessonID?: string;
  isLoading: boolean;
  error?: string;

  // Onderdelen van de pagina
  // die zichtbaar zijn
  hasImage: boolean;
  hasText: boolean;
  hasAudio: boolean;
  hasDialogue: boolean;

  fetchAllLessons: () => Promise<void>;
  getLessonByID: (lessonID: string) => Promise<LessonResponse>;
  setCurrentLesson: (lessonID: string) => void;
};

export const useLessonStore = create<LessonState>((set, get) => ({
  lessonSummaries: {},
  lessonDetails: {},
  currentLessonID: undefined,
  isLoading: false,
  error: undefined,

  hasImage: true,
  hasText: true,
  hasAudio: false,
  hasDialogue: false,

  fetchAllLessons: async () => {
    set({ isLoading: true, error: undefined });

    try {
      const { data } = await axios.get("/api/lessons");
      const summaries: LessonSummary[] = data.lessons;
      const summaryDict = summaries.reduce(
        (acc, lesson) => {
          acc[lesson.id] = lesson;
          return acc;
        },
        {} as Record<string, LessonSummary>,
      );

      set({
        lessonSummaries: summaryDict,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message ?? "Fout bij het laden van de lessen",
      });
    }
  },

  getLessonByID: async (lessonID: string) => {
    const existingLesson = get().lessonDetails[lessonID];

    if (existingLesson) {
      set({ currentLessonID: lessonID });
      return existingLesson;
    }

    set({ isLoading: true, error: undefined });
    try {
      const { data } = await axios.post<LessonResponse>("/api/lesson", {
        id: lessonID,
      });

      set((state) => ({
        lessonDetails: {
          ...state.lessonDetails,
          [lessonID]: data,
        },
        currentLessonID: lessonID,
        isLoading: false,
      }));

      return data;
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message ?? "Kon les niet laden",
      });
      throw err;
    }
  },

  setCurrentLesson: (lessonID: string) => {
    set({ currentLessonID: lessonID });
    const existingLesson = get().lessonDetails[lessonID];
    switch (existingLesson.type) {
      case "notícias":
      case "previsão":
        set({
          hasImage: true,
          hasAudio: true,
          hasText: true,
          hasDialogue: false,
        });
        break;

      case "diálogo":
        set({
          hasImage: true,
          hasText: true,
          hasAudio: true,
          hasDialogue: false,
        });
        break;
    }
  },
}));
