import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import { isValidEmail } from '../atoms/AtomValidation';
import { emailAtom, passwordAtom, currentUserAtom, errorAtom } from '../../AtomStates';
import styles from '../../assets/styles/molecules_css/MoleculeLoginForm.module.css';

const MoleculeLoginForm = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [error, setError] = useAtom(errorAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [setError]);

  const validateForm = () => {
    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');
    if (!validateForm()) return;

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
    setEmail('');
    setPassword('');
    setError('');
    navigate('/signup');
  };

  return (
    <div className={styles.loginForm}>
      <h2>Login</h2>
      <AtomInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <AtomInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
