import { useEffect } from 'react';

import { useLessonStore } from '@workspace/controllers';
import type { LessonSelectProps } from '@workspace/webtypes';

import { LessonCard, LessonCardSkeleton } from '../Components/LessonCard';

export const LessonSelect = ({ onSelect }: LessonSelectProps) => {
  const { lessons, fetchAllLessons, isLoading, setCurrentLesson } =
    useLessonStore();

  useEffect(() => {
    fetchAllLessons();
  }, [fetchAllLessons]);

  const onLessonCardSelect = (lessonID: string): void => {
    console.log('onLessonCardSelect:', lessonID);
    setCurrentLesson(lessonID);
    if (onSelect) onSelect(lessonID);
  };

  return (
    <div className='xl:flex xl:justify-center'>
      <div className='h-[calc(100vh-5rem)] xl:border-r xl:border-l xl:border-gray-400 bg-white  dark:bg-gray-800 dark:border-gray-800 sm:w-full xl:w-300'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 m-2'>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <LessonCardSkeleton key={i} />
              ))
            : Object.values(lessons).map((lesson) => (
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
