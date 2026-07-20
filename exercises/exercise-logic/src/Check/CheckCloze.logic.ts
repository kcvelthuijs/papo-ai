import type {
  CheckClozeExercise,
  CheckClozeFeedback,
  ExerciseAction,
  ExerciseScore,
  Cloze,
  ClozeAnswer,
  Phrase,
} from '@workspace/dtotypes';

export function checkCloze(
  exercise: CheckClozeExercise,
  answer: ClozeAnswer,
): CheckClozeFeedback {
  // check the phrase
  const phrase: Phrase | undefined = exercise.phrases[answer.phraseIndex];
  if (phrase) {
    const cloze = phrase.gaps[answer.clozeIndex];
    if (cloze) {
      // bepaal de uitslag
      const answerUser = answer.value.trim().toLowerCase();
      const answerCorrect = cloze?.correct.trim().toLowerCase();
      const isCorrect = answerUser === answerCorrect;

      // zet de score
      const score: ExerciseScore = isCorrect ? 'right' : 'wrong';

      // kijk of het antwoord de laatste in de tekst is
      const isLastCloze = answer.clozeIndex >= phrase.gaps.length - 1;

      // bepaal de volgende actie
      const nextAction: ExerciseAction =
        score !== 'right' ? 'retry' : !isLastCloze ? 'next' : 'next step';

      return {
        lessonId: exercise.lessonId,
        seqNumber: exercise.seqNumber,
        clozeId: answer.clozeId,
        value: answer.value,
        correctValue: cloze?.correct ?? '',
        score,
        nextAction,
      };
    }
  }
  // Error!!
  return {
    lessonId: exercise.lessonId,
    seqNumber: exercise.seqNumber,
    clozeId: answer.clozeId,
    value: answer.value,
    correctValue: '',
    score: 'wrong',
    nextAction: 'quit',
  };
}
