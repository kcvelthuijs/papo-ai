import type { ExerciseScore } from '@workspace/dtotypes';
import { Button } from '@workspace/ui';

import { getButtonScoreClassName } from '../Helpers/ExerciseScoreClassName';
type AnswerButtonProps = {
  id: string | number;
  score: ExerciseScore;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

export function AnswerButton({
  id,
  children,
  score,
  onClick,
  disabled = false,
}: AnswerButtonProps) {
  const stateClass = getButtonScoreClassName(score);
  return (
    <Button
      key={`answer-${id}`}
      onClick={() => onClick()}
      className={`${stateClass} ${disabled ? 'opacity-40' : ''}`}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
