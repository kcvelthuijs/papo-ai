import React, { forwardRef } from 'react';
import type { ExerciseScore } from '@workspace/dtotypes';
import { type ExerciseInputState } from '@workspace/webtypes';
import { getTextBoxScoreClassName } from '../Helpers/ExerciseScoreClassName';

type Props = {
  key: string;
  value: any;
  state?: ExerciseInputState;
  score?: ExerciseScore;
  size?: number;
  className?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ExerciseInputBox = forwardRef<HTMLInputElement, Props>(
  function ExerciseInputBox(
    {
      state = 'idle',
      score = undefined,
      size = 1,
      className = '',
      hint = '',
      ...props
    },
    ref,
  ) {
    const stateClass = getTextBoxScoreClassName(
      state as ExerciseInputState,
      score as ExerciseScore,
    );
    // console.log('getTextBoxScoreClassName', state, score, stateClass);
    return (
      <input
        ref={ref}
        {...props}
        size={size}
        placeholder={hint}
        className={`outline-none border px-2 py-1 rounded-md ${stateClass} ${className}`}
      />
    );
  },
);
