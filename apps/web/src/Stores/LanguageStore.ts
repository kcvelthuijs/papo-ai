import { create } from "zustand";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  type LanguageConfig,
} from "@workspace/webtypes/src/Assets/Data/Languages";

type Code = string;

type LanguageState = {
  languageByCode: Record<Code, LanguageConfig>;

  currentLanguage: Code;
  currentLanguageConfig: LanguageConfig;

  getLanguage: (code: Code) => LanguageConfig;
  setLanguage: (code: Code, Language: LanguageConfig) => void;
  select: (code: Code) => void;
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  languageByCode: { ...LANGUAGES },

  currentLanguage: DEFAULT_LANGUAGE,

  getLanguage: (code) => {
    const found = get().languageByCode[code];
    if (found) return found;

    // fallback: maak 'm aan met default (of leeg)
    const fallback = LANGUAGES.default;

    // optioneel: direct opslaan zodat consistent blijft
    set((state) => ({
      languageByCode: { ...state.languageByCode, [code]: fallback },
    }));
    return fallback;
  },

  setLanguage: (code, Language) =>
    set((state) => ({
      languageByCode: { ...state.languageByCode, [code]: Language },
    })),

  select: (code) => {
    // forceer dat language bestaat (incl. fallback)
    get().getLanguage(code);

    set({
      currentLanguage: code,
      currentLanguageConfig: get().languageByCode[code], // update derived state
    });
  },

  // initial derived state
  currentLanguageConfig: LANGUAGES[DEFAULT_LANGUAGE],
}));
