import type { VerbExerciseProps } from '@exercises/logic';

import { VerbClickLearn } from '../Tests/VerbClickLearn';
import { VerbClickTest } from '../Tests/VerbClickTest';
import { VerbTypeTest } from '../Tests/VerbTypeTest';

export function CheckVerbRenderer({
  exercise,
  onSubmit,
  onComplete,
  handleAudio,
}: VerbExerciseProps) {
  switch (exercise.type) {
    case 'verb-click-learn':
      return (
        <VerbClickLearn
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
          handleAudio={handleAudio}
        />
      );

    case 'verb-click-test':
      return (
        <VerbClickTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
          handleAudio={handleAudio}
        />
      );

    case 'verb-type-test':
      return (
        <VerbTypeTest
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
