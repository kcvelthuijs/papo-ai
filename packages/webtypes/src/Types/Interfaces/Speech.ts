export interface SpeechOptions {
  voice?: string;
  instructions?: string;
  speed?: number;
}

export type SpeechTask = {
  id: string;
  blob: any;
  text?: string; // handig voor debug/UI
  voice: string;
};