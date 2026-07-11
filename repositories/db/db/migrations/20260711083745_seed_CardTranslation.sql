-- migrate:up
-- insert Card.Cards
INSERT INTO "Babel"."Texts"("tableName", "keyId", language, text) VALUES 
    ('Card.Cards', 3, 'NL', 'de schoorsteen')
  , ('Card.Cards', 4, 'NL', 'het dak')
  , ('Card.Cards', 5, 'NL', 'het raam')
  , ('Card.Cards', 6, 'NL', 'het luik')
  , ('Card.Cards', 7, 'NL', 'de tuin')
  , ('Card.Cards', 8, 'NL', 'het erf')
  , ('Card.Cards', 9, 'NL', 'het grasveld')
  , ('Card.Cards', 10, 'NL', 'het gras')
  , ('Card.Cards', 11, 'NL', 'de fontein')
  , ('Card.Cards', 12, 'NL', 'de garage')
  , ('Card.Cards', 13, 'NL', 'het bijgebouw')
  , ('Card.Cards', 14, 'NL', 'het schuurtje')
  , ('Card.Cards', 15, 'NL', 'de muur (buitenmuur)')
  , ('Card.Cards', 16, 'NL', 'het hek')
  , ('Card.Cards', 17, 'NL', 'de deur')
  , ('Card.Cards', 1, 'NL', 'het pad')
  , ('Card.Cards', 18, 'NL', 'de stoep')
  , ('Card.Cards', 19, 'NL', 'de gevel')
  , ('Card.Cards', 20, 'NL', 'de geveltegels')
  , ('Card.Cards', 2, 'NL', 'het afdak');


-- insert Card.Decks
INSERT INTO "Babel"."Texts"("tableName", "keyId", language, text) VALUES 
    ('Card.Decks', 1, 'NL', 'de buitenkant van het huis')
  , ('Card.Decks', 2, 'NL', 'binnen in het huis')
  , ('Card.Decks', 3, 'NL', 'in de werkkamer');

-- insert Card.Exercises
INSERT INTO "Babel"."Texts"("tableName", "keyId", language, text) VALUES 
    ('Card.Exercises', 1, 'NL', 'Benoem de dingen van het huis en er omheen')
  , ('Card.Exercises', 2, 'NL', 'Benoem de dingen van het huis en er omheen');

-- migrate:down
DELETE FROM "Babel"."Texts"
WHERE "tableName" IN ('Card.Cards', 'Card.Decks', 'Card.Exercises')
