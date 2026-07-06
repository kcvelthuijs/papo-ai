-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(1, 'gap-click-test', 'Ser ou Estar', 'Seleciona a conjugação correta'),
(2, 'gap-type-test', 'Verbos regulares -er', 'Preencha a conjugação correta');

-- migrate:down
DELETE FROM "Cloze"."Exercises";
