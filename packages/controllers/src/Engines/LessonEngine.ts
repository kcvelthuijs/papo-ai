import {
  type Exercise,
  exerciseStrategies
} from '@workspace/dtotypes/src/Types/Exercise';

export const lessonEngine = {
  async generateExercise(exercise: Exercise) {
    const strategy = exerciseStrategies[exercise.type];
    return strategy ? strategy.generate?.(exercise) : undefined;
  },

  startExercise(exercise: Exercise) {
    const strategy = exerciseStrategies[exercise.type];
    if (strategy) strategy.start?.(exercise);
  },

  async interact(exercise: Exercise, input: any) {
    const strategy = exerciseStrategies[exercise.type];
    return strategy ? strategy.interact?.(exercise, input) : undefined;
  },

  async evaluate(exercise: Exercise, answer: any) {
    const strategy = exerciseStrategies[exercise.type];

    if (strategy && strategy.evaluate) {
      return strategy.evaluate(exercise, answer);
    }
    throw new Error(`No evaluate for ${exercise.type}`);
  },

  async summarize(exercise: Exercise, history: any[]) {
    const strategy = exerciseStrategies[exercise.type];
    return strategy ? strategy.summarize?.(exercise, history) : undefined;
  }
};
