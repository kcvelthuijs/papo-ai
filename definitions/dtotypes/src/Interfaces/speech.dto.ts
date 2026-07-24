export type SpeechData = {
  text: string;
  voice?: string;
  instructions?: string;
  speed?: number;
};

export interface SpeechOptions {
  voice?: string;
  instructions?: string;
  speed?: number;
}

export enum SpeechReturnStateEnum {
  ok,
  error,
}

export interface SpeechResponse {
  audio: Buffer<ArrayBufferLike>;
  state: SpeechReturnStateEnum;
}
