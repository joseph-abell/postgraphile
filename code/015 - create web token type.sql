-- we will be passing a json web token to postgres to authenticate a user.

-- The user logs in. by logging in, the user passes email, password to graphql,
-- which passes to the database. graphql accepts the login, and passes back a
-- json web token with the role of the user (forum_person), and the username.

-- future calls to graphql should pass the jwt as a way of showing the user has
-- already logged in.
create type forum.json_web_token as (
  role text,
  person_username text
);