-- migrate:up
CREATE OR REPLACE FUNCTION "Lesson"."GetCardExercise"(
    p_exercise_id integer,
    p_language varchar(3)
)
RETURNS jsonb
LANGUAGE plpgsql
AS
$BODY$
BEGIN

    RETURN (
        SELECT jsonb_build_object(
            'id', ex.id,
            'type', ex.type,
            'title', ex.title,
            'description', ex.description,
            'image', ex.image,
            'items',
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id', di.sequence,
                            'question', tl.text,
                            'response', c.text,
                            'image', c.image
                        )
                        ORDER BY di.sequence
                    )
                    FROM "Card"."DeckItems" di
                    INNER JOIN "Card"."Cards" c
                        ON c.id = di."cardId"
                    LEFT JOIN "Babel"."Texts" tl
                        ON tl."tableName" = 'Card.Cards'
                       AND tl."keyId" = c.id
                       AND tl.language = p_language
                    WHERE di."deckId" = ex."deckId"
                ),
                '[]'::jsonb
            )
        )
        FROM "Card"."Exercises" ex
        WHERE ex.id = p_exercise_id
        LIMIT 1
    );
END;
$BODY$;

ALTER FUNCTION "Lesson"."GetCardExercise"(integer, varchar)
OWNER TO docent;

-- migrate:down
DROP FUNCTION "Lesson"."GetCardExercise"(integer, varchar);
