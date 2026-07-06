-- migrate:up
CREATE SCHEMA IF NOT EXISTS "Verb"
    AUTHORIZATION docent;

-- migrate:down
DROP SCHEMA IF EXISTS "Verb"
