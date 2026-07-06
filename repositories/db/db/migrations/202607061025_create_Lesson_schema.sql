-- migrate:up
CREATE SCHEMA IF NOT EXISTS "Lesson"
    AUTHORIZATION docent;

-- migrate:down
DROP SCHEMA IF EXISTS "Lesson"
