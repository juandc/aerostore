import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()

    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    const { html, head, errorHtml, chunks, styles } = this.props

    return (
      <html lang="en-US">
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Aerostore" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="theme-color" content="#ff6600" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="manifest" href="/static/manifest.webmanifest" />
          <link rel="shortcut icon" href="/static/icon.png" />
          <link rel="apple-touch-icon" href="/static/icon.png" />
          <title>Aerostore</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
