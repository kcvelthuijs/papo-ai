import { type AvatarConfig } from "./avatar";

export type LessonSummary = {
  id: string;
  type: string;
  title: string;
  level: string;
  image: string;
  description: string;
};

export interface LessonResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  prompt: string;
  voice?: string;
  avatar?: AvatarConfig;
  speech?: string;
  phrases?: string[];
  image?: string;
}
