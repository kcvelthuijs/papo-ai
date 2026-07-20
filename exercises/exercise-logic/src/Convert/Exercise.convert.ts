import {
  type BuildPhraseExercise,
  type CheckClozeExercise,
  type CheckVerbExercise,
  type ExerciseData,
  type CardExercise,
  type OpenExercise,
} from '@workspace/dtotypes';
import { type Exercise } from '@workspace/dtotypes';

export function ExerciseFromExerciseData(
  data: ExerciseData,
): Exercise | undefined {
  // BaseExercise properties
  const base = {
    lessonId: data.lessonId,
    seqNumber: data.seqNumber,
    type: data.type,
    title: data.title,
    description: data.description,
  };

  switch (data.type) {
    case 'open-dialog':
    case 'open-reflection':
    case 'open-writing':
      const { introduction, prompt, words, feedback, rubric, meta } = data.data;
      return {
        ...base,
        introduction,
        prompt,
        words,
        feedback,
        rubric,
        meta,
      } as OpenExercise;

    case 'cloze-type-test':
    case 'cloze-click-test':
      return {
        ...base,
        phrases: data.data.phrases,
      } as CheckClozeExercise;

    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      const { infinitive, tense, forms } = data.data;
      return {
        ...base,
        infinitive,
        tense,
        forms,
      } as CheckVerbExercise;

    case 'card-click-learn':
    case 'card-type-test':
      const { items, imageLocation } = data.data;
      return {
        ...base,
        items,
        imageLocation,
      } as CardExercise;

    case 'phrase-build-test':
      const { correctOrder, translation } = data.data;
      return {
        ...base,
        correctOrder,
        translation,
      } as BuildPhraseExercise;
  }
  return undefined;
}
