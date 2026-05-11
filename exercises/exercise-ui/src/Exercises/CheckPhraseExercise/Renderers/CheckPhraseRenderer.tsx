import type { GapExerciseProps } from '@exercises/logic';

import { GapTypeTest } from '../Tests/GapTypeTest';

export function CheckPhraseRenderer({
  exercise,
  phraseIndex = 0,
  onSubmit
}: GapExerciseProps) {
  switch (exercise.type) {
    case 'phrase-type-test':
      return (
        <GapTypeTest
          exercise={exercise}
          phraseIndex={phraseIndex}
          onSubmit={onSubmit}
        />
      );

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
