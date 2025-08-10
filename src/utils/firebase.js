
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyqBEgrqp5-tjeV_mF_Y0yjreTZLA4ITk",
  authDomain: "netflix-gpt-994a3.firebaseapp.com",
  projectId: "netflix-gpt-994a3",
  storageBucket: "netflix-gpt-994a3.firebasestorage.app",
  messagingSenderId: "84559901133",
  appId: "1:84559901133:web:d08864a5011e65d7b1d484",
  measurementId: "G-DV9SJ7MCQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);