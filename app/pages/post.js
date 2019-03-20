import {
  Container,
  Divider,
  Button,
  Form,
  TextArea,
  Confirm,
  Header,
} from 'semantic-ui-react';
import Router, {withRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import Link from 'next/link';
import {graphql, changeInput} from '../helpers';

const Post = ({
  router: {
    query: {headline},
  },
  jwt = '',
}) => {
  const [post, setPost] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const [edit, setEdit] = useState(false);
  const [stateHeadline, setStateHeadline] = useState('');
  const [body, setBody] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const getData = async () => {
    const response = await graphql(
      {
        query: `{
          postByHeadline(headline: "${headline}") {
            headline
            body
            createdAt
            updatedAt
            personByAuthorUsername {
              fullName
              username
            }
          }
          currentPerson { username }
        }`,
      },
      jwt,
    );

    const {
      data: {postByHeadline, currentPerson},
    } = response;

    setPost(postByHeadline);
    setBody(postByHeadline.body);
    setStateHeadline(postByHeadline.headline);

    if (currentPerson && currentPerson.username) {
      setCanEdit(
        currentPerson.username ===
          postByHeadline.personByAuthorUsername.username,
      );
    } else {
      setCanEdit(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleEdit = () => setEdit(!edit);

  const handleSubmit = async () => {
    const response = await graphql(
      {
        query: `mutation {
          updatePostByHeadline(
            input: {
              headline: "${stateHeadline}",
              postPatch: {
                body: "${body}",
                headline: "${stateHeadline}"
              }
            }
          ) {
            post {
              body,
              headline
            }
          }
        }`,
      },
      jwt,
    );

    const {data} = response;
    const {updatePostByHeadline} = data || {};
    const {post} = updatePostByHeadline || {};

    setBody(post.body);
    setStateHeadline(post.headline);
    setEdit(false);
  };

  const handleDelete = async () => {
    await graphql(
      {
        query: `mutation {
        deletePostByHeadline(
          input: {
            headline: "${stateHeadline}"
          }
        ) {
          post {
            headline
          }
        }
      }`,
      },
      jwt,
    );

    Router.push('/');
  };

  return (
    <Container>
      <Header as="h1">{headline}</Header>
      {post.createdAt && (
        <>
          <small>
            Written by{' '}
            <Link
              href={{
                pathname: '/person',
                query: {
                  username:
                    post.personByAuthorUsername &&
                    post.personByAuthorUsername.username,
                },
              }}>
              <a>
                {post.personByAuthorUsername &&
                  post.personByAuthorUsername.username}
              </a>
            </Link>{' '}
            on{' '}
            {post.updatedAt &&
              format(new Date(post.updatedAt), 'DD/MM/YYYY HH:mm', {
                awareOfUnicodeTokens: true,
              })}
          </small>
          <Divider hidden />
          {canEdit && (
            <>
              <Button onClick={toggleEdit}>
                {edit && 'Cancel'}
                {!edit && 'Edit'}
              </Button>
              {!edit && (
                <Button onClick={() => setConfirmOpen(true)}>Delete</Button>
              )}
              <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
              />
              <Divider hidden />
            </>
          )}
        </>
      )}
      {!edit && <p>{body}</p>}
      {edit && (
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Headline</label>
            <TextArea
              value={headline}
              onChange={e => changeInput(setHeadline, e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Body</label>
            <TextArea
              value={body}
              onChange={e => changeInput(setBody, e.target.value)}
            />
          </Form.Field>

          <Button type="submit">Save</Button>
        </Form>
      )}
    </Container>
  );
};

export default withRouter(Post);
