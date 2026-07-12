-- migrate:up
CREATE OR REPLACE FUNCTION "Cloze"."AddSentence"(
    p_exercise_id integer,
    p_sequence integer,
    p_textparts text[],
    p_translations jsonb,
    p_gaps jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
AS $BODY$

DECLARE
    v_sentence_id integer;
    v_translation jsonb;
    v_gap jsonb;
    v_index integer := 0;
BEGIN
    -------------------------------------------------
    -- Sentence toevoegen
    -------------------------------------------------
    INSERT INTO "Cloze"."Sentences" (
        "exerciseId",
        "sequence",
        textparts
    )
    VALUES (
        p_exercise_id,
        p_sequence,
        p_textparts
    )
    RETURNING id INTO v_sentence_id;

    -------------------------------------------------
    -- Translations toevoegen
    -------------------------------------------------
    FOR v_translation IN
        SELECT * FROM jsonb_array_elements(p_translations)
    LOOP
        INSERT INTO "Babel"."Texts" (
            "tableName",
            "keyId",
            "language",
            "text"
        )
        VALUES (
            'Cloze.Sentences',
            v_sentence_id,
            v_translation->>'language',
            v_translation->>'text'
        );    
    END LOOP;

    -------------------------------------------------
    -- Gaps toevoegen
    -------------------------------------------------
    FOR v_gap IN
        SELECT * FROM jsonb_array_elements(p_gaps)
    LOOP
        INSERT INTO "Cloze"."Gaps" (
            "sentenceId",
            position,
            correct,
            alt,
            hint
        )
        VALUES (
            v_sentence_id,
            v_index,
            v_gap->>'correct',
            COALESCE(
                ARRAY(
                    SELECT jsonb_array_elements_text(v_gap->'alt')
                ),
                ARRAY[]::text[]
            ),
            v_gap->>'hint'
        );
        v_index := v_index + 1;
    END LOOP;

    -------------------------------------------------
    -- Resultaat teruggeven
    -------------------------------------------------
    RETURN jsonb_build_object(
        'sentenceId', v_sentence_id,
        'exerciseId', p_exercise_id,
        'sequence', p_sequence
    );
END;
$BODY$;

-- migrate:down
DROP FUNCTION "Cloze"."AddSentence";
