-- person account is the private part of the person table.
create table forum_private.person_account (
  person_username  text primary key references forum.person(username) on delete cascade,
  email            text not null unique check (email ~* '^.+@.+\..+$'),
  password_hash    text not null
);

comment on table forum_private.person_account is 'Private information about a person’s account.';
comment on column forum_private.person_account.person_username is 'The username of the person associated with this account.';
comment on column forum_private.person_account.email is 'The email address of the person.';
comment on column forum_private.person_account.password_hash is 'An opaque hash of the person’s password.';