import Header from '../components/Header';
import buildClient from './api/build-client';
import { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  body: {
    '& a': {
      textDecoration: 'none',
      // color: 'white',
    },
  },
  global_field: {
    margin: '20px',
    display: 'block',
  },
});

function MyApp({ Component, pageProps, currentUser }) {
  const classes = useStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div className={classes.body}>
      <Header currentUser={currentUser} />
      <div>
        <Component {...pageProps} currentUser={currentUser} classes={classes} />
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
