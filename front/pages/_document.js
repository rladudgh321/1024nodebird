import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { renderStatic } from '@/shared/renderer';

export default class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </React.Fragment>
      ),
    }
  }
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <script src='https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022' />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
