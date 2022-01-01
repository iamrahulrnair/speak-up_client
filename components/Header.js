import Link from 'next/link';

import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  nav__wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  nav__container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    gap: '20px',
  },
  nav__item: {
    color: '#eef',
    '&:hover': {
      color: '#FE7E6D',
    },
  },
});

export default ({ currentUser }) => {
  const classes = useStyles();
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Company Not listed ?', href: '/post' },
    currentUser &&
      currentUser.email == 'rahul@gmail.com' && {
        label: 'Admin',
        href: '/admin-home-page',
      },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <div key={href}>
          <Link href={href} passHref>
            <Typography
              className={classes.nav__item}
              variant='body1'
              component='a'
            >
              {label}
            </Typography>
          </Link>
        </div>
      );
    });

  return (
    <AppBar position='static' color='success'>
      <Toolbar>
        <div className={classes.nav__wrapper}>
          <Link href='/' passHref>
            <Typography
              className={classes.nav__item}
              variant='h3'
              component='a'
            >
              speakup
            </Typography>
          </Link>
          <div>
            <div className={classes.nav__container}>{links}</div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};
