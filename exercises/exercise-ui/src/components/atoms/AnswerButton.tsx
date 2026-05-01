import type { ExerciseScore } from '@workspace/dtotypes';
import { Button } from '@workspace/ui';

import { getButtonScoreClassName } from '../helpers/ExerciseScoreClassName';

type AnswerButtonProps = {
  id: string | number;
  score: ExerciseScore;
  children?: React.ReactNode;
  onClick: () => void;
};

export function AnswerButton({
  id,
  children,
  score,
  onClick,
}: AnswerButtonProps) {
  const stateClass = getButtonScoreClassName(score);
  return (
    <Button
      key={`answer-${id}`}
      onClick={() => onClick()}
      className={`${stateClass}`}
    >
      {children}
    </Button>
  );
}
