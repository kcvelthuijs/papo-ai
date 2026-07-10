-- migrate:up
INSERT INTO "Lesson"."Lessons" VALUES (1, '2026-05-31 20:37:16.311837', 'grammar', 'A1', 'Ser(Presente do Indicativo)', 'A conjugação do verbo "ser" no Presente do Indicativo.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (2, '2026-05-31 20:37:16.311837', 'grammar', 'A1', 'Ser ou estar?', 'Seleciona o verbo correto.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (3, '2026-05-31 20:43:11.363011', 'vocabulário', 'A1', 'O exterior da casa', 'Os nomes das partes exteriores da casa e do que a rodeia.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (4, '2026-05-31 20:43:11.363011', 'diálogo', 'A1', 'Jantar fora na vila', 'Andas pela vila e vês um restaurante numa praça. Queres jantar e perguntas à empregada se há mesa livre.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (5, '2026-05-31 20:43:11.363011', 'diálogo', 'A1', 'Apresentações', 'Num terraço de restaurante, uma mulher fala contigo. Pratica as primeiras frases em português e apresentações básicas.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (6, '2026-05-31 20:43:11.363011', 'diálogo', 'A1', 'Reservar um quarto num hotel', 'Chegas à cidade e procuras um quarto. Vês um hotel e vais à receção para pedir um quarto.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (7, '2026-05-31 20:43:11.363011', 'diálogo', 'A1', 'Fazer compras no mercado', 'Vais ao mercado comprar ingredientes para cozinhar com amigos. No mercado, falas com um vendedor e praticas nomes de frutas e legumes.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (8, '2026-05-31 20:54:53.509279', 'notícias', 'A1', 'Notícias do mundo', 'Vês o noticiário na televisão com legendas para compreender melhor. O locutor lê uma notícia e respondes a perguntas para verificar se entendeste.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (9, '2026-05-31 20:54:53.509279', 'notícias', 'A1', 'Notícias do país', 'Vês o noticiário. O locutor fala sobre notícias e respondes a perguntas para ver se percebeste.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (10, '2026-05-31 20:54:53.509279', 'notícias', 'A1', 'Notícias de desporto', 'Vês o noticiário desportivo. O locutor apresenta as notícias e respondes a perguntas de escolha múltipla no final.', NULL);
INSERT INTO "Lesson"."Lessons" VALUES (11, '2026-05-31 20:54:53.509279', 'notícias', 'A1', 'Previsão do tempo', 'Vês a previsão do tempo na televisão. O apresentador fala sobre o tempo e respondes a perguntas para verificar a compreensão.', NULL);

-- migrate:down
DELETE FROM "Lesson"."LessonExercises"