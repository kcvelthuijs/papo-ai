import type { ExerciseScore } from '@workspace/dtotypes';
import { getBadgeClassName } from '../Helpers/ExerciseBadgeClassName';

type Props = {
  word: string;
  used?: boolean;
  score?: ExerciseScore;
  className?: string;
};

export function WordBadge({
  word,
  used = false,
  score = undefined,
  className = '',
}: Props) {
  const base = getBadgeClassName(used, score);
  return <div className={`${base} ${className}`}>{word}</div>;
}
