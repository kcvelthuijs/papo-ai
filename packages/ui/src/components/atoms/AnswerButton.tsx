import { Button } from "../shadcn/button";

type AnswerButtonProps = {
  id: string | number;
  state: boolean;
  children?: React.ReactNode;
  onClick: () => void;
};

export function AnswerButton({
  id,
  children,
  state,
  onClick,
}: AnswerButtonProps) {
  const baseClasses = "rounded-lg border px-3 py-2 transition";
  const wrongClasses =
    "animate-shake border-red-400 hover:bg-red-100 hover:text-red-800 bg-red-100 text-red-800";
  const defaultClasses =
    "border-gray-600 text-black bg-white hover:border-gray-800 hover:bg-gray-400 hover:text-white";

  return (
    <Button
      key={`answer-${id}`}
      onClick={() => onClick()}
      className={`${baseClasses} ${state ? wrongClasses : defaultClasses}`}
    >
      {children}
    </Button>
  );
}
