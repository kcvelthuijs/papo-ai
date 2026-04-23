import axios from 'axios';

import { type ResponseRole } from '@workspace/dtotypes';
import { getRouteUrl } from './LanguageModelConnector';

export const getResponse = async (
  role: ResponseRole = 'user',
  prompt: string,
  responseId?: string,
): Promise<Response | null> => {
  const trimmed = prompt.trim();
  if (!trimmed) return null;

  const response = await axios.post(getRouteUrl('/llm/response'), {
    role,
    prompt,
    responseId,
  });
  return response.data;
};
