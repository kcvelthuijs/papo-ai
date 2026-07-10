-- migrate:up
ALTER TABLE "Cloze"."Sentences"
ADD COLUMN "exerciseId" integer,
ADD COLUMN "sequence" integer;

UPDATE "Cloze"."Sentences"
SET
    "exerciseId" = 1,
    "sequence" = sub.sequence
FROM (
    SELECT
        id,
        ROW_NUMBER() OVER (ORDER BY id) AS sequence
    FROM "Cloze"."Sentences"
) sub
WHERE "Cloze"."Sentences".id = sub.id;

ALTER TABLE "Cloze"."Sentences"
ALTER COLUMN "exerciseId" SET NOT NULL,
ALTER COLUMN "sequence" SET NOT NULL;

ALTER TABLE "Cloze"."Sentences"
ADD CONSTRAINT "FK_Sentences_Exercises"
FOREIGN KEY ("exerciseId")
REFERENCES "Cloze"."Exercises" ("id");

ALTER TABLE "Cloze"."Sentences"
ADD CONSTRAINT "UQ_Sentences_Exercise_Sequence"
UNIQUE ("exerciseId", "sequence");

-- migrate:down
ALTER TABLE "Cloze"."Sentences"
DROP CONSTRAINT IF EXISTS "UQ_Sentences_Exercise_Sequence";

ALTER TABLE "Cloze"."Sentences"
DROP CONSTRAINT IF EXISTS "FK_Sentences_Exercises";

ALTER TABLE "Cloze"."Sentences"
DROP COLUMN IF EXISTS "exerciseId",
DROP COLUMN IF EXISTS "sequence";
