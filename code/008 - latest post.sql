-- Latest post gets the most recent post posted by the user.
-- This shows off how you can work with multiple tables.

create function forum.person_latest_post(person forum.person) returns forum.post as $$
  select post.*
  from forum.post as post
  where post.author_username = person.username
  order by created_at desc
  limit 1
$$ language sql stable;

comment on function forum.person_latest_post(forum.person) is
  'The latest post written by the person.';