import {Card} from 'semantic-ui-react';

const LinkedHeader = ({text = ''}) => (
  <Card.Header as="h2" style={{color: 'rgba(0, 0, 0, .87)', fontSize: '18px'}}>
    {text}
  </Card.Header>
);

export default LinkedHeader;
