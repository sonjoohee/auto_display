// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "logintest-c5f62",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCo8R4HThQkBG6J_kP5B5s9ZH0Z4l8yq0A",
    authDomain: "logintest-c5f62.firebaseapp.com",
    projectId: "logintest-c5f62",
    storageBucket: "logintest-c5f62.appspot.com",
    messagingSenderId: "138106302639",
    appId: "1:138106302639:web:171493934e8934a704e45a",
    measurementId: "G-GFZLG8YHYQ"
  };
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
