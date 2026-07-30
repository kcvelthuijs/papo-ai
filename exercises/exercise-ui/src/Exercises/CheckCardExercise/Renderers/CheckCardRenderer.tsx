import type { CardExerciseProps } from '@exercises/logic';
import { useLessonStore } from '@workspace/controllers';

import { CardTest } from '../Tests/CardTest';
import { CardLearn } from '../Tests/CardLearn';
import { LessonResults } from '../../../Components/Dialogs/LessonResults';

export function CheckCardRenderer({
  exercise,
  onSubmit,
  onComplete,
  handleAudio
}: CardExerciseProps) {
  const isComplete = useLessonStore((state) => state.isComplete);

  if (!isComplete) {
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
  } else return <LessonResults />;
}
