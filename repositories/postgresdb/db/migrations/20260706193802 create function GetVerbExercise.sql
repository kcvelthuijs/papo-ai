-- migrate:up
CREATE OR REPLACE FUNCTION "Lesson"."GetVerbExercise"(
    p_exercise integer,
    p_language varchar(3) DEFAULT 'NL'
)
RETURNS jsonb
LANGUAGE sql
AS $$
SELECT jsonb_build_object(
        'id', ve.id,
        'type', ve.type,
        'title', ve.title,
        'description', ve.description,
        'infinitive', vb.infinitive,
        'forms', jsonb_build_object(
            'p1ev', vb.p1ev,
            'p2ev', vb.p2ev,
            'p3ev', vb.p3ev,
            'p1mv', vb.p1mv,
            'p2mv', vb.p2mv,
            'p3mv', vb.p3mv
        )
    )
FROM "Lesson"."Exercises" le
JOIN "Verb"."Exercises" ve
    ON ve.id = le."exerciseId"
JOIN "Verb"."Verbs" vb
    ON vb.id = ve."verbId"
WHERE le."exerciseType" = 'verb'
  AND le."exerciseId" = p_exercise;
$$;

-- migrate:down
DROP FUNCTION "Lesson"."GetVerbExercise";
