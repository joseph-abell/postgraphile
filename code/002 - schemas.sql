-- Schema that can be viewed by GraphQL
create schema forum;

-- Schema that cannot be viewed by GraphQL
create schema forum_private;

-- A database contains schemas, which contain tables. Schemas can also
-- contain other kinds of named objects, including data types,
-- functions and operators.

-- Schemas allow many users to use a database without interfering with each other.
-- Can use schemas organise database objects into logical groups.
-- Third party apps can be put into separate schemas to prevent naming collisions.

-- More info at https://postgresql.org/docs/current/ddl-schemas.html