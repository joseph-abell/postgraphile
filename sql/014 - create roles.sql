-- Roles: We have a few roles here.

-- forum_postgraphile is the only role that is allowed to login to sql.
-- This should only be used by postgraphile.

-- forum_anonymous is what users use when viewing the site when unauthenticated.

-- forum_person is what the users use when authenticated. Users can log in by passing
-- a json web token to postgraphile, and the logged in postgraphile will handle 
-- user login.

create role forum_postgraphile login password 's883ZabA9D8jVBXd';

create role forum_anonymous;
grant forum_anonymous to forum_postgraphile;

create role forum_person;
grant forum_person to forum_postgraphile;