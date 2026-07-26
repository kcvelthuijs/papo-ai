-- migrate:up
SELECT "Card"."AddCardToDeck" (3, 'a secretária', 'het bureau', '{flashcards,escritorio}', 'secretaria.png');
SELECT "Card"."AddCardToDeck" (3, 'a cadeira de escritório', 'de bureaustoel', '{flashcards,escritorio}', 'cadeira.png');
SELECT "Card"."AddCardToDeck" (3, 'o computador', 'de computer', '{flashcards,escritorio}', 'computador.png');
SELECT "Card"."AddCardToDeck" (3, 'o ecrã', 'het beeldscherm', '{flashcards,escritorio}', 'ecra.png');
SELECT "Card"."AddCardToDeck" (3, 'o teclado', 'het toetsenbord', '{flashcards,escritorio}', 'teclado.png');
SELECT "Card"."AddCardToDeck" (3, 'o rato', 'de muis', '{flashcards,escritorio}', 'rato.png');
SELECT "Card"."AddCardToDeck" (3, 'o portátil', 'de laptop', '{flashcards,escritorio}', 'portatil.png');
SELECT "Card"."AddCardToDeck" (3, 'a mala portátil', 'de laptoptas', '{flashcards,escritorio}', 'mala portatil.png');
SELECT "Card"."AddCardToDeck" (3, 'a impressora', 'de printer', '{flashcards,escritorio}', 'impressora.png');
SELECT "Card"."AddCardToDeck" (3, 'o carregador', 'de oplader', '{flashcards,escritorio}', 'carregador.png');
SELECT "Card"."AddCardToDeck" (3, 'a tomada', 'het stopcontact', '{flashcards,escritorio}', 'tomada.png');
SELECT "Card"."AddCardToDeck" (3, 'a agenda', 'de agenda', '{flashcards,escritorio}', 'agenda.jpg.png');
SELECT "Card"."AddCardToDeck" (3, 'o calendário', 'de kalender', '{flashcards,escritorio}', 'calendario.png');
SELECT "Card"."AddCardToDeck" (3, 'o cartão de visita', 'het visitekaartje', '{flashcards,escritorio}', 'cartao de visita.png');
SELECT "Card"."AddCardToDeck" (3, 'o cartão bancário', 'de bankpas', '{flashcards,escritorio}', 'cartao bancario.png');
SELECT "Card"."AddCardToDeck" (3, 'a caneta', 'de pen', '{flashcards,escritorio}', 'caneta.png');
SELECT "Card"."AddCardToDeck" (3, 'o caderno', 'het schrift', '{flashcards,escritorio}', 'caderno.png');
SELECT "Card"."AddCardToDeck" (3, 'o bloco de notas', 'het notitieblok', '{flashcards,escritorio}', 'bloco de notas.png');
SELECT "Card"."AddCardToDeck" (3, 'o lápis', 'het potlood', '{flashcards,escritorio}', 'lapis.png');
SELECT "Card"."AddCardToDeck" (3, 'a borracha', 'de gum', '{flashcards,escritorio}', 'borracha.png');
SELECT "Card"."AddCardToDeck" (3, 'a régua', 'de liniaal', '{flashcards,escritorio}', 'regua.png');
SELECT "Card"."AddCardToDeck" (3, 'o perfurador', 'de perforator', '{flashcards,escritorio}', 'perfurador.png');
SELECT "Card"."AddCardToDeck" (3, 'o agrafador', 'de nietmachine', '{flashcards,escritorio}', 'agrafador.png');
SELECT "Card"."AddCardToDeck" (3, 'o organizador', 'de organizer', '{flashcards,escritorio}', 'organizador.png');
SELECT "Card"."AddCardToDeck" (3, 'a pasta de arquivo', 'de ordner', '{flashcards,escritorio}', 'pasta de arquivo.png');
SELECT "Card"."AddCardToDeck" (3, 'a caixa de arquivo', 'de archiefdoos', '{flashcards,escritorio}', 'caixa de arquivo.png');
SELECT "Card"."AddCardToDeck" (3, 'o arquivo', 'het archief', '{flashcards,escritorio}', 'arquivo.png');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (13, 'vocabulário', 'A1', 'No escritório', 'Aprende o vocabulário essencial dos objetos que encontras num escritório.', '{escritorio.png}');

INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (5, 'card-click-learn', 'No escritório', 'Aprende o vocabulário essencial dos objetos que encontras num escritório.', 3)
  , (6, 'card-type-test', 'No escritório', 'Aprende o vocabulário essencial dos objetos que encontras num escritório.', 3);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (13, 1, 'card', 5),
    (13, 2, 'card', 6);

-- migrate:down
DELETE FROM "Lesson"."Lessons"
WHERE id = 13;

DELETE FROM "Card"."Exercises" 
WHERE id BETWEEN 5 AND 6;

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));
