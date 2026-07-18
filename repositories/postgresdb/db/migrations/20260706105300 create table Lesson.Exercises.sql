-- migrate:up
CREATE TABLE IF NOT EXISTS "Lesson"."Exercises"
(
    "lessonId" integer NOT NULL,
    "seqNumber" integer NOT NULL,
    "exerciseType" character varying(24) COLLATE pg_catalog."default" NOT NULL,
    "exerciseId" integer NOT NULL,
    CONSTRAINT exercises_pk PRIMARY KEY ("lessonId", "seqNumber"),
    CONSTRAINT exercises_lesson FOREIGN KEY ("lessonId")
        REFERENCES "Lesson"."Lessons" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "Lesson"."Exercises"
    OWNER to docent;

-- migrate:down
DROP TABLE IF EXISTS "Lesson"."Exercises";