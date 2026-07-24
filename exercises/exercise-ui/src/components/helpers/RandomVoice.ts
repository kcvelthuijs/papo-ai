import type { SpeechOptions } from '@workspace/dtotypes';
import { Voices } from '@workspace/webtypes';

export function getRandomVoice(): string {
  const voices = Object.keys(Voices);
  return voices[Math.floor(Math.random() * voices.length)] ?? 'ash';
}

export function getRandomSpeechOption(): SpeechOptions {
  return { voice: getRandomVoice() };
}
