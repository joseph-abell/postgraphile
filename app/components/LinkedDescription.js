import {Card} from 'semantic-ui-react';

const LinkedDescription = ({text = ''}) => (
  <Card.Description as="p" style={{color: 'rgba(0, 0, 0, .68)'}}>
    {text}
  </Card.Description>
);

export default LinkedDescription;
