import { create } from 'zustand';

import { type AudioTask } from '@workspace/webtypes';

import { AudioQueue } from '../Queues/AudioQueue';

type AudioStore = {
  current: AudioTask | null;
  isPaused: boolean;
  isBusy: boolean;

  pause: () => void;
  resume: () => void;
  skip: () => void;
  restart: () => void;
  stop: () => void;

  waitForCompletion: () => Promise<void>;
};

export const useAudioStore = create<AudioStore>((set) => ({
  current: null,
  isPaused: false,
  isBusy: false,

  pause: () => {
    AudioQueue.pause();
  },

  resume: () => {
    AudioQueue.resume();
  },

  skip: () => {
    AudioQueue.skip();
  },

  restart: () => {
    AudioQueue.restart();
  },

  stop: () => {
    AudioQueue.clear();
  },

  waitForCompletion: async () => {
    await AudioQueue.waitUntilEmpty();
  },
}));

AudioQueue.subscribe((state) => {
  useAudioStore.setState({
    current: state.current,
    isPaused: state.isPaused,
    isBusy: state.isBusy,
  });
});
