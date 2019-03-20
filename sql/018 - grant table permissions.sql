-- locking down the database so not everyone can edit it
alter default privileges revoke execute on functions from public;

-- lets forum_anonymous and forum_person use the schema.
-- As forum_postgraphile inherits the permissions from both these
-- roles it will have access too.
grant usage on schema forum to forum_anonymous, forum_person;

-- we want both roles to be able to read from the tables, but only
-- a logged in user to edit the content in the tables.
grant select on table forum.person to forum_anonymous, forum_person;
grant update, delete on table forum.person to forum_person;
grant select on table forum.post to forum_anonymous, forum_person;
grant insert, update, delete on table forum.post to forum_person;