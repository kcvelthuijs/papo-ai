import type { VerbExerciseProps } from '@exercises/logic';

import { VerbClickLearn } from '../Tests/VerbClickLearn';
import { VerbClickTest } from '../Tests/VerbClickTest';
import { VerbTypeTest } from '../Tests/VerbTypeTest';

export function CheckVerbRenderer({ exercise, onSubmit }: VerbExerciseProps) {
  switch (exercise.type) {
    case 'verb-click-learn':
      return <VerbClickLearn exercise={exercise} onSubmit={onSubmit} />;

    case 'verb-click-test':
      return <VerbClickTest exercise={exercise} onSubmit={onSubmit} />;

    case 'verb-type-test':
      return <VerbTypeTest exercise={exercise} onSubmit={onSubmit} />;

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
