import Link from 'next/link';
import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';

import Button from '@mui/material/Button';
import {
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Person, StarHalf } from '@mui/icons-material/';
import { height } from '@mui/system';

const useStyles = makeStyles({
  card_box: {},
});

export default ({ currentUser, classes: PostGlobalSelectors }) => {
  const classes = useStyles();

  const [companyName, setCompanyName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [posts, setPosts] = useState([]);

  const { doRequest: getPostData, errors: errors_from_post } = useRequest({
    url: '/api/_p',
    method: 'get',
  });
  const { doRequest, errors } = useRequest({
    url: '/api/request_a_post',
    method: 'post',
    body: {
      companyName,
      imageUrl,
    },
  });
  useEffect(async () => {
    const response = await getPostData();
    setPosts(response);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };
  const renderPosts = () => {
    if (posts?.length > 0 && currentUser) {
      return posts.map((el, ind) => {
        return (
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
            height={'100%'}
            className={classes.card_box}
          >
            <Card key={ind} elevation={3}>
              <CardHeader
                title={el.companyName}
                subheader={new Date().toLocaleDateString()}
              ></CardHeader>
              <CardMedia
                style={{ maxHeight: '100px' }}
                component='img'
                image={el.imageurl}
                alt={el.title}
              />
              <CardContent>
                <Typography paragraph>
                  {el.description.slice(0, 100)}...
                </Typography>
                <Link href={`/post/${el.id}`} passHref>
                  <Typography variant='body2' component='a' color='tomato'>
                    speakUP against this organization
                  </Typography>
                </Link>
              </CardContent>
              {/* <Typography variant='text-secondary'>
                <StarHalf />:{el.ratingsAverage}
              </Typography>
              <Typography variant='text-secondary'>
                <Person />:{el.ratingsCount}
              </Typography> */}
            </Card>
          </Grid>
        );
      });
    } else if (posts?.length == 0 && currentUser) {
      return (
        <Typography variant='h2' color='primary'>
          No Companies Listed Right now!! Try raising a request.
        </Typography>
      );
    } else {
      return <Typography>Loading....</Typography>;
    }
  };
  if (currentUser) {
    return (
      <Container>
        <Grid spacing={3} marginTop={3} container>
          {renderPosts()}
        </Grid>
        <hr></hr>
        <Typography variant='h4'>Your company not listed here?</Typography>
        <form onSubmit={onSubmit}>
          <div className={PostGlobalSelectors.global_field}>
            <Typography variant='body'>Please raise a request!!</Typography>
          </div>
          <TextField
            className={PostGlobalSelectors.global_field}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            label='Company name'
            variant='outlined'
            color='secondary'
          />
          <TextField
            className={PostGlobalSelectors.global_field}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            label='Image url'
            variant='outlined'
            color='secondary'
          />
          {errors}
          <Button
            className={PostGlobalSelectors.global_field}
            variant='contained'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Container>
    );
  } else {
    return <div> You are not logged in</div>;
  }
};
