--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: company_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.company_type AS ENUM (
    'pharmacy',
    'courier'
);


ALTER TYPE public.company_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying,
    password character varying(64),
    type public.company_type,
    address jsonb
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    pharmacy_id integer,
    patient_name character varying,
    address jsonb,
    pickup_date timestamp with time zone,
    delivered timestamp with time zone,
    canceled timestamp with time zone
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: pharmacy_couriers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pharmacy_couriers (
    pharmacy_id integer,
    courier_id integer
);


ALTER TABLE public.pharmacy_couriers OWNER TO postgres;

--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, password, type, address) FROM stdin;
1	BetterRx	BR	pharmacy	{"city": "Columbus", "state": "OH", "street": ["1275 Kinnear Road"], "zip_code": "43212"}
2	BestRx	BR	pharmacy	{"city": "Austin", "state": "TX", "street": ["123 Austin St,"], "zip_code": "78702"}
3	Drugs R Us	DRU	pharmacy	{"city": "Los Angeles", "state": "CA", "street": ["4925 LA Ave"], "zip_code": "90056"}
4	Same Day Delivery	SDD	courier	{"city": "Trenton", "state": "NJ", "street": ["900 Trenton Lane"], "zip_code": "08536"}
5	Previous Day Delivery	PDD	courier	{"city": "Los Angeles", "state": "CA", "street": ["7433 LA Ct"], "zip_code": "90056"}
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, pharmacy_id, patient_name, address, pickup_date, delivered, canceled) FROM stdin;
\.


--
-- Data for Name: pharmacy_couriers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pharmacy_couriers (pharmacy_id, courier_id) FROM stdin;
1	4
2	4
3	5
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 5, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 31, true);


--
-- Name: companies companies_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_name_key UNIQUE (name);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pharmacy_couriers fk_courier; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_couriers
    ADD CONSTRAINT fk_courier FOREIGN KEY (courier_id) REFERENCES public.companies(id);


--
-- Name: pharmacy_couriers fk_pharmacy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pharmacy_couriers
    ADD CONSTRAINT fk_pharmacy FOREIGN KEY (pharmacy_id) REFERENCES public.companies(id);


--
-- Name: orders fk_pharmacy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_pharmacy FOREIGN KEY (pharmacy_id) REFERENCES public.companies(id);


--
-- PostgreSQL database dump complete
--

