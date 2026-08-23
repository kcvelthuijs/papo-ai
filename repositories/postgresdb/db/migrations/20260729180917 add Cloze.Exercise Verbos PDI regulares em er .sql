-- migrate:up
INSERT INTO "Cloze"."Exercises" (id, type, title, description) VALUES 
(3, 'cloze-click-test', 'Presente do indicativo:\nVerbos regulares em -er', 'Aprende a conjugar os verbos regulares terminados em -er no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.');

INSERT INTO "Lesson"."Lessons" (id, type, level, title, description, image ) 
VALUES (18, 'grammar', 'A1', 'Presente do indicativo: Verbos regulares em -er', 'Aprende a conjugar os verbos regulares terminados em -er no presente do indicativo. Pratica as formas mais usadas e ganha confiança para construir frases do dia a dia.', '{portuguese.png}');

INSERT INTO "Lesson"."Exercises" ("lessonId", "seqNumber", "exerciseType", "exerciseId" )
VALUES (18, 1, 'cloze', 3);

SELECT "Cloze"."AddSentence"(
    3, 1,
    ARRAY['Todos os dias, eu ', ' fruta ao pequeno-almoço.' ],
    '[{
        "language": "NL",
        "text": "Elke dag eet ik fruit als ontbijt."
      }]'::jsonb,
    '[{
        "correct": "como",
        "alt": ["comes", "come", "comemos", "comem"],
        "hint": "comer (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 2,
    ARRAY['De manhã, os meus filhos ', ' no parque.' ],
    '[{
        "language": "NL",
        "text": "''s Ochtends rennen mijn kinderen in het park."
      }]'::jsonb,
    '[{
        "correct": "correm",
        "alt": ["corro", "corres", "corre", "corremos"],
        "hint": "correr (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 3,
    ARRAY['Na loja, Maria ', ' roupas muito bonitas.' ],
    '[{
        "language": "NL",
        "text": "In de winkel verkoopt Maria heel mooie kleding."
      }]'::jsonb,
    '[{
        "correct": "vende",
        "alt": ["vendo", "vendes", "vendemos", "vendem"],
        "hint": "vender (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 4,
    ARRAY['Depois do jantar, nós ', ' um copo de água.' ],
    '[{
        "language": "NL",
        "text": "Na het eten drinken we een glas water."
      }]'::jsonb,
    '[{
        "correct": "bebemos",
        "alt": ["bebo", "bebes", "bebe", "bebem"],
        "hint": "beber (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 5,
    ARRAY['Ao domingo, a família ', ' junta em casa.' ],
    '[{
        "language": "NL",
        "text": "Op zondag eet de familie samen thuis."
      }]'::jsonb,
    '[{
        "correct": "come",
        "alt": ["como", "comes", "comemos", "comem"],
        "hint": "comer (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 6,
    ARRAY['Quando está atrasado, o João ', ' para o autocarro.' ],
    '[{
        "language": "NL",
        "text": "Wanneer João te laat is, rent hij naar de bus."
      }]'::jsonb,
    '[{
        "correct": "corre",
        "alt": ["corro", "corres", "corremos", "correm"],
        "hint": "correr (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 7,
    ARRAY['No mercado, nós ', ' legumes frescos.' ],
    '[{
        "language": "NL",
        "text": "Op de markt verkopen we verse groenten."
      }]'::jsonb,
    '[{
        "correct": "vendemos",
        "alt": ["vendo", "vendes", "vende", "vendem"],
        "hint": "vender (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 8,
    ARRAY['Depois do treino, vocês ', ' muita água.' ],
    '[{
        "language": "NL",
        "text": "Na de training drinken jullie veel water."
      }]'::jsonb,
    '[{
        "correct": "bebem",
        "alt": ["bebo", "bebes", "bebe", "bebemos"],
        "hint": "beber (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 9,
    ARRAY['Antes de sair, tu ', ' alguma coisa.' ],
    '[{
        "language": "NL",
        "text": "Voordat je weggaat, eet je iets."
      }]'::jsonb,
    '[{
        "correct": "comes",
        "alt": ["como", "come", "comemos", "comem"],
        "hint": "comer (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 10,
    ARRAY['Durante a corrida, ', ' muito depressa.' ],
    '[{
        "language": "NL",
        "text": "Tijdens het hardlopen rennen we heel snel."
      }]'::jsonb,
    '[{
        "correct": "corremos",
        "alt": ["corro", "corres", "corre", "correm"],
        "hint": "correr (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 11,
    ARRAY['Todas as semanas, eu ', ' uma carta para a minha avó.' ],
    '[{
        "language": "NL",
        "text": "Elke week schrijf ik een brief aan mijn oma."
      }]'::jsonb,
    '[{
        "correct": "escrevo",
        "alt": ["escreves", "escreve", "escrevemos", "escrevem"],
        "hint": "escrever (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 12,
    ARRAY['De manhã, nós ', ' muitos e-mails.' ],
    '[{
        "language": "NL",
        "text": "''s Ochtends ontvangen we veel e-mails."
      }]'::jsonb,
    '[{
        "correct": "recebemos",
        "alt": ["recebo", "recebes", "recebe", "recebem"],
        "hint": "receber (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 13,
    ARRAY['Na escola, os alunos ', ' pessoas de diferentes países.' ],
    '[{
        "language": "NL",
        "text": "Op school leren de leerlingen mensen uit verschillende landen kennen."
      }]'::jsonb,
    '[{
        "correct": "conhecem",
        "alt": ["conheço", "conheces", "conhece", "conhecemos"],
        "hint": "conhecer (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 14,
    ARRAY['Para o exame, Maria ', ' português todos os dias.' ],
    '[{
        "language": "NL",
        "text": "Voor het examen leert Maria elke dag Portugees."
      }]'::jsonb,
    '[{
        "correct": "aprende",
        "alt": ["aprendo", "aprendes", "aprendemos", "aprendem"],
        "hint": "aprender (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 15,
    ARRAY['Antes de dormir, ', ' algumas páginas do meu livro.' ],
    '[{
        "language": "NL",
        "text": "Voor het slapen gaan schrijf ik een paar pagina''s van mijn boek."
      }]'::jsonb,
    '[{
        "correct": "escrevo",
        "alt": ["escreves", "escreve", "escrevemos", "escrevem"],
        "hint": "escrever (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 16,
    ARRAY['Todos os meses, vocês ', ' notícias da família.' ],
    '[{
        "language": "NL",
        "text": "Elke maand ontvangen jullie nieuws van de familie."
      }]'::jsonb,
    '[{
        "correct": "recebem",
        "alt": ["recebo", "recebes", "recebe", "recebemos"],
        "hint": "receber (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 17,
    ARRAY['No trabalho, eu ', ' muitas pessoas novas.' ],
    '[{
        "language": "NL",
        "text": "Op mijn werk leer ik veel nieuwe mensen kennen."
      }]'::jsonb,
    '[{
        "correct": "conheço",
        "alt": ["conheces", "conhece", "conhecemos", "conhecem"],
        "hint": "conhecer (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 18,
    ARRAY['Durante as férias, nós ', ' muito sobre a cultura local.' ],
    '[{
        "language": "NL",
        "text": "Tijdens de vakantie leren we veel over de lokale cultuur."
      }]'::jsonb,
    '[{
        "correct": "aprendemos",
        "alt": ["aprendo", "aprendes", "aprende", "aprendem"],
        "hint": "aprender (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 19,
    ARRAY['Depois do curso, os estudantes ', ' os seus próprios textos.' ],
    '[{
        "language": "NL",
        "text": "Na de cursus schrijven de studenten hun eigen teksten."
      }]'::jsonb,
    '[{
        "correct": "escrevem",
        "alt": ["escrevo", "escreves", "escreve", "escrevemos"],
        "hint": "escrever (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 20,
    ARRAY['Quando viajamos, ', ' muito sobre outros países.' ],
    '[{
        "language": "NL",
        "text": "Wanneer we reizen, leren we veel over andere landen."
      }]'::jsonb,
    '[{
        "correct": "aprendemos",
        "alt": ["aprendo", "aprendes", "aprende", "aprendem"],
        "hint": "aprender (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 21,
    ARRAY['Da janela, eu ', ' o mar ao longe.' ],
    '[{
        "language": "NL",
        "text": "Vanuit het raam zie ik de zee in de verte."
      }]'::jsonb,
    '[{
        "correct": "vejo",
        "alt": ["vês", "vê", "vemos", "veem"],
        "hint": "ver (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 22,
    ARRAY['Depois da explicação, nós ', ' tudo muito bem.' ],
    '[{
        "language": "NL",
        "text": "Na de uitleg begrijpen we alles heel goed."
      }]'::jsonb,
    '[{
        "correct": "entendemos",
        "alt": ["entendo", "entendes", "entende", "entendem"],
        "hint": "entender (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 23,
    ARRAY['Quando está muito ocupado, o Pedro ', ' frequentemente as chaves.' ],
    '[{
        "language": "NL",
        "text": "Wanneer Pedro het erg druk heeft, vergeet hij vaak zijn sleutels."
      }]'::jsonb,
    '[{
        "correct": "esquece",
        "alt": ["esqueço", "esqueces", "esquecemos", "esquecem"],
        "hint": "esquecer (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 24,
    ARRAY['Na próxima paragem, vocês ', ' do autocarro.' ],
    '[{
        "language": "NL",
        "text": "Bij de volgende halte stappen jullie uit de bus."
      }]'::jsonb,
    '[{
        "correct": "descem",
        "alt": ["desço", "desces", "desce", "descemos"],
        "hint": "descer (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 25,
    ARRAY['Todas as manhãs, ', ' os meus vizinhos na rua.' ],
    '[{
        "language": "NL",
        "text": "Elke ochtend zie ik mijn buren op straat."
      }]'::jsonb,
    '[{
        "correct": "vejo",
        "alt": ["vês", "vê", "vemos", "veem"],
        "hint": "ver (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 26,
    ARRAY['Os alunos ', ' melhor a matéria depois de praticarem.' ],
    '[{
        "language": "NL",
        "text": "De leerlingen begrijpen de stof beter nadat ze geoefend hebben."
      }]'::jsonb,
    '[{
        "correct": "entendem",
        "alt": ["entendo", "entendes", "entende", "entendemos"],
        "hint": "entender (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 27,
    ARRAY['Antes de sair de casa, tu ', ' sempre o telemóvel.' ],
    '[{
        "language": "NL",
        "text": "Voordat je van huis gaat, vergeet je altijd je telefoon."
      }]'::jsonb,
    '[{
        "correct": "esqueces",
        "alt": ["esqueço", "esquece", "esquecemos", "esquecem"],
        "hint": "esquecer (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 28,
    ARRAY['Depois do almoço, nós ', ' as escadas devagar.' ],
    '[{
        "language": "NL",
        "text": "Na de lunch lopen we langzaam de trap af."
      }]'::jsonb,
    '[{
        "correct": "descemos",
        "alt": ["desço", "desces", "desce", "descem"],
        "hint": "descer (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 29,
    ARRAY['Ao longe, os turistas ', ' uma montanha coberta de neve.' ],
    '[{
        "language": "NL",
        "text": "In de verte zien de toeristen een met sneeuw bedekte berg."
      }]'::jsonb,
    '[{
        "correct": "veem",
        "alt": ["vejo", "vês", "vê", "vemos"],
        "hint": "ver (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 30,
    ARRAY['Depois de ouvir a professora, ', ' a pergunta.' ],
    '[{
        "language": "NL",
        "text": "Nadat we de lerares hebben gehoord, begrijpen we de vraag."
      }]'::jsonb,
    '[{
        "correct": "entendemos",
        "alt": ["entendo", "entendes", "entende", "entendem"],
        "hint": "entender (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 31,
    ARRAY['Na cozinha, eu ', ' a sopa com uma colher.' ],
    '[{
        "language": "NL",
        "text": "In de keuken roer ik de soep met een lepel."
      }]'::jsonb,
    '[{
        "correct": "mexo",
        "alt": ["mexes", "mexe", "mexemos", "mexem"],
        "hint": "mexer (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 32,
    ARRAY['Todas as manhãs, o meu irmão ', ' à porta antes de entrar.' ],
    '[{
        "language": "NL",
        "text": "Elke ochtend klopt mijn broer op de deur voordat hij naar binnen gaat."
      }]'::jsonb,
    '[{
        "correct": "bate",
        "alt": ["bato", "bates", "batemos", "batem"],
        "hint": "bater (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 33,
    ARRAY['No inverno, ', ' muitas vezes nesta região.' ],
    '[{
        "language": "NL",
        "text": "In de winter regent het vaak in deze streek."
      }]'::jsonb,
    '[{
        "correct": "chove",
        "alt": ["chovo", "choves", "chovemos", "chovem"],
        "hint": "chover (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 34,
    ARRAY['Quando há clientes, a empregada ', ' sempre com um sorriso.' ],
    '[{
        "language": "NL",
        "text": "Wanneer er klanten zijn, helpt de medewerkster altijd met een glimlach."
      }]'::jsonb,
    '[{
        "correct": "atende",
        "alt": ["atendo", "atendes", "atendemos", "atendem"],
        "hint": "atender (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 35,
    ARRAY['Durante o jantar, nós ', ' frequentemente os talheres.' ],
    '[{
        "language": "NL",
        "text": "Tijdens het eten verplaatsen we het bestek vaak."
      }]'::jsonb,
    '[{
        "correct": "mexemos",
        "alt": ["mexo", "mexes", "mexe", "mexem"],
        "hint": "mexer (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 36,
    ARRAY['Quando chegam a casa, os rapazes ', ' à porta.' ],
    '[{
        "language": "NL",
        "text": "Wanneer de jongens thuiskomen, kloppen ze op de deur."
      }]'::jsonb,
    '[{
        "correct": "batem",
        "alt": ["bato", "bates", "bate", "batemos"],
        "hint": "bater (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 37,
    ARRAY['No outono, ', ' quase todos os dias.' ],
    '[{
        "language": "NL",
        "text": "In de herfst regent het bijna elke dag."
      }]'::jsonb,
    '[{
        "correct": "chove",
        "alt": ["chovo", "choves", "chovemos", "chovem"],
        "hint": "chover (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 38,
    ARRAY['No restaurante, nós ', ' os clientes rapidamente.' ],
    '[{
        "language": "NL",
        "text": "In het restaurant helpen we de klanten snel."
      }]'::jsonb,
    '[{
        "correct": "atendemos",
        "alt": ["atendo", "atendes", "atende", "atendem"],
        "hint": "atender (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 39,
    ARRAY['Antes de beber o café, tu ', ' a colher dentro da chávena.' ],
    '[{
        "language": "NL",
        "text": "Voordat je de koffie drinkt, beweeg je het lepeltje in het kopje."
      }]'::jsonb,
    '[{
        "correct": "mexes",
        "alt": ["mexo", "mexe", "mexemos", "mexem"],
        "hint": "mexer (tu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 40,
    ARRAY['Na loja, os funcionários ', ' os clientes com atenção.' ],
    '[{
        "language": "NL",
        "text": "In de winkel helpen de medewerkers de klanten aandachtig."
      }]'::jsonb,
    '[{
        "correct": "atendem",
        "alt": ["atendo", "atendes", "atende", "atendemos"],
        "hint": "atender (eles)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 41,
    ARRAY['Às vezes, coisas inesperadas ', ' durante a viagem.' ],
    '[{
        "language": "NL",
        "text": "Soms gebeuren er onverwachte dingen tijdens de reis."
      }]'::jsonb,
    '[{
        "correct": "acontecem",
        "alt": ["aconteço", "aconteces", "acontece", "acontecemos"],
        "hint": "acontecer (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 42,
    ARRAY['Quando o professor faz uma pergunta, eu ', ' imediatamente.' ],
    '[{
        "language": "NL",
        "text": "Wanneer de leraar een vraag stelt, antwoord ik onmiddellijk."
      }]'::jsonb,
    '[{
        "correct": "respondo",
        "alt": ["respondes", "responde", "respondemos", "respondem"],
        "hint": "responder (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 43,
    ARRAY['Depois da chuva, o céu ', ' mais claro.' ],
    '[{
        "language": "NL",
        "text": "Na de regen lijkt de lucht helderder."
      }]'::jsonb,
    '[{
        "correct": "parece",
        "alt": ["pareço", "pareces", "parecemos", "parecem"],
        "hint": "parecer (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 44,
    ARRAY['Agora que estudamos o assunto, nós ', ' melhor a situação.' ],
    '[{
        "language": "NL",
        "text": "Nu we het onderwerp hebben bestudeerd, begrijpen we de situatie beter."
      }]'::jsonb,
    '[{
        "correct": "percebemos",
        "alt": ["percebo", "percebes", "percebe", "percebem"],
        "hint": "perceber (nós)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 45,
    ARRAY['O que ', ' quando ninguém está em casa?' ],
    '[{
        "language": "NL",
        "text": "Wat gebeurt er wanneer niemand thuis is?"
      }]'::jsonb,
    '[{
        "correct": "acontece",
        "alt": ["aconteço", "aconteces", "acontecemos", "acontecem"],
        "hint": "acontecer (ele)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 46,
    ARRAY['Quando alguém me pergunta o caminho, eu ', ' com calma.' ],
    '[{
        "language": "NL",
        "text": "Wanneer iemand mij de weg vraagt, antwoord ik rustig."
      }]'::jsonb,
    '[{
        "correct": "respondo",
        "alt": ["respondes", "responde", "respondemos", "respondem"],
        "hint": "responder (eu)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 47,
    ARRAY['Com esta luz, a sala ', ' muito maior.' ],
    '[{
        "language": "NL",
        "text": "Met dit licht lijkt de kamer veel groter."
      }]'::jsonb,
    '[{
        "correct": "parece",
        "alt": ["pareço", "pareces", "parecemos", "parecem"],
        "hint": "parecer (ela)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 48,
    ARRAY['Depois de algum tempo, vocês ', ' que estavam no lugar errado.' ],
    '[{
        "language": "NL",
        "text": "Na enige tijd beseffen jullie dat jullie op de verkeerde plek waren."
      }]'::jsonb,
    '[{
        "correct": "percebem",
        "alt": ["percebo", "percebes", "percebe", "percebemos"],
        "hint": "perceber (vocês)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 49,
    ARRAY['Durante o jogo, muitas coisas ', ' ao mesmo tempo.' ],
    '[{
        "language": "NL",
        "text": "Tijdens de wedstrijd gebeuren er veel dingen tegelijk."
      }]'::jsonb,
    '[{
        "correct": "acontecem",
        "alt": ["aconteço", "aconteces", "acontece", "acontecemos"],
        "hint": "acontecer (elas)"
      }]'::jsonb
);

SELECT "Cloze"."AddSentence"(
    3, 50,
    ARRAY['Depois de ouvir a explicação, ', ' finalmente o problema.' ],
    '[{
        "language": "NL",
        "text": "Na de uitleg te hebben gehoord, begrijpen we eindelijk het probleem."
      }]'::jsonb,
    '[{
        "correct": "percebemos",
        "alt": ["percebo", "percebes", "percebe", "percebem"],
        "hint": "perceber (nós)"
      }]'::jsonb
);

-- migrate:down
DELETE FROM "Lesson"."Exercises"
  WHERE "lessonId" = 18;

DELETE FROM "Cloze"."Sentences"
  WHERE "exerciseId" = 3;

DELETE FROM "Cloze"."Exercises"
  WHERE id = 3;

DELETE FROM "Lesson"."Lessons"
  WHERE "id" = 18;
