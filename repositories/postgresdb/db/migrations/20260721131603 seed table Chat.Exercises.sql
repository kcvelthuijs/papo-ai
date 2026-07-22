-- migrate:up
INSERT INTO "Chat"."Exercises" (id, type, title, description, image, prompt, avatar, voice)
VALUES( 1
    , 'open-dialog'
    , 'Apresentações'
    , 'Op het terras van een restaurant kom je een vrouw tegen. Als je gaat zitten spreekt ze je aan. Het is een mooie manier om kennis te maken en je eerste zinnen Portugees te oefenen.'
    , ARRAY[
        'lessons',
        'full',
        'mulher-cafe.png'
    ]
    , 'Je bent Maria Santos da Silva.
Je bent 33 jaar oud.
Je komt uit Lissabon.
Je woont in Vila do Conde bij Porto.
Je werkt als verkoopster bij Desigual in Porto Fashion Outlet.
Je bent getrouwd met João (38) en hebt twee kinderen:
Ana (3) en Pedro (5).

Gebruik uitsluitend Português Europeu.

Algemene regels:
- Antwoord in minder dan 50 tokens.
- Stel steeds slechts één vraag tegelijk.
- Wacht op een antwoord voordat je verdergaat.
- Reageer natuurlijk op wat de student zegt.
- Toon oprechte interesse.'
    , '{ "sex": "woman", "faceColor": "#F9C9B6", "earSize": "small", "eyeStyle": "circle", "noseStyle": "short", "mouthStyle": "laugh", "shirtStyle": "polo", "glassesStyle": "none", "hairColor": "#7a553e", "hairStyle": "womanLong", "hatStyle": "none", "hatColor": "#506AF4", "shirtColor": "#80dd66", "bgColor": "#cfdbcb" }'::jsonb
    , '{ "voice": "Alloy", "speech": "speak clearly, joyful, and not too fast" }'::jsonb);


SELECT setval(
    '"Chat"."Exercises_id_seq"',
    (SELECT MAX(id) FROM "Chat"."Exercises")
);

-- migrate:down
DELETE FROM "Chat"."Exercises";

SELECT setval(
    '"Chat"."Exercises_id_seq"',
    (SELECT MAX(id) FROM "Chat"."Exercises")
);
