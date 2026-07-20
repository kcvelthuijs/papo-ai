import type { ClozeExerciseProps } from '@exercises/logic';

import { ClozeTypeTest } from '../Tests/ClozeTypeTest';
import { ClozeClickTest } from '../Tests/ClozeClickTest';

export function CheckClozeRenderer({
  exercise,
  onSubmit,
  onComplete,
}: ClozeExerciseProps) {
  switch (exercise.type) {
    case 'cloze-click-test':
      return (
        <ClozeClickTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    case 'cloze-type-test':
      return (
        <ClozeTypeTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
