-- migrate:up
INSERT INTO "Card"."Decks" (id, text) 
VALUES (4, 'As frutas');

SELECT "Card"."AddCardToDeck" (4, 'a maçã', 'de appel', '{flashcards,frutas}', 'maca.png');
SELECT "Card"."AddCardToDeck" (4, 'a pera', 'de peer', '{flashcards,frutas}', 'pera.png');
SELECT "Card"."AddCardToDeck" (4, 'o figo', 'de vijg', '{flashcards,frutas}', 'figo.png');
SELECT "Card"."AddCardToDeck" (4, 'a laranja', 'de sinaasappel', '{flashcards,frutas}', 'laranja.png');
SELECT "Card"."AddCardToDeck" (4, 'o limão', 'de citroen', '{flashcards,frutas}', 'limao.png');
SELECT "Card"."AddCardToDeck" (4, 'a tangerina', 'de mandarijn', '{flashcards,frutas}', 'tangerina.png');
SELECT "Card"."AddCardToDeck" (4, 'a toranja', 'de grapefruit', '{flashcards,frutas}', 'toranja.png');
SELECT "Card"."AddCardToDeck" (4, 'a lima', 'de limoen', '{flashcards,frutas}', 'lima.png');
SELECT "Card"."AddCardToDeck" (4, 'o quivi', 'de kiwi', '{flashcards,frutas}', 'quivi.png');
SELECT "Card"."AddCardToDeck" (4, 'a banana', 'de banaan', '{flashcards,frutas}', 'banana.png');
SELECT "Card"."AddCardToDeck" (4, 'o coco', 'de kokosnoot', '{flashcards,frutas}', 'coco.png');
SELECT "Card"."AddCardToDeck" (4, 'o ananás', 'de ananas', '{flashcards,frutas}', 'ananas.png');
SELECT "Card"."AddCardToDeck" (4, 'a melancia', 'de watermeloen', '{flashcards,frutas}', 'melancia.png');
SELECT "Card"."AddCardToDeck" (4, 'o melão', 'de meloen', '{flashcards,frutas}', 'melao.png');
SELECT "Card"."AddCardToDeck" (4, 'a ameixa', 'de pruim', '{flashcards,frutas}', 'ameixa.png');
SELECT "Card"."AddCardToDeck" (4, 'o pêssego', 'de perzik', '{flashcards,frutas}', 'pessego.png');
SELECT "Card"."AddCardToDeck" (4, 'o damasco', 'de abrikoos', '{flashcards,frutas}', 'damasco.png');
SELECT "Card"."AddCardToDeck" (4, 'as uvas', 'de druiven', '{flashcards,frutas}', 'uvas.png');
SELECT "Card"."AddCardToDeck" (4, 'as cerejas', 'de kersen', '{flashcards,frutas}', 'cerejas.png');
SELECT "Card"."AddCardToDeck" (4, 'as framboesas', 'de frambozen', '{flashcards,frutas}', 'framboesas.png');
SELECT "Card"."AddCardToDeck" (4, 'as amoras', 'de bramen', '{flashcards,frutas}', 'amoras.png');
SELECT "Card"."AddCardToDeck" (4, 'o morango', 'de aardbei', '{flashcards,frutas}', 'morango.png');
SELECT "Card"."AddCardToDeck" (4, 'as groselhas-negras', 'de zwarte bessen', '{flashcards,frutas}', 'groselhas-negras.png');
SELECT "Card"."AddCardToDeck" (4, 'as groselhas', 'de aalbessen', '{flashcards,frutas}', 'groselhas.png');
SELECT "Card"."AddCardToDeck" (4, 'os mirtilos', 'de blauwe bessen', '{flashcards,frutas}', 'mirtilos.png');
SELECT "Card"."AddCardToDeck" (4, 'o maracujá', 'de passievrucht', '{flashcards,frutas}', 'maracuja.png');
SELECT "Card"."AddCardToDeck" (4, 'a papaia', 'de papaja', '{flashcards,frutas}', 'papaia.png');
SELECT "Card"."AddCardToDeck" (4, 'a manga', 'de mango', '{flashcards,frutas}', 'manga.png');
SELECT "Card"."AddCardToDeck" (4, 'a romã', 'de granaatappel', '{flashcards,frutas}', 'roma.png');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (14, 'vocabulário', 'A1', 'As frutas', 'Aprende as palavras mais importantes em português para as frutas que encontras no dia a dia.', '{escritorio.png}');

INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (7, 'card-click-learn', 'As frutas', 'Aprende as palavras mais importantes em português para as frutas que encontras no dia a dia', 4)
  , (8, 'card-type-test', 'As frutas', 'Aprende as palavras mais importantes em português para as frutas que encontras no dia a dia', 4);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (14, 1, 'card', 7),
    (14, 2, 'card', 8);

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

-- migrate:down
DELETE FROM "Lesson"."Exercises" 
WHERE "lessonId" = 14;

DELETE FROM "Lesson"."Lessons"
WHERE id = 14;

DELETE FROM "Card"."Exercises" 
WHERE id BETWEEN 7 AND 8;

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));
