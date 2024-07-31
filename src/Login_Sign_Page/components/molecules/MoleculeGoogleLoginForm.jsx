// src/components/molecules/MoleculeGoogleLoginForm.jsx
import React from 'react';
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../assets/styles/molecules_css/MoleculeGoogleLoginForm.module.css';

const MoleculeGoogleLoginForm = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firebase 인증 후 사용자 정보를 서버에 저장
      await axios.post('http://localhost:3001/google-login', {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      }, { withCredentials: true });

      // 로그인 성공 후 원하는 페이지로 이동
      navigate('/success');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.googleLoginForm}>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default MoleculeGoogleLoginForm;
