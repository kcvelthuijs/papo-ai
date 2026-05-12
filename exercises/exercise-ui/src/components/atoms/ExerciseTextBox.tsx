import type { ExerciseScore } from '@workspace/dtotypes';
import { type ExerciseInputState } from '@workspace/webtypes';
import { getTextBoxScoreClassName } from '../Helpers/ExerciseScoreClassName';

type Props = {
  key: string;
  form: string;
  state?: ExerciseInputState;
  score?: ExerciseScore;
  hint?: string;
  className?: string;
};

export function ExerciseTextbox({
  key,
  form,
  state = 'idle',
  score = undefined,
  className = '',
  hint = '',
}: Props) {
  const stateClass = getTextBoxScoreClassName(state, score);
  return (
    <span
      className={`inline-flex items-center justify-center border-2 rounded-md px-2 py-1 min-w-[6ch] text-center ${stateClass} ${className}`}
      style={{ minWidth: `${Math.max(hint.length ?? 12, 6)}ch` }}
    >
      {form || '\u00A0'}
    </span>
  );
}
