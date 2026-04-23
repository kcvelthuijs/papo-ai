import { create } from 'zustand';

import { type AudioTask } from '@workspace/webtypes';

import { AudioQueue } from '../Queues/AudioQueue';

type AudioStore = {
  current: AudioTask | null;
  isPaused: boolean;
  isBusy: boolean;

  setCurrent: (task: AudioTask | null) => void;
  setPaused: (paused: boolean) => void;

  pause: () => void;
  resume: () => void;
  skip: () => void;
  restart: () => void;
  stop: () => void;
};

export const useAudioStore = create<AudioStore>((set) => ({
  current: null,
  isPaused: false,
  isBusy: false,

  setCurrent: (task) => set({ current: task }),
  setPaused: (paused) => set({ isPaused: paused }),

  pause: () => {
    AudioQueue.pause();
    set({ isPaused: true });
  },

  resume: () => {
    AudioQueue.resume();
    set({ isPaused: false });
  },

  skip: () => {
    AudioQueue.skip();
  },

  restart: () => {
    AudioQueue.restart();
  },

  stop: () => {
    AudioQueue.clear();
    set({ current: null, isPaused: false });
  },
}));
