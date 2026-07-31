import type { ExerciseScore } from '@workspace/dtotypes';

export function getBadgeClassName(used: boolean, score?: ExerciseScore) {
  const base = 'px-3 py-1 rounded-full border text-sm transition-all';

  switch (score) {
    case 'wrong':
      return `${base} border-red-300 bg-red-100 text-red-800 dark:bg-red-900 dark:border-red-800 dark:hover:border-red-600 dark:text-white hover:border-red-600`;

    case 'right':
      return `${base} border-green-300 text-black bg-green-100 dark:bg-green-800 dark:border-green-800 dark:hover:border-green-600 dark:text-white hover:border-green-600`;

    default:
      if (used)
        return `${base} border-gray-600 text-black bg-white hover:border-gray-800 dark:bg-gray-600 dark:border-gray-400 dark:text-white hover:bg-gray-400 hover:text-white`;
      else
        return `${base} border-blue-600 text-black bg-white hover:border-blue-800 dark:bg-gray-600 dark:border-blue-400 dark:text-white hover:bg-blue-400 hover:text-white`;
  }
}
