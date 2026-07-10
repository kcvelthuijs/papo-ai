-- migrate:up
ALTER TABLE "Babel"."Translations"
RENAME TO "Texts";

-- migrate:down
ALTER TABLE "Babel"."Texts"
RENAME TO "Translations";
