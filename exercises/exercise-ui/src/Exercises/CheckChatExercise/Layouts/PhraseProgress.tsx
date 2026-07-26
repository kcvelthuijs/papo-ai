import type { PhraseList, PhraseStates } from '../Helpers/UpdatePhraseStates';

interface PhraseProgressProps {
  phrases: PhraseList;
  states: PhraseStates;
}

export function PhraseProgress({ phrases, states }: PhraseProgressProps) {
  return (
    <div className='px-2 py-1 text-sm'>
      <div className='flex flex-wrap gap-x-3 gap-y-1'>
        <div className='font-semibold mb-2'>Informaçoes:</div>
        {Object.entries(phrases).map(([key, phrase]) => {
          const completed = states[key]?.completed;
          return (
            <span
              key={key}
              className={
                completed ? 'line-through text-gray-400 opacity-60' : ''
              }
            >
              {key}
            </span>
          );
        })}
      </div>
    </div>
  );
}
