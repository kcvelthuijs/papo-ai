import NavigationBar from '../Elements/NavigationBar';

import { LessonSelect } from '../Elements/LessonSelect';
import Lesson from './Lesson';
import { useLessonStore } from '../Stores/LessonStore';

export default function Page() {
  const { currentLessonID } = useLessonStore();
  return (
    <div className='flex flex-col bg-gray-200 h-screen m-0 p-0'>
      <NavigationBar />
      <div className='xl:flex xl:justify-center bg-gray-300 shadow-lg'>
        <div className='h-[calc(100vh-5rem)] xl:border-r xl:border-l xl:border-gray-400 bg-white  sm:w-full xl:w-300'>
          {/* toon overzicht van lessen als de lessonID leeg is*/}
          {currentLessonID ? <Lesson id={currentLessonID} /> : <LessonSelect />}
          {/*<VerbLesson />*/}
        </div>
      </div>
    </div>
  );
}
