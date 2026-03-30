export type ChatRole = 'system' | 'user' | 'assistant' | 'developer';

export type ChatResponse = {
   id: string;
   role: string;
   message: string;
};
