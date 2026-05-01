import type {
  CheckGapExercise,
  CheckGapFeedback,
  ExerciseAction,
  ExerciseScore,
  Gap,
  GapAnswer,
  Phrase,
} from '@workspace/dtotypes';

export function checkGap(
  exercise: CheckGapExercise,
  answer: GapAnswer,
): CheckGapFeedback {
  // check the phrase
  const phrase: Phrase | undefined = exercise.phrases[exercise.phraseIndex];
  if (phrase) {
    const gap = phrase.gaps[answer.gapIndex];
    if (gap) {
      // bepaal de uitslag
      const answerUser = answer.value.trim().toLowerCase();
      const answerCorrect = gap?.correct.trim().toLowerCase();
      const isCorrect = answerUser === answerCorrect;

      // zet de score
      const score: ExerciseScore = isCorrect ? 'right' : 'wrong';

      // bepaal de volgende actie
      const nextAction: ExerciseAction = score !== 'right' ? 'retry' : 'next';

      return {
        exerciseId: exercise.id,
        gapId: answer.gapId,
        value: answer.value,
        correctValue: gap?.correct ?? '',
        score,
        nextAction,
      };
    }
  }
  // Error!!
  return {
    exerciseId: exercise.id,
    gapId: answer.gapId,
    value: answer.value,
    correctValue: '',
    score: 'wrong',
    nextAction: 'quit',
  };
}
