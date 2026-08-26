import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

import type { ResponseResponse, ResponseRole } from '@workspace/dtotypes';
import { getRouteUrl } from '../Route/LanguageModelRouter';

export const getResponse = async (
  role: ResponseRole = 'user',
  prompt: string,
  instructions: string,
  responseId?: string,
): Promise<ResponseResponse | null> => {
  const _prompt = prompt.trim();
  if (!_prompt) return null;
  const _instr = instructions.trim();
  const _responseId = responseId ? responseId : uuidv4();
  const response = await axios.post<ResponseResponse>(
    getRouteUrl('/llm/response'),
    {
      role,
      prompt: _prompt,
      instructions: _instr,
      _responseId,
    },
  );
  return response.data;
};
