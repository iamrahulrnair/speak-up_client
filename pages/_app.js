import Header from '../components/Header';
import buildClient from './api/build-client';
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  body: {
    '& a': {
      textDecoration: 'none',
      // color: 'white',
    },
  },
});

function MyApp({ Component, pageProps, currentUser }) {
  const classes = useStyles();
  return (
    <div className={classes.body}>
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
