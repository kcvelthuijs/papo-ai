import { Button, Spinner } from '@workspace/ui';
import { useMockLessonStore } from '@workspace/controllers';

import ImageComponent from '../Components/ImageComponent';
import { ExerciseRenderer } from '@exercises/ui';

type LessonProps = {
  id: string;
};

const Lesson = ({ id }: LessonProps) => {
  const { currentLesson, currentExercise, isLoading, startLesson } =
    useMockLessonStore();

  return (
    <div className='mx-3'>
      <div className='self-center mx-0 lg:mx-2 pt-3'>
        {/* IMAGE */}
        <ImageComponent
          name={currentLesson?.image ?? ''}
          tree={['lessons', 'title']}
          size='full'
          className='flex flex-col w-full rounded-lg'
        />

        {/* TITLE + DESC */}
        <div className='flex flex-col my-2 lg:mx-2'>
          <p className='text-lg mx-0 lg:text-2xl font-bold underline lg:my-2'>
            {currentLesson?.title}
          </p>
          <p className='lg:text-lg'>{currentLesson?.description}</p>
        </div>

        {/* START BUTTON */}
        {!currentExercise && (
          <div className='flex justify-center w-full my-4'>
            <Button
              className='flex items-center gap-2 bg-gray-500 rounded-sm border-2 border-gray-600 shadow-2xl px-3 py-2 pointer'
              onClick={startLesson}
            >
              {isLoading ? (
                <>
                  <Spinner className='h-8 w-8' />
                  <span className='lg:text-lg font-medium mr-4'>
                    Preparar a aula...
                  </span>
                </>
              ) : (
                <p>Começar a aula</p>
              )}
            </Button>
          </div>
        )}

        {/* EXERCISE RENDERING */}
        {currentExercise && (
          <div className='mt-4'>
            <ExerciseRenderer exercise={currentExercise} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
