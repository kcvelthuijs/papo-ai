import type { ClozeExerciseProps } from '@exercises/logic';
import { useLessonStore } from '@workspace/controllers';

import { ClozeTypeTest } from '../Tests/ClozeTypeTest';
import { ClozeClickTest } from '../Tests/ClozeClickTest';
import { LessonResults } from '../../../Components/Dialogs/LessonResults';

export function CheckClozeRenderer({
  exercise,
  onSubmit,
  onComplete,
  handleAudio
}: ClozeExerciseProps) {
  const isComplete = useLessonStore((state) => state.isComplete);

  if (!isComplete) {
    switch (exercise.type) {
      case 'cloze-click-test':
        return (
          <ClozeClickTest
            exercise={exercise}
            onSubmit={onSubmit}
            onComplete={onComplete}
            handleAudio={handleAudio}
          />
        );

      case 'cloze-type-test':
        return (
          <ClozeTypeTest
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
