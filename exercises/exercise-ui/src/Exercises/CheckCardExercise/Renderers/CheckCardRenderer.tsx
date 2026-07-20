import type { CardExerciseProps } from '@exercises/logic';
import { CardTest } from '../Tests/CardTest';
import { CardLearn } from '../Tests/CardLearn';

export function CheckCardRenderer({
  exercise,
  onSubmit,
  onComplete,
}: CardExerciseProps) {
  switch (exercise.type) {
    case 'card-click-learn':
      return (
        <CardLearn
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    case 'card-type-test':
      return (
        <CardTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );
    default:
      return <div>Unsupported verb exercise</div>;
  }
}
