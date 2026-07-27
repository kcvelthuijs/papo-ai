-- migrate:up
INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (12, 'vocabulário', 'A1', 'Na sala de estar', 'Aprende os nomes em português dos móveis e objetos da sala de estar.', '{sala.png}');

INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (3, 'card-click-learn', 'Interior de casa', 'Nomes dos elementos dentro da sala.', 2)
  , (4, 'card-type-test', 'Interior de casa', 'Nomes dos elementos dentro da sala.', 2);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (12, 1, 'card', 3),
    (12, 2, 'card', 4);

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));

-- migrate:down
DELETE FROM "Lesson"."Exercises" 
WHERE "lessonId" = 12;

DELETE FROM "Lesson"."Lessons"
WHERE id = 12;

DELETE FROM "Card"."Exercises" 
WHERE id BETWEEN 3 AND 4;

SELECT 
    setval('"Lesson"."Lessons_id_seq"', COALESCE((SELECT MAX(id) FROM "Lesson"."Lessons"),1)),
    setval('"Card"."Exercises_id_seq"', COALESCE((SELECT MAX(id) FROM "Card"."Exercises"),1));
