\restrict dbmate

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Babel; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Babel";


--
-- Name: Card; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Card";


--
-- Name: Chat; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Chat";


--
-- Name: Cloze; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Cloze";


--
-- Name: Lesson; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Lesson";


--
-- Name: Verb; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "Verb";


--
-- Name: AddSentence(integer, integer, text[], jsonb, jsonb); Type: FUNCTION; Schema: Cloze; Owner: -
--

CREATE FUNCTION "Cloze"."AddSentence"(p_exercise_id integer, p_sequence integer, p_textparts text[], p_translations jsonb, p_gaps jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$

DECLARE
    v_sentence_id integer;
    v_translation jsonb;
    v_gap jsonb;
    v_index integer := 0;
BEGIN
    -------------------------------------------------
    -- Sentence toevoegen
    -------------------------------------------------
    INSERT INTO "Cloze"."Sentences" (
        "exerciseId",
        "sequence",
        textparts
    )
    VALUES (
        p_exercise_id,
        p_sequence,
        p_textparts
    )
    RETURNING id INTO v_sentence_id;

    -------------------------------------------------
    -- Translations toevoegen
    -------------------------------------------------
    FOR v_translation IN
        SELECT * FROM jsonb_array_elements(p_translations)
    LOOP
        INSERT INTO "Babel"."Texts" (
            "tableName",
            "keyId",
            "language",
            "text"
        )
        VALUES (
            'Cloze.Sentences',
            v_sentence_id,
            v_translation->>'language',
            v_translation->>'text'
        );
    END LOOP;

    -------------------------------------------------
    -- Gaps toevoegen
    -------------------------------------------------
    FOR v_gap IN
        SELECT * FROM jsonb_array_elements(p_gaps)
    LOOP
        INSERT INTO "Cloze"."Gaps" (
            "sentenceId",
            position,
            correct,
            alt,
            hint
        )
        VALUES (
            v_sentence_id,
            v_index,
            v_gap->>'correct',
            COALESCE(
                ARRAY(
                    SELECT jsonb_array_elements_text(v_gap->'alt')
                ),
                ARRAY[]::text[]
            ),
            v_gap->>'hint'
        );
        v_index := v_index + 1;
    END LOOP;

    -------------------------------------------------
    -- Resultaat teruggeven
    -------------------------------------------------
    RETURN jsonb_build_object(
        'sentenceId', v_sentence_id,
        'exerciseId', p_exercise_id,
        'sequence', p_sequence
    );
END;
$$;


--
-- Name: DeleteSentence(integer, integer); Type: FUNCTION; Schema: Cloze; Owner: -
--

CREATE FUNCTION "Cloze"."DeleteSentence"(p_exercise_id integer, p_sequence integer) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$

DECLARE
    v_sentence_id integer;

BEGIN
    -------------------------------------------------
    -- Sentence id ophalen
    -------------------------------------------------
    SELECT id
    INTO v_sentence_id
    FROM "Cloze"."Sentences"
    WHERE "exerciseId" = p_exercise_id
      AND "sequence" = p_sequence;

    IF v_sentence_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'message', 'Sentence not found',
            'exerciseId', p_exercise_id,
            'sequence', p_sequence
        );
    END IF;

    -------------------------------------------------
    -- Babel teksten verwijderen
    -------------------------------------------------
    DELETE FROM "Babel"."Texts"
    WHERE "tableName" = 'Cloze.Sentences'
      AND "keyId" = v_sentence_id;

    -------------------------------------------------
    -- Sentence verwijderen
    -- Gaps worden via cascade verwijderd
    -------------------------------------------------
    DELETE FROM "Cloze"."Sentences"
    WHERE id = v_sentence_id;

    -------------------------------------------------
    -- Resultaat
    -------------------------------------------------
    RETURN jsonb_build_object(
        'success', true,
        'sentenceId', v_sentence_id,
        'exerciseId', p_exercise_id,
        'sequence', p_sequence
    );
END;
$$;


--
-- Name: GetCardExercise(integer, character varying); Type: FUNCTION; Schema: Lesson; Owner: -
--

CREATE FUNCTION "Lesson"."GetCardExercise"(p_exercise integer, p_language character varying DEFAULT 'NL'::character varying) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
BEGIN

    RETURN (
        SELECT jsonb_build_object(
            'id', ex.id,
            'type', ex.type,
            'title', ex.title,
            'description', ex.description,
            'image', ex.image,
            'items',
            COALESCE(
                (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id', di.sequence,
                            'question', tl.text,
                            'response', c.text,
                            'image', c.image
                        )
                        ORDER BY di.sequence
                    )
                    FROM "Card"."DeckItems" di
                    INNER JOIN "Card"."Cards" c
                        ON c.id = di."cardId"
                    LEFT JOIN "Babel"."Texts" tl
                        ON tl."tableName" = 'Card.Cards'
                       AND tl."keyId" = c.id
                       AND tl.language = p_language
                    WHERE di."deckId" = ex."deckId"
                ),
                '[]'::jsonb
            )
        )
        FROM "Card"."Exercises" ex
        WHERE ex.id = p_exercise
        LIMIT 1
    );
END;
$$;


--
-- Name: GetChatExercise(integer, character varying); Type: FUNCTION; Schema: Lesson; Owner: -
--

CREATE FUNCTION "Lesson"."GetChatExercise"(p_exercise integer, p_language character varying DEFAULT 'NL'::character varying) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN (
        SELECT jsonb_build_object(
            'id', e.id,
            'type', e.type,
            'title', e.title,
            'description', e.description,
            'image', e.image,
            'introduction', e.introduction,
            'prompt', e.prompt,
            'introduction', e.introduction,
            'words', to_jsonb(e.words),

            'meta', jsonb_build_object(
                'voice', e.voice,
                'avatar', e.avatar
            )
        )
        FROM "Chat"."Exercises" e
        WHERE e.id = p_exercise
        LIMIT 1
    );
END;
$$;


--
-- Name: GetClozeExercise(integer, character varying); Type: FUNCTION; Schema: Lesson; Owner: -
--

CREATE FUNCTION "Lesson"."GetClozeExercise"(p_exercise integer, p_language character varying DEFAULT 'NL'::character varying) RETURNS jsonb
    LANGUAGE sql
    AS $$
SELECT jsonb_build_object(
    'id', e.id,
    'type', e.type,
    'title', e.title,
    'description', e.description,
    'phrases', jsonb_agg(
        jsonb_build_object(
            'id', 's' || s.id,
            'textParts', s.textparts,
            'translation', bt.text,
            'gaps', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', 'g' || g.id,
                        'correct', g.correct,
                        'hint', g.hint,
                        'alt', g.alt
                    )
                    ORDER BY g.position
                )
                FROM "Cloze"."Gaps" g
                WHERE g."sentenceId" = s.id
            )
        )
        ORDER BY s.sequence
    )
)
FROM "Cloze"."Exercises" e
JOIN "Cloze"."Sentences" s
    ON s."exerciseId" = e.id
LEFT JOIN "Babel"."Texts" bt
    ON bt."tableName" = 'Cloze.Sentences'
    AND bt."keyId" = s.id
    AND bt."language" = p_language
WHERE e.id = p_exercise
GROUP BY
    e.id,
    e.type,
    e.title,
    e.description;
$$;


--
-- Name: GetVerbExercise(integer, character varying); Type: FUNCTION; Schema: Lesson; Owner: -
--

CREATE FUNCTION "Lesson"."GetVerbExercise"(p_exercise integer, p_language character varying DEFAULT 'NL'::character varying) RETURNS jsonb
    LANGUAGE sql
    AS $$
SELECT jsonb_build_object(
        'id', ve.id,
        'type', ve.type,
        'title', ve.title,
        'description', ve.description,
        'infinitive', vb.infinitive,
        'forms', jsonb_build_object(
            'p1ev', vb.p1ev,
            'p2ev', vb.p2ev,
            'p3ev', vb.p3ev,
            'p1mv', vb.p1mv,
            'p2mv', vb.p2mv,
            'p3mv', vb.p3mv
        )
    )
FROM "Lesson"."Exercises" le
JOIN "Verb"."Exercises" ve
    ON ve.id = le."exerciseId"
JOIN "Verb"."Verbs" vb
    ON vb.id = ve."verbId"
WHERE le."exerciseType" = 'verb'
  AND le."exerciseId" = p_exercise;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Texts; Type: TABLE; Schema: Babel; Owner: -
--

CREATE TABLE "Babel"."Texts" (
    id integer CONSTRAINT "Translations_id_not_null" NOT NULL,
    created_at timestamp without time zone DEFAULT now() CONSTRAINT "Translations_created_at_not_null" NOT NULL,
    "tableName" character varying(50) CONSTRAINT "Translations_tableName_not_null" NOT NULL,
    "keyId" integer CONSTRAINT "Translations_keyId_not_null" NOT NULL,
    language character varying(3) CONSTRAINT "Translations_language_not_null" NOT NULL,
    text text
);


--
-- Name: Texts_id_seq; Type: SEQUENCE; Schema: Babel; Owner: -
--

ALTER TABLE "Babel"."Texts" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Babel"."Texts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Cards; Type: TABLE; Schema: Card; Owner: -
--

CREATE TABLE "Card"."Cards" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    text character varying(255) NOT NULL,
    image text[]
);


--
-- Name: Cards_id_seq; Type: SEQUENCE; Schema: Card; Owner: -
--

ALTER TABLE "Card"."Cards" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Card"."Cards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: DeckItems; Type: TABLE; Schema: Card; Owner: -
--

CREATE TABLE "Card"."DeckItems" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "deckId" integer NOT NULL,
    "cardId" integer NOT NULL,
    sequence smallint DEFAULT 0 NOT NULL
);


--
-- Name: Decks; Type: TABLE; Schema: Card; Owner: -
--

CREATE TABLE "Card"."Decks" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    text character varying(255)
);


--
-- Name: Decks_id_seq; Type: SEQUENCE; Schema: Card; Owner: -
--

ALTER TABLE "Card"."Decks" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Card"."Decks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Exercises; Type: TABLE; Schema: Card; Owner: -
--

CREATE TABLE "Card"."Exercises" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    image text[],
    "deckId" integer NOT NULL
);


--
-- Name: Exercises_id_seq; Type: SEQUENCE; Schema: Card; Owner: -
--

ALTER TABLE "Card"."Exercises" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Card"."Exercises_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Exercises; Type: TABLE; Schema: Chat; Owner: -
--

CREATE TABLE "Chat"."Exercises" (
    id integer NOT NULL,
    type character varying NOT NULL,
    title character varying NOT NULL,
    description text,
    image text[],
    introduction text,
    prompt text,
    words character varying[],
    avatar jsonb,
    voice jsonb
);


--
-- Name: Exercises_id_seq; Type: SEQUENCE; Schema: Chat; Owner: -
--

ALTER TABLE "Chat"."Exercises" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Chat"."Exercises_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Exercises; Type: TABLE; Schema: Cloze; Owner: -
--

CREATE TABLE "Cloze"."Exercises" (
    id integer NOT NULL,
    created_at time without time zone DEFAULT now() NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);


--
-- Name: Exercises_id_seq; Type: SEQUENCE; Schema: Cloze; Owner: -
--

ALTER TABLE "Cloze"."Exercises" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Cloze"."Exercises_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Gaps; Type: TABLE; Schema: Cloze; Owner: -
--

CREATE TABLE "Cloze"."Gaps" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "sentenceId" integer NOT NULL,
    "position" smallint NOT NULL,
    correct text NOT NULL,
    hint character varying(50) NOT NULL,
    alt text[] NOT NULL
);


--
-- Name: Gaps_id_seq; Type: SEQUENCE; Schema: Cloze; Owner: -
--

ALTER TABLE "Cloze"."Gaps" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Cloze"."Gaps_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Sentences; Type: TABLE; Schema: Cloze; Owner: -
--

CREATE TABLE "Cloze"."Sentences" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    textparts text[] NOT NULL,
    "exerciseId" integer NOT NULL,
    sequence integer NOT NULL
);


--
-- Name: Sentences_id_seq; Type: SEQUENCE; Schema: Cloze; Owner: -
--

ALTER TABLE "Cloze"."Sentences" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Cloze"."Sentences_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Exercises; Type: TABLE; Schema: Lesson; Owner: -
--

CREATE TABLE "Lesson"."Exercises" (
    "lessonId" integer NOT NULL,
    "seqNumber" integer NOT NULL,
    "exerciseType" character varying(24) NOT NULL,
    "exerciseId" integer NOT NULL
);


--
-- Name: Lessons; Type: TABLE; Schema: Lesson; Owner: -
--

CREATE TABLE "Lesson"."Lessons" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    type character varying(25),
    level character varying(3),
    title character varying(255),
    description text,
    image text[]
);


--
-- Name: Lessons_id_seq; Type: SEQUENCE; Schema: Lesson; Owner: -
--

ALTER TABLE "Lesson"."Lessons" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Lesson"."Lessons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Exercises; Type: TABLE; Schema: Verb; Owner: -
--

CREATE TABLE "Verb"."Exercises" (
    id integer NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "verbId" integer NOT NULL
);


--
-- Name: Exercises_id_seq; Type: SEQUENCE; Schema: Verb; Owner: -
--

ALTER TABLE "Verb"."Exercises" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Verb"."Exercises_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Verbs; Type: TABLE; Schema: Verb; Owner: -
--

CREATE TABLE "Verb"."Verbs" (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    infinitive character varying(255) NOT NULL,
    tense smallint NOT NULL,
    p1ev character varying(255) NOT NULL,
    p2ev character varying(255) NOT NULL,
    p3ev character varying(255) NOT NULL,
    p1mv character varying(255) NOT NULL,
    p2mv character varying(255) NOT NULL,
    p3mv character varying(255) NOT NULL
);


--
-- Name: Verbs_id_seq; Type: SEQUENCE; Schema: Verb; Owner: -
--

ALTER TABLE "Verb"."Verbs" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "Verb"."Verbs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: Texts Texts_pkey; Type: CONSTRAINT; Schema: Babel; Owner: -
--

ALTER TABLE ONLY "Babel"."Texts"
    ADD CONSTRAINT "Texts_pkey" PRIMARY KEY (id);


--
-- Name: Cards Card_pkey; Type: CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."Cards"
    ADD CONSTRAINT "Card_pkey" PRIMARY KEY (id);


--
-- Name: DeckItems DeckItems_pkey; Type: CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."DeckItems"
    ADD CONSTRAINT "DeckItems_pkey" PRIMARY KEY ("deckId", "cardId");


--
-- Name: Decks Decks_pkey; Type: CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."Decks"
    ADD CONSTRAINT "Decks_pkey" PRIMARY KEY (id);


--
-- Name: Exercises Exercises_pkey; Type: CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."Exercises"
    ADD CONSTRAINT "Exercises_pkey" PRIMARY KEY (id);


--
-- Name: Cards card_unique; Type: CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."Cards"
    ADD CONSTRAINT card_unique UNIQUE (text);


--
-- Name: Exercises Exercises_pkey; Type: CONSTRAINT; Schema: Chat; Owner: -
--

ALTER TABLE ONLY "Chat"."Exercises"
    ADD CONSTRAINT "Exercises_pkey" PRIMARY KEY (id);


--
-- Name: Exercises Exercises_pkey; Type: CONSTRAINT; Schema: Cloze; Owner: -
--

ALTER TABLE ONLY "Cloze"."Exercises"
    ADD CONSTRAINT "Exercises_pkey" PRIMARY KEY (id);


--
-- Name: Gaps Gaps_pkey; Type: CONSTRAINT; Schema: Cloze; Owner: -
--

ALTER TABLE ONLY "Cloze"."Gaps"
    ADD CONSTRAINT "Gaps_pkey" PRIMARY KEY (id);


--
-- Name: Sentences Sentences_pkey; Type: CONSTRAINT; Schema: Cloze; Owner: -
--

ALTER TABLE ONLY "Cloze"."Sentences"
    ADD CONSTRAINT "Sentences_pkey" PRIMARY KEY (id);


--
-- Name: Sentences UQ_Sentences_Exercise_Sequence; Type: CONSTRAINT; Schema: Cloze; Owner: -
--

ALTER TABLE ONLY "Cloze"."Sentences"
    ADD CONSTRAINT "UQ_Sentences_Exercise_Sequence" UNIQUE ("exerciseId", sequence);


--
-- Name: Exercises exercises_pk; Type: CONSTRAINT; Schema: Lesson; Owner: -
--

ALTER TABLE ONLY "Lesson"."Exercises"
    ADD CONSTRAINT exercises_pk PRIMARY KEY ("lessonId", "seqNumber");


--
-- Name: Lessons lessons_index; Type: CONSTRAINT; Schema: Lesson; Owner: -
--

ALTER TABLE ONLY "Lesson"."Lessons"
    ADD CONSTRAINT lessons_index UNIQUE (type, level, title);


--
-- Name: Lessons lessons_pk; Type: CONSTRAINT; Schema: Lesson; Owner: -
--

ALTER TABLE ONLY "Lesson"."Lessons"
    ADD CONSTRAINT lessons_pk PRIMARY KEY (id);


--
-- Name: Exercises Exercises_pkey; Type: CONSTRAINT; Schema: Verb; Owner: -
--

ALTER TABLE ONLY "Verb"."Exercises"
    ADD CONSTRAINT "Exercises_pkey" PRIMARY KEY (id);


--
-- Name: Verbs verbs_pkey; Type: CONSTRAINT; Schema: Verb; Owner: -
--

ALTER TABLE ONLY "Verb"."Verbs"
    ADD CONSTRAINT verbs_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: Texts_RefId; Type: INDEX; Schema: Babel; Owner: -
--

CREATE UNIQUE INDEX "Texts_RefId" ON "Babel"."Texts" USING btree ("tableName", "keyId", language);


--
-- Name: DeckItems_order; Type: INDEX; Schema: Card; Owner: -
--

CREATE UNIQUE INDEX "DeckItems_order" ON "Card"."DeckItems" USING btree ("deckId", sequence);


--
-- Name: verbs_index; Type: INDEX; Schema: Verb; Owner: -
--

CREATE UNIQUE INDEX verbs_index ON "Verb"."Verbs" USING btree (infinitive, tense);


--
-- Name: DeckItems DeckItem_phrase; Type: FK CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."DeckItems"
    ADD CONSTRAINT "DeckItem_phrase" FOREIGN KEY ("cardId") REFERENCES "Card"."Cards"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DeckItems DeckItems_deck; Type: FK CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."DeckItems"
    ADD CONSTRAINT "DeckItems_deck" FOREIGN KEY ("deckId") REFERENCES "Card"."Decks"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Exercises Exercise_deck; Type: FK CONSTRAINT; Schema: Card; Owner: -
--

ALTER TABLE ONLY "Card"."Exercises"
    ADD CONSTRAINT "Exercise_deck" FOREIGN KEY ("deckId") REFERENCES "Card"."Decks"(id);


--
-- Name: Sentences FK_Sentences_Exercises; Type: FK CONSTRAINT; Schema: Cloze; Owner: -
--

ALTER TABLE ONLY "Cloze"."Sentences"
    ADD CONSTRAINT "FK_Sentences_Exercises" FOREIGN KEY ("exerciseId") REFERENCES "Cloze"."Exercises"(id);


--
-- Name: Gaps Gaps_Sentence; Type: FK CONSTRAINT; Schema: Cloze; Owner: -
--

ALTER TABLE ONLY "Cloze"."Gaps"
    ADD CONSTRAINT "Gaps_Sentence" FOREIGN KEY ("sentenceId") REFERENCES "Cloze"."Sentences"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Exercises exercises_lesson; Type: FK CONSTRAINT; Schema: Lesson; Owner: -
--

ALTER TABLE ONLY "Lesson"."Exercises"
    ADD CONSTRAINT exercises_lesson FOREIGN KEY ("lessonId") REFERENCES "Lesson"."Lessons"(id);


--
-- Name: Exercises verbexercise_verb; Type: FK CONSTRAINT; Schema: Verb; Owner: -
--

ALTER TABLE ONLY "Verb"."Exercises"
    ADD CONSTRAINT verbexercise_verb FOREIGN KEY ("verbId") REFERENCES "Verb"."Verbs"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20260706082500'),
    ('20260706090400'),
    ('20260706105300'),
    ('20260706111628'),
    ('20260706181146'),
    ('20260706181337'),
    ('20260706181731'),
    ('20260706182242'),
    ('20260706182455'),
    ('20260706193802'),
    ('20260706194859'),
    ('20260706195716'),
    ('20260706200016'),
    ('20260706201708'),
    ('20260706202650'),
    ('20260710082907'),
    ('20260710083545'),
    ('20260710090929'),
    ('20260710092053'),
    ('20260710092640'),
    ('20260710093833'),
    ('20260710094859'),
    ('20260710105901'),
    ('20260710120733'),
    ('20260710123140'),
    ('20260710123854'),
    ('20260710143148'),
    ('20260710143526'),
    ('20260710144323'),
    ('20260710144530'),
    ('20260710145747'),
    ('20260710151941'),
    ('20260711081200'),
    ('20260711083745'),
    ('20260711094530'),
    ('20260711104821'),
    ('20260711114107'),
    ('20260711115841'),
    ('20260711122005'),
    ('20260712193603'),
    ('20260718180859');
