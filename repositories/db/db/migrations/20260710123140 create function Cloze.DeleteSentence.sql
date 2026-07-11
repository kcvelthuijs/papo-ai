-- migrate:up
CREATE OR REPLACE FUNCTION "Cloze"."DeleteSentence"(
    p_exercise_id integer,
    p_sequence integer
)
RETURNS jsonb
LANGUAGE plpgsql
AS $BODY$

DECLARE
    v_sentence_id integer;

BEGIN
    -------------------------------------------------
    -- Sentence id ophalen
    -------------------------------------------------
    SELECT id
    INTO v_sentence_id
    FROM "Cloze"."Sentences"
    WHERE "exerciseId" = p_exercise_id
      AND "sequence" = p_sequence;

    IF v_sentence_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'message', 'Sentence not found',
            'exerciseId', p_exercise_id,
            'sequence', p_sequence
        );
    END IF;

    -------------------------------------------------
    -- Babel teksten verwijderen
    -------------------------------------------------
    DELETE FROM "Babel"."Texts"
    WHERE "tableName" = 'Cloze.Sentences'
      AND "keyId" = v_sentence_id;

    -------------------------------------------------
    -- Sentence verwijderen
    -- Gaps worden via cascade verwijderd
    -------------------------------------------------
    DELETE FROM "Cloze"."Sentences"
    WHERE id = v_sentence_id;

    -------------------------------------------------
    -- Resultaat
    -------------------------------------------------
    RETURN jsonb_build_object(
        'success', true,
        'sentenceId', v_sentence_id,
        'exerciseId', p_exercise_id,
        'sequence', p_sequence
    );
END;
$BODY$;

ALTER FUNCTION "Cloze"."DeleteSentence"(integer, integer)
OWNER TO docent;

-- migrate:down
DROP FUNCTION "Cloze"."DeleteSentence";