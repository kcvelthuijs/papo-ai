import { create } from 'zustand';

import { fetchSoundClip } from '@workspace/connectors';
import type { SpeechOptions } from '@workspace/dtotypes';
import type { SpeechData } from '@workspace/dtotypes';

import { AudioQueue } from '../Queues/AudioQueue';

type SpeechState = {
  speed: number;
  voice: string;
  instructions: string;
  enabled: boolean;

  setEnabled: (enabled: boolean) => void;
  setSpeed: (speed: number) => void;
  setVoice: (voice: string) => void;
  setInstructions: (instructions: string) => void;
  generateSpeech: (text: string, options?: SpeechOptions) => Promise<void>;
};

export const useSpeechStore = create<SpeechState>((set, get) => ({
  speed: 3,
  voice: 'ash',
  instructions:
    'Fale apenas em português europeu, com sotaque de Coimbra, e use um tom amigável e alegre.',
  enabled: true,

  setSpeed: (speed: number) => set({ speed }),
  setVoice: (voice: string) => set({ voice }),
  setInstructions: (instructions: string) => set({ instructions }),

  setEnabled: (enabled: boolean) => {
    set({ enabled });
    console.log('Speech enabled:', get().enabled);
  },

  generateSpeech: async (text, options) => {
    const speechspeeds: number[] = [0.8, 0.9, 1.0, 1.05, 1.1, 1.15];
    if (get().enabled) {
      const id = 'id-1';
      const data: SpeechData = {
        text,
        speed: options?.speed ?? speechspeeds[get().speed],
        voice: options?.voice ?? get().voice,
        instructions: options?.instructions ?? get().instructions
      };
      const blob = await fetchSoundClip(data);
      if (blob) {
        AudioQueue.enqueue({
          id,
          text: data.text,
          voice: data.voice ?? '',
          blob
        });
      }
    }
  }
}));
