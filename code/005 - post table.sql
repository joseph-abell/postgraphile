create table forum.post (
  headline         text primary key not null check (char_length(headline) < 280),
  body             text not null,
  topic            forum.post_topic,
  created_at       timestamp default now(),
  updated_at       timestamp default now(),
  author_username  text not null references forum.person(username)
);

comment on table forum.post is 'A forum post written by a user.';
comment on column forum.post.headline is 'The title written by the user. The primary key for the post.';
comment on column forum.post.author_username is 'The username of the author user.';
comment on column forum.post.topic is 'The topic this has been posted in.';
comment on column forum.post.body is 'The main body text of our post.';
comment on column forum.post.created_at is 'The time this post was created.';
comment on column forum.post.updated_at is 'The time this post was last updated.';