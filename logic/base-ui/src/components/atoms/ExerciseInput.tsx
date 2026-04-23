export function ExerciseInput({
  state = 'idle',
  size = 1,
  className = '',
  ...props
}) {
  const stateClass =
    state === 'wrong'
      ? 'text-red-500 border-red-500'
      : state === 'correct'
        ? 'font-semibold text-gray-800 border-gray-300'
        : 'text-gray-800 border-gray-300';

  return (
    <input
      {...props}
      size={size}
      className={`bg-transparent text-center outline-none border py-1 rounded-md ${stateClass} ${className}`}
    />
  );
}
