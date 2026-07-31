import { getBadgeClassName } from '../Helpers/ExerciseBadgeClassName';

type Props = {
  children?: React.ReactNode;
  given?: string;
  score?: any;
  className?: string;
};

export function LessonSummaryItem({
  children,
  score = 'wrong',
  className = ''
}: Props) {
  const scoreClassItems = getBadgeClassName(true, score);

  return (
    <span
      className={`inline-flex outline-none justify-center border-2 px-2 py-1 rounded-md ${scoreClassItems} ${className}`}
    >
      {children ?? '\u00A0'}
    </span>
  );
}
