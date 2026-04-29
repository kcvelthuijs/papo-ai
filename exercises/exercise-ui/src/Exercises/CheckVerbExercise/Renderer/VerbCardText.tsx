type Props = {
  form: string;
  isActive: boolean;
};

export function VerbRow({ form, isActive }: Props) {
  const colour = isActive
    ? 'border-red-400 border-1 border'
    : 'border-gray-200 border-1 border';
  return (
    <input
      size={9}
      value={form}
      disabled={true}
      className={`outline-none border px-2 py-1 rounded-md  ${colour}`}
    />
  );
}
