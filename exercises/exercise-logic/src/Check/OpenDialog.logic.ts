import type {
  OpenExercise,
  OpenAnswer,
  OpenDialogFeedback,
} from '@workspace/dtotypes';

export async function evaluateOpenDialog(
  exercise: OpenExercise,
  answer: OpenAnswer,
): Promise<OpenDialogFeedback> {
  const response = await fetch('/api/llm-feedback', {
    method: 'POST',
    body: JSON.stringify({
      prompt: exercise.prompt,
      answer: answer.value,
      rubric: exercise.rubric,
    }),
  });
  const feedback = await response.json();
  return {
    feedback: 'mijn feedback', // feedback.text
    score: 8, // feedback.score, // optioneel
    suggestions: 'oefenen, veel meer oefenen', //feedback.suggestions,
    responseId: '1234556',
  };
}
