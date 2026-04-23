import type { VerbExerciseProps } from '@exercises/logic/src/Types/Exercise.types';
import { VerbClickLearn } from '../Exercises/VerbClickLearnn
import { VerbClickTest } from '../Exercises/VerbClickTest
import { VerbTypeTest } from '../Exercises/VerbTypeTestt

export function VerbRenderer({ exercise, onSubmit }: VerbExerciseProps) {
  // centrale handler
  async function handleAnswer(answer: { pronounId: string; value: string }) {
    const result = await onSubmit(answer);
    return result;
  }
  switch (exercise.type) {
    /*case 'verb-click-learn':
      return (
        <VerbClickLearn
          exercise={exercise}
          onSelect={(data: any) => handleAnswer(data)}
        />
      );*/

    case 'verb-click-test':
      return (
        <VerbClickTest
          exercise={exercise}
          onSubmit={(data: any) => handleAnswer(data)}
        />
      );

    /* case 'verb-type-test':
      return (
        <VerbTypeTest
          exercise={exercise}
          onSubmit={(data: any) => handleAnswer(data)}
        />
      );*/

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
