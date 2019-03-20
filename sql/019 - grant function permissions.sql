-- granting access to the functions we have created to both roles
grant execute on function forum.person_full_name(forum.person) to forum_anonymous, forum_person;
grant execute on function forum.post_summary(forum.post, integer, text) to forum_anonymous, forum_person;
grant execute on function forum.person_latest_post(forum.person) to forum_anonymous, forum_person;
grant execute on function forum.search_posts(text) to forum_anonymous, forum_person;

-- I'm okay letting logged in users authenticate, will let them refresh their jwt.
grant execute on function forum.authenticate(text, text) to forum_anonymous, forum_person;

-- current person will return nothing if the user is not logged in, no harm in giving it permission to execute this.
grant execute on function forum.current_person() to forum_anonymous, forum_person;

-- no point granting access to register to a logged in user
grant execute on function forum.register_person(text, text, text) to forum_anonymous;