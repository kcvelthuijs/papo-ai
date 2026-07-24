import type { SpeechOptions } from '@workspace/dtotypes';

import { useAudioStore } from '../Stores/AudioStore';
import { useLanguageStore } from '../Stores/LanguageStore';
import { useSpeechStore } from '../Stores/SpeechStore';

export async function submitAudioHelper(
  text: string,
  options?: SpeechOptions,
  callBack?: () => void,
): Promise<void> {
  // Haal de actuele taal op
  const dialect = useLanguageStore.getState().currentLanguageConfig?.dialect;

  // Maak een sound clip van de tekst
  await useSpeechStore.getState().generateSpeech(text, {
    voice: options?.voice,
    instructions: `Fale apenas em ${dialect}. Use um tom amigável e alegre. ${options?.instructions ?? ''}`,
  });

  // Wacht tot het afspelen klaar is
  await useAudioStore.getState().waitForCompletion();

  // roep de callback aan als die gegeven is
  if (callBack) callBack();
}
