-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(4, 'cloze-click-test', 'Gostar, adorar ou amar', 'Pratique gostar, adorar e amar para falar do que gosta e do que adora.');

SELECT "Cloze"."AddSentence"(
  4, 1, 
    ARRAY['Eu ',' ouvir música enquanto trabalho.'],
    '[{
          "language": "NL",
          "text": "Ik hou ervan om naar muziek te luisteren tijdens het werk."
      }]'::jsonb,
    '[{
          "correct": "gosto de",
          "alt": ["adoro", "amo"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 2, 
    ARRAY['A Maria ',' o seu marido.'],
    '[{
          "language": "NL",
          "text": "Maria houdt van haar echtgenoot."
      }]'::jsonb,
    '[{
          "correct": "ama",
          "alt": ["gosta de", "adora"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 3, 
    ARRAY['Nós ',' viajar para Portugal no verão.'],
    '[{
          "language": "NL",
          "text": "Wij reizen graag naar Portugal in de zomer."
      }]'::jsonb,
    '[{
          "correct": "gostamos de",
          "alt": ["adoramos", "amamos"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 4, 
    ARRAY['Os miúdos ',' jogar futebol com os amigos.'],
    '[{
          "language": "NL",
          "text": "De kinderen spelen graag voetbal met hun vrienden."
      }]'::jsonb,
    '[{
          "correct": "gostam de",
          "alt": ["adoram", "amam"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 5, 
    ARRAY['Eu ',' e quero passar o resto da minha vida contego.'],
    '[{
          "language": "NL",
          "text": "Ik hou van je en blijf de rest van mijn leven bij jou."
      }]'::jsonb,
    '[{
          "correct": "amo-te",
          "alt": ["gosto de ti", "adoro-te"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 6, 
    ARRAY['O João ',' chocolate. Ele come todos os dias!'],
    '[{
          "language": "NL",
          "text": "João houdt van chocolade. Hij eet het de hele dag!"
      }]'::jsonb,
    '[{
          "correct": "adora",
          "alt": ["gosta de", "ama"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 7, 
    ARRAY['Vocês ',' comida italiana ou preferem comida portugesa?'],
    '[{
          "language": "NL",
          "text": "Houden jullie van Italiaans eten of eten jullie liever Portugees?"
      }]'::jsonb,
    '[{
          "correct": "gostam de",
          "alt": ["adoram", "amam"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 8, 
    ARRAY['Ela ',' os seus filhos mais do que tudo no mundo.'],
    '[{
          "language": "NL",
          "text": "Ze houdt meer van haar kinderen dan van wat dan ook ter wereld."
      }]'::jsonb,
    '[{
          "correct": "ama",
          "alt": ["adora", "gosta de"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 9, 
    ARRAY['Quando era criança, eu ',' brincar na rua com os meus amigos.'],
    '[{
          "language": "NL",
          "text": "Toen ik een kind was, speelde ik graag buiten met mijn vrienden."
      }]'::jsonb,
    '[{
          "correct": "adorava",
          "alt": ["amava", "gostava de"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  4, 10, 
    ARRAY['Eles ',' aquele restaurante. Dizem que a comida é fantástica.'],
    '[{
          "language": "NL",
          "text": "Zij houden van dat restaurant. Ze zeggen dat het eten er fantastisch is."
      }]'::jsonb,
    '[{
          "correct": "adoram",
          "alt": ["amam", "gostam de"],
          "hint": ""
      }]'::jsonb
  );

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (19, 'grammar', 'A1', 'Gostar, adorar ou amar', 'Pratique gostar, adorar e amar para falar do que gosta e do que adora.', '{portuguese.png}');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (19, 1, 'cloze', 4);

-- migrate:down
DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 4;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 4;

DELETE FROM "Lesson"."Exercises"
  WHERE "lessonId" = 19;

DELETE FROM "Lesson"."Lessons"
  WHERE id = 19;


