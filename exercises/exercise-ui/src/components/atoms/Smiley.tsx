import {
  FaRegLaughSquint,
  FaRegLaughBeam,
  FaRegLaugh,
  FaRegSmile,
  FaRegMeh,
  FaSadTear,
  FaSadCry
} from 'react-icons/fa';

type Props = {
  result: number;
  className?: string;
  size?: number;
};

export function Smiley({ result, className = '', size = 80 }: Props) {
  if (result > 0.9)
    return (
      <FaRegLaughSquint
        size={size}
        className={`text-green-600 dark:text-green-200 ${className}`}
      />
    );
  else if (result > 0.8)
    return (
      <FaRegLaughBeam
        size={size}
        className={`text-green-600 dark:text-green-200 ${className}`}
      />
    );
  else if (result > 0.7)
    return (
      <FaRegLaugh
        size={size}
        className={`text-green-600 dark:text-green-200 ${className}`}
      />
    );
  else if (result > 0.6)
    return (
      <FaRegSmile
        size={size}
        className={`text-green-600 dark:text-green-200 ${className}`}
      />
    );
  else if (result > 0.4)
    return (
      <FaRegMeh
        size={size}
        className={`text-orange-400 dark:text-orange-300 ${className}`}
      />
    );
  else if (result > 0.2)
    return (
      <FaSadCry
        size={size}
        className={`text-red-600 dark:text-red-400 ${className}`}
      />
    );
  return (
    <FaSadTear
      size={size}
      className={`text-red-600 dark:text-red-400 ${className}`}
    />
  );
}
