import type { ExerciseScore } from '@workspace/dtotypes';
import { normalizeDiacritics } from 'normalize-text';

export function checkAnswerText(given: string, correct: string): ExerciseScore {
  // phase 1: exact match
  const givenPhrase = given.trim().toLowerCase();
  const correctPhrase = correct.trim().toLowerCase();
  if (givenPhrase === correctPhrase) return 'right';

  // phase 2: normalize text do not check diacritics
  const givenNormalized = normalizeDiacritics(given).trim().toLowerCase();
  const correctNormalized = normalizeDiacritics(correct).trim().toLowerCase();
  if (givenNormalized === correctNormalized) return 'partial';

  // ok, this means it was wrong
  return 'wrong';
}
