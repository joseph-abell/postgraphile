-- login, returns the jwt as proof of authentication.

create function forum.authenticate(
  email text,
  password text
) returns forum.json_web_token as $$
declare
  account forum_private.person_account;
begin
  select a.* into account
  from forum_private.person_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('forum_person', account.person_username)::forum.json_web_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function forum.authenticate(text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions.';