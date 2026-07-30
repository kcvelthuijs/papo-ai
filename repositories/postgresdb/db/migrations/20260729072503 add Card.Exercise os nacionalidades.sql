-- migrate:up
INSERT INTO "Card"."Decks" (id, text) 
VALUES (6, 'Nacionalidades');

SELECT "Card"."AddCardToDeck" (6, 'Sou português.', 'Ik ben Portugees.', '{flashcards,nacionalidades}', 'portugues.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou portuguesa.', 'Ik ben Portugese.', '{flashcards,nacionalidades}', 'portuguesa.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou brasileiro.', 'Ik ben Braziliaan.', '{flashcards,nacionalidades}', 'brazileiro.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou brasileira.', 'Ik ben Braziliaanse.', '{flashcards,nacionalidades}', 'brazileira.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou espanhol.', 'Ik ben Spanjaard.', '{flashcards,nacionalidades}', 'espanhol.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou espanhola.', 'Ik ben Spaanse.', '{flashcards,nacionalidades}', 'espanhola.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou inglês.', 'Ik ben Engelsman.', '{flashcards,nacionalidades}', 'ingles.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou inglesa.', 'Ik ben Engelse.', '{flashcards,nacionalidades}', 'inglesa.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou francês.', 'Ik ben Fransman.', '{flashcards,nacionalidades}', 'frances.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou francesa.', 'Ik ben Française.', '{flashcards,nacionalidades}', 'francesa.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou belga.', 'Ik ben Belg.', '{flashcards,nacionalidades}', 'belga (m).png');
SELECT "Card"."AddCardToDeck" (6, 'Sou belga.', 'Ik ben Belgische.', '{flashcards,nacionalidades}', 'belga (f).png');

SELECT "Card"."AddCardToDeck" (6, 'Sou alemão.', 'Ik ben Duitser.', '{flashcards,nacionalidades}', 'alemao.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou alemã.', 'Ik ben Duitse.', '{flashcards,nacionalidades}', 'alema.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou neerlandês.', 'Ik ben Nederlander.', '{flashcards,nacionalidades}', 'neerlandes.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou neerlandesa.', 'Ik ben Nederlandse.', '{flashcards,nacionalidades}', 'neerlandesa.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou italiano.', 'Ik ben Italiaan.', '{flashcards,nacionalidades}', 'italiano.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou italiana.', 'Ik ben Italiaanse.', '{flashcards,nacionalidades}', 'italiana.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou sueco.', 'Ik ben Zweed.', '{flashcards,nacionalidades}', 'sueco.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou sueca.', 'Ik ben Zweedse.', '{flashcards,nacionalidades}', 'sueca.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou marroquino.', 'Ik ben Marokkaan.', '{flashcards,nacionalidades}', 'marroquin.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou marroquina.', 'Ik ben Marokkaanse.', '{flashcards,nacionalidades}', 'marroquina.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou japonês.', 'Ik ben Japanner.', '{flashcards,nacionalidades}', 'japones.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou japonesa.', 'Ik ben Japanse.', '{flashcards,nacionalidades}', 'japonesa.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou chinês.', 'Ik ben Chinees.', '{flashcards,nacionalidades}', 'chines.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou chinesa.', 'Ik ben Chinese.', '{flashcards,nacionalidades}', 'chinesa.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou americano.', 'Ik ben Amerikaan.', '{flashcards,nacionalidades}', 'americano.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou americana.', 'Ik ben Amerikaanse.', '{flashcards,nacionalidades}', 'americana.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou canadiano.', 'Ik ben Canadees.', '{flashcards,nacionalidades}', 'canadiano.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou canadiana.', 'Ik ben Canadese.', '{flashcards,nacionalidades}', 'canadiana.png');

SELECT "Card"."AddCardToDeck" (6, 'Sou australiano.', 'Ik ben Australiër.', '{flashcards,nacionalidades}', 'australiano.png');
SELECT "Card"."AddCardToDeck" (6, 'Sou australiana.', 'Ik ben Australische.', '{flashcards,nacionalidades}', 'australiana.png');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (16, 'vocabulário', 'A1', 'Nacionalidades', 'Aprende a dizer a nacionalidade em português europeu. Pratica as formas masculina e feminina das nacionalidades mais comuns e ganha confiança para te apresentares..', '{nacionalidades.png}');

INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (11, 'card-click-learn', 'Nacionalidades', 'Aprende a dizer a nacionalidade em português europeu. Pratica as formas masculina e feminina das nacionalidades mais comuns e ganha confiança para te apresentares..', 6)
  , (12, 'card-type-test', 'Nacionalidades', 'Aprende a dizer a nacionalidade em português europeu. Pratica as formas masculina e feminina das nacionalidades mais comuns e ganha confiança para te apresentares..', 6);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (16, 1, 'card',11),
    (16, 2, 'card', 12);

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

-- migrate:down
DELETE FROM "Lesson"."Exercises" 
WHERE "lessonId" = 16;

DELETE FROM "Lesson"."Lessons"
WHERE id = 16;

DELETE FROM "Card"."Exercises" 
WHERE id BETWEEN 11 AND 12;

DELETE FROM "Card"."Decks"
WHERE id = 6;

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

