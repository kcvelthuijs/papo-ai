-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(5, 'cloze-click-test', 'Andar, passear, caminhar ou correr', 'Aprenda a falar sobre diferentes formas de se deslocar a pé.');

SELECT "Cloze"."AddSentence"(
  5, 1, 
    ARRAY['Eu ',' todos os dias durante meia hora para me manter em forma.'],
    '[{
          "language": "NL",
          "text": "Ik loop elke dag een half uur om in vorm te blijven."
      }]'::jsonb,
    '[{
          "correct": "corro",
          "alt": ["ando", "passeo", "caminho"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 2, 
    ARRAY['Aos domingos nós gostamos de ',' pelo centro da cidade sem pressa.'],
    '[{
          "language": "NL",
          "text": "Op zondagen lopen we graag rustig door het centrum van de stad."
      }]'::jsonb,
    '[{
          "correct": "passear",
          "alt": ["caminhar", "andar", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 3, 
    ARRAY['Quando vou trabalhar, normalmente ',' de autocarro.'],
    '[{
          "language": "NL",
          "text": "Als ik ga werken, neem ik meestal de bus."
      }]'::jsonb,
    '[{
          "correct": "ando",
          "alt": ["caminho", "passeo", "corro"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 4, 
    ARRAY['A minha avó gosta de ',' na praia de manhã.'],
    '[{
          "language": "NL",
          "text": "Mijn oma houdt ervan om ''s morgens op het strand te lopen."
      }]'::jsonb,
    '[{
          "correct": "caminhar",
          "alt": ["andar", "passear", "correr"],
          "hint": ""
      }]'::jsonb
  );

  SELECT "Cloze"."AddSentence"(
  5, 5, 
    ARRAY['Os miúdos estão no parque a ',' atrás da bola.'],
    '[{
          "language": "NL",
          "text": "De kinderen in het parkje rennen achter de bal aan."
      }]'::jsonb,
    '[{
          "correct": "correr",
          "alt": ["andar", "passear", "caminhar"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 6, 
    ARRAY['Gosto de ',' de barco pela costa para relaxar.'],
    '[{
          "language": "NL",
          "text": "Ik hou ervan om tot rust te komen door met de boot langs de kust te varen."
      }]'::jsonb,
    '[{
          "correct": "passear",
          "alt": ["andar", "caminhar", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 7, 
    ARRAY['Eu não tenho carro, por isso ',' muito a pé.'],
    '[{
          "language": "NL",
          "text": "Ik heb geen auto, daarom ga ik vaak te voet."
      }]'::jsonb,
    '[{
          "correct": "ando",
          "alt": ["caminho", "passeo", "corro"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 8, 
    ARRAY['Vamos ',' pelo bosque. Está um dia lindo.'],
    '[{
          "language": "NL",
          "text": "Laten we door het bos gaan. Het is prachtig weer."
      }]'::jsonb,
    '[{
          "correct": "passear",
          "alt": ["caminhar", "andar", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 9, 
    ARRAY['Quando era jovem, ele ',' cinco quilómetros todas as manhãs.'],
    '[{
          "language": "NL",
          "text": "Toen hij jong was, liep hij elke ochtend vijf kilometer."
      }]'::jsonb,
    '[{
          "correct": "corria",
          "alt": ["passeava", "andava", "caminhava"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 10, 
    ARRAY['Antes do jantar, gosto de ',' um pouco pelo bairro para fazer exercício.'],
    '[{
          "language": "NL",
          "text": "Voor het eten ga ik graag een stukje hardlopen door de buurt om te bewegen."
      }]'::jsonb,
    '[{
          "correct": "correr",
          "alt": ["passear", "andar", "caminhar"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 11, 
    ARRAY['Todos os dias de manhã, eu ',' devagar pelo parque e observo os pássaros.'],
    '[{
          "language": "NL",
           "text": "Elke ochtend loop ik rustig door het park en kijk ik naar de vogels."
      }]'::jsonb,
    '[{
          "correct": "caminho",
          "alt": ["ando", "passeio", "corro"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 12, 
    ARRAY['Ao fim de semana, gostamos de ',' junto ao rio e apreciar a paisagem.'],
    '[{
          "language": "NL",
          "text": "In het weekend lopen we graag langs de rivier en genieten we van het uitzicht."
      }]'::jsonb,
    '[{
          "correct": "passear",
          "alt": ["caminhar", "andar", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 13, 
    ARRAY['Não temos carro, por isso ',' de comboio quando vamos a Lisboa.'],
    '[{
          "language": "NL",
          "text": "We hebben geen auto, daarom gaan we met de trein als we naar Lissabon gaan."
      }]'::jsonb,
    '[{
          "correct": "andamos",
          "alt": ["caminhamos", "passeamos", "corremos"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 14, 
    ARRAY['O Pedro treina todos os dias e ',' dez quilómetros antes do trabalho.'],
    '[{
          "language": "NL",
          "text": "Pedro traint elke dag en loopt tien kilometer voordat hij gaat werken."
      }]'::jsonb,
    '[{
          "correct": "corre",
          "alt": ["anda", "passeia", "caminha"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 15, 
    ARRAY['A minha mãe gosta de ',' pelas lojas quando vai ao centro da cidade.'],
    '[{
          "language": "NL",
          "text": "Mijn moeder loopt graag langs de winkels als ze naar het stadscentrum gaat."
      }]'::jsonb,
    '[{
          "correct": "passear",
          "alt": ["caminhar", "andar", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 16, 
    ARRAY['Quando estou cansado, prefiro ',' devagar pelo parque.'],
    '[{
          "language": "NL",
          "text": "Als ik moe ben, loop ik liever rustig door het park."
      }]'::jsonb,
    '[{
          "correct": "caminhar",
          "alt": ["andar", "passear", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 17, 
    ARRAY['As crianças adoram ',' atrás umas das outras no jardim.'],
    '[{
          "language": "NL",
          "text": "De kinderen rennen graag achter elkaar aan in de tuin."
      }]'::jsonb,
    '[{
          "correct": "correr",
          "alt": ["andar", "passear", "caminhar"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 18, 
    ARRAY['Depois do almoço, vamos ',' pela aldeia para conhecer as ruas antigas.'],
    '[{
          "language": "NL",
          "text": "Na de lunch gaan we door het dorp om de oude straten te ontdekken."
      }]'::jsonb,
    '[{
          "correct": "passear",
          "alt": ["caminhar", "andar", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 19, 
    ARRAY['Durante as férias, gosto de ',' pela praia ao nascer do sol.'],
    '[{
          "language": "NL",
          "text": "Tijdens de vakantie loop ik graag langs het strand bij zonsopgang."
      }]'::jsonb,
    '[{
          "correct": "caminhar",
          "alt": ["andar", "passear", "correr"],
          "hint": ""
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
  5, 20, 
    ARRAY['Quando vou ao trabalho, ',' de metro porque é mais rápido.'],
    '[{
          "language": "NL",
          "text": "Als ik naar mijn werk ga, neem ik de metro omdat dat sneller is."
      }]'::jsonb,
    '[{
          "correct": "andar",
          "alt": ["caminhar", "passear", "correr"],
          "hint": ""
      }]'::jsonb
  );

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (20, 'grammar', 'A1', 'Andar, passear, caminhar ou correr', 'Aprenda a falar sobre diferentes formas de se deslocar a pé.', '{portuguese.png}');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (20, 1, 'cloze', 5);

-- migrate:down
DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 5;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 5;

DELETE FROM "Lesson"."Exercises"
  WHERE "lessonId" = 20;

DELETE FROM "Lesson"."Lessons"
  WHERE id = 20;

