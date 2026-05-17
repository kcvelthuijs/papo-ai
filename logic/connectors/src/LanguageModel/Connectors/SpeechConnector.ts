import axios from 'axios';

import { type SpeechOptions } from '@workspace/webtypes';
import { type AudioTask } from '@workspace/webtypes';

import { getRouteUrl } from '../Route/LanguageModelRouter';

export const getSpeechAudio = async (
  text: string,
  options?: SpeechOptions,
): Promise<any> => {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const voice = (options?.voice ?? 'coral').toLocaleLowerCase();
  const instructions =
    options?.instructions ?? 'Speak in a friendly, calm, teaching tone.';
  const speed = options?.speed ?? 1.0;

  const response = await axios.post(
    getRouteUrl('/llm/tts'),
    {
      text,
      voice,
      instructions,
      speed,
    },
    {
      responseType: 'blob',
    },
  );
  const blob = response.data as Blob;

  const task: AudioTask = {
    id: crypto.randomUUID(),
    text: trimmed,
    blob,
    voice,
  };

  return task;
};
