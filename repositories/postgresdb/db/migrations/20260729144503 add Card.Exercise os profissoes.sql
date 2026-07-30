-- migrate:up
INSERT INTO "Card"."Decks" (id, text) 
VALUES (7, 'Profissões');

SELECT "Card"."AddCardToDeck" (7, 'a médica', 'de arts', '{flashcards,profissoes}', 'medica.png');
SELECT "Card"."AddCardToDeck" (7, 'a enfermeira', 'de verpleegkundige', '{flashcards,profissoes}', 'enfermeira.png');
SELECT "Card"."AddCardToDeck" (7, 'a dentista', 'de tandarts', '{flashcards,profissoes}', 'dentista.png');
SELECT "Card"."AddCardToDeck" (7, 'o piloto', 'de piloot', '{flashcards,profissoes}', 'pilote.png');
SELECT "Card"."AddCardToDeck" (7, 'a assistente de bordo', 'de stewardess', '{flashcards,profissoes}', 'assistente de bordo.png');
SELECT "Card"."AddCardToDeck" (7, 'o polícia', 'de politieagent', '{flashcards,profissoes}', 'policia.png');
SELECT "Card"."AddCardToDeck" (7, 'o bombeiro', 'de brandweerman', '{flashcards,profissoes}', 'bombeiro.png');
SELECT "Card"."AddCardToDeck" (7, 'a motorista de autocarro', 'de buschauffeur', '{flashcards,profissoes}', 'motorista de autocarro.png');
SELECT "Card"."AddCardToDeck" (7, 'o advogado', 'de advocaat', '{flashcards,profissoes}', 'advogado.png');
SELECT "Card"."AddCardToDeck" (7, 'a professora', 'de leraar', '{flashcards,profissoes}', 'professora.png');
SELECT "Card"."AddCardToDeck" (7, 'a vendedora', 'de verkoopster', '{flashcards,profissoes}', 'vendedora.png');
SELECT "Card"."AddCardToDeck" (7, 'o carteiro', 'de postbode', '{flashcards,profissoes}', 'carteiro.png');
SELECT "Card"."AddCardToDeck" (7, 'o cozinheiro', 'de kok', '{flashcards,profissoes}', 'cozinheiro.png');
SELECT "Card"."AddCardToDeck" (7, 'a eletricista', 'de electricien', '{flashcards,profissoes}', 'eletricista.png');
SELECT "Card"."AddCardToDeck" (7, 'o arquiteto', 'de architect', '{flashcards,profissoes}', 'arquiteto.png');
SELECT "Card"."AddCardToDeck" (7, 'a padeira', 'de bakker', '{flashcards,profissoes}', 'padeira.png');
SELECT "Card"."AddCardToDeck" (7, 'o agricultor', 'de boer', '{flashcards,profissoes}', 'agricultor.png');
SELECT "Card"."AddCardToDeck" (7, 'a veterinária', 'de dierenarts', '{flashcards,profissoes}', 'veterinaria.png');
SELECT "Card"."AddCardToDeck" (7, 'o pescador', 'de visser', '{flashcards,profissoes}', 'pescador.png');
SELECT "Card"."AddCardToDeck" (7, 'o programador', 'de programmeur', '{flashcards,profissoes}', 'programador.png');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (17, 'vocabulário', 'A1', 'Profissões', 'Aprende o nome das profissões mais comuns em português europeu e aumenta o teu vocabulário do dia a dia.', '{profissoes.png}');

INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (13, 'card-click-learn', 'Profissões', 'Aprende o nome das profissões mais comuns em português europeu e aumenta o teu vocabulário do dia a dia.', 7)
  , (14, 'card-type-test', 'Profissões', 'Aprende o nome das profissões mais comuns em português europeu e aumenta o teu vocabulário do dia a dia.', 7);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (17, 1, 'card',13),
    (17, 2, 'card', 14);

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Cloze"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Cloze"."Exercises"),1)),
    setval('"Cloze"."Sentences_id_seq"', COALESCE((SELECT MAX(id) FROM "Cloze"."Sentences"),1)),
    setval('"Cloze"."Gaps_id_seq"', COALESCE((SELECT MAX(id) FROM "Cloze"."Gaps"),1));
    
-- migrate:down
DELETE FROM "Lesson"."Exercises" 
WHERE "lessonId" = 17;

DELETE FROM "Lesson"."Lessons"
WHERE id = 17;

DELETE FROM "Card"."Exercises" 
WHERE id BETWEEN 13 AND 14;

DELETE FROM "Card"."Decks"
WHERE id = 7;

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Decks_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Decks"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

