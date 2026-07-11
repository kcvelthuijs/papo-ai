-- migrate:up
INSERT INTO "Card"."Exercises" (type, title, description, "deckId")
VALUES ('flashcard-learn', 'Exterior de casa', 'Nomes dos elementos da casa e do que a rodeia.', 1)
  , ('falshcard-test', 'Exterior de casa', 'Nomes dos elementos da casa e do que a rodeia.', 1);

-- migrate:down
DELETE FROM "Card"."Exercises";
