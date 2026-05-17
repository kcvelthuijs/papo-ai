import type { OpenExerciseProps } from '@exercises/logic';

import { OpenDialogTest } from '../Tests/OpenDialogTest';

export function OpenExerciseRenderer({
  exercise,
  onSubmit,
  onComplete,
}: OpenExerciseProps) {
  switch (exercise.type) {
    case 'open-dialog':
      return (
        <OpenDialogTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
