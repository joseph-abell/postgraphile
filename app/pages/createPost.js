import {useState, useEffect} from 'react';
import {Container, Header, Form, Button} from 'semantic-ui-react';
import Router from 'next/router';
import {graphql, changeInput} from '../helpers';

const CreatePost = ({jwt}) => {
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [personUsername, setPersonUsername] = useState('');

  const getData = async () => {
    const {
      data: {
        currentPerson: {username},
      },
    } = await graphql(
      {
        query: `{
          currentPerson {
            username
          }
        }`,
      },
      jwt,
    );

    setPersonUsername(username);
  };

  useEffect(() => {
    getData();
  }, []);

  const saveData = async () => {
    await graphql(
      {
        query: `mutation {
          createPost (input: {
            post: {
              headline: "${headline}",
              body: "${body}",
              authorUsername: "${personUsername}"
            }
          }) {
            post {
              body
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
      <Header>Create Post</Header>

      <Form onSubmit={saveData}>
        <Form.Field>
          <label>Headline</label>
          <input
            value={headline}
            onChange={e => changeInput(setHeadline, e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Body</label>
          <textarea
            value={body}
            onChange={e => changeInput(setBody, e.target.value)}
          />
        </Form.Field>

        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
