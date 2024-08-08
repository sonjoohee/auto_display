// src/pages/PageResetPassword.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (!token) {
      setError('잘못된 접근입니다.');
      navigate('/login');
    }
  }, [navigate]);

  const handleResetPassword = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      if (response.ok) {
        navigate('/login'); // 비밀번호 변경 후 로그인 페이지로 이동
      } else {
        const result = await response.json();
        setError(result.error || '비밀번호 재설정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>비밀번호 재설정</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호를 입력하세요"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 다시 입력하세요"
      />
      <button onClick={handleResetPassword}>비밀번호 재설정</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
