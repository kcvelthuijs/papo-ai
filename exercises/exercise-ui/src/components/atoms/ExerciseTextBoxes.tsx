import { type ExerciseInputState } from '@workspace/webtypes';

function getStateClassSpecification(state: ExerciseInputState): string {
  switch (state) {
    case 'idle':
      return 'border-gray-300';
    case 'input':
      return 'border-blue-400 border-2';
    case 'wrong':
      return 'text-red-800 border-red-500 bg-red-300';
    case 'correct':
      return 'font-semibold border-gray-300';
    default:
      return 'font-semibold border-gray-300';
  }
}

export function ExerciseInputBox({
  state = 'idle',
  size = 1,
  className = '',
  ...props
}) {
  const stateClass = getStateClassSpecification(state as ExerciseInputState);
  return (
    <input
      {...props}
      size={size}
      className={`outline-none border px-2 py-1 rounded-md ${stateClass} ${className}`}
    />
  );
}

type Props = {
  key: string;
  form: string;
  state?: ExerciseInputState;
  className?: string;
};
export function ExerciseTextbox({
  key,
  form,
  state = 'idle',
  className = ''
}: Props) {
  const stateClass = getStateClassSpecification(state as ExerciseInputState);
  return (
    <input
      aria-label={key}
      size={9}
      value={form}
      disabled={true}
      className={`outline-none border px-2 py-1 rounded-md  ${stateClass} ${className}`}
    />
  );
}
