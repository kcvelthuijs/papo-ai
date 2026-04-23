import type {
  OpenExercise,
  OpenAnswer,
  OpenExerciseFeedback,
} from '@workspace/dtotypes';

export async function evaluateOpenExercise(
  exercise: OpenExercise,
  answer: OpenAnswer,
): OpenExerciseFeedback {
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
  };
}
