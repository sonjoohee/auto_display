// MoleculeLoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import styles from '../../assets/styles/molecules_css/MoleculeLoginForm.module.css';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../../AtomStates';

const MoleculeLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const result = await response.json();
        setCurrentUser(result.user);
        navigate('/success');
      } else {
        const result = await response.json();
        setError(result.error);
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className={styles.loginForm}>
      <h2>Login</h2>
      <AtomInput
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="이메일"
      />
      <AtomInput
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호"
      />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.buttonContainer}>
        <AtomButton onClick={handleLogin}>로그인</AtomButton>
        <AtomButton onClick={handleSignup}>회원가입</AtomButton>
      </div>
    </div>
  );
};

export default MoleculeLoginForm;
