# db

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.11. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

# Create database

## Postgress script

Aanmaken van de gebruiker "docent"
`CREATE ROLE docent WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  NOREPLICATION
  NOBYPASSRLS
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:RygDOJ4N80ODXTUHmvxZuA==$/Lss1ODEmapZaeD39j74iPKuIyP+kyYRVYjsex1cvdE=:gHCscmHrvhSOAX4n9xP1dMdg3KVj7AA9vO0p40PrYko=';
`
`GRANT pg_maintain TO docent WITH ADMIN OPTION, INHERIT OPTION, SET OPTION;

`CREATE DATABASE dizla
    WITH
    OWNER = docent
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
`
`ALTER DATABASE dizla OWNER TO docent;
`
`GRANT TEMPORARY, CONNECT ON DATABASE dizla TO PUBLIC;
`
`GRANT ALL ON DATABASE dizla TO docent;
