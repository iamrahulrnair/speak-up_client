import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const _errorContainer = useRef();

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
       _errorContainer.current?.style.display = 'none';
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
          {err.response.data.errors.map((err) => (
            <Alert
              style={{ marginBottom: '10px' }}
              severity='error'
              key={err.message}
              variant='filled'
            >
              <AlertTitle>Error</AlertTitle>
              {err.message}
            </Alert>
          ))}
        </div>
      );
    }
  };

  return { doRequest, errors };
};
