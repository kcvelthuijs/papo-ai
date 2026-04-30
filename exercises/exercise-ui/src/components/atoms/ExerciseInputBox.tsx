import type { ExerciseScore } from '@workspace/dtotypes';
import { type ExerciseInputState } from '@workspace/webtypes';
import { getTextBoxScoreClassName } from '../helpers/ExerciseScoreClassName';

type Props = {
  key: string;
  state?: ExerciseInputState;
  score?: ExerciseScore;
  size?: number;
  className?: string;
  props?: any;
};

export function ExerciseInputBox({
  state = 'idle',
  score = undefined,
  size = 1,
  className = '',
  ...props
}: Props) {
  const stateClass = getTextBoxScoreClassName(
    state as ExerciseInputState,
    score as ExerciseScore,
  );
  console.log('getTextBoxScoreClassName', state, score, stateClass);
  return (
    <input
      {...props}
      size={size}
      className={`outline-none border px-2 py-1 rounded-md ${stateClass} ${className}`}
    />
  );
}
