export enum SpeechReturnStateEnum {
  ok,
  error
}

export interface SpeechResponse {
  audio: Buffer<ArrayBufferLike>;
  state: SpeechReturnStateEnum;
}
