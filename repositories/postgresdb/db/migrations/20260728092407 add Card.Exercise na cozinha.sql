-- migrate:up
INSERT INTO "Card"."Decks" (id, text) 
VALUES (5, 'Na cozinha');

SELECT "Card"."AddCardToDeck" (5, 'a bancada', 'het aanrecht', '{flashcards,cozinha}', 'bancada.png');
SELECT "Card"."AddCardToDeck" (5, 'a tábua de cortar', 'de snijplank', '{flashcards,cozinha}', 'tabua de cortar.png');
SELECT "Card"."AddCardToDeck" (5, 'a pia', 'de gootsteen', '{flashcards,cozinha}', 'pia.png');
SELECT "Card"."AddCardToDeck" (5, 'o armário', 'de keukenkast', '{flashcards,cozinha}', 'armario.png');
SELECT "Card"."AddCardToDeck" (5, 'o exaustor', 'de afzuigkap', '{flashcards,cozinha}', 'exaustor.png');
SELECT "Card"."AddCardToDeck" (5, 'o fogão', 'het fornuis', '{flashcards,cozinha}', 'fogao.png');
SELECT "Card"."AddCardToDeck" (5, 'o forno', 'de oven', '{flashcards,cozinha}', 'forno.png');
SELECT "Card"."AddCardToDeck" (5, 'o frigorifico', 'de koelkast', '{flashcards,cozinha}', 'frigorifico.png');
SELECT "Card"."AddCardToDeck" (5, 'o micro-ondas', 'de magnetron', '{flashcards,cozinha}', 'micro-ondas.png');
SELECT "Card"."AddCardToDeck" (5, 'a máquina de lava louça', 'de vaatwasser', '{flashcards,cozinha}', 'lava-louça.png');
SELECT "Card"."AddCardToDeck" (5, 'a frigideira', 'de koekenpan', '{flashcards,cozinha}', 'frigideira.png');
SELECT "Card"."AddCardToDeck" (5, 'a panela', 'de kookpan', '{flashcards,cozinha}', 'panela.png');
SELECT "Card"."AddCardToDeck" (5, 'o tacho', 'de braadpan', '{flashcards,cozinha}', 'tacho.png');
SELECT "Card"."AddCardToDeck" (5, 'a assadeira', 'de ovenschaal', '{flashcards,cozinha}', 'assadeira.png');
SELECT "Card"."AddCardToDeck" (5, 'o tabuleiro de forno', 'de bakplaat', '{flashcards,cozinha}', 'tabuleiro de forno.png');
SELECT "Card"."AddCardToDeck" (5, 'a torradeira', 'de broodrooster', '{flashcards,cozinha}', 'torradeira.png');
SELECT "Card"."AddCardToDeck" (5, 'a balança de cozinha', 'de keukenweegschaal', '{flashcards,cozinha}', 'balanca de cozinha.png');
SELECT "Card"."AddCardToDeck" (5, 'a chaleira', 'de waterkoker', '{flashcards,cozinha}', 'chaleira.png');
SELECT "Card"."AddCardToDeck" (5, 'o coador', 'het vergiet', '{flashcards,cozinha}', 'coador.png');
SELECT "Card"."AddCardToDeck" (5, 'a peneira', 'de zeef', '{flashcards,cozinha}', 'peneira.png');
SELECT "Card"."AddCardToDeck" (5, 'o ralador', 'de rasp', '{flashcards,cozinha}', 'ralador.png');
SELECT "Card"."AddCardToDeck" (5, 'o batador de arame', 'de garde', '{flashcards,cozinha}', 'batador de arame.png');
SELECT "Card"."AddCardToDeck" (5, 'a escumadeira', 'de schuimspaan', '{flashcards,cozinha}', 'escumadeira.png');
SELECT "Card"."AddCardToDeck" (5, 'a espátula', 'de spatel', '{flashcards,cozinha}', 'espatula.png');
SELECT "Card"."AddCardToDeck" (5, 'o avental', 'het schort', '{flashcards,cozinha}', 'avental.png');
SELECT "Card"."AddCardToDeck" (5, 'as luvas de forno', 'de ovenwanten', '{flashcards,cozinha}', 'luvas de forno.png');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (15, 'vocabulário', 'A1', 'Na cozinha', 'Aprende o vocabulário essencial dos objetos que encontras numa cozinha.', '{cozinha.png}');

INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (9, 'card-click-learn', 'Na cozinha', 'Aprende o vocabulário essencial dos objetos que encontras numa cozinha.', 5)
  , (10, 'card-type-test', 'Na cozinha', 'Aprende o vocabulário essencial dos objetos que encontras numa cozinha.', 5);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (15, 1, 'card', 9),
    (15, 2, 'card', 10);

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

-- migrate:down
DELETE FROM "Lesson"."Exercises" 
WHERE "lessonId" = 15;

DELETE FROM "Lesson"."Lessons"
WHERE id = 15;

DELETE FROM "Card"."Exercises" 
WHERE id BETWEEN 9 AND 10;

DELETE FROM "Card"."Decks"
WHERE id = 5;

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));
