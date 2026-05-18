import axios, { type CancelToken } from 'axios';
import type {
  CreateConversationProps,
  AddConversationProps,
  AddConversationResponse,
  ConversationResponse,
} from '@workspace/dtotypes';

import { getRouteUrl } from '../Route/LanguageModelRouter';

export const CreateConversation = async ({
  userId,
  title,
  introduction = '',
}: CreateConversationProps) => {
  try {
    const response = await axios.post<ConversationResponse>(
      getRouteUrl('/llm/conv'),
      {
        appId: 'papo-ai',
        userId,
        prompt,
        instructions: introduction,
      },
    );
    return response.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request geannuleerd');
    } else {
      console.error(`Request error: ${err}`);
    }
    return null;
  }
};

export const AddConversationMessage = async ({
  conversationId,
  role,
  prompt,
  instructions = '',
}: AddConversationProps) => {
  try {
    const response = await axios.post<AddConversationResponse>(
      getRouteUrl(`/llm/conv/${conversationId}/add`),
      {
        role,
        prompt,
        instructions,
      },
    );
    return response.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request geannuleerd');
    } else {
      console.error(`Request error: ${err}`);
    }
    return null;
  }
};
