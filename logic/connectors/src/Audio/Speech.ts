import axios from 'axios';

import type { SpeechOptions } from '@workspace/webtypes';
import { LLM_HOST, LLM_PORT } from '../Config/Connector.config';

const getRouteUrl = (route: string): string => {
  return `http://${LLM_HOST}:${LLM_PORT}${route}`;
};

export const fetchSoundClip = async (
  props: SpeechOptions,
): Promise<Blob | null> => {
  try {
    const response = await axios.post(getRouteUrl('/llm/tts'), props, {
      responseType: 'blob',
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
