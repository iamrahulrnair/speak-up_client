import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function Home({ currentUser }) {
  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '85vh',
      }}
    >
      <Typography variant='h1' align='left'>
        speakUP provides a platform to <strong>speakUP</strong> against an
        organization.
      </Typography>
    </Container>
  );
}
