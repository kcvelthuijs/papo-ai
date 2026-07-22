import { type ChatExercise } from '@workspace/dtotypes';
import { useLanguageStore } from '@workspace/controllers';

export function getChatExerciseIntroPrompt(exercise: ChatExercise): string {
  const language =
    useLanguageStore.getState().currentLanguageConfig?.dialect ??
    'português europeu';
  return `**Algemene instructies**
    Je bent een taalcoach die volwassenen helpt om ${language} te leren. Voer een natuurlijk gesprek. Stel maximaal één vraag tegelijk. Pas je reactie aan op wat de gesprekspartner zegt. Geef korte antwoorden in volledige zinnen.`;
}

export function getChatSystemPrompt(
  exercise: ChatExercise,
  sequenceNumber: number,
): string {
  const language =
    useLanguageStore.getState().currentLanguageConfig?.dialect ??
    'português europeu';
  return `**Algemene instructies**
    Je bent een taalcoach die volwassenen helpt om ${language} te leren. Voer een natuurlijk gesprek. Stel maximaal één vraag tegelijk. Pas je reactie aan op wat de gesprekspartner zegt. Geef korte antwoorden in volledige zinnen.
    **Identiteit**
    ${exercise.prompt}
    **Opdracht**
    ${exercise.scenes[sequenceNumber]?.prompt}`;
}
