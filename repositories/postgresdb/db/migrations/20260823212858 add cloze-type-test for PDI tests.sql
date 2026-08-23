-- migrate:up
SELECT setval(
    '"Cloze"."Exercises_id_seq"',
    COALESCE((SELECT MAX("id") FROM "Cloze"."Exercises"), 1),
    true
);

INSERT INTO "Cloze"."Exercises" (type, title, description, "sentenceSetId")
SELECT 'cloze-type-test', title, description, id
FROM "Cloze"."Exercises"
WHERE id IN (3, 7, 8);

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId")
VALUES (18, 2, 'cloze', 9)
  , (22, 2, 'cloze', 10)
  , (23, 2, 'cloze', 11);

-- migrate:down
DELETE FROM "Cloze"."Exercises"
WHERE id > 8;

SELECT setval(
    '"Cloze"."Exercises_id_seq"',
    COALESCE((SELECT MAX("id") FROM "Cloze"."Exercises"), 1),
    true
);

DELETE FROM "Lesson"."Exercises"
WHERE "lessonId" > 17
  AND "seqNumber" = 2;
