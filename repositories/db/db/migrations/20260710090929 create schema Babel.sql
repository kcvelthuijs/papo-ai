-- migrate:up
CREATE SCHEMA IF NOT EXISTS "Babel"
    AUTHORIZATION docent;

-- migrate:down
DROP SCHEMA IF EXISTS "Babel"
