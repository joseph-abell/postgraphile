-- set updated at shows how we can use the private schema to effect public schemas.
-- it also uses a trigger, which lets us make a change to a table when we send an update
-- to a row.

create function forum_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

-- Creating the trigger to run before updates lets us make one update request with the new
-- updated at.
create trigger person_updated_at before update
  on forum.person
  for each row
  execute procedure forum_private.set_updated_at();

create trigger post_updated_at before update
  on forum.post
  for each row
  execute procedure forum_private.set_updated_at();
  
-- No comments as they are not public facing,
-- but nothing stopping you adding them if you want.