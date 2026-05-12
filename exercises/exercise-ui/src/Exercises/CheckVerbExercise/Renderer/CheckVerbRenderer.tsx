import type { VerbExerciseProps } from '@exercises/logic';

import { VerbClickLearn } from '../Tests/VerbClickLearn';
import { VerbClickTest } from '../Tests/VerbClickTest';
import { VerbTypeTest } from '../Tests/VerbTypeTest';

export function CheckVerbRenderer({
  exercise,
  onSubmit,
  onComplete,
}: VerbExerciseProps) {
  switch (exercise.type) {
    case 'verb-click-learn':
      return (
        <VerbClickLearn
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    case 'verb-click-test':
      return (
        <VerbClickTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    case 'verb-type-test':
      return (
        <VerbTypeTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
