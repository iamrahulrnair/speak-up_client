import Link from 'next/link';
import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default ({ currentUser }) => {
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
          <>
            <div key={ind}>
              <h1>{el.companyName}</h1>
              <div>
                <img width='200px' src={el.imageurl} alt={el.companyName} />
              </div>
              <div>
                <h4>About:</h4>
                <p>{el.description}</p>
              </div>
              <h3>Average Rating: {el.ratingsAverage}</h3>
              <h3>Total Ratings: {el.ratingsCount}</h3>
            </div>
            <div>
              <Link href={`/post/${el.id}`}>
                speakUP against this organization
              </Link>
            </div>
            <hr></hr>
          </>
        );
      });
    } else if (posts?.length == 0 && currentUser) {
      return (
        <Typography variant='h1' color='primary'>
          No Companies Listed Right now!! Try raising a request.
        </Typography>
      );
    } else {
      return <h3>Loading....</h3>;
    }
  };
  if (currentUser) {
    return (
      <div>
        <div>{renderPosts()}</div>
        <hr></hr>
        <h1>Your company not listed here?</h1>
        <div>
          <h3>Please raise a request!!</h3>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <label>ComapnyName:</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              ></input>
            </div>
            <div>
              <label>imageURL:</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></input>
            </div>

            <div>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
            </div>
          </form>
          {errors}
        </div>
      </div>
    );
  } else {
    return <div> You are not logged in</div>;
  }
};
