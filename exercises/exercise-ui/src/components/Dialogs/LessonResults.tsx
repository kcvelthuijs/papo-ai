import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  ActionButton
} from '@workspace/ui';

import { useLessonStore } from '@workspace/controllers';
import { ProcessLessonResults, type LessonSummary } from '@exercises/logic';
import { ExerciseTextbox } from '../Atoms/ExerciseTextBox';
import { LessonSummaryItem } from '../Atoms/LessonSummaryItem';

export function LessonResults() {
  const { currentLesson, endLesson } = useLessonStore.getState();
  const results: LessonSummary[] = ProcessLessonResults();

  const correct = results.filter(
    (r) => r.countAnswers == 0 && r.result === 'correct'
  );
  const errors = results.filter((r) => r.countAnswers > 0);
  const score = ((results.length - errors.length) / results.length) * 100;

  const EndThisLesson = () => {
    endLesson();
  };

  return (
    <div className='flex flex-row justify-center'>
      <Card
        className={`flex l:w-180 w-full flex-col border-gray-500 gap-0 h-[calc(100vh-9rem)] overflow-hidden'`}
      >
        <CardHeader className='border-b border-gray-600'>
          <CardTitle className='flex items-center'>
            <div className='flex-1 text-center text-3xl'>
              {currentLesson?.title}
            </div>
          </CardTitle>
          <CardDescription className='pb-2 text-center text-xl font-semibold'>
            {currentLesson?.description}
            {`Your score: ${score.toFixed(2)}%`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            <div className='font-bold text-3xl mt-3'>RESUMO:</div>
            <div className='my-3'>
              <div className='text-2xl mt-3 font-semibold'>{`${correct.length} respostas corretas:`}</div>
              {correct.map((r) => (
                <LessonSummaryItem
                  text={r.correctAnswer}
                  score='right'
                  className='m-1'
                />
              ))}
            </div>
            {errors.length >= 0 && (
              <div className='mt-3 mb-6'>
                <div className='text-2xl font-semibold'>
                  {errors.length == 0 ? 'Sem erros' : `${errors.length} erros`}
                </div>
                {errors.map((r) => (
                  <LessonSummaryItem
                    text={r.correctAnswer}
                    score='wrong'
                    className='m-1'
                  />
                ))}
              </div>
            )}
          </>
        </CardContent>
        <CardFooter className='flex-none flex w-full justify-center border-t border-gray-600 min-h-16 p-2'>
          <CardAction className='pt-2'>
            <ActionButton onClick={EndThisLesson}>Concluir</ActionButton>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
