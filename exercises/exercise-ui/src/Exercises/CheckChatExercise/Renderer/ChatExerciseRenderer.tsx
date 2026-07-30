import type { ChatExerciseProps } from '@exercises/logic';
import { useLessonStore } from '@workspace/controllers';

import { CheckChatTest } from '../Tests/CheckChatTest';
import { LessonResults } from '../../../Components/Dialogs/LessonResults';

export function ChatExerciseRenderer({
  exercise,
  onSubmit,
  onComplete,
  handleAudio
}: ChatExerciseProps) {
  const isComplete = useLessonStore((state) => state.isComplete);

  if (!isComplete) {
    switch (exercise.type) {
      case 'open-dialog':
        return (
          <CheckChatTest
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
