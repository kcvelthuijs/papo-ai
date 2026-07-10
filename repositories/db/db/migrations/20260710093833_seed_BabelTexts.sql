-- migrate:up
INSERT INTO "Babel"."Texts" VALUES (1, '2026-05-27 10:32:03.617502', 'Cloze.Sentences', 4, 'NL', 'Ik spreek alleen Portugees, maar hij spreekt ook Frans.');
INSERT INTO "Babel"."Texts" VALUES (2, '2026-05-27 10:32:03.617502', 'Cloze.Sentences', 4, 'EN', 'I only speak Portuguese, but he also speaks French.');
INSERT INTO "Babel"."Texts" VALUES (3, '2026-05-27 10:39:35.784005', 'Cloze.Sentences', 6, 'NL', 'Het bord in de klas is schoon.');
INSERT INTO "Babel"."Texts" VALUES (4, '2026-05-27 14:22:26.194889', 'Cloze.Sentences', 7, 'NL', 'Vader is thuis.');
INSERT INTO "Babel"."Texts" VALUES (5, '2026-05-27 14:23:22.517922', 'Cloze.Sentences', 8, 'NL', 'De gebouwen zijn oud.');
INSERT INTO "Babel"."Texts" VALUES (6, '2026-05-27 14:25:29.925538', 'Cloze.Sentences', 9, 'NL', 'De bank is gesloten.');
INSERT INTO "Babel"."Texts" VALUES (7, '2026-05-27 14:28:46.115791', 'Cloze.Sentences', 10, 'NL', 'De pen ligt op de tafel.');
INSERT INTO "Babel"."Texts" VALUES (8, '2026-05-27 14:30:02.638031', 'Cloze.Sentences', 11, 'NL', 'Onze docent is heel aardig.');
INSERT INTO "Babel"."Texts" VALUES (9, '2026-05-27 14:30:35.591082', 'Cloze.Sentences', 12, 'NL', 'Ik ben moe.');
INSERT INTO "Babel"."Texts" VALUES (10, '2026-05-27 14:31:13.795178', 'Cloze.Sentences', 13, 'NL', 'Manuel is ziek.');
INSERT INTO "Babel"."Texts" VALUES (11, '2026-05-27 14:33:05.395242', 'Cloze.Sentences', 14, 'NL', 'Zij zijn in het restaurant.');
INSERT INTO "Babel"."Texts" VALUES (12, '2026-05-27 14:34:15.391661', 'Cloze.Sentences', 15, 'NL', 'Zij is niet te laat.');
INSERT INTO "Babel"."Texts" VALUES (13, '2026-05-27 14:35:18.591189', 'Cloze.Sentences', 16, 'NL', 'Jorge is een heel intelligente jongen.');
INSERT INTO "Babel"."Texts" VALUES (14, '2026-05-27 14:39:11.621466', 'Cloze.Sentences', 17, 'NL', 'De soep is lekker, maar hij is koud.');
INSERT INTO "Babel"."Texts" VALUES (15, '2026-05-27 14:40:44.572976', 'Cloze.Sentences', 18, 'NL', 'Mijn huis is groot.');
INSERT INTO "Babel"."Texts" VALUES (16, '2026-05-27 14:42:27.023795', 'Cloze.Sentences', 19, 'NL', 'Cátia en Afonso zijn in Engeland.');
INSERT INTO "Babel"."Texts" VALUES (17, '2026-05-27 14:44:38.944732', 'Cloze.Sentences', 20, 'NL', 'Vandaag zijn we vanavond niet thuis.');

-- migrate:down
DELETE FROM "Babel"."Texts";
