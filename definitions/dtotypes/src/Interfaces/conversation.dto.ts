export type ChatRole = 'user' | 'assistant' | 'teacher';

export type CreateConversationProps = {
  userId?: string;
  title: string;
  introduction: string;
};

export type ConversationResponse = {
  id: string;
  message: string;
  createdAt: Date;
  metadata: any;
};

export type AddConversationProps = {
  conversationId: string;
  role: string;
  prompt: string;
  instructions?: string;
};

export type AddConversationResponse = {
  conversationId: string;
  responseId: string;
  role: ChatRole;
  message: string;
};
