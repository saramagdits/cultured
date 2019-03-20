--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

-- Started on 2019-03-20 16:04:43 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE cultured_db;
--
-- TOC entry 2175 (class 1262 OID 16414)
-- Name: cultured_db; Type: DATABASE; Schema: -; Owner: cultured_admin
--

CREATE DATABASE cultured_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE cultured_db OWNER TO cultured_admin;

\connect cultured_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12393)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2178 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 185 (class 1259 OID 16491)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: cultured_admin
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    value text,
    quantity integer,
    unit text
);


ALTER TABLE public.ingredients OWNER TO cultured_admin;

--
-- TOC entry 186 (class 1259 OID 16495)
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: cultured_admin
--

CREATE SEQUENCE public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_id_seq OWNER TO cultured_admin;

--
-- TOC entry 2179 (class 0 OID 0)
-- Dependencies: 186
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cultured_admin
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- TOC entry 183 (class 1259 OID 16465)
-- Name: recipes; Type: TABLE; Schema: public; Owner: cultured_admin
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    author integer,
    title text,
    description text,
    image_path text,
    prep_time interval,
    ready_time interval,
    difficulty text,
    times_favorited integer,
    date_created timestamp with time zone,
    category text
);


ALTER TABLE public.recipes OWNER TO cultured_admin;

--
-- TOC entry 184 (class 1259 OID 16468)
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: cultured_admin
--

CREATE SEQUENCE public.recipes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO cultured_admin;

--
-- TOC entry 2180 (class 0 OID 0)
-- Dependencies: 184
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cultured_admin
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- TOC entry 187 (class 1259 OID 16507)
-- Name: recipes_ingredients; Type: TABLE; Schema: public; Owner: cultured_admin
--

CREATE TABLE public.recipes_ingredients (
    recipe_id integer,
    ingredient_id integer,
    id integer NOT NULL
);


ALTER TABLE public.recipes_ingredients OWNER TO cultured_admin;

--
-- TOC entry 188 (class 1259 OID 16580)
-- Name: recipes_ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: cultured_admin
--

CREATE SEQUENCE public.recipes_ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_ingredients_id_seq OWNER TO cultured_admin;

--
-- TOC entry 2181 (class 0 OID 0)
-- Dependencies: 188
-- Name: recipes_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cultured_admin
--

ALTER SEQUENCE public.recipes_ingredients_id_seq OWNED BY public.recipes_ingredients.id;


--
-- TOC entry 181 (class 1259 OID 16450)
-- Name: users; Type: TABLE; Schema: public; Owner: cultured_admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    avatar_path text,
    date_created timestamp with time zone,
    password character(60)
);


ALTER TABLE public.users OWNER TO cultured_admin;

--
-- TOC entry 182 (class 1259 OID 16453)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: cultured_admin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO cultured_admin;

--
-- TOC entry 2182 (class 0 OID 0)
-- Dependencies: 182
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cultured_admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2040 (class 2604 OID 16497)
-- Name: id; Type: DEFAULT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- TOC entry 2039 (class 2604 OID 16470)
-- Name: id; Type: DEFAULT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- TOC entry 2041 (class 2604 OID 16582)
-- Name: id; Type: DEFAULT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes_ingredients ALTER COLUMN id SET DEFAULT nextval('public.recipes_ingredients_id_seq'::regclass);


--
-- TOC entry 2038 (class 2604 OID 16455)
-- Name: id; Type: DEFAULT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2048 (class 2606 OID 16499)
-- Name: ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- TOC entry 2052 (class 2606 OID 16584)
-- Name: recipes_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes_ingredients
    ADD CONSTRAINT recipes_ingredients_pkey PRIMARY KEY (id);


--
-- TOC entry 2046 (class 2606 OID 16472)
-- Name: recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- TOC entry 2043 (class 2606 OID 16457)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2044 (class 1259 OID 16487)
-- Name: fki_author; Type: INDEX; Schema: public; Owner: cultured_admin
--

CREATE INDEX fki_author ON public.recipes USING btree (author);


--
-- TOC entry 2049 (class 1259 OID 16521)
-- Name: fki_ingredient_id; Type: INDEX; Schema: public; Owner: cultured_admin
--

CREATE INDEX fki_ingredient_id ON public.recipes_ingredients USING btree (ingredient_id);


--
-- TOC entry 2050 (class 1259 OID 16515)
-- Name: fki_recipe_id; Type: INDEX; Schema: public; Owner: cultured_admin
--

CREATE INDEX fki_recipe_id ON public.recipes_ingredients USING btree (recipe_id);


--
-- TOC entry 2053 (class 2606 OID 16593)
-- Name: author; Type: FK CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT author FOREIGN KEY (author) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 2054 (class 2606 OID 16598)
-- Name: ingredient_id; Type: FK CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes_ingredients
    ADD CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id) ON DELETE CASCADE;


--
-- TOC entry 2055 (class 2606 OID 16603)
-- Name: recipe_id; Type: FK CONSTRAINT; Schema: public; Owner: cultured_admin
--

ALTER TABLE ONLY public.recipes_ingredients
    ADD CONSTRAINT recipe_id FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON DELETE CASCADE;


--
-- TOC entry 2177 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2019-03-20 16:04:43 EDT

--
-- PostgreSQL database dump complete
--

