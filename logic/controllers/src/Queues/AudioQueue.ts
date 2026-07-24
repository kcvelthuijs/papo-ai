import { Voices, type AudioTask } from '@workspace/webtypes';

export type AudioQueueState = {
  current: AudioTask | null;
  isPaused: boolean;
  isBusy: boolean;
};

class AudioQueueClass {
  private queue: AudioTask[] = [];
  private current: AudioTask | null = null;

  private audio = new Audio();
  private audioContext = new AudioContext();
  private sourceNode: MediaElementAudioSourceNode;
  private gainNode: GainNode;

  private subscribers: ((state: AudioQueueState) => void)[] = [];

  private paused = false;
  private currentUrl: string | null = null;

  constructor() {
    // Creeer sourceNode en gainNode
    this.sourceNode = this.audioContext.createMediaElementSource(this.audio);
    this.gainNode = this.audioContext.createGain();

    this.sourceNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    this.audio.onended = () => {
      this.cleanupCurrentAudio();
      this.next();
    };

    this.audio.onerror = () => {
      this.cleanupCurrentAudio();
      this.next();
    };
  }

  private getState(): AudioQueueState {
    return {
      current: this.current,
      isPaused: this.paused,
      isBusy: this.current !== null,
    };
  }
  subscribe(fn: (state: AudioQueueState) => void) {
    this.subscribers.push(fn);
    fn(this.getState());
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== fn);
    };
  }

  private notify() {
    const state = this.getState();
    this.subscribers.forEach((s) => s(state));
  }

  enqueue(task: AudioTask) {
    this.queue.push(task);
    if (!this.current && !this.paused) {
      this.next();
    } else {
      this.notify();
    }
  }

  private async next() {
    if (this.queue.length === 0) {
      this.current = null;
      this.paused = false;
      this.notify();
      return;
    }

    this.current = this.queue.shift()!;
    this.paused = false;
    this.currentUrl = URL.createObjectURL(this.current.blob);
    this.audio.src = this.currentUrl;

    // pas snelheid en volume aan op de voice
    const voice = Voices[this.current.voice];
    this.gainNode.gain.value = voice?.volume ?? 1.0;
    this.audio.playbackRate = voice?.speed ?? 1.0;
    this.notify();
    /*console.log(
      'voice',
      this.current.voice,
      ' // volumne ',
      voice?.volume ?? 1.0,
      ' // speed ',
      voice?.speed ?? 1.0,
    );*/

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      await this.audio.play();
    } catch (err) {
      console.error(err);
      this.next();
    }
    this.audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
      this.next();
    });
  }

  private cleanupCurrentAudio() {
    if (this.currentUrl) {
      URL.revokeObjectURL(this.currentUrl);
      this.currentUrl = null;
    }
  }

  pause() {
    if (this.current) {
      this.audio.pause();
      this.paused = true;
      this.notify();
    }
  }

  async resume() {
    if (this.current) {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      await this.audio.play().catch(console.error);
      this.paused = false;
      this.notify();
    }
  }

  skip() {
    if (this.current) {
      this.audio.pause();
      this.cleanupCurrentAudio();
      this.current = null;
      this.next();
    }
  }

  async restart() {
    if (this.current) {
      this.audio.currentTime = 0;
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      await this.audio.play().catch(console.error);
      this.paused = false;
      this.notify();
    }
  }

  clear() {
    this.audio.pause();
    this.cleanupCurrentAudio();
    this.audio.src = '';
    this.queue = [];
    this.current = null;
    this.paused = false;
    this.notify();
  }

  waitUntilEmpty(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (!this.current && this.queue.length === 0) {
          resolve();
        }
      };
      const unsubscribe = this.subscribe(() => {
        if (!this.current && this.queue.length === 0) {
          unsubscribe();
          resolve();
        }
      });
      check();
    });
  }

  isPaused() {
    return this.paused;
  }

  isPlaying() {
    return this.current !== null;
  }

  hasQueue() {
    return this.queue.length > 0;
  }
}

// Singleton instance
export const AudioQueue = new AudioQueueClass();
