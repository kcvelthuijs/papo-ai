-- migrate:up
INSERT INTO "Chat"."Scenes" ( "exerciseId", "sequenceNumber", title, prompt, "completionRules" )
VALUES ( 1, 1, 'Nome'
    , 'Doel: Maak kennis.
        Instructies:
        - Stel jezelf alleen voor met je voornaam. 
        - Vraag dan naar de naam van de ander.
        - Kom erachter of de ander een man of een vrouw is zonder dat expliciet te vragen
        - Vraag daarna naar de leeftijd.
        - Stel nog geen andere vragen.'
    , '[
    {
    "key": "saudação",
    "description": "hallo",
    "alternatives": ["olá","bom dia","boa tarde","boa noite", "tudo bem", "como estás", "como está", "muito prazer", "conhecer-te"]
    },
    {
    "key": "nome",
    "description": "naam",
    "alternatives": ["chamo-me", "o meu nome", "sou o", "sou a"]
    },
    {
    "key": "idade",
    "description": "leeftijd",
    "alternatives": ["idade","anos"]
    }]'::jsonb)
, ( 1, 2, 'Origem'
    , 'Doel: weet waar de ander vandaan komt.
        Instructies:
        - Vraag waar de ander vandaan komt.
        - Vraag waar hij of zij nu woont.
        - Vraag naar de nationaliteit
        - Vraag eventueel 1 keer door.
        Praat nog niet over werk of studie.'
    , '[
    {
    "key": "nacionalidade",
    "description": "nationaliteit",
    "alternatives": ["o meu nacionalidade"]
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
    }]'::jsonb)
        
    , ( 1, 3, 'Familia'
    , 'Doel: Leer de gezinssituatie kennen.
        Instructies:
        - Vraag of de ander getrouwd is of getrouwd is geweest.
        - Vraag of de ander kinderen heeft.
        - Vraag eventueel naar de leeftijd van de kinderen.
        Vertel kort over je eigen gezin.'
    ,'[
    {
    "key": "estado civil",
    "description": "thuissituatie",
    "alternatives": ["casado", "casada", "divorsado", "divorsada", "solteiro", "solteira", "viuvo", "viuva", "separado", "separada", "un namorado", "un namorada", "complicado"]
    },
    {
    "key": "filhos",
    "description": "kinderen",
    "alternatives": ["filho", "filha", "filhos"]
    }]'::jsonb)

    , ( 1, 4, 'Trabalho'
    , 'Doel: Praat over het werk
        Instructies:
        - Vraag het beroep
        - Informeer naar de werkgever of het een groot bedrijf is
        - Hoe de ander naar het werk reist
        Vertel ook iets over je eigen werk.'
    , '[
    { 
    "key": "profissão",
    "description": "werksituatie",
    "alternatives": ["profissão", "ocupação", "trabalho como", "trabalhei como", "reformado", "reformada", "aposentado", "aposentada", "retirado", "retirada", "pensionista"]
    },
    {
    "key": "empregador",
    "description": "werkgever",
    "alternatives": ["empregador", "empregadora", "empresa", "negócio", "companhia", "corporação", "patrão", "chefe"]
    },
    {
    "key": "deslocamento",
    "description": "woon/werk verkeer",
    "alternatives": ["partir da casa", "carro", "autocarro", "bicicleta", "a pé", "metro", "comboio"]
    }]'::jsonb)

    , ( 1, 5, 'Passatempos'
    , 'Doel: praat over hobby''s
        Instructies:
        - Vraag naar hobby''s zoals: sport, lezen, film, muziek, uitgaan.
        - Vraag door als de ander enthousiast lijkt.
        Vertel ook over je eigen hobbies.'
    ,'[
    {
    "key": "passatempos",
    "description": "hobbies",
    "alternatives": ["filme", "música", "tocar de", "de cozinhar", "de viajar", "de nadar", "meu hobby", "tempos livres", "meus hobbies", "practico", "faço"]
    }]'::jsonb)

    , (1, 6, 'Portugal'
    , 'Doel: Praat over Portugal en waarom de ander Portugees wil leren.
        Instructies:
        - Vraag of de ander in Portugal is geweest en, zo ja, wanneer
        - Vraag waar hij/zij geweest is en wat hij/zij daar gedaan heeft
        - Vraag wat er zo leuk is aan Portugal
        Vul aan met eigen ervaringen en persoonlijke tips.'
    ,'[
    {
    "key": "cidades",
    "description": "welke steden heb je al gezien?",
    "alternatives": ["Lisboa", "Porto", "Faro", "Algarve", "Coimbra", "Setúbal", "Funcal", "Madeira", "Açores", "Delgado", "Mafra", "Braga", "Guimarães", "Tomar"]
    },
    {
    "key": "visitas",
    "description": "hoe vaak was je al in Portugal",
    "alternatives": ["nunca", "vez", "vezes", "visitas"]
    },
    {
    "key": "gosto em Portugal",
    "description": "waarom kom je naar Portugal?",
    "alternatives": ["tempo", "cidades", "histórica", "históricas", "praias", "praia", "trabalho", "relaxante"]
    }]'::jsonb);

-- migrate:down
DELETE FROM "Chat"."Scenes";
