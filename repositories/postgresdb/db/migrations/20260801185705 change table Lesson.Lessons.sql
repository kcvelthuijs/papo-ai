-- migrate:up
ALTER TABLE "Lesson"."Lessons" 
ADD State VARCHAR(1) DEFAULT 'T'; 

UPDATE "Lesson"."Lessons"
SET State = 'P'
WHERE NOT (type = 'notícias' or id IN (4,6,7));

-- migrate:down
ALTER TABLE "Lesson"."Lessons"
DROP COLUMN State;
