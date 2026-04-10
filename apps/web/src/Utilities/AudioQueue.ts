import { type AudioTask } from "@workspace/webtypes/src/Types/Interfaces/Audio";

class AudioQueueClass {
  private queue: AudioTask[] = [];
  private current: AudioTask | null = null;
  private audio = new Audio();
  private subscribers: ((task: AudioTask | null) => void)[] = [];
  private paused = false;

  constructor() {
    this.audio.onended = () => this.next();
    this.audio.onerror = () => this.next();
  }

  subscribe(fn: (task: AudioTask | null) => void) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== fn);
    };
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.current));
  }

  enqueue(task: AudioTask) {
    this.queue.push(task);
    if (!this.current && !this.paused) {
      this.next();
    }
  }

  private next() {
    if (this.queue.length === 0) {
      this.current = null;
      this.notify();
      return;
    }

    this.current = this.queue.shift()!;
    const url = URL.createObjectURL(this.current.blob);
    this.audio.src = url;
    this.audio.play().catch(console.error);
    this.notify();

    this.audio.onended = () => {
      URL.revokeObjectURL(url);
      this.next();
    };
  }

  pause() {
    this.audio.pause();
    this.paused = true;
  }

  resume() {
    if (this.current) {
      this.audio.play();
      this.paused = false;
    }
  }

  skip() {
    this.audio.pause();
    this.next();
  }

  restart() {
    if (this.current) {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }

  clear() {
    this.audio.pause();
    this.audio.src = "";
    this.current = null;
    this.queue = [];
    this.notify();
  }

  waitUntilEmpty(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (!this.current && this.queue.length === 0) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
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
