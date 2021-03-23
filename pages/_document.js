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
      <Html lang="en">
        <Head>
          <link rel="icon" href={`${process.env.NEXT_PUBLIC_IMAGE_CDN}${process.env.NEXT_PUBLIC_API_HOST}/favicon?w=32&h=32`} />
          <meta name="description" content="This is Example of Meta Description" />
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