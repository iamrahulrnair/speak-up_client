import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const _errorContainer = useRef();

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        _errorContainer.current.style.display = 'none';
      }, 5000);
    }
  }, [errors]);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div ref={_errorContainer} className='alert alert-danger'>
          <h4>Ooops....</h4>
          <ul className='my-0'>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
