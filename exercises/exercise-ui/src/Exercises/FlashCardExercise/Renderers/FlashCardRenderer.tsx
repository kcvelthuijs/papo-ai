import type { FlashCardExerciseProps } from '@exercises/logic';
import { FlashCardTest } from '../Tests/FlashCardTest';

export function FlashCardRenderer({
  exercise,
  onSubmit,
  onComplete
}: FlashCardExerciseProps) {
  switch (exercise.type) {
    case 'flashcard-test':
      return (
        <FlashCardTest
          exercise={exercise}
          onSubmit={onSubmit}
          onComplete={onComplete}
        />
      );
    default:
      return <div>Unsupported verb exercise</div>;
  }
}
