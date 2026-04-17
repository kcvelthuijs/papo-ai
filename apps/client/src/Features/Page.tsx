import NavigationBar from '../Elements/NavigationBar';

import { LessonSelect } from '../Elements/LessonSelect';
import Lesson from './Lesson';
import { useLessonStore } from '@workspace/controllers/src/Stores/LessonStore';
import { SentenceTypeTest } from '@workspace/ui/components/Exercises/SentenceTypeTest';
import type { SentenceModel } from '@workspace/webtypes/src/Types/Props/ExercisesProps';

export default function Page() {
  const { currentLessonID } = useLessonStore();
  const myExercise: SentenceModel = {
    id: '1',
    type: 'sentence-type-test',
    sentences: [
      {
        id: 's1',
        textParts: ['Eu ', ' só português, mas ele ', 'também francês.'],
        translation: 'Ik spreek alleen Portugees, maar hij spreekt ook Frans.',
        gaps: [
          { id: 'g1', correct: 'falo', hint: 'falar (eu)' },
          { id: 'g2', correct: 'fala', hint: 'falar (ele)' }
        ]
      },
      {
        id: 's2',
        textParts: ['Nós ', ' agora'],
        translation: 'Wij eten nu.',
        gaps: [{ id: 'g3', correct: 'comemos', hint: 'comer (nós)' }]
      }
    ]
  };

  const onComplete = () => {
    console.log('Complete');
  };

  return (
    <div className='flex flex-col bg-gray-200 h-screen m-0 p-0'>
      <NavigationBar />
      <div className='xl:flex xl:justify-center bg-gray-300 shadow-lg'>
        <div className='h-[calc(100vh-5rem)] xl:border-r xl:border-l xl:border-gray-400 bg-white  sm:w-full xl:w-300'>
          {/* toon overzicht van lessen als de lessonID leeg is
          {currentLessonID ? <Lesson id={currentLessonID} /> : <LessonSelect />}*/}
          {/*<VerbLesson />*/}
          <SentenceTypeTest exercise={myExercise} onComplete={onComplete} />
        </div>
      </div>
    </div>
  );
}
