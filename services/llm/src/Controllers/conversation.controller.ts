import type { Request, Response } from 'express';
import { conversationService } from '../Services/conversation.service';
import {
  ConversationIdSchema,
  CreateConversationSchema,
  AddConversationMessageSchema,
} from '../Schemas/conversation.schema';

export const conversationController = {
  async create(req: Request, res: Response) {
    const parseResult = CreateConversationSchema.safeParse(req.body);

    if (!parseResult.success) {
      console.log('conv - err:', parseResult.error);
      res.status(400).json(parseResult.error.format);
      return;
    }

    try {
      const { appId, userId, description, prompt } = parseResult.data;
      const response = await conversationService.create(
        appId,
        userId,
        description,
        prompt,
      );

      res.json({
        id: response.id,
        metadata: response.metadata,
        message: response.message,
        created_at: response.createdAt,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate a conversation.' });
    }
  },

  async addMessage(req: Request, res: Response) {
    console.log('conv: ', req.body);
    const parseParams = ConversationIdSchema.safeParse(req.params);
    const parseBody = AddConversationMessageSchema.safeParse(req.body);

    if (!(parseParams.success && parseBody.success)) {
      if (!parseParams.success) console.log('Params - err:', parseParams.error);
      if (!parseBody.success) console.log('Body - err:', parseBody.error);

      res
        .status(400)
        .json(
          parseBody.success
            ? parseParams.error?.format
            : parseBody.error?.format,
        );
      return;
    }

    try {
      const convId = parseParams.data.conversationId;
      const { role, prompt, instructions } = parseBody.data;

      if (!convId) res.status(400).json({ error: 'Empty convId' });

      const response = await conversationService.addMessage(
        convId,
        role,
        prompt,
        instructions,
      );

      res.json({
        id: response.id,
        role: response.role,
        message: response.message,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate a conversation.' });
    }
  },
};
