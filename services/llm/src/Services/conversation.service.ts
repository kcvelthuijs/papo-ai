import openai, { AI_LLM } from "./openai.service";
import {
  type ResponseRole,
  type ResponseResponse
} from "@workspace/dtotypes/src/Interfaces/response";
import { type ConversationResponse } from "@workspace/dtotypes/src/Interfaces/conversation";

export const conversationService = {
  async create(
    appId: string,
    userId: string,
    description: string,
    prompt: string
  ): Promise<ConversationResponse> {
    const response = await openai.conversations.create({
      metadata: {
        Application: appId,
        User: userId,
        Description: description
      },
      items: [
        {
          type: "message",
          role: "assistant",
          content: prompt
        }
      ]
    });

    return {
      id: response.id,
      message: response.object,
      createdAt: new Date(response.created_at * 1000),
      metadata: response.metadata
    };
  },

  async addMessage(
    conversationId: string,
    role: ResponseRole,
    prompt: string,
    instructions?: string
  ): Promise<ResponseResponse> {
    const response = await openai.responses.create({
      model: AI_LLM,
      input: [
        {
          role: "system",
          content: instructions ?? "Antwoord in maximaal 50 tokens"
        },
        {
          role: role,
          content: prompt
        }
      ],
      conversation: conversationId
    });

    const retval = {
      id: response.id,
      role,
      message: response.output_text
    };
    return retval;
  }
};
