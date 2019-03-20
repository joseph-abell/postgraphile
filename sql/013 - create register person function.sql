-- Registering with an email and password is probably a nice idea.
create function forum.register_person(
  username text,
  email text,
  password text
) returns forum.person as $$
declare
  person forum.person;
begin
  insert into forum.person (username) values
    (username)
    returning * into person;

  insert into forum_private.person_account (person_username, email, password_hash) values
    (person.username, email, crypt(password, gen_salt('bf')));

  return person;
end;
$$ language plpgsql strict security definer;

comment on function forum.register_person(text, text, text) is 'Registers a single user and creates an account in our forum.';