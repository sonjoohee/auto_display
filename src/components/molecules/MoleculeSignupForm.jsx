import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import { isValidEmail, isValidPassword } from '../atoms/AtomValidation';
import { nameAtom, signupEmailAtom, signupPasswordAtom, confirmPasswordAtom, roleAtom, statusAtom, errorAtom } from '../../AtomStates';
import styles from '../../assets/styles/molecules_css/MoleculeSignupForm.module.css';

const MoleculeSignupForm = () => {
  const [name, setName] = useAtom(nameAtom);
  const [email, setEmail] = useAtom(signupEmailAtom);
  const [password, setPassword] = useAtom(signupPasswordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [role, setRole] = useAtom(roleAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [error, setError] = useAtom(errorAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [setError]);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    if (!isValidPassword(password)) {
      setError('비밀번호는 8-16자 길이여야 하며, 문자, 숫자, 특수문자 중 최소 두 가지를 포함해야 합니다.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    setError('');
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, status })
      });
      if (response.ok) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('user');
        setStatus('active');
        navigate('/login');
      } else {
        const result = await response.json();
        setError(result.error);
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.signupForm}>
      <h2>Sign Up</h2>
      <AtomInput
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
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
      <AtomInput
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.select}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="vip_user">VIP User</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      {error && <p className={styles.error}>{error}</p>}
      <AtomButton onClick={handleSignup}>회원가입</AtomButton>
    </div>
  );
};

export default MoleculeSignupForm;
