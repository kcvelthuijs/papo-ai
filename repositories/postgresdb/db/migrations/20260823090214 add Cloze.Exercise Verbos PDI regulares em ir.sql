-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description, state) VALUES 
(7, 'cloze-click-test', 'Presente do indicativo:\nVerbos regulares em -ir', 'Aprende a conjugar os verbos regulares terminados em -ir no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.', 'P');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (22, 'grammar', 'A1', 'Presente do indicativo: Verbos regulares em -ir', 'Aprende a conjugar os verbos regulares terminados em -ir no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.', '{portuguese.png}');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (22, 1, 'cloze', 7);

SELECT "Cloze"."AddSentence"(
    7, 1,
    ARRAY['Todos os dias, eu ', ' cedo para o trabalho.' ],
    '[{
        "language": "nl",
        "text": "Elke dag vertrek ik vroeg naar mijn werk."
      }]'::jsonb,
    '[{
        "correct": "parto",
        "alt": ["partes", "parte", "partimos", "partem"],
        "hint": "partir (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 2,
    ARRAY['Os atletas ', ' rapidamente quando ouvem o sinal.' ],
    '[{
        "language": "nl",
        "text": "De atleten handelen snel wanneer ze het signaal horen."
      }]'::jsonb,
    '[{
        "correct": "agem",
        "alt": ["ajo", "ages", "age", "agimos"],
        "hint": "agir (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 3,
    ARRAY['Antes de dormir, Maria ', ' a janela.' ],
    '[{
        "language": "nl",
        "text": "Voor het slapen gaan opent Maria het raam."
      }]'::jsonb,
    '[{
        "correct": "abre",
        "alt": ["abro", "abres", "abrimos", "abrem"],
        "hint": "abrir (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 4,
    ARRAY['À noite, nós ', ' televisão depois do jantar.' ],
    '[{
        "language": "nl",
        "text": "''s Avonds kijken we na het eten televisie."
      }]'::jsonb,
    '[{
        "correct": "assistimos",
        "alt": ["assisto", "assistes", "assiste", "assistem"],
        "hint": "assistir (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 5,
    ARRAY['O professor ', ' os exercícios dos alunos.' ],
    '[{
        "language": "nl",
        "text": "De leraar corrigeert de oefeningen van de leerlingen."
      }]'::jsonb,
    '[{
        "correct": "corrige",
        "alt": ["corrijo", "corriges", "corrigimos", "corrigem"],
        "hint": "corrigir (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 6,
    ARRAY['Depois do almoço, vocês ', ' para casa.' ],
    '[{
        "language": "nl",
        "text": "Na de lunch vertrekken jullie naar huis."
      }]'::jsonb,
    '[{
        "correct": "partem",
        "alt": ["parto", "partes", "parte", "partimos"],
        "hint": "partir (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 7,
    ARRAY['Quando há um problema, Ana ', ' imediatamente.' ],
    '[{
        "language": "nl",
        "text": "Wanneer er een probleem is, handelt Ana onmiddellijk."
      }]'::jsonb,
    '[{
        "correct": "age",
        "alt": ["ajo", "ages", "agimos", "agem"],
        "hint": "agir (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 8,
    ARRAY['Todas as manhãs, ', ' as cortinas do quarto.' ],
    '[{
        "language": "nl",
        "text": "Elke ochtend openen wij de gordijnen van de slaapkamer."
      }]'::jsonb,
    '[{
        "correct": "abrimos",
        "alt": ["abro", "abres", "abre", "abrem"],
        "hint": "abrir (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 9,
    ARRAY['No fim de semana, Pedro e Carla ', ' a um filme em casa.' ],
    '[{
        "language": "nl",
        "text": "In het weekend kijken Pedro en Carla thuis naar een film."
      }]'::jsonb,
    '[{
        "correct": "assistem",
        "alt": ["assisto", "assistes", "assiste", "assistimos"],
        "hint": "assistir (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 10,
    ARRAY['Na escola, os professores ', ' os textos dos alunos.' ],
    '[{
        "language": "nl",
        "text": "Op school corrigeren de leraren de teksten van de leerlingen."
      }]'::jsonb,
    '[{
        "correct": "corrigem",
        "alt": ["corrijo", "corriges", "corrige", "corrigimos"],
        "hint": "corrigir (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 11,
    ARRAY['Depois do jantar, nós ', ' a um filme na televisão.' ],
    '[{
        "language": "nl",
        "text": "Na het eten kijken we naar een film op televisie."
      }]'::jsonb,
    '[{
        "correct": "assistimos",
        "alt": ["assisto", "assistes", "assiste", "assistem"],
        "hint": "assistir (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 12,
    ARRAY['Depois de muita conversa, eles ', ' ficar em casa.' ],
    '[{
        "language": "nl",
        "text": "Na veel overleg besluiten zij thuis te blijven."
      }]'::jsonb,
    '[{
        "correct": "decidem",
        "alt": ["decido", "decides", "decide", "decidimos"],
        "hint": "decidir (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 13,
    ARRAY['Para o aniversário, as crianças ', ' os desenhos com lápis de cera.' ],
    '[{
        "language": "nl",
        "text": "Voor de verjaardag kleuren de kinderen de tekeningen met waskrijt."
      }]'::jsonb,
    '[{
        "correct": "colorem",
        "alt": ["coloro", "colores", "colore", "colorimos"],
        "hint": "colorir (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 14,
    ARRAY['Todos os dias, meu pai ', ' até o trabalho.' ],
    '[{
        "language": "nl",
        "text": "Elke dag rijdt mijn vader naar zijn werk."
      }]'::jsonb,
    '[{
        "correct": "dirige",
        "alt": ["dirijo", "diriges", "dirigimos", "dirigem"],
        "hint": "dirigir (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 15,
    ARRAY['Durante a reunião, eu ', ' não participar do projeto.' ],
    '[{
        "language": "nl",
        "text": "Tijdens de vergadering besluit ik niet aan het project deel te nemen."
      }]'::jsonb,
    '[{
        "correct": "decido",
        "alt": ["decides", "decide", "decidimos", "decidem"],
        "hint": "decidir (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 16,
    ARRAY['No domingo, vocês ', ' um programa de esportes.' ],
    '[{
        "language": "nl",
        "text": "Op zondag kijken jullie naar een sportprogramma."
      }]'::jsonb,
    '[{
        "correct": "assistem",
        "alt": ["assisto", "assistes", "assiste", "assistimos"],
        "hint": "assistir (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 17,
    ARRAY['Na aula de arte, eu ', ' uma paisagem bonita.' ],
    '[{
        "language": "nl",
        "text": "Tijdens de tekenles kleur ik een mooi landschap."
      }]'::jsonb,
    '[{
        "correct": "coloro",
        "alt": ["colores", "colore", "colorimos", "colorem"],
        "hint": "colorir (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 18,
    ARRAY['A minha irmã ', ' o carro com muito cuidado.' ],
    '[{
        "language": "nl",
        "text": "Mijn zus rijdt heel voorzichtig met de auto."
      }]'::jsonb,
    '[{
        "correct": "dirige",
        "alt": ["dirijo", "diriges", "dirigimos", "dirigem"],
        "hint": "dirigir (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 19,
    ARRAY['No fim da reunião, ', ' sobre o próximo passo.' ],
    '[{
        "language": "nl",
        "text": "Aan het einde van de vergadering besluiten wij over de volgende stap."
      }]'::jsonb,
    '[{
        "correct": "decidimos",
        "alt": ["decido", "decides", "decide", "decidem"],
        "hint": "decidir (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 20,
    ARRAY['Durante a tarde, as meninas ', ' desenhos no caderno.' ],
    '[{
        "language": "nl",
        "text": "In de middag kleuren de meisjes tekeningen in hun schrift."
      }]'::jsonb,
    '[{
        "correct": "colorem",
        "alt": ["coloro", "colores", "colore", "colorimos"],
        "hint": "colorir (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 21,
    ARRAY['Às vezes, o João ', ' que está doente para não ir à escola.' ],
    '[{
        "language": "nl",
        "text": "Soms doet João alsof hij ziek is om niet naar school te gaan."
      }]'::jsonb,
    '[{
        "correct": "finge",
        "alt": ["finjo", "finges", "fingimos", "fingem"],
        "hint": "fingir (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 22,
    ARRAY['Os pais não ', ' que os filhos saiam sozinhos à noite.' ],
    '[{
        "language": "nl",
        "text": "De ouders staan niet toe dat hun kinderen ''s avonds alleen uitgaan."
      }]'::jsonb,
    '[{
        "correct": "permitem",
        "alt": ["permito", "permitem", "permite", "permitimos"],
        "hint": "permitir (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 23,
    ARRAY['No escritório, eu ', ' os documentos todas as manhãs.' ],
    '[{
        "language": "nl",
        "text": "Op kantoor print ik elke ochtend de documenten."
      }]'::jsonb,
    '[{
        "correct": "imprimo",
        "alt": ["imprimes", "imprime", "imprimimos", "imprimem"],
        "hint": "imprimir (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 24,
    ARRAY['Depois de pensar bastante, Maria ', ' aceitar o emprego.' ],
    '[{
        "language": "nl",
        "text": "Na lang nadenken besluit Maria de baan te accepteren."
      }]'::jsonb,
    '[{
        "correct": "decide",
        "alt": ["decido", "decides", "decidimos", "decidem"],
        "hint": "decidir (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 25,
    ARRAY['Quando estamos cansados, nós ', ' estar bem.' ],
    '[{
        "language": "nl",
        "text": "Wanneer we moe zijn, doen we soms alsof we ons goed voelen."
      }]'::jsonb,
    '[{
        "correct": "fingimos",
        "alt": ["finjo", "finges", "finge", "fingem"],
        "hint": "fingir (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 26,
    ARRAY['Durante as férias, o hotel ', ' animais de estimação nos quartos.' ],
    '[{
        "language": "nl",
        "text": "Tijdens de vakantie staat het hotel huisdieren toe in de kamers."
      }]'::jsonb,
    '[{
        "correct": "permite",
        "alt": ["permito", "permites", "permitimos", "permitem"],
        "hint": "permitir (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 27,
    ARRAY['Antes da reunião, vocês ', ' as cópias necessárias.' ],
    '[{
        "language": "nl",
        "text": "Voor de vergadering printen jullie de benodigde kopieën."
      }]'::jsonb,
    '[{
        "correct": "imprimem",
        "alt": ["imprimo", "imprimes", "imprime", "imprimimos"],
        "hint": "imprimir (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 28,
    ARRAY['Depois da conversa, ', ' ficar em casa.' ],
    '[{
        "language": "nl",
        "text": "Na het gesprek besluiten we thuis te blijven."
      }]'::jsonb,
    '[{
        "correct": "decidimos",
        "alt": ["decido", "decides", "decide", "decidem"],
        "hint": "decidir (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 29,
    ARRAY['Para impressionar os amigos, Pedro ', ' não conhecer a cidade.' ],
    '[{
        "language": "nl",
        "text": "Om indruk te maken op zijn vrienden doet Pedro alsof hij de stad niet kent."
      }]'::jsonb,
    '[{
        "correct": "finge",
        "alt": ["finjo", "finges", "fingimos", "fingem"],
        "hint": "fingir (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    7, 30,
    ARRAY['Por causa do feriado, a empresa não ', ' os funcionários trabalharem amanhã.' ],
    '[{
        "language": "nl",
        "text": "Vanwege de feestdag staat het bedrijf niet toe dat de werknemers morgen werken."
      }]'::jsonb,
    '[{
        "correct": "permite",
        "alt": ["permito", "permites", "permitimos", "permitem"],
        "hint": "permitir (ela)"
      }]'::jsonb
);

-- migrate:down
DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 7;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 7;

DELETE FROM "Lesson"."Exercises"
  WHERE "lessonId" = 22;

DELETE FROM "Lesson"."Lessons"
  WHERE id = 22;
