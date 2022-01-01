import { useEffect, useState, useRef } from 'react';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';

export default ({ currentUser }) => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [toggle, setToggle] = useState(0);

  const _likeHandle = useRef();

  const { doRequest, errors } = useRequest({
    url: `/api/_p/${postId}`,
    method: 'get',
  });
  const { doRequest: doReviewRequest, errors: reviewErrors } = useRequest({
    url: `/api/_r`,
    method: 'post',
    body: {
      description,
      title,
      rating,
      postId,
    },
  });
  const { doRequest: doLikeRequest, errors: likeErrors } = useRequest({
    url: `/api/_l`,
    method: 'post',
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
        return (
          <>
            <div key={ind}>
              <div>
                <h3>{el.title}</h3>
                <h4>{el.description}</h4>
                <h5>{el.userId}</h5>
                <p>
                  Likes:<span ref={_likeHandle}> {el.likes}</span>
                </p>
              </div>
              <button
                onClick={async (e) => {
                  await doLikeRequest({
                    reviewId: el.id,
                  });
                  if (toggle == 0) {
                    _likeHandle.current.innerText = el.likes++;
                    setToggle(1);
                  } else {
                    _likeHandle.current.innerText = el.likes--;
                    setToggle(0);
                  }
                }}
              >
                Like
              </button>
            </div>
          </>
        );
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
          <div>
            <h1>Write a review:</h1>
          </div>
          <div>
            <label>Title:</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              value={title}
            ></input>
            <label>Description:</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              value={description}
            ></input>
            <input
              value={rating}
              type='range'
              name='rating'
              min='0'
              max='5'
              onChange={(e) => setRating(e.target.value)}
            ></input>
            <button
              type='submit'
              onClick={async () => {
                await doReviewRequest();
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          {reviewErrors}
          {likeErrors}
        </div>
        <hr />
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
