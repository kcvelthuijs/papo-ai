export type ResponseRole = "system" | "user" | "assistant" | "developer";

export type ResponseResponse = {
  id: string;
  role: string;
  message: string;
};
