import { PtPronouns, type Pronoun } from '@workspace/dtotypes';
import { VerbRow } from '../Exercises/CheckVerbExercise/Renderer/VerbCardText';

type Props = {
  answers: Record<string, string>;
  ActivePronounId?: string;
};

export function VerbTextView({ answers, ActivePronounId }: Props) {
  return (
    <>
      <div className='flex flex-row'>
        <div className='my-1 grid grid-flow-row grid-cols-4 align-bottom'>
          <div className='col-start-1 col-span-2 border-2'>
            <p>Column 1</p>
          </div>
          <div className='col-start-2 border-2'>Column 2</div>
          <div>Column 3</div>
          <div>Column 4</div>
          <div>Column 5</div>
          <div>Column 6</div>
          <div>Column 7</div>
        </div>
      </div>
    </>
  );
}
