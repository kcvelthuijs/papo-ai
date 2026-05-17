import { useMockLessonStore } from '@workspace/controllers';
import type {
  ExerciseEvaluation,
  ExerciseExitReason,
} from '@workspace/dtotypes';

import { CheckVerbRenderer } from '../Exercises/CheckVerbExercise/Renderer/CheckVerbRenderer';
import { CheckGapRenderer } from '../Exercises/CheckGapExercise/Renderers/CheckGapRenderer';
import 
// import { PhraseBuildRenderer } from './renderers/PhraseBuildRenderer';
// import { OpenExerciseRenderer } from './renderers/OpenExerciseRenderer';

type Props = {
  exercise: any;
};

export function ExerciseRenderer({ exercise }: Props) {
  const submitAnswer = useMockLessonStore((s) => s.submitAnswer);
  const handleSubmit = async (answer: any): Promise<ExerciseEvaluation> => {
    return await submitAnswer(answer);
  };

  const completeExercise = useMockLessonStore((s) => s.completeExercise);
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
    // GAP
    // -------------------------
    case 'gap-click-test':
    case 'gap-type-test':
      return (
        <CheckGapRenderer
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
        <OpenExerciseRenderer exercise={exercise} onComplete={handleComplete} />
      );

    default:
      return <div>Unknown exercise type</div>;
  }
}
