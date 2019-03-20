-- Let's the user know if they are logged in

create function forum.current_person() returns forum.person as $$
  select *
  from forum.person
  where username = nullif(current_setting('jwt.claims.person_username', true), '')::text
$$ language sql stable;

comment on function forum.current_person() is 'Gets the person who was identified by our JWT.';