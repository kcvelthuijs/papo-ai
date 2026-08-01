-- migrate:up
-- Remove reference to column "words" in "Chat"."Scenes"
CREATE OR REPLACE FUNCTION "Lesson"."GetChatExercise"(
	p_exercise integer,
	p_language character varying DEFAULT 'NL'::character varying)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

BEGIN

    RETURN (
        SELECT jsonb_build_object(
            'id', ex.id,
            'type', ex.type,
            'title', ex.title,
            'description', ex.description,
            'image', ex.image,
			'prompt', ex.prompt,
			'avatar', ex.avatar,
			'voice', ex.voice,
            'scenes',
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'sequenceNumber', sc."sequenceNumber",
                            'title', sc.title,
                            'prompt', sc.prompt,
                            'completionRules', sc."completionRules"
                        )
                        ORDER BY sc."sequenceNumber"
                    )
                    FROM "Chat"."Scenes" sc
                    WHERE sc."exerciseId" = ex.id
                ),
                '[]'::jsonb
            )
        )
        FROM "Chat"."Exercises" ex
        WHERE ex.id = p_exercise
        LIMIT 1
    );
END;
$BODY$;

ALTER FUNCTION "Lesson"."GetChatExercise"(integer, character varying)
    OWNER TO docent;

-- migrate:down
-- Reset to older version with "words" column
CREATE OR REPLACE FUNCTION "Lesson"."GetChatExercise"(
	p_exercise integer,
	p_language character varying DEFAULT 'NL'::character varying)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

BEGIN

    RETURN (
        SELECT jsonb_build_object(
            'id', ex.id,
            'type', ex.type,
            'title', ex.title,
            'description', ex.description,
            'image', ex.image,
			'prompt', ex.prompt,
			'avatar', ex.avatar,
			'voice', ex.voice,
            'scenes',
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'sequenceNumber', sc."sequenceNumber",
                            'title', sc.title,
                            'prompt', sc.prompt,
                            'words', sc.words,
                            'completionRules', sc."completionRules"
                        )
                        ORDER BY sc."sequenceNumber"
                    )
                    FROM "Chat"."Scenes" sc
                    WHERE sc."exerciseId" = ex.id
                ),
                '[]'::jsonb
            )
        )
        FROM "Chat"."Exercises" ex
        WHERE ex.id = p_exercise
        LIMIT 1
    );
END;
$BODY$;

ALTER FUNCTION "Lesson"."GetChatExercise"(integer, character varying)
    OWNER TO docent;


