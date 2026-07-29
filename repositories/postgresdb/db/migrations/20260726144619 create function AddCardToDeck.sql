-- migrate:up
CREATE OR REPLACE FUNCTION "Card"."AddCardToDeck" (
    p_deck_id integer,
    p_title varchar(255),
    p_translation text,
    p_tree text[] DEFAULT NULL,
    p_image text DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_card_id integer;
    v_sequence smallint;
BEGIN
   -- 1. Bestaat de kaart al?
    SELECT id
    INTO v_card_id
    FROM "Card"."Cards"
    WHERE text = p_title;

    -- 2. Zo niet, maak hem aan
    IF v_card_id IS NULL THEN
        INSERT INTO "Card"."Cards" (text, tree, name)
        VALUES (p_title, p_tree, p_image)
        RETURNING id
        INTO v_card_id;

        -- Voeg direct de Nederlandse vertaling toe
        INSERT INTO "Babel"."Texts" ("tableName", "keyId", language, text)
        VALUES ('Card.Cards', v_card_id, 'NL', p_translation);
    END IF;

    -- 3. Voeg de kaart alleen toe als hij nog niet in dit deck zit
    IF NOT EXISTS (
        SELECT 1
        FROM "Card"."DeckItems"
        WHERE "deckId" = p_deck_id
          AND "cardId" = v_card_id
    ) THEN
        SELECT COALESCE(MAX(sequence), 0) + 1
        INTO v_sequence
        FROM "Card"."DeckItems"
        WHERE "deckId" = p_deck_id;

        INSERT INTO "Card"."DeckItems" ("deckId", "cardId", sequence)
        VALUES (p_deck_id, v_card_id, v_sequence);
    END IF;

    RETURN v_card_id;
END;
$$;

ALTER FUNCTION "Card"."AddCardToDeck" 
    OWNER to docent;

-- migrate:down
DROP FUNCTION "Card"."AddCardToDeck";

