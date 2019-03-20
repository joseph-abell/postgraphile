import React from 'react';
import App, {Container} from 'next/app';
import dynamic from 'next/dynamic';
import {CookiesProvider} from 'react-cookie';
import Header from '../components/Header';
import JWT from '../components/JWT';

export default class MyApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;

    return (
      <CookiesProvider>
        <Container>
          <JWT>
            <Header />
            <Component {...pageProps} />
          </JWT>
        </Container>
      </CookiesProvider>
    );
  }
}
