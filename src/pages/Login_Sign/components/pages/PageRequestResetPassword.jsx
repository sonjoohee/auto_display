// src/pages/PageRequestResetPassword.jsx

import React, { useState } from 'react';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async () => {
    try {
      const response = await fetch('http://localhost:3001/request-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
      } else {
        const result = await response.json();
        setMessage(result.error || '비밀번호 재설정 요청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setMessage('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>비밀번호 재설정 요청</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소를 입력하세요"
      />
      <button onClick={handleRequestReset}>비밀번호 재설정 링크 보내기</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestResetPassword;
