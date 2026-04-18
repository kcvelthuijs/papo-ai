import { exerciseRegistry } from './ExerciseRegistry';

import type { Exercise } from '@workspace/dtotypes/src/Types/Exercise';
import type { ExerciseResult } from '@workspace/webtypes/src/Types/Interfaces/Exercise';

export type EngineEvaluation = {
  result: ExerciseResult;
  nextAction: 'next-exercise' | 'retry' | 'stay';
};

export const lessonEngine = {
  // -------------------------
  // START EXERCISE
  // -------------------------
  startExercise(exercise: Exercise) {
    const handler = getHandler(exercise);

    if (handler?.start) {
      handler.start(exercise as any);
    }
  },

  // -------------------------
  // EVALUATE
  // -------------------------
  async evaluate(exercise: Exercise, answer: any): Promise<EngineEvaluation> {
    const handler = getHandler(exercise);

    if (!handler?.validate) {
      throw new Error(`No validate handler for ${exercise.type}`);
    }

    const isCorrect = handler.validate(exercise as any, answer);
    const result: ExerciseResult = isCorrect
      ? {
          exerciseId: exercise.id,
          type: 'right',
          answer: handler.getCorrectAnswer
            ? handler.getCorrectAnswer(exercise as any)
            : undefined
        }
      : {
          exerciseId: exercise.id,
          type: 'wrong',
          answer: answer,
          correctAnswer: handler.getCorrectAnswer
            ? handler.getCorrectAnswer(exercise as any)
            : undefined
        };

    // -------------------------
    // 🔥 FLOW BESLISSING
    // -------------------------
    const nextAction = this.decideNextAction(exercise, isCorrect);

    return { result, nextAction };
  },

  // -------------------------
  // FLOW LOGIC (CENTRAAL)
  // -------------------------
  decideNextAction(
    exercise: Exercise,
    isCorrect: boolean
  ): EngineEvaluation['nextAction'] {
    if (isCorrect) return 'next-exercise';
    else return 'retry';
  }
};

// -------------------------
// HELPER
// -------------------------
function getHandler(exercise: Exercise) {
  return exerciseRegistry[exercise.type as keyof typeof exerciseRegistry];
}
