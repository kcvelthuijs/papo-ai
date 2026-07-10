-- migrate:up
ALTER TABLE "Babel"."Translations"
RENAME TO "Texts";

ALTER INDEX "Babel"."Translations_RefId"
RENAME TO "Texts_RefId";

ALTER TABLE "Babel"."Texts"
RENAME CONSTRAINT "Translation_pkey"
TO "Texts_pkey";

ALTER SEQUENCE "Babel"."Translations_id_seq"
RENAME TO "Texts_id_seq";

-- migrate:down
ALTER TABLE "Babel"."Texts"
RENAME TO "Translations";

ALTER INDEX "Babel"."Texts_RefId" 
RENAME TO "Translations_RefId";

ALTER TABLE "Babel"."Translations"
RENAME CONSTRAINT "Texts_pkey"
TO "Translation_pkey";

ALTER SEQUENCE "Babel"."Texts_id_seq"
RENAME TO "Translations_id_seq";