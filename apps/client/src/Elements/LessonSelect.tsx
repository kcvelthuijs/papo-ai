import { useEffect, useRef } from "react";

import type { LessonSelectProps } from "@workspace/webtypes/src/Types/Props/LessonSelectProps";
import { useLessonStore } from "@workspace/controllers/src/Stores/LessonStore";

import { LessonCard, LessonCardSkeleton } from "../Components/LessonCard";

export const LessonSelect = ({ onSelect }: LessonSelectProps) => {
  const { lessonSummaries, fetchAllLessons, isLoading, setCurrentLesson } =
    useLessonStore();

  const reading = useRef(false);

  useEffect(() => {
    if (reading.current) return;
    reading.current = true;

    fetchAllLessons();
  }, []);

  const onLessonCardSelect = (lessonID: string): void => {
    setCurrentLesson(lessonID);
    if (onSelect) onSelect(lessonID);
  };

  return (
    <div className="xl:flex xl:justify-center bg-gray-300 shadow-lg">
      <div className="h-[calc(100vh-5rem)] xl:border-r xl:border-l xl:border-gray-400 bg-white  sm:w-full xl:w-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 m-2">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <LessonCardSkeleton key={i} />
              ))
            : Object.values(lessonSummaries).map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onSelectLesson={onLessonCardSelect}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default LessonSelect;
