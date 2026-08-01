import { useEffect, useState } from 'react';

type Props = {
  label: string;
  className?: string;
  tooltipItems?: string[];
  completed?: boolean;
};

export function SceneCompletionBadge({
  label,
  className = '',
  tooltipItems = [],
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showTooltip]);

  return (
    <div className='relative inline-block'>
      <button
        type='button'
        onClick={() => setShowTooltip(true)}
        className={`cursor-pointer border border-slate-200 bg-slate-100 dark:border-slate-400 dark:bg-slate-700 rounded mx-2 px-2 ${className}`}
      >
        {label}
      </button>
      {showTooltip && (
        <div className='absolute left-1/2 bottom-full z-50 mt-2 -translate-x-1/2 flex flex-wrap justify-center gap-1 w-max max-w-xs p-2 shadow-lg"'>
          {tooltipItems.map((item) => (
            <span
              key={item}
              className='font-semibold rounded bg-slate-200 border-gray-500 dark:text-slate-700 dark:bg-slate-300 dark:border-slate-900 dark:shadow-xl border px-1.5 py-0.5'
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
