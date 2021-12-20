import '../styles/globals.css';
import Header from '../components/Header';
import buildClient from './api/build-client';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div>
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  return {
    currentUser: data.currentUser,
  };
};

export default MyApp;
