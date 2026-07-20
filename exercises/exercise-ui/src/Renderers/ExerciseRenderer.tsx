import { useLessonStore } from '@workspace/controllers';
import type {
  ExerciseEvaluation,
  ExerciseExitReason,
} from '@workspace/dtotypes';

import { OpenExerciseRenderer } from '../Exercises/OpenDialogExercise/Renderer/OpenExerciseRenderer';

import { CheckVerbRenderer } from '../Exercises/CheckVerbExercise/Renderer/CheckVerbRenderer';
import { CheckClozeRenderer } from '../Exercises/CheckClozeExercise/Renderers/CheckClozeRenderer';
import { CheckCardRenderer } from '../Exercises/CheckCardExercise/Renderers/CheckCardRenderer';

// import { PhraseBuildRenderer } from './renderers/PhraseBuildRenderer';
// import { OpenExerciseRenderer } from './renderers/OpenExerciseRenderer';

type Props = {
  exercise: any;
};

export function ExerciseRenderer({ exercise }: Props) {
  const submitAnswer = useLessonStore((s) => s.submitAnswer);
  const handleSubmit = async (answer: any): Promise<any> => {
    return await submitAnswer(answer);
  };

  const completeExercise = useLessonStore((s) => s.completeExercise);
  const handleComplete = async (reason: ExerciseExitReason): Promise<void> => {
    await completeExercise(reason);
  };

  switch (exercise.type) {
    // -------------------------
    // VERB
    // -------------------------
    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      return (
        <CheckVerbRenderer
          exercise={exercise}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
        />
      );

    // -------------------------
    // CLOZE
    // -------------------------
    case 'cloze-click-test':
    case 'cloze-type-test':
      return (
        <CheckClozeRenderer
          exercise={exercise}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
        />
      );

    // -------------------------
    // Cards
    // -------------------------
    case 'card-type-test':
    case 'card-click-learn':
      return (
        <CheckCardRenderer
          exercise={exercise}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
        />
      );

    /*
    // -------------------------
    // BUILD
    // -------------------------
    case 'Phrase-build-test':
      return (
        <PhraseBuildRenderer exercise={exercise} onSubmit={handleSubmit} />
      );
    */

    // -------------------------
    // OPEN (LLM)
    // -------------------------
    case 'open-dialog':
      return (
        <OpenExerciseRenderer
          exercise={exercise}
          onSubmit={handleSubmit}
          onComplete={handleComplete}
        />
      );

    default:
      return <div>Unknown exercise type</div>;
  }
}
