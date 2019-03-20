import {
  Button,
  Checkbox,
  Form,
  Container,
  Segment,
  Message,
} from 'semantic-ui-react';

import {useState} from 'react';
import 'isomorphic-fetch';
import Cookies from 'js-cookie';
import Router from 'next/router';

import {graphql, changeInput} from '../helpers';

const Register = ({jwt}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [stateJWT, setStateJWT] = useState(jwt);

  if (stateJWT && stateJWT.length > 0) {
    Router.push('/');
  }

  const submitForm = async () => {
    console.log(email, password, username);
    const response = await graphql({
      query: `mutation {
          registerPerson(input: {
            email: "${email}",
            password: "${password}",
            username: "${username}",
          }) {
            person {
              username
            }
          }
        }`,
    });

    const {
      data: {registerPerson},
    } = response;
    const {person} = registerPerson || {};

    // We have successfully registered
    if (person.username) {
      Router.push('/login');
    } else {
      setError('Registration failed');
    }
  };

  const closeError = () => setError('');

  return (
    <Container text>
      <h1>Register</h1>
      <Segment padded onSubmit={submitForm}>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              autoComplete="email"
              onChange={e => changeInput(setEmail, e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              autoComplete="password"
              onChange={e => changeInput(setPassword, e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Username"
              onChange={e => changeInput(setUsername, e.target.value)}
            />
          </Form.Field>
          <Button type="submit" color="blue">
            Submit
          </Button>
          {error && (
            <Message negative onDismiss={closeError}>
              <Message.Header>{error}</Message.Header>
            </Message>
          )}
        </Form>
      </Segment>
    </Container>
  );
};

export default Register;
