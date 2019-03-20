-- Our First table.

-- Person should only have information that you want to be publically viewable. 
-- We will create a table for private information, like emails and passwords, later.
-- I probably shouldn't be using the username as a primary key, and use a UUID instead.
create table forum.person (
  username         text primary key not null unique check (char_length(username) < 80),
  about            text,
  first_name       text check (char_length(first_name) < 80),
  last_name        text check (char_length(last_name) < 80),
  created_at       timestamp default now(),
  updated_at       timestamp default now()
);

-- Comments added to your database will by default be graphql as documentation.
-- If you want to add markdown, graphql is cool with that.
comment on table forum.person is 'A user of the forum.';
comment on column forum.person.username is 'The handle for the person. The primary key for the person.';
comment on column forum.person.about is 'A short description about the user, written by the user.';
comment on column forum.person.first_name is 'An optional first name of the user';
comment on column forum.person.last_name is 'An optional last name of the user';
comment on column forum.person.created_at is 'The time this person was created.';
comment on column forum.person.updated_at is 'The time this person was last updated.';