-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(6, 'cloze-click-test', 'Acabar, terminar, parar ou desistir', 'Aprenda a falar sobre o fim de ações, atividades e situações.');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (21, 'grammar', 'A1', 'Acabar, terminar, parar ou desistir', 'Aprenda a falar sobre o fim de ações, atividades e situações.', '{portuguese.png}');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (21, 1, 'cloze', 6);

SELECT "Cloze"."AddSentence"(
  6, 1, 
    ARRAY['O filme ',' às onze da noite'],
    '[{
          "language": "NL",
          "text": "De film eindigde om elf uur ''s avonds."
      }]'::jsonb,
    '[{
          "correct": "acaba",
          "alt": ["termina", "para", "desiste"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 2, 
    ARRAY['Eu preciso de ',' este trabalho antes de ir para casa.'],
    '[{
          "language": "NL",
          "text": "Ik moet dit werk afmaken voordat ik naar huis ga."
      }]'::jsonb,
    '[{
          "correct": "terminar",
          "alt": ["acabar", "parar", "desistir"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 3, 
    ARRAY[' ',' de falar! Estou a tentar estudar.'],
    '[{
          "language": "NL",
          "text": "Stop met praten! Ik probeer te studeren."
      }]'::jsonb,
    '[{
          "correct": "Para",
          "alt": ["Acaba", "Desiste", "Termina"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 4, 
    ARRAY['Depois de três horas a tentar abrir a porta ele ','.'],
    '[{
          "language": "NL",
          "text": "Na drie uur proberen de deur te openen gaf hij op."
      }]'::jsonb,
    '[{
          "correct": "desistiu",
          "alt": ["parou", "acabou", "terminou"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 5, 
    ARRAY['O presidente ',' a reunião, por isso podemos ir embora.'],
    '[{
          "language": "NL",
          "text": "De voorzitter beëindigde de vergadering, daarom kunnen we weggaan."
      }]'::jsonb,
    '[{
          "correct": "terminou",
          "alt": ["acabou", "parou", "desistiu"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 6, 
    ARRAY['Quando é que vais ',' de trabalhar hoje?'],
    '[{
          "language": "NL",
          "text": "Wanneer ben je vandaag klaar met werken?"
      }]'::jsonb,
    '[{
          "correct": "terminar",
          "alt": ["acabar", "parar", "desistir"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 7, 
    ARRAY['O professor pediu aos alunos para ',' de fazer barulho.'],
    '[{
          "language": "NL",
          "text": "De leraar vroeg de leerlingen om te stoppen met lawaai maken."
      }]'::jsonb,
    '[{
          "correct": "parar",
          "alt": ["acabar", "terminar", "desistir"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 8, 
    ARRAY['Ele tentou aprender chinês durante dois anos mas finalmente ','.'],
    '[{
          "language": "NL",
          "text": "Hij probeerde twee jaar Chinees te leren, maar gaf uiteindelijk op."
      }]'::jsonb,
    '[{
          "correct": "desistiu",
          "alt": ["acabou", "parou", "terminou"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 9, 
    ARRAY['O dinheiro  ',' e tivemos de voltar para casa.'],
    '[{
          "language": "NL",
          "text": "Het geld raakte op en we moesten naar huis."
      }]'::jsonb,
    '[{
          "correct": "acabou",
          "alt": ["terminou", "parou", "desistiu"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 10, 
    ARRAY['Ainda não ',' de ler o livro.'],
    '[{
          "language": "NL",
          "text": "Ik ben nog niet klaar met het lezen van het boek."
      }]'::jsonb,
    '[{
          "correct": "terminei",
          "alt": ["acabei", "parei", "desisti"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 11, 
    ARRAY['O carro ',' de repente no meio da estrada.'],
    '[{
          "language": "NL",
          "text": "De auto stopte plotseling midden op de weg."
      }]'::jsonb,
    '[{
          "correct": "parou",
          "alt": ["acabou", "terminou", "desistiu"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 12, 
    ARRAY['Não ',', estás quase a conseguir!'],
    '[{
          "language": "NL",
          "text": "Geef niet op, je bent er bijna!"
      }]'::jsonb,
    '[{
          "correct": "desistas",
          "alt": ["acabes", "pares", "termines"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 13, 
    ARRAY['Quando ',' o jantar, podemos ver um filme.'],
    '[{
          "language": "NL",
          "text": "Als we klaar zijn met eten kunnen we een film kijken."
      }]'::jsonb,
    '[{
          "correct": "acabarmos",
          "alt": ["pararmos", "terminarmos", "desistirmos"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 14, 
    ARRAY['Finalmente, ',' de chover.'],
    '[{
          "language": "NL",
          "text": "Uiteindelijk stopte het met regenen."
      }]'::jsonb,
    '[{
          "correct": "parou",
          "alt": ["acabou", "terminou", "desistiu"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 15, 
    ARRAY['Ele não conseguiu resolver o problema e ',' depois de várias tentativas.'],
    '[{
          "language": "NL",
          "text": "Hij kon het probleem niet oplossen en stopte na diverse pogingen."
      }]'::jsonb,
    '[{
          "correct": "desistiu",
          "alt": ["acabou", "parou", "terminou"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 16, 
    ARRAY['Quando chegámos, o concerto já tinha ','.'],
    '[{
          "language": "NL",
          "text": "Toen we aankwamen, was het concert al afgelopen."
      }]'::jsonb,
    '[{
          "correct": "acabado",
          "alt": ["parado", "terminado", "desistido"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 17, 
    ARRAY['Tenho de ',' este relatório hoje.'],
    '[{
          "language": "NL",
          "text": "Ik moet dit rapport vandaag afmaken."
      }]'::jsonb,
    '[{
          "correct": "terminar",
          "alt": ["acabar", "parar", "desistir"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 18, 
    ARRAY['Por favor, ',' de mexer nisso!'],
    '[{
          "language": "NL",
          "text": "Alsjeblieft, blijf daar vanaf!"
      }]'::jsonb,
    '[{
          "correct": "para",
          "alt": ["acaba", "termina", "desiste"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 19, 
    ARRAY['Nós já ',' com todas as garrafas de água.'],
    '[{
          "language": "NL",
          "text": "Wij hebben alle flessen water opgedronken."
      }]'::jsonb,
    '[{
          "correct": "acabámos",
          "alt": ["parámos", "terminámos", "desistimos"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  6, 20, 
    ARRAY['Apesar das dificuldades, ela não ',' e continuou a tentar.'],
    '[{
          "language": "NL",
          "text": "Ondanks alle moeilijkheden, gaf ze niet op en bleef ze het proberen."
      }]'::jsonb,
    '[{
          "correct": "desistiu",
          "alt": ["acabou", "parou", "terminou"],
          "hint": ""
      }]'::jsonb
  );


-- migrate:down
DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 6;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 6;

DELETE FROM "Lesson"."Exercises"
  WHERE "lessonId" = 21;

DELETE FROM "Lesson"."Lessons"
  WHERE id = 21;
