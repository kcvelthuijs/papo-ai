import { useState } from 'react';

import type {
  ChatExercise,
  ChatResponse,
  ChatPhrase,
  ChatState,
  ChatExerciseFeedback,
} from '@workspace/dtotypes';

import {
  areAllPhraseStatesCompleted,
  createPhraseList,
  createPhraseStates,
  updatePhraseStates,
  type PhraseList,
} from '../Helper/UpdatePhraseStates';

export async function evaluateChatExercise(
  exercise: ChatExercise,
  answer: ChatResponse,
): Promise<ChatExerciseFeedback> {
  const [phraseStates, setPhraseStates] = useState<ChatState>({});  
  const phraseList = createPhraseList(
    exercise.scenes[answer.sceneId]?.completionRules ?? []
  );
  const updatedPhraseStates = updatePhraseStates(
    answer.value,
    phraseList,
    phraseStates
  );
  setPhraseStates(updatedPhraseStates);
  const completed = areAllPhraseStatesCompleted(updatedPhraseStates);
  if (!completed)
    return ({
      lessonId: exercise.lessonId,
      seqNumber: exercise.seqNumber,
      question: answer.sceneId,
      nextAction: 'next',
      score: 'right',
      phrases: phraseList,
      states: updatedPhraseStates
    });
  else {
    
  }

  const nextAction = (!completed)
    ? 'next'
    : (answer.sceneId + 1 < exercise.scenes.length)
      ? 'next step'
      : 'next exercise';
  
  return ({
    lessonId: exercise.lessonId,
    seqNumber: exercise.seqNumber,
    question: answer.sceneId,
    nextAction,
    score: 'right',
    phrases: phraseList,
    states: updatedPhraseStates
  })
  }
  /*const response = await fetch('/api/llm-feedback', {
    method: 'POST',
    body: JSON.stringify({
      prompt: exercise.prompt,
      answer: answer.value,
      rubric: exercise.rubric,
    }),
  });
  const feedback = await response.json();*/
  return {
    feedback: 'mijn feedback', // feedback.text
    score: 8, // feedback.score, // optioneel
    suggestions: 'oefenen, veel meer oefenen', //feedback.suggestions,
  };
}

function nextScene() {
  throw new Error('Function not implemented.');
}

