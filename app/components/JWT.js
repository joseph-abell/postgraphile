import {withCookies} from 'react-cookie';
import React, {PureComponent, Children, cloneElement} from 'react';

class JWT extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jwt: props.cookies.get('forum-jwt'),
    };

    this.triggerRender = this.triggerRender.bind(this);
  }

  triggerRender() {
    this.setState({jwt: this.props.cookies.get('forum-jwt')});
  }

  render() {
    const {children} = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        jwt: this.state.jwt,
        triggerRender: this.triggerRender,
      }),
    );

    return <>{childrenWithProps}</>;
  }
}

export default withCookies(JWT);
