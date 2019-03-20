-- Functions can be added to generate values for you to query.
-- Here is Full Name, which adds first and last names together and returns the result.

-- Postgraphile expects a naming convention here to treat the function as a computed field.
-- ${schema}.${table}_${function name}.
-- For more info, https://www.graphile.org/postgraphile/postgresql-schema-design/#database-functions

create function forum.person_full_name(person forum.person) returns text as $$
  select person.first_name || ' ' || person.last_name
$$ language sql stable;

comment on function forum.person_full_name(forum.person) is
  'A person’s full name which is a concatenation of their first and last name.';