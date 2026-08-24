import { SceneCompletionBadge } from '../../../Components/Atoms/SceneCompletionBadge';
import type {
  PhraseList,
  PhraseStates
} from '../../../../../exercise-logic/src/Helper/UpdatePhraseStates';

interface SceneCompletionProps {
  phrases: PhraseList;
  states: PhraseStates;
}

export function SceneCompletionState({
  phrases,
  states
}: SceneCompletionProps) {
  return (
    <div className='px-2 py-1 text-sm'>
      <div className='flex flex-wrap gap-x-3 gap-y-1'>
        <div className='font-semibold mb-2'>Informaçoes:</div>
        {Object.entries(phrases).map(([key, phrase]) => {
          const completed = states[key]?.completed;
          return (
            <SceneCompletionBadge
              label={key}
              tooltipItems={phrase.alternatives}
              className={
                completed ? 'text-gray-500 dark:text-gray-400 opacity-60' : ''
              }
            />
          );
        })}
      </div>
    </div>
  );
}
