import type { ChatRole } from '@workspace/dtotypes';

export type ChatMessage = {
  id?: string;
  content: string;
  role: ChatRole;
};
