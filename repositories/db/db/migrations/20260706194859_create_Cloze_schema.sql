-- migrate:up
CREATE SCHEMA IF NOT EXISTS "Cloze"
    AUTHORIZATION docent;

-- migrate:down
DROP SCHEMA IF EXISTS "Cloze"
