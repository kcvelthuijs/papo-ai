import { create } from 'zustand';

import type { ChatMessage, TeacherFeedback } from '@workspace/dtotypes';
import { useLanguageStore } from '@workspace/controllers';

import {
  AddConversationMessage,
  CreateConversation,
} from '@workspace/connectors';

export interface DialogConfig {
  title: string;
  identity: string;
  assignment: string;
}

type DialogState = {
  // dialog information
  title: string;
  identity: string;
  assignment: string;

  // Conversatiegegevens voor LLM
  conversationId: string;
  responseId: string;
  messages: ChatMessage[];

  // State
  isBusy: boolean;
  isErr: boolean;
  errorMessage: string;

  initialize: (config: DialogConfig) => void;
  startDialog: () => Promise<void>;
  addMessage: (text: string, feedback: TeacherFeedback) => Promise<void>;
  sendMessage: (role: string, message: string) => Promise<void>;
  setAssignment: (text: string) => void;
  sayMessage: (msg: ChatMessage) => Promise<void>;
  getConversation: () => string;
};

const getChatIntroPrompt = (): string => {
  const language =
    useLanguageStore.getState().currentLanguageConfig?.dialect ??
    'português europeu';

  return `**Algemene instructies**
    Je bent een taalcoach die volwassenen helpt om ${language} te leren. Voer een natuurlijk gesprek. 
    Stel maximaal één vraag tegelijk. Pas je reactie aan op wat de gesprekspartner zegt.
    Hou je aan de onderwerpen uit de opdracht. Geef korte antwoorden in volledige zinnen van maximaal 50 tokens.`;
};

const getChatConvPrompt = (intro: string, scene: string): string => {
  return `${getChatIntroPrompt()}
    **Identiteit**
    ${intro}
    **Opdracht**
    ${scene}
    `;
};

export const useDialogStore = create<DialogState>((set, get) => ({
  title: '',
  identity: '',
  assignment: '',

  conversationId: '',
  responseId: '',
  messages: [],

  isBusy: false,
  isErr: false,
  errorMessage: '',

  initialize: (config: DialogConfig) => {
    set({
      title: config.title,
      identity: config.identity,
      assignment: config.assignment,
    });
  },

  startDialog: async () => {
    // stel het conversationId en de meldingen in
    set({
      conversationId: '',
      responseId: '',
      messages: [],
      isBusy: false,
      isErr: false,
      errorMessage: '',
    });

    try {
      const title = get().title;

      // creeer een conversatie
      const conversation = await CreateConversation({
        userId: 'system',
        title: title,
        introduction: getChatIntroPrompt(),
      });
      const conversationId = conversation?.id;
      set({
        conversationId: conversationId,
      });

      // Stel de openingsvraag
      get().sendMessage('system', get().assignment);
    } catch (err: any) {
      set({
        isErr: true,
        errorMessage:
          err?.messages?.join('\n') ??
          err?.message ??
          'Unable to create a conversation!',
      });
    }
    return;
  },

  sendMessage: async (role: string, message: string) => {
    try {
      const response = await AddConversationMessage({
        conversationId: get().conversationId!,
        role: role,
        instructions: getChatConvPrompt(get().identity, get().assignment),
        prompt: message,
      });

      // Voeg de response toe aan de messages
      const newMsg: ChatMessage = {
        id: response?.responseId,
        content: response?.message ?? '...',
        role: 'bot',
      };
      set((state) => ({
        messages: [...state.messages, newMsg],
        isBusy: false,
      }));
      await get().sayMessage(newMsg);
    } catch (err: any) {
      set({
        isErr: true,
        errorMessage:
          err?.messages?.join('\n') ??
          err?.message ??
          'Unable to send message!',
      });
    }
  },

  addMessage: async (text: string, feedback: TeacherFeedback) => {
    // Add user message to the list
    const newMsg: ChatMessage = {
      content: text,
      feedback,
      role: 'user',
    };
    set((state) => ({
      messages: [...state.messages, newMsg],
      isBusy: true,
    }));
    // Send message and process answer
    get().sendMessage('user', text);
  },

  setAssignment: (text: string) => {
    set({ assignment: text });
  },

  sayMessage: async (msg: ChatMessage) => {
    // do nothing
  },

  getConversation: (): string => {
    const dialog = get()
      .messages.filter(
        (message) => message.role === 'bot' || message.role === 'user',
      )
      .map((message) => `${message.role}: '${message.content}'`)
      .join('\n');
    return dialog;
  },
}));
