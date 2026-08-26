import type {
  CompletionRule,
  ChatPhrases,
  ChatStates,
  ChatScene,
  ChatSceneProgress,
} from '@workspace/dtotypes';

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
// createProgress
// ----------------------------
export function createProgress(
  scene: ChatScene | undefined,
): ChatSceneProgress {
  const phrases = createPhraseList(scene?.completionRules ?? []);
  return {
    phrases,
    states: createPhraseStates(phrases),
  };
}

// ----------------------------
// createPhraseStates
// ----------------------------
export function createPhraseList(rules: CompletionRule[]): ChatPhrases {
  return rules.reduce((phrases, definition) => {
    phrases[definition.key] = {
      description: definition.description,
      alternatives: definition.alternatives,
    };

    return phrases;
  }, {} as ChatPhrases);
}

// ----------------------------
// createPhraseStates
// ----------------------------
// Maak een lege runtime state voor een scene
export function createPhraseStates(phrases: ChatPhrases): ChatStates {
  return Object.keys(phrases).reduce((states, key) => {
    states[key] = {
      completed: false,
    };

    return states;
  }, {} as ChatStates);
}

// ----------------------------
// updatePhraseStates
// ----------------------------
export function updatePhraseStates(
  utterance: string,
  list: ChatPhrases,
  states: ChatStates,
): ChatStates {
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
export function areAllPhraseStatesCompleted(states: ChatStates): boolean {
  return Object.values(states).every((state) => state.completed);
}
