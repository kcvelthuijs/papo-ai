-- migrate:up
CREATE OR REPLACE FUNCTION "Lesson"."GetClozeExercise"(
    p_exercise integer,
    p_language varchar(3) DEFAULT 'NL'
)
RETURNS jsonb
LANGUAGE sql
AS $$
SELECT jsonb_build_object(
    'id', e.id,
    'type', e.type,
    'title', e.title,
    'description', e.description,
    'phrases', jsonb_agg(
        jsonb_build_object(
            'id', 's' || s.id,
            'textParts', s.textparts,
            'translation', bt.text,
            'gaps', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', 'g' || g.id,
                        'correct', g.correct,
                        'hint', g.hint,
                        'alt', g.alt
                    )
                    ORDER BY g.position
                )
                FROM "Cloze"."Gaps" g
                WHERE g."sentenceId" = s.id
            )
        )
        ORDER BY s.sequence
    )
)
FROM "Cloze"."Exercises" e
JOIN "Cloze"."SentenceSets" ss
    ON ss.id = e."sentenceSetId"
JOIN "Cloze"."Sentences" s
    ON s."sentenceSetId" = ss.id
LEFT JOIN "Babel"."Texts" bt
    ON bt."tableName" = 'Cloze.Sentences'
    AND bt."keyId" = s.id
    AND bt."language" = p_language
WHERE e.id = p_exercise
GROUP BY
    e.id,
    e.type,
    e.title,
    e.description;
$$;

-- migrate:down
CREATE OR REPLACE FUNCTION "Lesson"."GetClozeExercise"(
    p_exercise integer,
    p_language varchar(3) DEFAULT 'NL'
)
RETURNS jsonb
LANGUAGE sql
AS $$
SELECT jsonb_build_object(
    'id', e.id,
    'type', e.type,
    'title', e.title,
    'description', e.description,
    'phrases', jsonb_agg(
        jsonb_build_object(
            'id', 's' || s.id,
            'textParts', s.textparts,
            'translation', bt.text,
            'gaps', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', 'g' || g.id,
                        'correct', g.correct,
                        'hint', g.hint,
                        'alt', g.alt
                    )
                    ORDER BY g.position
                )
                FROM "Cloze"."Gaps" g
                WHERE g."sentenceId" = s.id
            )
        )
        ORDER BY s.sequence
    )
)
FROM "Cloze"."Exercises" e
JOIN "Cloze"."Sentences" s
    ON s."exerciseId" = e.id
LEFT JOIN "Babel"."Texts" bt
    ON bt."tableName" = 'Cloze.Sentences'
    AND bt."keyId" = s.id
    AND bt."language" = p_language
WHERE e.id = p_exercise
GROUP BY
    e.id,
    e.type,
    e.title,
    e.description;
$$;

