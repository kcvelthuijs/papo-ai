import openai, { AI_TTS } from './openai.service';
import {
  type SpeechResponse,
  SpeechReturnStateEnum,
} from '@workspace/dtotypes';

export const speechService = {
  async speak(
    text: string,
    voice?: string,
    instructions?: string,
    speed?: number,
  ): Promise<SpeechResponse> {
    try {
      const response = await openai.audio.speech.create({
        model: AI_TTS,
        voice: voice ?? 'coral',
        input: text,
        instructions: instructions ?? 'Speak clearly and friendly',
        speed: speed ?? 1.0,
        response_format: 'mp3',
      });
      const content = Buffer.from(await response.arrayBuffer());
      return {
        audio: content,
        state: SpeechReturnStateEnum.ok,
      };
    } catch (error) {
      console.log('ERROR:', error);
      // return foutmelding en leeg buffer
      return {
        audio: Buffer.from(new ArrayBuffer(0)),
        state: SpeechReturnStateEnum.error,
      };
    }
  },
};
