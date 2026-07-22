-- migrate:up
INSERT INTO "Lesson". "Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId")
VALUES (1,1, 'verb', 1)
    , (1, 2, 'verb', 2)
    , (1, 3, 'verb', 3)
    , (2, 1, 'cloze', 1)
    , (3, 1, 'card', 1)
    , (3, 2, 'card', 2);

-- migrate:down
DELETE FROM "Lesson"."Exercises";
