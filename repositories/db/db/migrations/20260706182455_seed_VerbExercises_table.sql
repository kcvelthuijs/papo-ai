-- migrate:up
INSERT INTO "Verb"."Exercises" VALUES (1, 'verb-click-learn', 'Conjugate "Ser"', 'Seleciona a conjugação correta', 1);
INSERT INTO "Verb"."Exercises" VALUES (2, 'verb-click-test', 'Conjugate "Ser"', 'Seleciona a conjugação correta', 1);
INSERT INTO "Verb"."Exercises" VALUES (3, 'verb-type-test', 'Conjugate "Ser"', 'Preencha a conjugação correta', 1);
INSERT INTO "Verb"."Exercises" VALUES (4, 'verb-type-test', 'Conjugate "Estar"', 'Preencha a conjugação correta', 2);
INSERT INTO "Verb"."Exercises" VALUES (5, 'verb-click-test', 'Conjugate "Estar"', 'Seleciona a conjugação correta', 2);
INSERT INTO "Verb"."Exercises" VALUES (6, 'verb-click-learn', 'Conjugate "Estar"', 'Seleciona a conjugação correta', 2);
INSERT INTO "Verb"."Exercises" VALUES (7, 'verb-click-learn', 'Conjugate "Ter"', 'Seleciona a conjugação correta', 3);
INSERT INTO "Verb"."Exercises" VALUES (8, 'verb-click-test', 'Conjugate "Ter"', 'Seleciona a conjugação correta', 3);
INSERT INTO "Verb"."Exercises" VALUES (9, 'verb-type-test', 'Conjugate "Ter"', 'Preencha a conjugação correta', 3);

-- migrate:down
DELETE FROM "Verb"."Exercises";
