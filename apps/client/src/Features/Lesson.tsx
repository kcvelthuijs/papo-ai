import { ActionButton, Spinner } from '@workspace/ui';
import { useLessonStore } from '@workspace/controllers';
import { ExerciseRenderer } from '@exercises/ui';

import ImageComponent from '../Components/ImageComponent';

const Lesson = () => {
  const {
    isLoading,
    currentLesson,
    currentExercise,
    currentExerciseState,
    startLesson,
  } = useLessonStore();

  // Expliciete condities voor weergave van componentonderdelen
  const showLessonInfo =
    !currentExerciseState ||
    currentExerciseState === 'unknown' ||
    currentExerciseState === 'prepare';
  const showPreparingLesson = !currentExercise;
  const showPreparingExercise =
    currentExercise && currentExerciseState === 'prepare';
  const showExercise = currentExercise && currentExerciseState === 'active';

  return (
    <div className='mx-3'>
      <div className='self-center mx-0 lg:mx-2 pt-3'>
        {/* IMAGE */}
        {showLessonInfo && (
          <>
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
          </>
        )}

        {/* START BUTTON */}
        {showPreparingLesson && (
          <div className='flex justify-center w-full my-6'>
            {isLoading ? (
              <>
                <Spinner className='h-8 w-8' />
                <span className='lg:text-lg font-medium mr-4'>
                  Preparar a aula...
                </span>
              </>
            ) : (
              <ActionButton className='cursor-pointer' onClick={startLesson}>
                Começar
              </ActionButton>
            )}
          </div>
        )}

        {/* LOADING EXERCISE */}
        {showPreparingExercise && (
          <div className='flex justify-center w-full my-6'>
            <>
              <Spinner className='h-8 w-8' />
              <span className='lg:text-lg font-medium mr-4'>
                Preparar o exercício ...
              </span>
            </>
          </div>
        )}

        {/* EXERCISE RENDERING */}
        {showExercise && (
          <div className='mt-4'>
            <ExerciseRenderer exercise={currentExercise} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;
