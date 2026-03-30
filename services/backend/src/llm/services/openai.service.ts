import { OpenAI } from 'openai';

export const AI_LLM = 'gpt-4.1-nano';
export const AI_TTS = 'gpt-4o-mini-tts';

export default new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});
