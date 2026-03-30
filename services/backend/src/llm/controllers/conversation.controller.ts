import type { Request, Response } from 'express';
import { conversationService } from '../services/conversation.service';
import {
   ConversationIdSchema,
   createConversationSchema,
   addConversationMessageSchema,
} from '../schemas/conversation.schema';

export const conversationController = {
   async create(req: Request, res: Response) {
      console.log('conv: ', req.body);
      const parseResult = createConversationSchema.safeParse(req.body);

      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format);
         return;
      }

      try {
         const { appId, userId, description, prompt } = req.body;
         const response = await conversationService.create(
            appId,
            userId,
            description,
            prompt
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
      const parseParams = ConversationIdSchema.safeParse(req.params);
      const parseBody = addConversationMessageSchema.safeParse(req.body);

      if (!(parseParams.success && parseBody.success)) {
         res.status(400).json(
            parseBody.success
               ? parseParams.error?.format
               : parseBody.error?.format
         );
         return;
      }

      try {
         const { conversationId } = req.params;
         const { role, prompt, instructions } = req.body;

         if (!conversationId)
            res.status(400).json({ error: 'Empty conversationId' });
         const convId: string = conversationId ?? '';

         const response = await conversationService.addMessage(
            convId,
            role,
            prompt,
            instructions
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
