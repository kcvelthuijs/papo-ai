-- migrate:up
UPDATE "Chat"."Exercises" 
SET "voice" = '{ "voice": "alloy", "speech": "speak clearly, joyful, and not too fast" }'::jsonb
WHERE id = 1;


UPDATE "Chat"."Scenes"
SET "prompt" = 'Doel: Maak kennis.
        Instructies:
        - Groet en noem je alleen voornaam. 
        - Vraag dan naar de naam van de ander.
        - Kom erachter of de ander een man of een vrouw is zonder dat expliciet te vragen
        - Vraag daarna naar de leeftijd.
        - Stel nog geen andere vragen.'
WHERE "exerciseId" = 1
  AND "sequenceNumber" = 1;

UPDATE "Chat"."Scenes"
SET "prompt" = 'Doel: weet waar de ander vandaan komt.
        Instructies:
        - Vraag waar de ander vandaan komt.
        - Vraag waar hij of zij nu woont.
        - Vraag naar de nationaliteit
        - Vraag eventueel 1 keer door.
        Praat nog niet over werk of studie.',
  "completionRules" = '[
    {
    "key": "nacionalidade",
    "description": "nationaliteit",
    "alternatives": ["a minha nacionalidade", "nacionalidade"]
    },
    {
    "key": "nasci",
    "description": "origine",
    "alternatives": ["sou de", "sou da", "sou dos", "venho de", "venho da", "venho dos", "nasci", "país natal"]
    },
    {
        "key": "morar",
        "description": "woonplaats",
        "alternatives": ["moro", "morada", "casa", "localização", "domicílio", "residência"]
    }]'::jsonb
WHERE "exerciseId" = 1
  AND "sequenceNumber" = 2;

UPDATE "Chat"."Scenes"
SET "completionRules" = '[
  {
    "key": "profissão",
    "description": "werksituatie",
    "alternatives": [
      "profissão",
      "ocupação",
      "trabalho como",
      "trabalhei como",
      "reformado",
      "reformada",
      "aposentado",
      "aposentada",
      "retirado",
      "retirada",
      "pensionista"
    ]
  },
  {
    "key": "empregador",
    "description": "werkgever",
    "alternatives": [
      "empregador",
      "empregadora",
      "empresa",
      "negócio",
      "companhia",
      "corporação",
      "instituição",
      "patrão",
      "chefe"
    ]
  },
  {
    "key": "deslocamento",
    "description": "woon/werk verkeer",
    "alternatives": [
      "partir da casa",
      "carro",
      "autocarro",
      "bicicleta",
      "a pé",
      "metro",
      "comboio"
    ]
  }]'::jsonb
WHERE "exerciseId" = 1
  AND "sequenceNumber" = 4;

UPDATE "Chat"."Scenes"
SET "completionRules" = '[
  {
    "key": "cidades",
    "description": "welke steden heb je al gezien?",
    "alternatives": [
      "Lisboa",
      "Porto",
      "Faro",
      "Algarve",
      "Coimbra",
      "Setúbal",
      "Funchal",
      "Madeira",
      "Açores",
      "Delgado",
      "Mafra",
      "Braga",
      "Guimarães",
      "Tomar"
    ]
  },
  {
    "key": "visitas",
    "description": "hoe vaak was je al in Portugal",
    "alternatives": [
      "nunca",
      "vez",
      "vezes",
      "visitas"
    ]
  },
  {
    "key": "gosto em Portugal",
    "description": "waarom kom je naar Portugal?",
    "alternatives": [
      "tempo",
      "cidades",
      "histórica",
      "históricas",
      "praias",
      "praia",
      "trabalho",
      "relaxante"
    ]
  }
]'::jsonb
WHERE "exerciseId" = 1
  AND "sequenceNumber" = 6;

INSERT INTO "Chat"."Scenes" ( "exerciseId", "sequenceNumber", title, prompt, "completionRules" )
VALUES ( 1, 7, 'Despedida'
    , 'Doel: Sluit het gesprek af en neem afscheid.
        Instructies:
        - Geef aan dat je het leuk vond om kennis te maken.
        - Zeg dat je moet gaan of dat het tijd is om af te sluiten.
        - Neem op een natuurlijke manier afscheid.
        - Je kunt eventueel zeggen dat je elkaar nog eens hoopt te spreken of zien.'
    , '[
    {
    "key": "despedida",
    "description": "afscheid",
    "alternatives": ["adeus", "até logo", "até breve", "até à próxima", "até amanhã", "boa noite"]
    },
    {
    "key": "prazer",
    "description": "leuk om kennis te maken",
    "alternatives": ["muito prazer", "foi um prazer", "foi um gosto", "gostei de te conhecer", "gostei de conhecê-lo", "gostei de conhecê-la"]
    }]'::jsonb);

-- migrate:down
DELETE FROM "Chat"."Scenes" 
WHERE "exerciseId" = 1
  AND "sequenceNumber" = 7;
