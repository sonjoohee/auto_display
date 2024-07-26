// MoleculeSignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import styles from '../../assets/styles/molecules_css/MoleculeSignupForm.module.css';

const MoleculeSignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [status, setStatus] = useState('active');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, status })
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
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
