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
import { ProcessLessonResults, type LessonResult } from '@exercises/logic';
import { LessonSummaryItem } from '../Atoms/LessonSummaryItem';
import { Smiley } from '../Atoms/Smiley';

type LessonSummary = {
  attempts: number;
  lastResult: LessonResult;
};

export function LessonResults() {
  const { currentLesson, endLesson } = useLessonStore.getState();
  const results: LessonResult[] = ProcessLessonResults();
  console.log('results', results);

  const renderSummary = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, index) => {
      const match = part.match(/^\[\[(.*)\]\]$/);
      if (match) {
        return (
          <span
            key={index}
            className='underline decoration-2 decoration-blue-400 decoration-dotted px-1 font-semibold'
          >
            {match[1]}
          </span>
        );
      }
      return part;
    });
  };

  const summaryMap = new Map<string, LessonSummary>();
  for (const result of results) {
    const key = `lesson: ${result.lessonId} sequence: ${result.seqIndex} question: ${result.question}`;
    const existing = summaryMap.get(key);
    if (existing) {
      existing.attempts++;
      existing.lastResult = result; // expliciet: bewaar de laatste poging
    } else {
      summaryMap.set(key, {
        attempts: 1,
        lastResult: result
      });
    }
  }
  const summary = [...summaryMap.values()];
  console.log('summary', summary);

  const correct = summary.filter(
    (r) =>
      r.attempts == 1 &&
      (r.lastResult.score === 'right' || r.lastResult.score === 'partial')
  );
  const errors = summary.filter(
    (r) =>
      r.attempts > 1 ||
      !(r.lastResult.score === 'right' || r.lastResult.score === 'partial')
  );
  const score = correct.length / summary.length;

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
            <div> Your score: {`${(score * 100).toFixed(2)}%`} </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            <Smiley result={score} size={80} className='float-right m-4' />
            <div className='font-bold text-3xl mt-3'>RESUMO:</div>
            <div className='my-3'>
              <div className='text-2xl mt-3 font-semibold'>{`${correct.length} respostas corretas:`}</div>
              {correct.map((r) => (
                <LessonSummaryItem score='right' className='m-1'>
                  {renderSummary(r.lastResult.correctAnswer)}
                </LessonSummaryItem>
              ))}
            </div>
            {errors.length >= 0 && (
              <div className='mt-3 mb-6'>
                <div className='text-2xl font-semibold'>
                  {errors.length == 0 ? 'Sem erros' : `${errors.length} erros`}
                </div>
                {errors.map((r) => (
                  <LessonSummaryItem score='wrong' className='m-1'>
                    {renderSummary(r.lastResult.correctAnswer)}
                  </LessonSummaryItem>
                ))}
              </div>
            )}
          </>
        </CardContent>
        <CardFooter className='flex-none flex w-full justify-center border-t border-gray-600 min-h-16 p-2'>
          <CardAction className='pt-2'>
            <ActionButton onClick={EndThisLesson}>Voltar</ActionButton>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
