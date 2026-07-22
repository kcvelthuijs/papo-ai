import {
  CreateConversation,
  AddConversationMessage,
} from '@workspace/connectors';

import type {
  AddConversationProps,
  AddConversationResponse,
  ChatExercise,
} from '@workspace/dtotypes';

export const InteractionService = {
  async startDialog(
    exercise: ChatExercise,
  ): Promise<AddConversationResponse | undefined> {
    // Start met algemene opening
    const conversation = await CreateConversation({
      userId: 'guest',
      title: exercise.title,
      introduction: `Je bent een taalcoach die volwassenen helpt om Português Europeu te leren.
        Je voert een natuurlijk gesprek.
        Stel maximaal één vraag tegelijk.
        Pas je reactie aan op wat de gesprekspartner zegt.
        Geef korte antwoorden in volledige zinnen van nooit meer dan 50 tokens`,
    });
    if (!conversation) throw new Error('Unable to create conversation!');

    const response = await AddConversationMessage({
      conversationId: conversation.id,
      role: 'system',
      prompt: exercise.prompt,
    });
    if (!response) throw new Error('Initial message failed!');

    return {
      conversationId: conversation.id,
      responseId: response?.responseId ?? '',
      message: response?.message ?? '',
      role: response?.role ?? 'assistant',
    };
  },

  async SendMessage(
    message: AddConversationProps,
  ): Promise<AddConversationResponse | null> {
    const response = await AddConversationMessage(message);
    if (!response) throw new Error('Failed to send message!');

    return response;
  },

  /*
  // -------------------------
  // SPEECH INPUT
  // -------------------------
  async transcribe(audioBlob: Blob) {
    return speechToText(audioBlob);
  },

  // -------------------------
  // SPEECH OUTPUT
  // -------------------------
  async speak(text: string, options?: any) {
    return textToSpeech(text, options);
  },
  */
};
