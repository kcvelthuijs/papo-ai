-- migrate:up
CREATE TABLE IF NOT EXISTS "Card"."DeckItems"
(
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    "deckId" integer NOT NULL,
    "cardId" integer NOT NULL,
    sequence smallint NOT NULL DEFAULT 0,
    CONSTRAINT "DeckItems_pkey" PRIMARY KEY ("deckId", "cardId"),
    CONSTRAINT "DeckItem_phrase" FOREIGN KEY ("cardId")
        REFERENCES "Card"."Cards" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "DeckItems_deck" FOREIGN KEY ("deckId")
        REFERENCES "Card"."Decks" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "Card"."DeckItems"
    OWNER to docent;

CREATE UNIQUE INDEX IF NOT EXISTS "DeckItems_order"
    ON "Card"."DeckItems" USING btree
    ("deckId" ASC NULLS LAST, sequence ASC NULLS LAST)
    TABLESPACE pg_default;

-- migrate:down
DROP TABLE "Card"."DeckItems";
