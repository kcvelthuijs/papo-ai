-- migrate:up
INSERT INTO "Card"."Cards" (id, text, image ) 
VALUES (1, 'o caminho', '{flashcards,casa,exterior,caminho.png}')
  , (2, 'a cobertura', '{flashcards,casa,exterior,cobertura.png}')
  , (3, 'a chimané', '{flashcards,casa,exterior,chamine.png}')
  , (4, 'o telhado', '{flashcards,casa,exterior,telhado.png}')
  , (5, 'a janela', '{flashcards,casa,exterior,janela.png}')
  , (6, 'a portada', '{flashcards,casa,exterior,portada.png}')
  , (7, 'o jardim', '{flashcards,casa,exterior,jardim.png}')
  , (8, 'o quintal', '{flashcards,casa,exterior,quintal.png}')
  , (9, 'o relvado', '{flashcards,casa,exterior,relvado.png}')
  , (10, 'a relva', '{flashcards,casa,exterior,relva.png}')
  , (11, 'a fonte', '{flashcards,casa,exterior,fonte.png}')
  , (12, 'o garagem', '{flashcards,casa,exterior,garagem.png}')
  , (13, 'o anexo', '{flashcards,casa,exterior,anexo.png}')
  , (14, 'a arrecadação', '{flashcards,casa,exterior,arrecadação.png}')
  , (15, 'o muro', '{flashcards,casa,exterior,muro.png}')
  , (16, 'o gradeamento', '{flashcards,casa,exterior,gradeamento.png}')
  , (17, 'o porta', '{flashcards,casa,exterior,porta.png}')
  , (18, 'o pavimento', '{flashcards,casa,exterior,pavimento.png}')
  , (19, 'a fachada', '{flashcards,casa,exterior,fachada.png}')
  , (20, 'os azulejos', '{flashcards,casa,exterior,azulejos.png}');

-- sync id sequence
SELECT setval(
    '"Card"."Cards_id_seq"',
    (SELECT MAX(id) FROM "Card"."Cards");
);

-- migrate:down
DELETE FROM "Card"."Cards";
