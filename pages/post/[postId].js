import { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';

export default ({ currentUser }) => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { doRequest, errors } = useRequest({
    url: `/api/_p/${postId}`,
    method: 'get',
  });
  useEffect(async () => {
    const response = await doRequest();
    const post = response?.post;
    const reviews = response?.reviews;
    setPost(post);
    setReviews(reviews);
  }, []);

  function renderPost() {
    if (post) {
      return (
        <div>
          <h1>{post.companyName}</h1>
          <img src={post.imageurl} alt={post.companyName} />
          <h3>Average Rating: {post.ratingsAverage}</h3>
          <h3>Total Ratings: {post.ratingsCount}</h3>
        </div>
      );
    } else {
      <div>Loading....</div>;
    }
  }
  function renderReviews() {
    if (reviews && reviews.length > 0) {
      return reviews.map((el, ind) => {
        return <div key={ind}>review</div>;
      });
    } else if (reviews && reviews.length == 0) {
      return <div>No reviews for this Company.</div>;
    } else {
      return <div>Loading....</div>;
    }
  }

  if (currentUser && !errors) {
    return (
      <div>
        <div>{renderPost()}</div>
        <div>
          <label>Write a review:</label>
          <input type='text'></input>
          <button type='submit' onClick={() => {}}>
            Submit
          </button>
        </div>
        <div>{renderReviews()}</div>
      </div>
    );
  } else if (errors) {
    return <div>{errors}</div>;
  } else {
    return <div>You are not logged in</div>;
  }
};
export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
