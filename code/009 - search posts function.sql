-- search posts show how you can pass a function data to process.

create function forum.search_posts(search text) returns setof forum.post as $$
  select post.*
  from forum.post as post
  where position(search in post.headline) > 0 or position(search in post.body) > 0
$$ language sql stable;

comment on function forum.search_posts(text) is
  'Returns posts containing a given search term.';