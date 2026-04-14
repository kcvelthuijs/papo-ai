import openai, { AI_LLM } from "./openai.service";

import { conversationRepository } from "../conversation.repository";
import {
  type ResponseRole,
  type ResponseResponse
} from "@workspace/dtotypes/src/Interfaces/response";

export const ResponseService = {
  async sendMessage(
    role: ResponseRole,
    prompt: string,
    instructions: string,
    responseId: string
  ): Promise<ResponseResponse> {
    try {
      const response = await openai.responses.create({
        model: AI_LLM,
        input: [
          {
            role: "system",
            content: instructions
          },
          {
            role: role,
            content: prompt
          }
        ],
        max_output_tokens: 100,
        temperature: 0.1,
        previous_response_id:
          conversationRepository.getLastResponseId(responseId)
      });
      conversationRepository.setLastResponseId(responseId, response.id);
      return {
        id: response.id,
        role: role,
        message: response.output_text
      };
    } catch (error) {
      console.log(error);
      return { id: "", role, message: "" };
    }
  }
};
