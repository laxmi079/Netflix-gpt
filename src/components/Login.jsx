import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { validateForm } from '../utils/validate';
import { addUser } from '../utils/userSlice';
import netflixBg from '../assets/netflix-bg.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = name.current?.value;

    const message = validateForm(emailValue, passwordValue, nameValue, isSignIn);
    setErrorMessage(message);
    if (message) return;

    try {
      if (isSignIn) {
        // SIGN IN
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        // Navigation handled by Body.jsx onAuthStateChanged
      } else {
        // SIGN UP
        const userCred = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);

        // Update profile in Firebase
        await updateProfile(auth.currentUser, {
          displayName: nameValue,
          photoURL:
            "https://www.shutterstock.com/image-vector/young-girl-anime-style-character-600nw-2306777823.jpg"
        });

        // Reload to ensure profile updates are fetched
        await auth.currentUser.reload();

        // Get the updated user object
        const updatedUser = auth.currentUser;

        // Immediately add to Redux so UI updates instantly
        dispatch(
          addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL
          })
        );

        // Navigate to browse
        navigate("/browse");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={netflixBg}
        alt="Netflix Background"
        className="absolute inset-0 h-full w-full object-cover -z-10"
      />

      {/* Form */}
      <div className="flex h-screen w-screen items-center justify-center">
        <form
          className="w-11/12 md:w-4/12 p-12 bg-black bg-opacity-80 rounded-lg shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-white text-3xl font-bold mb-8">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h1>

          {!isSignIn && (
            <input
              type="text"
              ref={name}
              placeholder="Full Name"
              className="p-4 my-2 w-full bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
            />
          )}

          <input
            type="text"
            ref={email}
            placeholder="Email Address"
            className="p-4 my-2 w-full bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
          />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="p-4 my-2 w-full bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-500"
          />

          {errorMessage && (
            <p className="text-red-500 font-bold text-center mt-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="p-4 my-6 w-full bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>

          <p
            className="text-gray-400 cursor-pointer text-center"
            onClick={toggleSignInForm}
          >
            {isSignIn
              ? 'New to NetflixGPT? Sign up now.'
              : 'Already a user? Sign in here.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
