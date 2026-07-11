-- migrate:up
INSERT INTO "Babel"."Texts" ("tableName", "keyId", "language", "text")
VALUES ('Cloze.Sentences', 4, 'NL', 'Ik spreek alleen Portugees, maar hij spreekt ook Frans.')
  , ('Cloze.Sentences', 4, 'EN', 'I only speak Portuguese, but he also speaks French.')
  , ('Cloze.Sentences', 6, 'NL', 'Het bord in de klas is schoon.')
  , ('Cloze.Sentences', 7, 'NL', 'Vader is thuis.')
  , ('Cloze.Sentences', 8, 'NL', 'De gebouwen zijn oud.')
  , ('Cloze.Sentences', 9, 'NL', 'De bank is gesloten.')
  , ('Cloze.Sentences', 10, 'NL', 'De pen ligt op de tafel.')
  , ('Cloze.Sentences', 11, 'NL', 'Onze docent is heel aardig.')
  , ('Cloze.Sentences', 12, 'NL', 'Ik ben moe.')
  , ('Cloze.Sentences', 13, 'NL', 'Manuel is ziek.')
  , ('Cloze.Sentences', 14, 'NL', 'Zij zijn in het restaurant.')
  , ('Cloze.Sentences', 15, 'NL', 'Zij is niet te laat.')
  , ('Cloze.Sentences', 16, 'NL', 'Jorge is een heel intelligente jongen.')
  , ('Cloze.Sentences', 17, 'NL', 'De soep is lekker, maar hij is koud.')
  , ('Cloze.Sentences', 18, 'NL', 'Mijn huis is groot.')
  , ('Cloze.Sentences', 19, 'NL', 'Cátia en Afonso zijn in Engeland.')
  , ('Cloze.Sentences', 20, 'NL', 'Vandaag zijn we vanavond niet thuis.')

-- migrate:down
DELETE FROM "Babel"."Texts";
