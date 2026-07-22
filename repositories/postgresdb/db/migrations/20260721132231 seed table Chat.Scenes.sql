-- migrate:up
INSERT INTO "Chat"."Scenes" ( "exerciseId", "sequenceNumber", title, prompt, words, "completionRules" )
VALUES ( 1, 1, 'Nome'
    , 'Doel: Maak kennis.
        Instructies:
        - Stel jezelf voor met naam en leeftijd.
        - Vraag naar de naam van de ander.
        - Kom erachter of de ander een man of een vrouw is zonder dat expliciet te vragen
        - Vraag daarna naar de leeftijd.
        - Stel verder geen andere vragen.'
    , ARRAY[
        'nome', 'apelido',
        'mulher', 'homem',
        'idade', 'anos']
    , '{"requiredInformation": [
        "person_first_name"
        , "person_last_name"
        , "person_gender"
        , "person_age"]}'::jsonb)

    , ( 1, 2, 'Origem'
    , 'Doel: weet waar de ander vandaan komt.
        Instructies:
        - Vraag waar de ander vandaan komt.
        - Vraag waar hij of zij nu woont.
        - Vraag naar de nationaliteit
        - Vraag eventueel 1 keer door.
        Praat nog niet over werk of studie.'
    , ARRAY['morar', 'país', 'nacionalidade']
    , '{"requiredInformation": [
        "person_origin",
        "person_residence",
        "person_country",
        "person_nationality"]}'::jsonb)
        
    , ( 1, 3, 'Familia'
    , 'Doel: Leer de gezinssituatie kennen.
        Instructies:
        - Vraag of de ander getrouwd is of getrouwd is geweest.
        - Vraag of de ander kinderen heeft.
        - Vraag eventueel naar de leeftijd van de kinderen.
        Vertel kort over je eigen gezin.'
    , ARRAY[ 'marido', 'solteiro', 'casado', 'filhos']
    ,'{"requiredInformation": [
        "person_marital_status",
        "person_children"]}'::jsonb)

    , ( 1, 4, 'Trabalho'
    , 'Doel: Praat over het werk
        Instructies:
        - Vraag het beroep
        - Informeer naar de werkgever of het een groot bedrijf is
        - Hoe de ander naar het werk reist
        Vertel ook iets over je eigen werk.'
    , ARRAY[ 'profissão' ]
    , '{"requiredInformation": [
        "person_profession",
        "person_employer"]}'::jsonb)

    , ( 1, 5, 'Passatempos'
    , 'Doel: praat over hobby''s
        Instructies:
        - Vraag naar hobby''s zoals: sport, lezen, film, muziek, uitgaan.
        - Vraag door als de ander enthousiast lijkt.
        Vertel ook over je eigen hobbies.'
    , ARRAY[ 'desporto', 'livro', 'filme', 'música', 'gosta', 'discoteca', 'bar', 'festival']
    ,'{"requiredInformation": [
        "person_hobbies"]}'::jsonb)

    , (1, 6, 'Portugal'
    , 'Doel: Praat over Portugal en waarom de ander Portugees wil leren.
        Instructies:
        - Vraag of de ander in Portugal is geweest en, zo ja, wanneer
        - Vraag waar hij/zij geweest is en wat hij/zij daar gedaan heeft
        - Vraag wat er zo leuk is aan Portugal
        Vul aan met eigen ervaringen en persoonlijke tips.'
    , ARRAY[ 'museu', 'cidade', 'relaxante', 'praia', 'vezes'] 
    ,'{"requiredInformation": [
        "number_of_visits",
        "cities_visited",
        "reasons_to_visit"]}'::jsonb);

-- migrate:down
DELETE FROM "Chat"."Scenes";
