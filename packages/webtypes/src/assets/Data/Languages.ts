export type Direction = 'native' | 'learned';

// Definieer de types voor de taalstructuur
export type LanguageConfig = {
   code: string;
   direction: Direction;
   label: string;
   flag?: string;
   locale: string;
   dialect: string;
};

export const DEFAULT_LANGUAGE = 'pt';

export const LANGUAGES: Record<string, LanguageConfig> = {
   pt: {
      code: 'pt',
      label: 'Europeu',
      direction: 'learned',
      flag: '/images/flags/pt.svg',
      locale: 'pt-PT',
      dialect: 'Português europeu de Coimbra',
   },
   br: {
      code: 'br',
      label: 'Brasileiro',
      direction: 'learned',
      flag: '/images/flags/br.svg',
      locale: 'pt-BR',
      dialect: 'Português Brasileiro de Rio de Janeiro',
   },
   nl: {
      code: 'nl',
      label: 'Nederlands',
      direction: 'native',
      flag: '/images/flags/nl.svg',
      locale: 'nl-NL',
      dialect: 'algemeen beschaafd Nederlands',
   },
   uk: {
      code: 'uk',
      label: 'English (UK)',
      direction: 'native',
      flag: '/images/flags/gb.svg',
      locale: 'en-GB',
      dialect: 'Cambridge English',
   },
};
