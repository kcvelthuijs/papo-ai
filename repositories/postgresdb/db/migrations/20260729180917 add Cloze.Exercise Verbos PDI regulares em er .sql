-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(3, 'cloze-click-test', 'Verbos regulares em -er (Presente do indicativo)', 'Aprende a conjugar os verbos regulares terminados em -er no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.');

SELECT "Cloze"."AddSentence"(
  3, 1, 
    ARRAY['Nós ',' um jantar delicioso'],
    '[{
          "language": "nl",
          "text": "Wij eten een heerlijke maaltijd."
      }]'::jsonb,
    '[{
          "correct": "comemos",
          "alt": [],
          "hint": "comer (nós)"
      }]'::jsonb
  );

SELECT "Cloze"."AddSentence"(
    3, 2,
    ARRAY['Elas', 'um copo de leite todos os dias.' ],
    '[{
        "language": "nl",
        "text": "Zij drinken elke dag een glas melk."
      }]'::jsonb,
    '[{
          "correct": "bebem",
          "alt": [],
          "hint": "beber (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 3,
    ARRAY['Tu ', ' água ao pequeno-almoço.'],
    '[{
        "language": "nl",
        "text": "Jij drinkt water bij het ontbijt."
    }]'::jsonb,
    '[{
        "correct": "bebes",
        "alt": [],
        "hint": "beber (tu)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 4,
    ARRAY['Nós ', ' português na escola.'],
    '[{
        "language": "nl",
        "text": "Wij leren Portugees op school."
    }]'::jsonb,
    '[{
        "correct": "aprendemos",
        "alt": [],
        "hint": "aprender (nós)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 5,
    ARRAY['Ela ', ' uma carta ao amigo.'],
    '[{
        "language": "nl",
        "text": "Zij schrijft een brief aan haar vriend."
    }]'::jsonb,
    '[{
        "correct": "escreve",
        "alt": [],
        "hint": "escrever (ela)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 6,
    ARRAY['Vocês ', ' muito depressa.'],
    '[{
        "language": "nl",
        "text": "Jullie rennen erg snel."
    }]'::jsonb,
    '[{
        "correct": "correm",
        "alt": [],
        "hint": "correr (vocês)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 7,
    ARRAY['Ele ', ' fruta no mercado.'],
    '[{
        "language": "nl",
        "text": "Hij verkoopt fruit op de markt."
    }]'::jsonb,
    '[{
        "correct": "vende",
        "alt": [],
        "hint": "vender (ele)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 8,
    ARRAY['Eu ', ' sempre aos meus amigos.'],
    '[{
        "language": "nl",
        "text": "Ik antwoord altijd mijn vrienden."
    }]'::jsonb,
    '[{
        "correct": "respondo",
        "alt": [],
        "hint": "responder (eu)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 9,
    ARRAY['Nós ', ' estudar para o teste.'],
    '[{
        "language": "nl",
        "text": "Wij moeten studeren voor de toets."
    }]'::jsonb,
    '[{
        "correct": "devemos",
        "alt": [],
        "hint": "dever (nós)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 10,
    ARRAY['Eles ', ' em Lisboa.'],
    '[{
        "language": "nl",
        "text": "Zij wonen in Lissabon."
    }]'::jsonb,
    '[{
        "correct": "vivem",
        "alt": [],
        "hint": "viver (eles)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 11,
    ARRAY['Tu ', ' o telefone rapidamente.'],
    '[{
        "language": "nl",
        "text": "Jij neemt snel de telefoon op."
    }]'::jsonb,
    '[{
        "correct": "atendes",
        "alt": [],
        "hint": "atender (tu)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 12,
    ARRAY['Ela ', ' à porta antes de entrar.'],
    '[{
        "language": "nl",
        "text": "Zij klopt op de deur voordat ze binnenkomt."
    }]'::jsonb,
    '[{
        "correct": "bate",
        "alt": [],
        "hint": "bater (ela)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 13,
    ARRAY['Vocês ', ' a pergunta.'],
    '[{
        "language": "nl",
        "text": "Jullie begrijpen de vraag."
    }]'::jsonb,
    '[{
        "correct": "compreendem",
        "alt": [],
        "hint": "compreender (vocês)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 14,
    ARRAY['A criança ', ' muito depressa.'],
    '[{
        "language": "nl",
        "text": "Het kind groeit erg snel."
    }]'::jsonb,
    '[{
        "correct": "cresce",
        "alt": [],
        "hint": "crescer (ela)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 15,
    ARRAY['Eu ', ' o livro à biblioteca.'],
    '[{
        "language": "nl",
        "text": "Ik breng het boek terug naar de bibliotheek."
    }]'::jsonb,
    '[{
        "correct": "devolvo",
        "alt": [],
        "hint": "devolver (eu)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 16,
    ARRAY['Nós ', ' o café com uma colher.'],
    '[{
        "language": "nl",
        "text": "Wij roeren de koffie met een lepel."
    }]'::jsonb,
    '[{
        "correct": "mexemos",
        "alt": [],
        "hint": "mexer (nós)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 17,
    ARRAY['Ela ', ' leite todas as manhãs.'],
    '[{
        "language": "nl",
        "text": "Zij drinkt elke ochtend melk."
    }]'::jsonb,
    '[{
        "correct": "bebe",
        "alt": [],
        "hint": "beber (ela)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 18,
    ARRAY['Eles ', ' uma casa muito bonita.'],
    '[{
        "language": "nl",
        "text": "Zij kiezen een heel mooi huis."
    }]'::jsonb,
    '[{
        "correct": "escolhem",
        "alt": [],
        "hint": "escolher (eles)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 19,
    ARRAY['Tu ', ' uma encomenda hoje.'],
    '[{
        "language": "nl",
        "text": "Jij ontvangt vandaag een pakket."
    }]'::jsonb,
    '[{
        "correct": "recebes",
        "alt": [],
        "hint": "receber (tu)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 20,
    ARRAY['Nós ', ' todos os dias no parque.'],
    '[{
        "language": "nl",
        "text": "Wij rennen elke dag in het park."
    }]'::jsonb,
    '[{
        "correct": "corremos",
        "alt": [],
        "hint": "correr (nós)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 21,
    ARRAY['O agricultor ', ' legumes frescos.'],
    '[{
        "language": "nl",
        "text": "De boer verkoopt verse groenten."
    }]'::jsonb,
    '[{
        "correct": "vende",
        "alt": [],
        "hint": "vender (ele)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 22,
    ARRAY['Vocês ', ' muito depressa.'],
    '[{
        "language": "nl",
        "text": "Jullie leren heel snel."
    }]'::jsonb,
    '[{
        "correct": "aprendem",
        "alt": [],
        "hint": "aprender (vocês)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 23,
    ARRAY['Eu ', ' todas as cartas no mesmo dia.'],
    '[{
        "language": "nl",
        "text": "Ik beantwoord alle brieven op dezelfde dag."
    }]'::jsonb,
    '[{
        "correct": "respondo",
        "alt": [],
        "hint": "responder (eu)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 24,
    ARRAY['Ela ', ' o presente ao amigo.'],
    '[{
        "language": "nl",
        "text": "Zij geeft het cadeau terug aan haar vriend."
    }]'::jsonb,
    '[{
        "correct": "devolve",
        "alt": [],
        "hint": "devolver (ela)"
    }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 25,
    ARRAY['Eles ', ' a sopa antes de servir.'],
    '[{
        "language": "nl",
        "text": "Zij roeren de soep voordat ze die serveren."
    }]'::jsonb,
    '[{
        "correct": "mexem",
        "alt": [],
        "hint": "mexer (eles)"
    }]'::jsonb
);

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (18, 'grammar', 'A1', 'Verbos regulares em -er (Presente do indicativo)', 'Aprende a conjugar os verbos regulares terminados em -er no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.', '{portuguese.png}');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (18, 1, 'cloze', 3);

-- migrate:down
DELETE FROM "Lesson"."Exercises"
  WHERE "exerciseType" = 'close'
    AND "exerciseId" = 3;

DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 3;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 3;



