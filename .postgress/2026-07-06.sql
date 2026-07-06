--
-- PostgreSQL database dump
--

\restrict QsPm1D5w62QG2dY7cVVfoPt0b2DfGEiCqej48oCYoOhQH9CQ4Hm4J8oW6STZu9a

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-06 09:51:43

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
-- TOC entry 5047 (class 0 OID 16486)
-- Dependencies: 227
-- Data for Name: Themes; Type: TABLE DATA; Schema: conta; Owner: postgres
--

COPY conta."Themes" (id, created_at, text) FROM stdin;
1	2026-05-22 15:23:44.30027	Casa exterior
2	2026-05-22 15:23:44.30027	Casa interior
3	2026-05-22 15:23:44.30027	Escritório
\.


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 226
-- Name: Theme_id_seq; Type: SEQUENCE SET; Schema: conta; Owner: postgres
--

SELECT pg_catalog.setval('conta."Theme_id_seq"', 3, true);


-- Completed on 2026-07-06 09:51:44

--
-- PostgreSQL database dump complete
--

\unrestrict QsPm1D5w62QG2dY7cVVfoPt0b2DfGEiCqej48oCYoOhQH9CQ4Hm4J8oW6STZu9a

