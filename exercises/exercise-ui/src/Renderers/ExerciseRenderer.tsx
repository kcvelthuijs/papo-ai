import { executeExercise } from '@exercises/logic/src/Logic/ExercuteExercise';

import { VerbRenderer } from './VerbRenderer';
// import { SentenceGapRenderer } from './renderers/SentenceGapRenderer';
// import { SentenceBuildRenderer } from './renderers/SentenceBuildRenderer';
// import { OpenExerciseRenderer } from './renderers/OpenExerciseRenderer';

type Props = {
  exercise: any;
};

export function ExerciseRenderer({ exercise }: Props) {
  const handleSubmit = async (answer: any) => {
    return await executeExercise(exercise, answer);
  };

  switch (exercise.type) {
    // -------------------------
    // VERB
    // -------------------------
    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      return <VerbRenderer exercise={exercise} onSubmit={handleSubmit} />;

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
