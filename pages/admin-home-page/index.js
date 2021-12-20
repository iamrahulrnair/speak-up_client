import React, { useEffect, useState, useRef } from 'react';
import useRequest from '../../hooks/use-request';
import axios from 'axios';
import Router from 'next/router';

export default function index({ currentUser }) {
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState(null);
  const { doRequest, errors } = useRequest({
    url: '/api/request_a_post/',
    method: 'get',
  });
  useEffect(async () => {
    const data = await doRequest();
    setPostData(data);
  }, []);

  async function handleApprove(el, ind) {
    const { value: description } = document.querySelector(
      `._inputHandle-${ind}`
    );
    try {
      await axios.post('/api/_p', {
        companyName: el.companyName,
        imageUrl: el.imageurl,
        description,
      });
      await axios.delete(`/api/request_a_post/${el.id}`);
    } catch (err) {
      setError(
        <div>
          <h3>Error: </h3>
          <ul>
            {err.response.data.errors.map((err, ind) => {
              return <li key={ind}>{err.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  }
  function handleReject() {
    Router.push('/');
  }

  function renderData() {
    if (postData?.length > 0 && currentUser) {
      return postData.map((el, ind) => {
        return (
          <div key={ind}>
            <h1>{el.companyName}</h1>
            <h3>Requested by: {el.userId}</h3>
            <p>
              Created At: <strong>{el.createdAt}</strong>
            </p>
            <p>
              Updated At: <strong>{el.updatedAt}</strong>
            </p>
            <div>
              <label>description:</label>
              <input className={`_inputHandle-${ind}`}></input>
            </div>
            {error}
            <button onClick={(el_data) => handleApprove(el, ind)}>
              Approve
            </button>
            <button onClick={(el_data) => handleReject(el)}>Reject</button>
          </div>
        );
      });
    } else if (postData?.length == 0 && currentUser) {
      return <h1>No posts requested.</h1>;
    } else {
      return <div>Loading...</div>;
    }
  }
  if (currentUser) {
    return (
      <div>
        {renderData()}
        <div>{errors}</div>
      </div>
    );
  } else {
    return <div> You are not logged in</div>;
  }
}
