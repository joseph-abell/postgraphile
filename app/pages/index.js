import {Container, Card, Header, Button, Divider} from 'semantic-ui-react';
import {useState, useEffect, useMemo} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import LinkedHeader from '../components/LinkedHeader';
import LinkedDescription from '../components/LinkedDescription';
import {graphql} from '../helpers';

const Homepage = ({jwt = ''}) => {
  const [posts, setPosts] = useState([]);
  const [canAdd, setCanAdd] = useState(false);

  const getData = async () => {
    const data = await graphql(
      {
        query: `{
          allPosts {
            nodes {
              headline
              summary
            }
          }
          currentPerson {
            username
          }
        }`,
      },
      jwt,
    );

    const {
      data: {
        allPosts: {nodes},
        currentPerson,
      },
    } = data;

    setPosts(nodes);
    setCanAdd(currentPerson && !!currentPerson.username);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = () => Router.push('/createPost');

  return (
    <Container>
      <Header as="h1">Posts</Header>
      {canAdd && <Button onClick={handleAdd}>Add</Button>}
      <Divider hidden />
      {posts.length > 0 && (
        <Card.Group>
          {posts.map(post => (
            <Card key={JSON.stringify(post)} fluid>
              <Card.Content>
                <Link
                  href={{pathname: '/post', query: {headline: post.headline}}}>
                  <a>
                    <LinkedHeader text={post.headline} />
                    <LinkedDescription text={post.summary} />
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

export default Homepage;
