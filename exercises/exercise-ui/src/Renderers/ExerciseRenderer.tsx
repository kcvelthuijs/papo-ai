import { useMockLessonStore } from '@workspace/controllers';
import type { ExerciseEvaluation } from '@workspace/dtotypes';

import { CheckVerbRenderer } from '../Exercises/CheckVerbExercise/Renderer/CheckVerbRenderer';
import { CheckPhraseRenderer } from '../Exercises/CheckPhraseExercise/Renderers/CheckPhraseRenderer';

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

  switch (exercise.type) {
    // -------------------------
    // VERB
    // -------------------------
    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      return <CheckVerbRenderer exercise={exercise} onSubmit={handleSubmit} />;

    // -------------------------
    // GAP
    // -------------------------
    case 'phrase-type-test':
      return (
        <CheckPhraseRenderer exercise={exercise} onSubmit={handleSubmit} />
      );

    /*
    // -------------------------
    // BUILD
    // -------------------------
    case 'Phrase-build-test':
      return (
        <PhraseBuildRenderer exercise={exercise} onSubmit={handleSubmit} />
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
