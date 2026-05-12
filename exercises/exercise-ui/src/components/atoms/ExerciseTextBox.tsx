import type { ExerciseScore } from '@workspace/dtotypes';
import { type ExerciseInputState } from '@workspace/webtypes';
import { getTextBoxScoreClassName } from '../Helpers/ExerciseScoreClassName';

type Props = {
  textValue: string;
  state?: ExerciseInputState;
  score?: ExerciseScore;
  hint?: string;
  className?: string;
};

export function ExerciseTextbox({
  textValue,
  state = 'idle',
  score = undefined,
  className = '',
  hint = '',
}: Props) {
  const stateClass = getTextBoxScoreClassName(state, score);
  return (
    <span
      className={`inline-flex outline-none justify-center border-2 px-2 py-1 rounded-md ${stateClass} ${className}`}
      style={{ minWidth: `${Math.max(hint.length ?? 12, 6)}ch` }}
    >
      {textValue || '\u00A0'}
    </span>
  );
}
