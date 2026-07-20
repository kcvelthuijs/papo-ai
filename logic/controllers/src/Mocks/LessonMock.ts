import type {
  CheckClozeExercise,
  LessonSummary,
  VerbFormTable,
  OpenExercise,
  CardExercise,
} from '@workspace/dtotypes';
import type { Exercise } from '@workspace/dtotypes';

export const mockLessonSummary: LessonSummary = {
  id: '1',
  title: 'Ser presente',
  description: '',
  type: 'grammar',
  level: 'A1',
  image: 'mulher-cafe.png',
};

const verbSer: VerbFormTable = {
  infinitive: 'ser',
  tense: 'presente',
  forms: {
    p1ev: 'sou',
    p2ev: 'és',
    p3ev: 'é',
    p1mv: 'somos',
    p2mv: 'são',
    p3mv: 'são',
  },
};

export const mockVerbExercises: Exercise[] = [
  {
    id: 'ex-1',
    type: 'verb-click-learn',
    title: 'Conjugate "ser"',
    description: 'Click the correct forms',
    infinitive: verbSer.infinitive,
    forms: verbSer.forms,
  } as any,
  {
    id: 'ex-2',
    type: 'verb-click-test',
    title: 'Conjugate "ser"',
    description: 'Select the correct forms',
    infinitive: verbSer.infinitive,
    forms: verbSer.forms,
  } as any,
  {
    id: 'ex-3',
    type: 'verb-type-test',
    title: 'Conjugate "ser"',
    description: 'Type the correct forms',
    infinitive: verbSer.infinitive,
    forms: verbSer.forms,
  } as any,
];

export const mockLesson = {
  ...mockLessonSummary,
  exercises: mockVerbExercises,
};

export const mockClozeExercises: Exercise[] = [
  {
    lessonId: 1,
    seqNumber: 1,
    type: 'cloze-click-test',
    title: 'Ser ou Estar',
    description: 'Select the correct verb',
    phraseIndex: 0,
    phrases: [
      {
        id: 's3',
        textParts: ['O quadro da sala', 'limpo'],
        translation: 'Het bord in de klas is schoon',
        clozes: [{ id: 'g1', correct: 'é', alt: ['está'] }],
      },
      {
        id: 's4',
        textParts: ['O pai', 'em casa.'],
        translation: 'Vader is thuis.',
        clozes: [{ id: 'g2', correct: 'está', alt: ['é'] }],
      },
      {
        id: 's5',
        textParts: ['Os prédios', 'altos'],
        translation: 'De gebouwen zijn hoog.',
        clozes: [{ id: 'g3', correct: 'são', alt: ['estão'] }],
      },
      {
        id: 's6',
        textParts: ['O Banco', 'fechado.'],
        translation: 'De bank is gesloten.',
        clozes: [{ id: 'g4', correct: 'está', alt: ['é'] }],
      },
    ],
  } as CheckClozeExercise,
  {
    lessonId: 1,
    seqNumber: 1,
    type: 'cloze-type-test',
    title: 'Verbos regulares -er',
    description: 'Select the correct verb',
    phraseIndex: 0,
    phrases: [
      {
        id: 's1',
        textParts: ['Eu ', 'só português, mas ele', 'também francês.'],
        translation: 'Ik spreek alleen Portugees, maar hij spreekt ook Frans.',
        clozes: [
          { id: 'g1', correct: 'falo', hint: 'falar (eu)' },
          { id: 'g2', correct: 'fala', hint: 'falar (ele)' },
        ],
      },
      {
        id: 's2',
        textParts: ['Nós ', ' agora'],
        translation: 'Wij eten nu.',
        clozes: [{ id: 'g3', correct: 'comemos', hint: 'comer (nós)' }],
      },
    ],
  } as CheckClozeExercise,
];

const palavresCasaExterior = [
  {
    id: 'fi-1',
    word: 'de schoorsteen',
    translation: 'a chaminé',
    image: 'chaminé.jpg',
  },
  {
    id: 'fi-2',
    word: 'het dak',
    translation: 'o telhado',
    image: 'telhado.jpg',
  },
  {
    id: 'fi-3',
    word: 'het raam',
    translation: 'a janela',
    image: 'janela.jpg',
  },
  {
    id: 'fi-4',
    word: 'het luik',
    translation: 'a portada',
    image: 'portada.jpg',
  },
  {
    id: 'fi-5',
    word: 'de tuin',
    translation: 'o jardim',
    image: 'jardim.jpg',
  },
  {
    id: 'fi-6',
    word: 'het erf ',
    translation: 'o quintal',
    image: 'quintal.jpg',
  },
  {
    id: 'fi-7',
    word: 'het grasveld ',
    translation: 'o relvado',
    image: 'relvado.jpg',
  },
  {
    id: 'fi-8',
    word: 'het gras ',
    translation: 'a relva',
    image: 'relva.jpg',
  },
  {
    id: 'fi-9',
    word: 'de fontein',
    translation: 'a fonte',
    image: 'fonte.jpg',
  },
  {
    id: 'fi-10',
    word: 'de garage',
    translation: 'o garagem',
    image: 'garagem.jpg',
  },
  {
    id: 'fi-11',
    word: 'het bijgebouw',
    translation: 'o anexo',
    image: 'anexo.jpg',
  },
  {
    id: 'fi-12',
    word: 'het schuurtje',
    translation: 'a arrecadação',
    image: 'arrecadação.jpg',
  },
  {
    id: 'fi-13',
    word: 'de muur (buitenmuur)',
    translation: 'o muro',
    image: 'muro.jpg',
  },
  {
    id: 'fi-14',
    word: 'het hek',
    translation: 'o gradeamento',
    image: 'gradeamento.jpg',
  },
  {
    id: 'fi-15',
    word: 'de deur',
    translation: 'o porta',
    image: 'porta.jpg',
  },
  {
    id: 'fi-16',
    word: 'het pad',
    translation: 'o caminho',
    image: 'caminho.jpg',
  },
  {
    id: 'fi-17',
    word: 'de stoep',
    translation: 'o pavimento',
    image: 'pavimento.jpg',
  },
  {
    id: 'fi-18',
    word: 'de gevel',
    translation: 'a fachada',
    image: 'fachada.jpg',
  },
  {
    id: 'fi-19',
    word: 'de geveltegels',
    translation: 'os azulejos',
    image: 'azulejos.jpg',
  },
  {
    id: 'fi-20',
    word: 'het afdak',
    translation: 'a cobertura',
    image: 'cobertura.jpg',
  },
];

export const mockVocabularioExercise: Exercise[] = [
  {
    lessonId: 1,
    seqNumber: 1,
    type: 'card-type-test',
    title: 'exterior da casa',
    description: 'Nomes dos elementos da casa e do que a rodeia.',
    imageLocation: ['flashcards', 'casa', 'exterior'],
    items: palavresCasaExterior,
  } as CardExercise,
];

export const mockVocabLearnExercise: Exercise[] = [
  {
    lessonId: 1,
    seqNumber: 1,
    type: 'card-click-learn',
    title: 'exterior da casa',
    description: 'Nomes dos elementos da casa e do que a rodeia.',
    imageLocation: ['flashcards', 'casa', 'exterior'],
    items: palavresCasaExterior,
  } as CardExercise,
];

export const mockDialogExercise: OpenExercise = {
  id: '1',
  lessonId: 1,
  seqNumber: 1,
  type: 'open-dialog',
  title: 'Conhecer-se',

  description: `
Op het terras van een restaurant kom je een vrouw tegen. Als je gaat zitten spreekt ze je aan.
Het is een mooie manier om kennis te maken en je eerste zinnen Portugees te oefenen.
  `.trim(),

  prompt: `
Je heet Maria Santos da Silva, 33 jaar oud, afkomstig uit Lissabon, maar nu woonachtig in Vila do Conde bij Porto.
Je werkt als verkoopster bij Desigual in de Porto Fashion Outlet.
Je bent getrouwd met João (38) en hebt twee kinderen: Ana (3) en Pedro (5).

Doel: Een gestructureerd gesprek voeren om iemand beter te leren kennen, op een vriendelijke, geïnteresseerde en natuurlijke manier.

Gespreksstructuur:
1. Naam - Vraag naar de naam van de ander en hou oud die is.
2. Herkomst en thuissituatie - Vraag waar de persoon vandaan komt en waar hij/zij woont.
3. Vraag of hij/zij getrouwd is, vrijgezel is en kinderen heeft, hoe oud de kinderen zijn en welke nationaliteit hij/zij heeft.
4. Werk - Vraag wat de persoon doet, waar hij/zij werkt, of het een groot bedrijf is en hoe de verbinding naar het werk is.
5. Hobby’s en vrije tijd - Vraag naar sport, uitgaan, lezen, dansen of andere hobby’s.
6. Ervaringen in Portugal - Vraag wat de persoon leuk vindt aan Portugal, of hij/zij er eerder geweest is, waar precies en wat hij/zij daar deed.

Instructies:
- Stel steeds slechts één vraag tegelijk
- Reageer op antwoorden
- Maak het gesprek vloeiend
- Begin met jezelf voorstellen en stel een eerste vraag
  `.trim(),

  introduction: `Je bent een taalcoach om te leren spreken in het Portugees.
            Gebruik uitsluitend Português Europeu, geen ander dialect!
            Antwoord in hele zinnen van minder dan 50 tokens.`,

  words: ['nome', 'idade', 'naturalidade', 'trabalho', 'família', 'Portugal'],

  rubric: `
Beoordeel of de student:
- zich voorstelt
- vragen begrijpt
- correcte eenvoudige zinnen gebruikt
- logisch reageert in gesprek
  `.trim(),

  meta: {
    voice: 'alloy',
    avatar: {
      sex: 'woman',
      faceColor: '#F9C9B6',
      earSize: 'small',
      eyeStyle: 'circle',
      noseStyle: 'short',
      mouthStyle: 'laugh',
      shirtStyle: 'polo',
      glassesStyle: 'none',
      hairColor: '#7a553e',
      hairStyle: 'womanLong',
      hatStyle: 'none',
      hatColor: '#506AF4',
      shirtColor: '#80dd66',
      bgColor: '#cfdbcb',
    },
    speech: 'speak clearly, joyful, and not too fast',
    image: 'mulher-cafe.png',
  },
};
