import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

function PageNotFound() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleBack}>Back Home</Button>}
      />
    </div>
  );
}

export default PageNotFound;
