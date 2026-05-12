import type { GapExerciseProps } from '@exercises/logic';

import { GapTypeTest } from '../Tests/GapTypeTest';

export function CheckGapRenderer({
  exercise,
  onSubmit,
  onComplete,
}: GapExerciseProps) {
  switch (exercise.type) {
    case 'gap-type-test':
      return (
        <GapTypeTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
