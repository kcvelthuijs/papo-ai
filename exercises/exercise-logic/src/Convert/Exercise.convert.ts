import {
  type BuildPhraseExercise,
  type CheckClozeExercise,
  type CheckVerbExercise,
  type ExerciseData,
  type CardExercise,
  type ChatExercise,
  type BaseExercise,
  type ExerciseState,
} from '@workspace/dtotypes';

import { sleep } from '@workspace/ui';
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
    state: 'undefined',
  };

  switch (data.type) {
    case 'open-dialog':
      const createChatExercise = (
        base: BaseExercise,
        data: any,
      ): ChatExercise => {
        const { prompt, avatar, voice, items } = data.data;
        return {
          ...base,
          prompt,
          avatar,
          voice,
          scenes: items,
        } as ChatExercise;
      };
      return createChatExercise(base, data);

    case 'cloze-type-test':
    case 'cloze-click-test':
      const createClozeExercise = (
        base: BaseExercise,
        data: any,
      ): CheckClozeExercise => {
        return {
          ...base,
          phrases: data.data.phrases,
        } as CheckClozeExercise;
      };
      return createClozeExercise(base, data);

    case 'verb-click-learn':
    case 'verb-click-test':
    case 'verb-type-test':
      const createVerbExercise = (
        base: BaseExercise,
        data: any,
      ): CheckVerbExercise => {
        const { infinitive, tense, forms } = data.data;
        return {
          ...base,
          infinitive,
          tense,
          forms,
        } as CheckVerbExercise;
      };
      return createVerbExercise(base, data);

    case 'card-click-learn':
    case 'card-type-test':
      const createCardExercise = (
        base: BaseExercise,
        data: any,
      ): CardExercise => {
        const { items, imageLocation } = data.data;
        return {
          ...base,
          items,
          imageLocation,
        } as CardExercise;
      };
      return createCardExercise(base, data);

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
