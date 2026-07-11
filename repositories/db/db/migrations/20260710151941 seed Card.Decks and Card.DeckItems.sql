-- migrate:up
INSERT INTO "Card"."Decks" (id, text) 
VALUES (1, 'Casa exterior')
  , (2, 'Casa interior')
  , (3, 'Escritório');

-- sync id sequence
SELECT setval(
    '"Card"."Decks_id_seq"',
    (SELECT MAX(id) FROM "Card"."Decks")
);

INSERT INTO "Card"."DeckItems" ("deckId", "cardId", sequence)
VALUES ( 1, 3, 1)
    , ( 1, 4, 2)
    , ( 1, 19, 3)
    , ( 1, 6, 4)
    , ( 1, 5, 5)
    , ( 1, 17, 6)
    , ( 1, 2, 7)
    , ( 1, 7, 8)
    , ( 1, 8, 9)
    , ( 1, 9, 10)
    , ( 1, 10, 11)
    , ( 1, 11, 12)
    , ( 1, 12, 13)
    , ( 1, 13, 14)
    , ( 1, 14, 15)
    , ( 1, 15, 16)
    , ( 1, 1, 17)
    , ( 1, 16, 18)
    , ( 1, 18, 19)
    , ( 1, 20, 20);
  
-- migrate:down
DELETE FROM "Card"."Decks"
