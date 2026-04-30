import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover';
import type { PopoverWordProps } from '@workspace/webtypes';

export default function PopoverWord({
  className,
  word,
  translation,
}: PopoverWordProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={`font-sm cursor-help border-b-2 border-dotted border-blue-700 font-semibold ${className}`}
        >
          {' '}
          {word}{' '}
        </span>
      </PopoverTrigger>
      <PopoverContent className='w-auto px-3 py-2 text-sm'>
        {translation}
      </PopoverContent>
    </Popover>
  );
}
