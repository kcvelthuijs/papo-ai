import type { ExerciseScore } from '@workspace/dtotypes';
import { type ExerciseInputState } from '@workspace/webtypes';
import { getTextBoxScoreClassName } from '../helpers/ExerciseScoreClassName';

type Props = {
  key: string;
  form: string;
  state?: ExerciseInputState;
  score?: ExerciseScore;
  className?: string;
};

export function ExerciseTextbox({
  key,
  form,
  state = 'idle',
  score = undefined,
  className = '',
}: Props) {
  const stateClass = getTextBoxScoreClassName(state, score);
  return (
    <input
      aria-label={key}
      size={Math.max(form.length, 4)}
      value={form}
      readOnly={true}
      className={`outline-none border px-2 py-1 rounded-md  ${stateClass} ${className}`}
    />
  );
}
