import type {
  ChatExercise,
  ChatResponse,
  ChatExerciseFeedback,
} from '@workspace/dtotypes';

export async function evaluateChatExercise(
  exercise: ChatExercise,
  answer: ChatResponse,
): Promise<ChatExerciseFeedback> {
  /*const response = await fetch('/api/llm-feedback', {
    method: 'POST',
    body: JSON.stringify({
      prompt: exercise.prompt,
      answer: answer.value,
      rubric: exercise.rubric,
    }),
  });
  const feedback = await response.json();*/
  return {
    feedback: 'mijn feedback', // feedback.text
    score: 8, // feedback.score, // optioneel
    suggestions: 'oefenen, veel meer oefenen', //feedback.suggestions,
  };
}
