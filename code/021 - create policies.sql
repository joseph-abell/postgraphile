create policy select_person on forum.person for select
  using (true);

create policy select_post on forum.post for select
  using (true);

create policy update_person on forum.person for update to forum_person
  using (username = nullif(current_setting('jwt.claims.person_username', true), '')::text);

create policy delete_person on forum.person for delete to forum_person
  using (username = nullif(current_setting('jwt.claims.person_username', true), '')::text);

create policy insert_post on forum.post for insert to forum_person
  with check (author_username = nullif(current_setting('jwt.claims.person_username', true), '')::text);

create policy update_post on forum.post for update to forum_person
  using (author_username = nullif(current_setting('jwt.claims.person_username', true), '')::text);

create policy delete_post on forum.post for delete to forum_person
  using (author_username = nullif(current_setting('jwt.claims.person_username', true), '')::text);