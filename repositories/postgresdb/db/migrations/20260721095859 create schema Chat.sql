-- migrate:up
CREATE SCHEMA IF NOT EXISTS "Chat"
    AUTHORIZATION docent;

-- migrate:down
DROP SCHEMA IF EXISTS "Chat"