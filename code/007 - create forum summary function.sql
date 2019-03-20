-- Slightly more complicated function, allows the forum to display
-- a summary of the post on a post list page.

create function forum.post_summary(
  post forum.post,
  length int default 280,
  omission text default '…'
) returns text as $$
  select case
    when post.body is null then null
    else substr(post.body, 0, length) || omission
  end
$$ language sql stable;

comment on function forum.post_summary(forum.post, int, text) is
  'A truncated version of the body for summaries.';