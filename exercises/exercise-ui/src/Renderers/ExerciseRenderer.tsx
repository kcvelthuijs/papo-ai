import { executeExercise } from '@exercises/logic';
import { useMockLessonStore } from '@workspace/controllers';

import { CheckVerbRenderer } from '../Exercises/CheckVerbExercise/Renderer/CheckVerbRenderer';
import type { ExerciseEvaluation } from '@workspace/dtotypes';
// import { SentenceGapRenderer } from './renderers/SentenceGapRenderer';
// import { SentenceBuildRenderer } from './renderers/SentenceBuildRenderer';
// import { OpenExerciseRenderer } from './renderers/OpenExerciseRenderer';

type Props = {
  exercise: any;
};

export function ExerciseRenderer({ exercise }: Props) {
  const submitAnswer = useMockLessonStore((s) => s.submitAnswer);
  const handleSubmit = async (answer: any): Promise<ExerciseEvaluation> => {
    return await submitAnswer(answer);
  };

  switch (exercise.type) {
    // -------------------------
    // VERB
    // -------------------------
    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      return <CheckVerbRenderer exercise={exercise} onSubmit={handleSubmit} />;

    /*   // -------------------------
    // GAP
    // -------------------------
    case 'sentence-type-test':
      return (
        <SentenceGapRenderer exercise={exercise} onSubmit={handleSubmit} />
      );

    // -------------------------
    // BUILD
    // -------------------------
    case 'sentence-build-test':
      return (
        <SentenceBuildRenderer exercise={exercise} onSubmit={handleSubmit} />
      );

    // -------------------------
    // OPEN (LLM)
    // -------------------------
    case 'open-writing':
    case 'open-dialogue':
    case 'open-reflection':
      return (
        <OpenExerciseRenderer exercise={exercise} onSubmit={handleSubmit} />
      );

    default:
      return <div>Unknown exercise type</div>;*/
  }
}
