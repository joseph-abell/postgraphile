import {Container, Divider, Card, Header} from 'semantic-ui-react';
import {withRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import Link from 'next/link';
import {graphql} from '../helpers';
import LinkedHeader from '../components/LinkedHeader';
import LinkedDescription from '../components/LinkedDescription';

const Person = ({
  router: {
    query: {username},
  },
}) => {
  const [person, setPerson] = useState({});

  const getData = async () => {
    const response = await graphql({
      query: `{
        personByUsername(
          username: "${username}"
        ) {
          username
          fullName
          about
          latestPost {
            headline
            summary
          }
        }
      }`,
    });

    const {
      data: {personByUsername},
    } = response;

    setPerson(personByUsername);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header as="h1">{person.username}</Header>

      {person.about && <p>{person.about}</p>}

      {person.latestPost && (
        <>
          <h2>Latest Post</h2>
          <Card fluid>
            <Card.Content>
              <Link
                href={{
                  pathname: '/post',
                  query: {headline: person.latestPost.headline},
                }}>
                <a>
                  <LinkedHeader text={`${person.latestPost.headline}`} />
                  <LinkedDescription text={person.latestPost.summary} />
                </a>
              </Link>
            </Card.Content>
          </Card>
        </>
      )}
    </Container>
  );
};

export default withRouter(Person);
