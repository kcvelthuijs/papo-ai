-- migrate:up
CREATE TABLE "Chat"."Scenes"
(
    "exerciseId" integer NOT NULL,
    "sequenceNumber" integer NOT NULL,
    title text NOT NULL,
    prompt text NOT NULL,
    "completionRules" jsonb NOT NULL DEFAULT '{}'::jsonb,

    CONSTRAINT "PK_Scenes"
        PRIMARY KEY ("exerciseId", "sequenceNumber"),

    CONSTRAINT "FK_Scenes_Exercises"
        FOREIGN KEY ("exerciseId")
        REFERENCES "Chat"."Exercises"(id)
        ON DELETE CASCADE
);

ALTER TABLE IF EXISTS "Chat"."Scenes"
    OWNER to docent;

-- migrate:down
DROP TABLE "Chat"."Scenes"
