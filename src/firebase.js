// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvh6ld7bHNcDGt7UiEUopTfCOYLY87xa0",
  authDomain: "interviewx.ai",
  projectId: "interviewx-ai",
  storageBucket: "interviewx-ai.appspot.com",
  messagingSenderId: "891213629097",
  appId: "1:891213629097:web:7916e541a8ba3273b48bb8",
  measurementId: "G-SN827DGF8N",
};
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
