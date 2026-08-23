-- migrate:up
SELECT "Cloze"."AddSentence"(
    1, 17,
    ARRAY['A Maria ', ' muito simpática.' ],
    '[{
        "language": "NL",
        "text": "Maria is erg aardig."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 18,
    ARRAY['Os meus pais ', ' professores.' ],
    '[{
        "language": "NL",
        "text": "Mijn ouders zijn leraren."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 19,
    ARRAY['Hoje ', ' muito cansado.' ],
    '[{
        "language": "NL",
        "text": "Vandaag ben ik erg moe."
      }]'::jsonb,
    '[{
        "correct": "sou",
        "alt": ["és", "é", "somos", "são"],
        "hint": "ser (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 20,
    ARRAY['Os estudantes ', ' muito dedicados.' ],
    '[{
        "language": "NL",
        "text": "De studenten zijn erg toegewijd."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 21,
    ARRAY['Tu ', ' muito paciente com as crianças.' ],
    '[{
        "language": "NL",
        "text": "Je bent erg geduldig met de kinderen."
      }]'::jsonb,
    '[{
        "correct": "és",
        "alt": ["sou", "é", "somos", "são"],
        "hint": "ser (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 22,
    ARRAY['O meu irmão ', ' médico.' ],
    '[{
        "language": "NL",
        "text": "Mijn broer is arts."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 23,
    ARRAY['Eu e a Ana ', ' bons amigos.' ],
    '[{
        "language": "NL",
        "text": "Ana en ik zijn goede vrienden."
      }]'::jsonb,
    '[{
        "correct": "somos",
        "alt": ["sou", "és", "é", "são"],
        "hint": "ser (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 24,
    ARRAY['Estas casas ', ' muito antigas.' ],
    '[{
        "language": "NL",
        "text": "Deze huizen zijn erg oud."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 25,
    ARRAY['Nós ', ' de Portugal.' ],
    '[{
        "language": "NL",
        "text": "Wij komen uit Portugal."
      }]'::jsonb,
    '[{
        "correct": "somos",
        "alt": ["sou", "és", "é", "são"],
        "hint": "ser (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 26,
    ARRAY['O Pedro e a Sofia ', ' irmãos.' ],
    '[{
        "language": "NL",
        "text": "Pedro en Sofia zijn broer en zus."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 27,
    ARRAY['O café ', ' muito quente.' ],
    '[{
        "language": "NL",
        "text": "De koffie is erg heet."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 28,
    ARRAY['Os meus amigos ', ' de Lisboa.' ],
    '[{
        "language": "NL",
        "text": "Mijn vrienden komen uit Lissabon."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 29,
    ARRAY['Esta cidade ', ' muito bonita.' ],
    '[{
        "language": "NL",
        "text": "Deze stad is erg mooi."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 30,
    ARRAY['Hoje ', ' responsável por este projeto.' ],
    '[{
        "language": "NL",
        "text": "Vandaag ben ik verantwoordelijk voor dit project."
      }]'::jsonb,
    '[{
        "correct": "sou",
        "alt": ["és", "é", "somos", "são"],
        "hint": "ser (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 31,
    ARRAY['Tu ', ' muito bom neste jogo.' ],
    '[{
        "language": "NL",
        "text": "Je bent erg goed in dit spel."
      }]'::jsonb,
    '[{
        "correct": "és",
        "alt": ["sou", "é", "somos", "são"],
        "hint": "ser (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 32,
    ARRAY['A Ana e eu ', ' colegas de trabalho.' ],
    '[{
        "language": "NL",
        "text": "Ana en ik zijn collega''s."
      }]'::jsonb,
    '[{
        "correct": "somos",
        "alt": ["sou", "és", "é", "são"],
        "hint": "ser (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 33,
    ARRAY['Estas flores ', ' muito bonitas.' ],
    '[{
        "language": "NL",
        "text": "Deze bloemen zijn erg mooi."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 34,
    ARRAY['O meu irmão e a minha irmã ', ' estudantes.' ],
    '[{
        "language": "NL",
        "text": "Mijn broer en mijn zus zijn studenten."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 35,
    ARRAY['Aquela casa ', ' muito antiga.' ],
    '[{
        "language": "NL",
        "text": "Dat huis is erg oud."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 36,
    ARRAY['Hoje ', ' muito felizes por estar aqui.' ],
    '[{
        "language": "NL",
        "text": "Vandaag zijn we erg blij om hier te zijn."
      }]'::jsonb,
    '[{
        "correct": "somos",
        "alt": ["sou", "és", "é", "são"],
        "hint": "ser (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 37,
    ARRAY['O meu pai ', ' engenheiro.' ],
    '[{
        "language": "NL",
        "text": "Mijn vader is ingenieur."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 38,
    ARRAY['Os meus vizinhos ', ' muito simpáticos.' ],
    '[{
        "language": "NL",
        "text": "Mijn buren zijn erg aardig."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 39,
    ARRAY['Hoje ', ' o primeiro a chegar.' ],
    '[{
        "language": "NL",
        "text": "Vandaag ben ik de eerste die aankomt."
      }]'::jsonb,
    '[{
        "correct": "sou",
        "alt": ["és", "é", "somos", "são"],
        "hint": "ser (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 40,
    ARRAY['Tu ', ' uma pessoa muito paciente.' ],
    '[{
        "language": "NL",
        "text": "Je bent een erg geduldig persoon."
      }]'::jsonb,
    '[{
        "correct": "és",
        "alt": ["sou", "é", "somos", "são"],
        "hint": "ser (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 41,
    ARRAY['A minha irmã ', ' médica.' ],
    '[{
        "language": "NL",
        "text": "Mijn zus is arts."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 42,
    ARRAY['Eu e o Pedro ', ' bons amigos.' ],
    '[{
        "language": "NL",
        "text": "Pedro en ik zijn goede vrienden."
      }]'::jsonb,
    '[{
        "correct": "somos",
        "alt": ["sou", "és", "é", "são"],
        "hint": "ser (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 43,
    ARRAY['Estas ruas ', ' muito estreitas.' ],
    '[{
        "language": "NL",
        "text": "Deze straten zijn erg smal."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 44,
    ARRAY['O restaurante ', ' muito popular entre os turistas.' ],
    '[{
        "language": "NL",
        "text": "Het restaurant is erg populair onder toeristen."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 45,
    ARRAY['Os meus colegas ', ' muito trabalhadores.' ],
    '[{
        "language": "NL",
        "text": "Mijn collega''s zijn erg hardwerkend."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 46,
    ARRAY['Neste momento, ', ' muito ocupado.' ],
    '[{
        "language": "NL",
        "text": "Op dit moment ben ik erg druk."
      }]'::jsonb,
    '[{
        "correct": "sou",
        "alt": ["és", "é", "somos", "são"],
        "hint": "ser (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 47,
    ARRAY['Vocês ', ' sempre bem-vindos aqui.' ],
    '[{
        "language": "NL",
        "text": "Jullie zijn hier altijd welkom."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 48,
    ARRAY['Aquela montanha ', ' muito alta.' ],
    '[{
        "language": "NL",
        "text": "Die berg is erg hoog."
      }]'::jsonb,
    '[{
        "correct": "é",
        "alt": ["sou", "és", "somos", "são"],
        "hint": "ser (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 49,
    ARRAY['Eu e a minha família ', ' de Portugal.' ],
    '[{
        "language": "NL",
        "text": "Mijn familie en ik komen uit Portugal."
      }]'::jsonb,
    '[{
        "correct": "somos",
        "alt": ["sou", "és", "é", "são"],
        "hint": "ser (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    1, 50,
    ARRAY['As crianças ', ' muito felizes hoje.' ],
    '[{
        "language": "NL",
        "text": "De kinderen zijn vandaag erg blij."
      }]'::jsonb,
    '[{
        "correct": "são",
        "alt": ["sou", "és", "é", "somos"],
        "hint": "ser (elas)"
      }]'::jsonb
);


-- migrate:down

