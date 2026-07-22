import type { ExerciseScore } from '@workspace/dtotypes';
import { type ExerciseInputState } from '@workspace/webtypes';

export function getTextBoxScoreClassName(
  state: ExerciseInputState,
  score: ExerciseScore,
): string {
  const base =
    state === 'input' ? 'border-blue-400 border-2' : 'border-gray-400';

  if (state === 'temp') {
    switch (score) {
      case 'wrong':
        return `${base} text-red-800 border-red-500 bg-red-200 dark:bg-red-800 dark:text-gray-100 dark:border-red-200`;

      case 'partial':
        return `${base} text-orange-800 border-orange-400 bg-orange-200 dark:bg-orange-800 dark:text-gray-100 dark:border-orange:400`;

      case 'right':
        return `${base} font-semibold border-green-500 bg-green-100 dark:bg-green-800 dark:text-gray-100 dark:border-green-400`;

      default:
        return base;
    }
  } else return base;
}

export function getButtonScoreClassName(score: ExerciseScore) {
  const base = 'rounded-lg border px-3 py-2 transition';
  switch (score) {
    case 'wrong':
      return `${base} animate-shake border-red-400 bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800 dark:bg-red-800 dark:text-gray-100 dark:border-red-200`;

    case 'right':
      return `${base} border-gray-600 text-black bg-white hover:border-gray-800 hover:bg-gray-400 hover:text-white dark:bg-green-800 dark:text-gray-100 dark:border-green-400`;

    default:
      return `${base} border-gray-600 text-black bg-white hover:border-gray-800 hover:bg-gray-400 hover:text-white`;
  }
}
