import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
  
    if (token) {
      fetch(`http://localhost:3001/verify-email?token=${token}`)
        .then(response => response.json())
        .then(data => {
          if (data.message === '이메일 인증이 완료되었습니다.') {
            navigate('/email-verified'); // 성공 시 이메일 인증 완료 페이지로 이동
          } else {
            navigate('/email-verification-failed'); // 실패 시 이메일 인증 실패 페이지로 이동
          }
        })
        .catch(error => {
          console.error('이메일 인증 중 오류 발생:', error);
          navigate('/email-verification-failed'); // 오류 시 이메일 인증 실패 페이지로 이동
        });
    } else {
      navigate('/signup'); // 토큰이 없는 경우 회원가입 페이지로 이동
    }
  }, [navigate]);
  
  return (
    <div>
      <h2>이메일 인증 중...</h2>
    </div>
  );
};

export default VerifyEmail;
