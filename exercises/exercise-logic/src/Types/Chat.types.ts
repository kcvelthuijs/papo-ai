export type ChatRole = 'user' | 'assistant' | 'teacher';

export type ChatMessage = {
  id?: string;
  content: string;
  role: ChatRole;
};
