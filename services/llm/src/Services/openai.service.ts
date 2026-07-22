import { OpenAI } from 'openai';

export const AI_LLM = 'gpt-4.1-nano'; // deprecated: update naar gpt-5.4-nano
export const AI_TTS = 'gpt-4o-mini-tts-2025-12-15';

export default new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
