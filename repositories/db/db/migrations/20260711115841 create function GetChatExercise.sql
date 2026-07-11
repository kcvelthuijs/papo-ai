-- migrate:up
CREATE OR REPLACE FUNCTION "Lesson"."GetChatExercise"(
    p_exercise_id integer,
    p_language varchar DEFAULT 'NL'
)
RETURNS jsonb
LANGUAGE plpgsql
AS
$BODY$
BEGIN
    RETURN (
        SELECT jsonb_build_object(
            'id', e.id,
            'type', e.type,
            'title', e.title,
            'description', e.description,
            'image', e.image,
            'introduction', e.introduction,
            'prompt', e.prompt,
            'introduction', e.introduction,
            'words', to_jsonb(e.words),

            'meta', jsonb_build_object(
                'voice', e.voice,
                'avatar', e.avatar
            )
        )
        FROM "Chat"."Exercises" e
        WHERE e.id = p_exercise_id
        LIMIT 1
    );
END;
$BODY$;

ALTER FUNCTION "Lesson"."GetChatExercise"(integer, varchar)
OWNER TO docent;

-- migrate:down
DROP FUNCTION  "Lesson"."GetChatExercise"(integer, varchar);
