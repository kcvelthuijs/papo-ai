import type { PhraseGapProps } from '@exercises/logic';

import { PhraseTypeTest } from '../Tests/PhraseTypeTest';

export function CheckPhraseRenderer({ exercise, onSubmit }: PhraseGapProps) {
  switch (exercise.type) {
    case 'phrase-type-test':
      return <PhraseTypeTest exercise={exercise} onSubmit={onSubmit} />;

    default:
      return <div>Unsupported verb exercise</div>;
  }
}
