import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true) // true = Sign In, false = Sign Up

  const goToSignUp = () => {
    if (isSignIn) setIsSignIn(false) // only change if currently in Sign In mode
  }

  return (
    <div className="relative h-screen w-screen">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Centered Form */}
      <div className="flex items-center justify-center h-full">
        <form className="w-3/12 p-12 bg-black bg-opacity-70 text-amber-100 rounded-lg">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-6">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h1>

          {/* Input fields */}
          {!isSignIn && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 m-2 w-full bg-gray-800 rounded"
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-2 m-2 w-full bg-gray-800 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 m-2 w-full bg-gray-800 rounded"
          />

          {/* Button */}
          <button className="p-4 m-4 w-full bg-red-600 hover:bg-red-700 rounded">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>

          {/* Bottom text */}
          <p className="text-center mt-4 text-sm">
            New to Netflix?{' '}
            <span
              onClick={goToSignUp}
              className="text-red-500 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
