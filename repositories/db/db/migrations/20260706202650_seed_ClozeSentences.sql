-- migrate:up
INSERT INTO "Cloze"."Sentences" VALUES (4, '2026-05-27 10:32:03.617502', '{"Eu "," só português, mas ele "," também francês."}');
INSERT INTO "Cloze"."Sentences" VALUES (6, '2026-05-27 10:39:35.784005', '{"O quadro da sala",limpo}');
INSERT INTO "Cloze"."Sentences" VALUES (7, '2026-05-27 14:22:26.194889', '{"O pai","em casa."}');
INSERT INTO "Cloze"."Sentences" VALUES (8, '2026-05-27 14:23:22.517922', '{"Os prédios",altos}');
INSERT INTO "Cloze"."Sentences" VALUES (9, '2026-05-27 14:25:29.925538', '{"O banco",fechado}');
INSERT INTO "Cloze"."Sentences" VALUES (10, '2026-05-27 14:28:46.115791', '{"A caneta","em cima da mesa"}');
INSERT INTO "Cloze"."Sentences" VALUES (11, '2026-05-27 14:30:02.638031', '{"O nosso professor","muito simpático"}');
INSERT INTO "Cloze"."Sentences" VALUES (12, '2026-05-27 14:30:35.591082', '{Eu,cansada}');
INSERT INTO "Cloze"."Sentences" VALUES (13, '2026-05-27 14:31:13.795178', '{"O Manuel",doente}');
INSERT INTO "Cloze"."Sentences" VALUES (14, '2026-05-27 14:33:05.395242', '{Eles,"no restaurante"}');
INSERT INTO "Cloze"."Sentences" VALUES (15, '2026-05-27 14:34:15.391661', '{"Ele não",atrasada}');
INSERT INTO "Cloze"."Sentences" VALUES (16, '2026-05-27 14:35:18.591189', '{"O Jorge","um rapaz muito inteligente."}');
INSERT INTO "Cloze"."Sentences" VALUES (17, '2026-05-27 14:39:11.621466', '{"A sopa","boa, mas",fria}');
INSERT INTO "Cloze"."Sentences" VALUES (18, '2026-05-27 14:40:44.572976', '{"A minha casa",grande}');
INSERT INTO "Cloze"."Sentences" VALUES (19, '2026-05-27 14:42:27.023795', '{"A Cátia e o Afonso","em Ingleterra."}');
INSERT INTO "Cloze"."Sentences" VALUES (20, '2026-05-27 14:44:38.944732', '{"Hoje nós","em casa à noite."}');

-- sync id sequence
SELECT setval(
    '"Cloze"."Sentences_id_seq"',
    (SELECT MAX(id) FROM "Cloze"."Sentences")
);

-- migrate:down
DELETE FROM "Cloze"."Sentences";

