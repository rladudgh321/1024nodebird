import React from 'react';
import Head from 'next/head';
import wrapper from '@/store/configureStore';

const App = ({Component}) => {
  return (
    <>
      <Head>
        <title>Nordbird</title>
      </Head>
      <Component />
    </>
  );
}

export default wrapper.withRedux(App);