import type { ChatRole, TeacherFeedback } from '@workspace/dtotypes';

export type ChatMessage = {
  id?: string;
  content: string;
  feedback?: TeacherFeedback;
  role: ChatRole;
};
