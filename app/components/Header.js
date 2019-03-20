import {Menu, Divider, Container} from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
import {Component} from 'react';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

class Header extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.cookies.set('forum-jwt', '');
    this.props.triggerRender();
  }

  render() {
    return (
      <>
        <Menu inverted borderless>
          <Container>
            <Link href="/">
              <Menu.Item name="posts" header link />
            </Link>

            <Link href="/people">
              <Menu.Item name="people" link />
            </Link>

            {(!this.props.jwt || this.props.jwt.length === 0) && (
              <Menu.Menu position="right">
                <Link href="/login">
                  <Menu.Item name="login" />
                </Link>
                <Link href="/register">
                  <Menu.Item name="register" />
                </Link>
              </Menu.Menu>
            )}
            {this.props.jwt && this.props.jwt.length > 0 && (
              <Menu.Menu position="right">
                <Link href="/profile">
                  <Menu.Item name="profile" />
                </Link>
                <Menu.Item name="logout" onClick={this.handleLogout} />
              </Menu.Menu>
            )}
          </Container>
        </Menu>
        <Divider hidden />
        <style global jsx>{`
          .ui.menu.menu {
            border-radius: 0;
          }
        `}</style>
      </>
    );
  }
}

export default withCookies(Header);
