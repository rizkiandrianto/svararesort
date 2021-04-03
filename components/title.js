import Head from 'next/head';

const Title = ({ title }) => (
  <Head>
    <title>{title ? title + ' |' : '' } SvaraResort | World's First Blockchain Resort</title>
  </Head>
);

export default Title;