-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(1, 'cloze-click-test', 'Ser ou Estar', 'Seleciona a conjugação correta'),
(2, 'cloze-type-test', 'Verbos regulares -er', 'Preencha a conjugação correta');

-- sync id sequence
SELECT setval(
    '"Cloze"."Exercises_id_seq"',
    (SELECT MAX(id) FROM "Cloze"."Exercises")
);

-- migrate:down
DELETE FROM "Cloze"."Exercises";
