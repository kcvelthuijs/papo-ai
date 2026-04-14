export enum SpeechReturnStateEnum {
  ok,
  error
}

export interface SpeechResponse {
  audio: Blob;
  state: SpeechReturnStateEnum;
}
