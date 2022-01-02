import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  form__container: {
    height: '85vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default ({ classes: GlobalField }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className={classes.form__container}>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Typography variant='h4' gutterBottom>
          Sign In
        </Typography>
        <TextField
          className={GlobalField.global_field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant='outlined'
          label='Email'
          color='secondary'
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          className={GlobalField.global_field}
          variant='outlined'
          label='password'
          color='secondary'
        />
        {errors}
        <Button
          variant='contained'
          type='submit'
          color='primary'
          className={`${GlobalField.global_field} btn btn-primary`}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};
