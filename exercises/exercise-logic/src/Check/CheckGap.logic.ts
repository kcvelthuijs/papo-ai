import type { CheckGapExercise, Gap, GapAnswer } from '@workspace/dtotypes';

export function checkGap(
  exercise: CheckGapExercise,
  answer: GapAnswer,
): CheckGapFeedback {
  const sentence = exercise.sentences.find((s) =>
    s.gaps.some((g: Gap) => g.id === answer.gapId),
  );

  const gap = sentence?.gaps.find((g: Gap) => g.id === answer.gapId);
  if (!gap) {
    return {
      isCorrect: false,
      gapId: answer.gapId,
      value: answer.value,
      correctValue: null,
    };
  } else {
    const normalizedUser = answer.value.trim().toLowerCase();
    const normalizedCorrect = gap.correct.trim().toLowerCase();
    const isCorrect = normalizedUser === normalizedCorrect;

    return {
      isCorrect,
      gapId: answer.gapId,
      value: answer.value,
      correctValue: gap.correct,
    };
  }
}
