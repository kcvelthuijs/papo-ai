-- migrate:up
INSERT INTO "Card"."Cards" (id, text, tree, name ) 
VALUES (1, 'o caminho', '{flashcards,casa,exterior}', 'caminho.jpg')
  , (2, 'a cobertura', '{flashcards,casa,exterior}', 'cobertura.jpg')
  , (3, 'a chimané', '{flashcards,casa,exterior}', 'chamine.jpg')
  , (4, 'o telhado', '{flashcards,casa,exterior}', 'telhado.jpg')
  , (5, 'a janela', '{flashcards,casa,exterior}', 'janela.jpg')
  , (6, 'a portada', '{flashcards,casa,exterior}', 'portada.jpg')
  , (7, 'o jardim', '{flashcards,casa,exterior}', 'jardim.jpg')
  , (8, 'o quintal', '{flashcards,casa,exterior}', 'quintal.jpg')
  , (9, 'o relvado', '{flashcards,casa,exterior}', 'relvado.jpg')
  , (10, 'a relva', '{flashcards,casa,exterior}', 'relva.jpg')
  , (11, 'a fonte', '{flashcards,casa,exterior}', 'fonte.jpg')
  , (12, 'o garagem', '{flashcards,casa,exterior}', 'garagem.jpg')
  , (13, 'o anexo', '{flashcards,casa,exterior}', 'anexo.jpg')
  , (14, 'a arrecadação', '{flashcards,casa,exterior}', 'arrecadação.jpg')
  , (15, 'o muro', '{flashcards,casa,exterior}', 'muro.jpg')
  , (16, 'o gradeamento', '{flashcards,casa,exterior}', 'gradeamento.jpg')
  , (17, 'o porta', '{flashcards,casa,exterior}', 'porta.jpg')
  , (18, 'o pavimento', '{flashcards,casa,exterior}', 'pavimento.jpg')
  , (19, 'a fachada', '{flashcards,casa,exterior}', 'fachada.jpg')
  , (20, 'os azulejos', '{flashcards,casa,exterior}', 'azulejos.jpg');

-- sync id sequence
SELECT setval(
    '"Card"."Cards_id_seq"',
    (SELECT MAX(id) FROM "Card"."Cards")
);

-- migrate:down
DELETE FROM "Card"."Cards";
