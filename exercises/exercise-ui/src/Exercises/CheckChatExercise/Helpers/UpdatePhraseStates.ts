// ----------------------------
//  Phrase

import type { CompletionRule } from '@workspace/dtotypes';

// ----------------------------
export interface Phrase {
  description: string;
  alternatives: string[];
}
export type PhraseList = Record<string, Phrase>;

// ----------------------------
// PhraseState
// ----------------------------
export interface PhraseState {
  completed: boolean;
  matchedAlternative?: string;
}
export type PhraseStates = Record<string, PhraseState>;

// ----------------------------
// Normalize
// ----------------------------
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[.,!?;:()"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ----------------------------
// Match
// ----------------------------
function matchesAlternative(sentence: string, alternative: string): boolean {
  const normalizedSentence = normalize(sentence);
  const normalizedAlternative = normalize(alternative);
  // Alternatief bestaat uit meerdere woorden
  if (normalizedAlternative.includes(' ')) {
    return normalizedSentence.includes(normalizedAlternative);
  }
  // Enkel woord: voorkom gedeeltelijke matches
  const words = normalizedSentence.split(' ');
  return words.includes(normalizedAlternative);
}

// ----------------------------
// createPhraseStates
// ----------------------------
export function createPhraseList(rules: CompletionRule[]): PhraseList {
  return rules.reduce((phrases, definition) => {
    phrases[definition.key] = {
      description: definition.description,
      alternatives: definition.alternatives,
    };

    return phrases;
  }, {} as PhraseList);
}

// ----------------------------
// createPhraseStates
// ----------------------------
// Maak een lege runtime state voor een scene
export function createPhraseStates(phrases: PhraseList): PhraseStates {
  return Object.keys(phrases).reduce((states, key) => {
    states[key] = {
      completed: false,
    };

    return states;
  }, {} as PhraseStates);
}

// ----------------------------
// updatePhraseStates
// ----------------------------
export function updatePhraseStates(
  utterance: string,
  list: PhraseList,
  states: PhraseStates,
): PhraseStates {
  const updatedStates = { ...states };

  for (const [key, group] of Object.entries(list)) {
    // Al gevonden? Dan niets meer doen.
    if (updatedStates[key]?.completed) {
      continue;
    }

    const matchedAlternative = group.alternatives.find((alternative) =>
      matchesAlternative(utterance, alternative),
    );
    if (matchedAlternative) {
      updatedStates[key] = {
        completed: true,
        matchedAlternative,
      };
    }
  }
  return updatedStates;
}

// ----------------------------
// areAllPhraseStatesCompleted
// ----------------------------
export function areAllPhraseStatesCompleted(states: PhraseStates): boolean {
  return Object.values(states).every((state) => state.completed);
}
