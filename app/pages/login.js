import {
  Button,
  Checkbox,
  Form,
  Container,
  Segment,
  Message,
  Header,
} from 'semantic-ui-react';
import {useState} from 'react';
import 'isomorphic-fetch';
import Cookies from 'js-cookie';
import Router from 'next/router';

import {graphql, changeInput} from '../helpers';

const Login = ({jwt, triggerRender}) => {
  // Setting up the data we need for the page.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stateJWT, setJWT] = useState(jwt);
  const [error, setError] = useState('');

  // Redirects us to the homepage if we have logged in.
  // We don't want to be able to log in twice!
  if (stateJWT && stateJWT.length > 0) {
    Router.push('/');
  }

  // Gets called when we press the login button.
  // Handles logging in, and what to do if successful
  // or unsuccessful.
  const submitForm = async e => {
    // needed to stop browsers from acting like
    // they are from 2010.
    e.preventDefault();

    // Create the query we want to send to graphql.
    // passes an email and password, and expect
    // a json web token in return.
    const response = await graphql({
      query: `mutation {
        authenticate (input: {
          email: "${email}",
          password: "${password}"
        }) {
          jsonWebToken
        }
      }`,
    });

    // Get only the jsonWebToken from the data,
    // we don't care about anything else.
    const {
      data: {
        authenticate: {jsonWebToken},
      },
    } = response;

    // If we receive an empty jsonWebToken, that means we
    // did not log in correctly. Set the error to let the
    // user know they should try again.
    if (!jsonWebToken) {
      setError('Login failed');
    }

    // If we have a token, we have logged in!
    // store the token into our cookies so we can use later,
    // call a custom function that will make sure the site
    // knows about the new cookie, and go to the homepage
    if (jsonWebToken) {
      Cookies.set('forum-jwt', jsonWebToken);
      triggerRender();
      Router.push('/');
    }
  };

  // Gets called when we close the error message
  const closeError = () => setError('');

  // Returns JSX that resembles the HTML we want to show
  // on the login page.
  return (
    <Container text>
      <Header as="h1">Login</Header>
      <Segment padded>
        <Form onSubmit={submitForm}>
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
              autoComplete="current-password"
              onChange={e => changeInput(setPassword, e.target.value)}
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

export default Login;
