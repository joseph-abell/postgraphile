import {Container, Button, Form, Divider, Header} from 'semantic-ui-react';
import Router from 'next/router';
import 'isomorphic-fetch';
import {useState, useEffect} from 'react';
import {graphql, changeInput} from '../helpers';

const Profile = ({jwt = ''}) => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');
  const getData = async () => {
    const response = await graphql(
      {
        query: `{
          currentPerson {
            username
            firstName
            lastName
            about
          }
        }`,
      },
      jwt,
    );

    const {data, errors} = response;

    if (errors && errors.length) {
      return Router.push('/login');
    }

    const {currentPerson} = data || {};

    setUsername(currentPerson.username);
    setFirstName(currentPerson.firstName);
    setLastName(currentPerson.lastName);
    setAbout(currentPerson.about || '');
  };

  useEffect(() => {
    getData();
  }, []);

  if (jwt && jwt.length === 0) {
    Router.push('/login');
  }

  const onEdit = () => setEdit(!edit);

  const submitForm = async () => {
    const response = await graphql(
      {
        query: `mutation {
          updatePersonByUsername (input: {
            username: "${username}",
            personPatch: {
              firstName: "${firstName}",
              lastName: "${lastName}",
              about: "${about}"
            }
          }) {
            person {
              username
              firstName
              lastName
              about
            }
          }
        }`,
      },
      jwt,
    );

    const {data} = response;
    const {updatePersonByUsername} = data || {};
    const {person} = updatePersonByUsername || {};

    if (person.username) {
      setUsername(person.username);
      setFirstName(person.firstName);
      setLastName(person.lastName);
      setAbout(person.about);
      setEdit(false);
    }
  };

  return (
    <Container>
      <Header as="h1">Profile</Header>
      <Button onClick={onEdit}>Edit</Button>
      <Divider hidden />

      {!edit && (
        <>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>About: {about}</p>
        </>
      )}
      {edit && (
        <Form onSubmit={submitForm}>
          <Form.Field>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              onChange={e => changeInput(setFirstName, e.target.value)}
              value={firstName}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              onChange={e => changeInput(setLastName, e.target.value)}
              value={lastName}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="about">About</label>
            <input
              id="about"
              onChange={e => changeInput(setAbout, e.target.value)}
              value={about}
            />
          </Form.Field>

          <Button type="submit">Save</Button>
        </Form>
      )}
    </Container>
  );
};

export default Profile;
