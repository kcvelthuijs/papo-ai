import NavigationBar from '../Elements/NavigationBar';

import Lesson from './Lesson';
import { LessonSelect } from '../Elements/LessonSelect';
import { useLessonStore } from '@workspace/controllers';

export default function Page() {
  const { currentLessonID } = useLessonStore();
  return (
    <div className='flex flex-col bg-gray-200 dark:bg-gray-800 h-screen m-0 p-0'>
      <NavigationBar />
      <div className='xl:flex xl:justify-center bg-gray-300 dark:bg-gray-900 shadow-lg'>
        <div className='h-[calc(100vh-5rem)] xl:border-r xl:border-l xl:border-gray-400 dark:bg-gray-700 dark:border-gray-500 bg-white sm:w-full xl:w-300'>
          {/* toon overzicht van lessen als de lessonID leeg is*/}
          {currentLessonID ? <Lesson /> : <LessonSelect />}
        </div>
      </div>
    </div>
  );
}
