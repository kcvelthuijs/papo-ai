-- migrate:up
INSERT INTO "Lesson"."Exercises" VALUES (1, '2026-05-31 20:00:11.038583', 1, 1, 'verb', 1);
INSERT INTO "Lesson"."Exercises" VALUES (2, '2026-05-31 20:00:11.038583', 1, 2, 'verb', 2);
INSERT INTO "Lesson"."Exercises" VALUES (3, '2026-05-31 20:00:11.038583', 1, 3, 'verb', 3);

-- sync id-sequence
SELECT setval(
    '"Lesson"."Exercises_id_seq"',
    (SELECT MAX(id) FROM "Lesson"."Exercises")
);

-- migrate:down
DELETE FROM "Lesson"."Exercises";
