-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(8, 'cloze-click-test', 'Presente do indicativo:\nVerbos regulares em -ar', 'Aprende a conjugar os verbos regulares terminados em -ar no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image, state ) 
VALUES (23, 'grammar', 'A1', 'Presente do indicativo: Verbos regulares em -ar', 'Aprende a conjugar os verbos regulares terminados em -ar no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.', '{portuguese.png}', 'P');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (23, 1, 'cloze', 8);

SELECT "Cloze"."AddSentence"(
    8, 1,
    ARRAY['Todos os dias, Maria ', ' muito a sua família.' ],
    '[{
        "language": "NL",
        "text": "Elke dag houdt Maria heel veel van haar familie."
      }]'::jsonb,
    '[{
        "correct": "ama",
        "alt": ["amo", "amas", "amamos", "amam"],
        "hint": "amar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 2,
    ARRAY['Na reunião, o diretor ', ' sobre os novos planos.' ],
    '[{
        "language": "NL",
        "text": "Tijdens de vergadering praat de directeur over de nieuwe plannen."
      }]'::jsonb,
    '[{
        "correct": "fala",
        "alt": ["falo", "falas", "falamos", "falam"],
        "hint": "falar (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 3,
    ARRAY['Depois do trabalho, nós ', ' português juntos.' ],
    '[{
        "language": "NL",
        "text": "Na het werk studeren we samen Portugees."
      }]'::jsonb,
    '[{
        "correct": "estudamos",
        "alt": ["estudo", "estudas", "estuda", "estudam"],
        "hint": "estudar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 4,
    ARRAY['Nas festas, os meus amigos ', ' sempre muito alto.' ],
    '[{
        "language": "NL",
        "text": "Op feestjes zingen mijn vrienden altijd heel hard."
      }]'::jsonb,
    '[{
        "correct": "cantam",
        "alt": ["canto", "cantas", "canta", "cantamos"],
        "hint": "cantar (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 5,
    ARRAY['Eu ', ' os meus filhos mais do que tudo.' ],
    '[{
        "language": "NL",
        "text": "Ik hou meer van mijn kinderen dan van wat dan ook."
      }]'::jsonb,
    '[{
        "correct": "amo",
        "alt": ["amas", "ama", "amamos", "amam"],
        "hint": "amar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 6,
    ARRAY['Quando encontra os amigos, Ana ', ' sempre sobre o trabalho.' ],
    '[{
        "language": "NL",
        "text": "Wanneer Ana haar vrienden ontmoet, praat ze altijd over haar werk."
      }]'::jsonb,
    '[{
        "correct": "fala",
        "alt": ["falo", "falas", "falamos", "falam"],
        "hint": "falar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 7,
    ARRAY['Antes dos exames, vocês ', ' durante várias horas.' ],
    '[{
        "language": "NL",
        "text": "Voor de examens studeren jullie meerdere uren."
      }]'::jsonb,
    '[{
        "correct": "estudam",
        "alt": ["estudo", "estudas", "estuda", "estudamos"],
        "hint": "estudar (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 8,
    ARRAY['No carro, ', ' as nossas músicas favoritas.' ],
    '[{
        "language": "NL",
        "text": "In de auto zingen we onze favoriete liedjes."
      }]'::jsonb,
    '[{
        "correct": "cantamos",
        "alt": ["canto", "cantas", "canta", "cantam"],
        "hint": "cantar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 9,
    ARRAY['O Pedro ', ' muito bem a sua namorada.' ],
    '[{
        "language": "NL",
        "text": "Pedro houdt heel veel van zijn vriendin."
      }]'::jsonb,
    '[{
        "correct": "ama",
        "alt": ["amo", "amas", "amamos", "amam"],
        "hint": "amar (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 10,
    ARRAY['Durante o jantar, ', ' sobre os nossos planos para o fim de semana.' ],
    '[{
        "language": "NL",
        "text": "Tijdens het eten praten we over onze plannen voor het weekend."
      }]'::jsonb,
    '[{
        "correct": "falamos",
        "alt": ["falo", "falas", "fala", "falam"],
        "hint": "falar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 11,
    ARRAY['Todos os dias, eu ', ' de bicicleta até ao trabalho.' ],
    '[{
        "language": "NL",
        "text": "Elke dag fiets ik naar mijn werk."
      }]'::jsonb,
    '[{
        "correct": "ando",
        "alt": ["andas", "anda", "andamos", "andam"],
        "hint": "andar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 12,
    ARRAY['No parque, as crianças ', ' com os amigos.' ],
    '[{
        "language": "NL",
        "text": "In het park spelen de kinderen met hun vrienden."
      }]'::jsonb,
    '[{
        "correct": "brincam",
        "alt": ["brinco", "brincas", "brinca", "brincamos"],
        "hint": "brincar (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 13,
    ARRAY['O comboio ', ' à estação às oito horas.' ],
    '[{
        "language": "NL",
        "text": "De trein komt om acht uur aan op het station."
      }]'::jsonb,
    '[{
        "correct": "chega",
        "alt": ["chego", "chegas", "chegamos", "chegam"],
        "hint": "chegar (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 14,
    ARRAY['Depois do trabalho, nós ', ' de descansar em casa.' ],
    '[{
        "language": "NL",
        "text": "Na het werk rusten we graag thuis uit."
      }]'::jsonb,
    '[{
        "correct": "gostamos",
        "alt": ["gosto", "gostas", "gosta", "gostam"],
        "hint": "gostar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 15,
    ARRAY['Aos domingos, ', ' pelo centro da cidade.' ],
    '[{
        "language": "NL",
        "text": "Op zondag wandelen we door het stadscentrum."
      }]'::jsonb,
    '[{
        "correct": "andamos",
        "alt": ["ando", "andas", "anda", "andam"],
        "hint": "andar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 16,
    ARRAY['Durante as férias, o meu filho ', ' muito no jardim.' ],
    '[{
        "language": "NL",
        "text": "Tijdens de vakantie speelt mijn zoon veel in de tuin."
      }]'::jsonb,
    '[{
        "correct": "brinca",
        "alt": ["brinco", "brincas", "brincamos", "brincam"],
        "hint": "brincar (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 17,
    ARRAY['Normalmente, vocês ', ' a casa antes das seis.' ],
    '[{
        "language": "NL",
        "text": "Normaal komen jullie voor zes uur thuis."
      }]'::jsonb,
    '[{
        "correct": "chegam",
        "alt": ["chego", "chegas", "chega", "chegamos"],
        "hint": "chegar (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 18,
    ARRAY['Eu ', ' muito de música brasileira.' ],
    '[{
        "language": "NL",
        "text": "Ik hou erg van Braziliaanse muziek."
      }]'::jsonb,
    '[{
        "correct": "gosto",
        "alt": ["gostas", "gosta", "gostamos", "gostam"],
        "hint": "gostar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 19,
    ARRAY['Quando está bom tempo, Maria ', ' muito a pé.' ],
    '[{
        "language": "NL",
        "text": "Wanneer het mooi weer is, loopt Maria veel."
      }]'::jsonb,
    '[{
        "correct": "anda",
        "alt": ["ando", "andas", "andamos", "andam"],
        "hint": "andar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 20,
    ARRAY['Os meus amigos ', ' de jogar futebol depois da escola.' ],
    '[{
        "language": "NL",
        "text": "Mijn vrienden spelen graag voetbal na school."
      }]'::jsonb,
    '[{
        "correct": "gostam",
        "alt": ["gosto", "gostas", "gosta", "gostamos"],
        "hint": "gostar (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 21,
    ARRAY['Ao sábado, nós ', ' fruta fresca no mercado.' ],
    '[{
        "language": "NL",
        "text": "Op zaterdag kopen we vers fruit op de markt."
      }]'::jsonb,
    '[{
        "correct": "compramos",
        "alt": ["compro", "compras", "compra", "compram"],
        "hint": "comprar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 22,
    ARRAY['Depois da escola, os rapazes ', ' futebol no parque.' ],
    '[{
        "language": "NL",
        "text": "Na school spelen de jongens voetbal in het park."
      }]'::jsonb,
    '[{
        "correct": "jogam",
        "alt": ["jogo", "jogas", "joga", "jogamos"],
        "hint": "jogar (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 23,
    ARRAY['Aos domingos, a minha família ', ' pelo centro da cidade.' ],
    '[{
        "language": "NL",
        "text": "Op zondag wandelt mijn familie door het stadscentrum."
      }]'::jsonb,
    '[{
        "correct": "passeia",
        "alt": ["passeio", "passeias", "passeamos", "passeiam"],
        "hint": "passear (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 24,
    ARRAY['Durante as férias, eu ', ' muito pela Europa.' ],
    '[{
        "language": "NL",
        "text": "Tijdens de vakantie reis ik veel door Europa."
      }]'::jsonb,
    '[{
        "correct": "viajo",
        "alt": ["viajas", "viaja", "viajamos", "viajam"],
        "hint": "viajar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 25,
    ARRAY['Antes do jantar, o Pedro ', ' pão e queijo.' ],
    '[{
        "language": "NL",
        "text": "Voor het avondeten koopt Pedro brood en kaas."
      }]'::jsonb,
    '[{
        "correct": "compra",
        "alt": ["compro", "compras", "compramos", "compram"],
        "hint": "comprar (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 26,
    ARRAY['Nas férias, vocês ', ' cartas com os amigos.' ],
    '[{
        "language": "NL",
        "text": "Op vakantie spelen jullie kaartspelletjes met vrienden."
      }]'::jsonb,
    '[{
        "correct": "jogam",
        "alt": ["jogo", "jogas", "joga", "jogamos"],
        "hint": "jogar (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 27,
    ARRAY['Quando temos tempo, ', ' no parque depois do almoço.' ],
    '[{
        "language": "NL",
        "text": "Als we tijd hebben, wandelen we na de lunch in het park."
      }]'::jsonb,
    '[{
        "correct": "passeamos",
        "alt": ["passeio", "passeias", "passeia", "passeiam"],
        "hint": "passear (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 28,
    ARRAY['Todos os anos, os meus pais ', ' para um país diferente.' ],
    '[{
        "language": "NL",
        "text": "Elk jaar reizen mijn ouders naar een ander land."
      }]'::jsonb,
    '[{
        "correct": "viajam",
        "alt": ["viajo", "viajas", "viaja", "viajamos"],
        "hint": "viajar (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 29,
    ARRAY['No supermercado, tu ', ' sempre os mesmos produtos.' ],
    '[{
        "language": "NL",
        "text": "In de supermarkt koop je altijd dezelfde producten."
      }]'::jsonb,
    '[{
        "correct": "compras",
        "alt": ["compro", "compra", "compramos", "compram"],
        "hint": "comprar (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 30,
    ARRAY['À tarde, ', ' futebol na praia com os nossos amigos.' ],
    '[{
        "language": "NL",
        "text": "''s Middags spelen we voetbal op het strand met onze vrienden."
      }]'::jsonb,
    '[{
        "correct": "jogamos",
        "alt": ["jogo", "jogas", "joga", "jogam"],
        "hint": "jogar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 31,
    ARRAY['Antes de responder, eu ', ' um pouco.' ],
    '[{
        "language": "NL",
        "text": "Voordat ik antwoord, denk ik even na."
      }]'::jsonb,
    '[{
        "correct": "penso",
        "alt": ["pensas", "pensa", "pensamos", "pensam"],
        "hint": "pensar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 32,
    ARRAY['A aula ', ' às nove horas.' ],
    '[{
        "language": "NL",
        "text": "De les begint om negen uur."
      }]'::jsonb,
    '[{
        "correct": "começa",
        "alt": ["começo", "começas", "começamos", "começam"],
        "hint": "começar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 33,
    ARRAY['De segunda a sexta, nós ', ' num escritório no centro.' ],
    '[{
        "language": "NL",
        "text": "Van maandag tot vrijdag werken we op een kantoor in het centrum."
      }]'::jsonb,
    '[{
        "correct": "trabalhamos",
        "alt": ["trabalho", "trabalhas", "trabalha", "trabalham"],
        "hint": "trabalhar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 34,
    ARRAY['No supermercado, Maria ', ' uma velha amiga.' ],
    '[{
        "language": "NL",
        "text": "In de supermarkt komt Maria een oude vriendin tegen."
      }]'::jsonb,
    '[{
        "correct": "encontra",
        "alt": ["encontro", "encontras", "encontramos", "encontram"],
        "hint": "encontrar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 35,
    ARRAY['Quando tenho tempo, ', ' nas próximas férias.' ],
    '[{
        "language": "NL",
        "text": "Als ik tijd heb, denk ik aan de volgende vakantie."
      }]'::jsonb,
    '[{
        "correct": "penso",
        "alt": ["pensas", "pensa", "pensamos", "pensam"],
        "hint": "pensar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 36,
    ARRAY['Depois do almoço, eles ', ' a trabalhar novamente.' ],
    '[{
        "language": "NL",
        "text": "Na de lunch beginnen ze weer te werken."
      }]'::jsonb,
    '[{
        "correct": "começam",
        "alt": ["começo", "começas", "começa", "começamos"],
        "hint": "começar (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 37,
    ARRAY['A minha irmã ', ' num hospital perto de casa.' ],
    '[{
        "language": "NL",
        "text": "Mijn zus werkt in een ziekenhuis dichtbij huis."
      }]'::jsonb,
    '[{
        "correct": "trabalha",
        "alt": ["trabalho", "trabalhas", "trabalhamos", "trabalham"],
        "hint": "trabalhar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 38,
    ARRAY['Depois de muito procurar, vocês ', ' finalmente as chaves.' ],
    '[{
        "language": "NL",
        "text": "Na lang zoeken vinden jullie eindelijk de sleutels."
      }]'::jsonb,
    '[{
        "correct": "encontram",
        "alt": ["encontro", "encontras", "encontra", "encontramos"],
        "hint": "encontrar (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 39,
    ARRAY['Quando estou sozinho, ', ' muito na minha família.' ],
    '[{
        "language": "NL",
        "text": "Als ik alleen ben, denk ik veel aan mijn familie."
      }]'::jsonb,
    '[{
        "correct": "penso",
        "alt": ["pensas", "pensa", "pensamos", "pensam"],
        "hint": "pensar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 40,
    ARRAY['Todas as manhãs, ', ' cedo para evitar o trânsito.' ],
    '[{
        "language": "NL",
        "text": "Elke ochtend beginnen we vroeg om het verkeer te vermijden."
      }]'::jsonb,
    '[{
        "correct": "começamos",
        "alt": ["começo", "começas", "começa", "começam"],
        "hint": "começar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 41,
    ARRAY['Depois do trabalho, eu ', ' para casa de autocarro.' ],
    '[{
        "language": "NL",
        "text": "Na het werk ga ik met de bus terug naar huis."
      }]'::jsonb,
    '[{
        "correct": "volto",
        "alt": ["voltas", "volta", "voltamos", "voltam"],
        "hint": "voltar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 42,
    ARRAY['Quando precisa de ajuda, Ana ', ' o irmão.' ],
    '[{
        "language": "NL",
        "text": "Wanneer Ana hulp nodig heeft, belt ze haar broer."
      }]'::jsonb,
    '[{
        "correct": "chama",
        "alt": ["chamo", "chamas", "chamamos", "chamam"],
        "hint": "chamar (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 43,
    ARRAY['Na rua, os turistas ', ' o mapa com atenção.' ],
    '[{
        "language": "NL",
        "text": "Op straat bekijken de toeristen de kaart aandachtig."
      }]'::jsonb,
    '[{
        "correct": "olham",
        "alt": ["olho", "olhas", "olha", "olhamos"],
        "hint": "olhar (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 44,
    ARRAY['Depois de experimentar o prato, nós ', ' a comida deliciosa.' ],
    '[{
        "language": "NL",
        "text": "Nadat we het gerecht hebben geprobeerd, vinden we het eten heerlijk."
      }]'::jsonb,
    '[{
        "correct": "achamos",
        "alt": ["acho", "achas", "acha", "acham"],
        "hint": "achar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 45,
    ARRAY['No trabalho, vocês ', ' computadores todos os dias.' ],
    '[{
        "language": "NL",
        "text": "Op het werk gebruiken jullie elke dag computers."
      }]'::jsonb,
    '[{
        "correct": "usam",
        "alt": ["uso", "usas", "usa", "usamos"],
        "hint": "usar (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 46,
    ARRAY['Ao fim da viagem, ', ' para casa cansados.' ],
    '[{
        "language": "NL",
        "text": "Aan het einde van de reis gaan we moe terug naar huis."
      }]'::jsonb,
    '[{
        "correct": "voltamos",
        "alt": ["volto", "voltas", "volta", "voltam"],
        "hint": "voltar (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 47,
    ARRAY['Quando chega a casa, o João ', ' a mãe.' ],
    '[{
        "language": "NL",
        "text": "Wanneer João thuiskomt, roept hij zijn moeder."
      }]'::jsonb,
    '[{
        "correct": "chama",
        "alt": ["chamo", "chamas", "chamamos", "chamam"],
        "hint": "chamar (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 48,
    ARRAY['Durante a aula, eu ', ' para o professor.' ],
    '[{
        "language": "NL",
        "text": "Tijdens de les kijk ik naar de leraar."
      }]'::jsonb,
    '[{
        "correct": "olho",
        "alt": ["olhas", "olha", "olhamos", "olham"],
        "hint": "olhar (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 49,
    ARRAY['Depois de provar o bolo, as crianças ', ' que está muito bom.' ],
    '[{
        "language": "NL",
        "text": "Nadat ze de taart hebben geproefd, vinden de kinderen dat hij erg lekker is."
      }]'::jsonb,
    '[{
        "correct": "acham",
        "alt": ["acho", "achas", "acha", "achamos"],
        "hint": "achar (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    8, 50,
    ARRAY['Para escrever, tu ', ' sempre uma caneta azul.' ],
    '[{
        "language": "NL",
        "text": "Om te schrijven gebruik je altijd een blauwe pen."
      }]'::jsonb,
    '[{
        "correct": "usas",
        "alt": ["uso", "usa", "usamos", "usam"],
        "hint": "usar (tu)"
      }]'::jsonb
);

-- migrate:down
DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 8;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 8;

DELETE FROM "Lesson"."Exercises"
  WHERE "lessonId" = 23;

DELETE FROM "Lesson"."Lessons"
  WHERE id = 23;
