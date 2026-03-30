import type { XscribeInput, XscribeResponse } from '@/llm/types/xscribe.types';
import openai, { AI_TTS } from './openai.service';
import { Readable } from 'stream';

export const xcribeService = {
   async getText({
      file,
      language = 'en',
   }: XscribeInput): Promise<XscribeResponse> {
      try {
         console.log('xscribeService: call openai');

         const audioBlob = new Blob([file], { type: 'audio/webm' });
         const transcription = await openai.audio.transcriptions.create({
            file: audioBlob,
            model: AI_TTS,
            language,
         });
         console.log('xscribeService: return', transcription.text);
         return { text: transcription.text };
      } catch (err) {
         console.error('xcribeService error:', err);
         throw err;
      }
   },
};
