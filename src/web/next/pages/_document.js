import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return {
      ...Document.getInitialProps(ctx),
      styles: flush(),
    };
  }

  render() {
    const { styles } = this.props;

    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="utf-8" />
          {styles}
        </Head>

        <body>
          <main role="application">
            <Main />
          </main>

          <NextScript />
        </body>
      </html>
    )
  }
}
