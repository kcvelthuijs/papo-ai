import type { ChatExerciseProps } from '@exercises/logic';

import { CheckChatTest } from '../Tests/CheckChatTest';

export function ChatExerciseRenderer({
  exercise,
  onSubmit,
  onComplete,
  handleAudio
}: ChatExerciseProps) {
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
}
