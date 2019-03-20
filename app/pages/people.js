import {Container, Card, Header} from 'semantic-ui-react';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import LinkedHeader from '../components/LinkedHeader';
import {graphql} from '../helpers';

const People = () => {
  const [people, setPeople] = useState([]);

  const getData = async () => {
    const response = await graphql({
      query: `{
        allPeople {
          nodes {
            username
            fullName
          }
        }
      }`,
    });

    const {
      data: {
        allPeople: {nodes},
      },
    } = response;
    setPeople(nodes);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Header as="h1">People</Header>

      {people.length > 0 && (
        <Card.Group>
          {people.map((person, index) => (
            <Card fluid key={index}>
              <Card.Content>
                <Link
                  href={{
                    pathname: '/person',
                    query: {username: person.username},
                  }}>
                  <a>
                    <LinkedHeader text={person.username} />
                  </a>
                </Link>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Container>
  );
};

export default People;
