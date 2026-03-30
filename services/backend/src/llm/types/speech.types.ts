export enum SpeechReturnStateEnum {
   ok,
   error,
}

export interface SpeechResponse {
   audio: Buffer<ArrayBuffer>;
   state: SpeechReturnStateEnum;
}
