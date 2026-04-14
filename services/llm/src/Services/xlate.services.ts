import openai, { AI_LLM } from './openai.service';
import type { XlateResponse } from '@/llm/types/xlate.types';

export const xlateService = {
   async translate(toLanguage: string, prompt: string): Promise<XlateResponse> {
      try {
         const response = await openai.responses.create({
            model: AI_LLM,
            input: [
               {
                  role: 'system',
                  content: `Je bent een vertaler. Vertaal de tekst naar ${toLanguage}. 
                    Behoud de betekenis en stijl zo goed mogelijk.`,
               },
               {
                  role: 'user',
                  content: prompt,
               },
            ],
            max_output_tokens: 100,
            temperature: 0.2,
         });
         return {
            result: response.output_text,
         };
      } catch (error) {
         console.log(error);
         return { result: '' };
      }
   },
};
