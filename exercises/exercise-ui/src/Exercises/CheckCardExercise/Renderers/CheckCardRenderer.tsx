import type { CardExerciseProps } from '@exercises/logic';
import { CardTest } from '../Tests/CardTest';
import { CardLearn } from '../Tests/CardLearn';

export function CheckCardRenderer({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: CardExerciseProps) {
  switch (exercise.type) {
    case 'card-click-learn':
      return (
        <CardLearn
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
          handleAudio={handleAudio}
        />
      );

    case 'card-type-test':
      return (
        <CardTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
          handleAudio={handleAudio}
        />
      );
    default:
      return <div>Unsupported verb exercise</div>;
  }
}
