import axios from 'axios';

import type { ResponseResponse, ResponseRole } from '@workspace/dtotypes';
import { getRouteUrl } from '../Route/LanguageModelRouter';

export const getResponse = async (
  role: ResponseRole = 'user',
  prompt: string,
  instructions: string,
  responseId: string,
): Promise<ResponseResponse | null> => {
  const _prompt = prompt.trim();
  if (!_prompt) return null;
  const _instr = instructions.trim();

  const response = await axios.post<ResponseResponse>(
    getRouteUrl('/llm/response'),
    {
      role,
      prompt: _prompt,
      instructions: _instr,
      responseId,
    },
  );
  return response.data;
};
