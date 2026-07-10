-- migrate:up
INSERT INTO "Cloze"."Gaps" VALUES (1, '2026-05-27 10:32:03.617502', 4, 0, 'falo', 'falar (eu)', '{}');
INSERT INTO "Cloze"."Gaps" VALUES (2, '2026-05-27 10:32:03.617502', 4, 1, 'fala', 'falar (ele)', '{}');
INSERT INTO "Cloze"."Gaps" VALUES (4, '2026-05-27 10:39:35.784005', 6, 0, 'é', '', '{está}');
INSERT INTO "Cloze"."Gaps" VALUES (5, '2026-05-27 14:22:26.194889', 7, 0, 'está', '', '{é}');
INSERT INTO "Cloze"."Gaps" VALUES (6, '2026-05-27 14:23:22.517922', 8, 0, 'são', '', '{estão}');
INSERT INTO "Cloze"."Gaps" VALUES (7, '2026-05-27 14:25:29.925538', 9, 0, 'ésta', '', '{é}');
INSERT INTO "Cloze"."Gaps" VALUES (8, '2026-05-27 14:28:46.115791', 10, 0, 'está', '', '{é}');
INSERT INTO "Cloze"."Gaps" VALUES (9, '2026-05-27 14:30:02.638031', 11, 0, 'é', '', '{está}');
INSERT INTO "Cloze"."Gaps" VALUES (10, '2026-05-27 14:30:35.591082', 12, 0, 'estou', '', '{sou}');
INSERT INTO "Cloze"."Gaps" VALUES (11, '2026-05-27 14:31:13.795178', 13, 0, 'está', '', '{é}');
INSERT INTO "Cloze"."Gaps" VALUES (12, '2026-05-27 14:33:05.395242', 14, 0, 'estão', '', '{são}');
INSERT INTO "Cloze"."Gaps" VALUES (13, '2026-05-27 14:34:15.391661', 15, 0, 'está', '', '{é}');
INSERT INTO "Cloze"."Gaps" VALUES (14, '2026-05-27 14:35:18.591189', 16, 0, 'é', '', '{está}');
INSERT INTO "Cloze"."Gaps" VALUES (15, '2026-05-27 14:39:11.621466', 17, 0, 'é', '', '{está}');
INSERT INTO "Cloze"."Gaps" VALUES (16, '2026-05-27 14:39:11.621466', 17, 1, 'está', '', '{é}');
INSERT INTO "Cloze"."Gaps" VALUES (17, '2026-05-27 14:40:44.572976', 18, 0, 'é', '', '{está}');
INSERT INTO "Cloze"."Gaps" VALUES (18, '2026-05-27 14:42:27.023795', 19, 0, 'estão', '', '{são}');
INSERT INTO "Cloze"."Gaps" VALUES (19, '2026-05-27 14:44:38.944732', 20, 0, 'estamos', '', '{somos}');

-- sync id sequence
SELECT setval(
    '"Cloze"."Gaps_id_seq"',
    (SELECT MAX(id) FROM "Cloze"."Gaps")
);

-- migrate:down
DELETE FROM "Cloze"."Gaps";
