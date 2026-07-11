-- migrate:up
CREATE SCHEMA IF NOT EXISTS "Card"
    AUTHORIZATION docent;

-- migrate:down
DROP SCHEMA IF EXISTS "Card"
