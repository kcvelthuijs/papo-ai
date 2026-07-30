import type { ExerciseScore } from '@workspace/dtotypes';

export function getBadgeClassName(used: boolean, score?: ExerciseScore) {
  const base = 'px-3 py-1 rounded-full border text-sm transition-all';

  switch (score) {
    case 'wrong':
      return `${base} animate-shake border-red-400 bg-red-100 text-red-800 dark:bg-red-900 dark:text-white hover:bg-red-100 hover:text-red-800 `;

    case 'right':
      return `${base} border-green-600 text-black bg-green-100 dark:bg-green-900 dark:text-white hover:border-green-800 hover:bg-green-100 hover:text-white`;

    default:
      if (used)
        return `${base} border-gray-600 text-black bg-white hover:border-gray-800 dark:bg-gray-600 dark:border-gray-400 dark:text-white hover:bg-gray-400 hover:text-white`;
      else
        return `${base} border-blue-600 text-black bg-white hover:border-blue-800 dark:bg-gray-600 dark:border-blue-400 dark:text-white hover:bg-blue-400 hover:text-white`;
  }
}
