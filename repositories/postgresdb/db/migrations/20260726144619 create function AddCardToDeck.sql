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
    -- 1. Voeg de card toe
    INSERT INTO "Card"."Cards"(text,tree,name)
    VALUES 
		( p_title, p_tree, p_image )
    RETURNING id INTO v_card_id;

    -- 2. Voeg de vertaling toe
    INSERT INTO "Babel"."Texts" ( "tableName", "keyId", language, text )
    VALUES
    	( 'Card.Cards', v_card_id, 'NL', p_translation);

    -- 3. Bepaal volgende sequence in deck
    SELECT COALESCE(MAX(sequence), 0) + 1
    INTO v_sequence
    FROM "Card"."DeckItems"
    WHERE "deckId" = p_deck_id;

    -- 4. Voeg card toe aan deck
    INSERT INTO "Card"."DeckItems" ( "deckId", "cardId", sequence )
    VALUES
    	( p_deck_id, v_card_id, v_sequence);

    -- 5. Geef nieuwe cardId terug
    RETURN v_card_id;
END;
$$;

ALTER FUNCTION "Card"."AddCardToDeck" 
    OWNER to docent;

-- migrate:down
DROP FUNCTION "Card"."AddCardToDeck";

