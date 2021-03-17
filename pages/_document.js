import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Loading from '../components/loading';

class DeferredNextScript extends NextScript {
  getScripts(files) {
    return super.getScripts(files).map(script => React.cloneElement(script, {
      key: script.props.src,
      defer: true,
      async: false
    }));
  }

  getDynamicChunks(files) {
    return super.getDynamicChunks(files).map(script => React.cloneElement(script, {
      key: script.props.src,
      defer: true,
      async: false
    }));
  }
}

class CustomDoc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="https://edenresorts.info/favicon/" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body className="loading">
          <div className="loading-init-wrapper">
            <Loading />
          </div>
          <Main />
          <DeferredNextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDoc;