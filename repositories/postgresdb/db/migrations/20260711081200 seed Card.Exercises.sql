-- migrate:up
INSERT INTO "Card"."Exercises" (id, type, title, description, "deckId")
VALUES (1, 'flashcard-learn', 'Exterior de casa', 'Nomes dos elementos da casa e do que a rodeia.', 1)
  , (2, 'flashcard-test', 'Exterior de casa', 'Nomes dos elementos da casa e do que a rodeia.', 1);

SELECT setval(
    '"Card"."Exercises_id_seq"',
    (SELECT MAX(id) FROM "Card"."Exercises")
);

-- migrate:down
DELETE FROM "Card"."Exercises";

SELECT setval(
    '"Card"."Exercises_id_seq"',
    (SELECT MAX(id) FROM "Card"."Exercises")
);