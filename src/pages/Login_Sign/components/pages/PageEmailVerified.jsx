import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageEmailVerified = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>이메일이 인증되었습니다.</h2>
      <p>다시 로그인 해주세요.</p>
      <button onClick={handleLoginRedirect}>로그인 페이지로 이동</button>
    </div>
  );
};

export default PageEmailVerified;
