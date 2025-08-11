// src/components/Body.jsx
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Firebase listener for authentication state changes
import { Provider, useDispatch } from "react-redux"; // Redux store provider and dispatch
import Login from "./Login";
import Browse from "./Browse";
import Header from "./Header";
import { auth } from "../utils/firebase"; // Firebase authentication instance
import appStore from "../utils/appStore"; // Redux store
import { addUser, removeUser } from "../utils/userSlice"; // Redux actions to manage user state

/**
 * Component to handle Firebase auth state changes
 * and update Redux store + navigation accordingly.
 * Must be rendered inside RouterProvider so that useNavigate works.
 */
const AuthStatusHandler = () => {
  const navigate = useNavigate(); // For redirecting user based on auth state
  const dispatch = useDispatch(); // For updating Redux store

  useEffect(() => {
    // Subscribe to Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in — extract details
        const { uid, email, displayName, photoURL } = user;

        // Save user data in Redux store
        dispatch(addUser({ uid, email, displayName, photoURL }));

        // Redirect to /browse
        navigate("/browse");
      } else {
        // User is signed out — remove from Redux
        dispatch(removeUser());

        // Redirect to login page
        navigate("/");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  // This component doesn't render any UI
  return null;
};

/**
 * Router configuration — defines the available routes
 * and the components rendered for each path.
 */
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AuthStatusHandler /> {/* Watches for login/logout changes */}
        <Header /> {/* Top navigation bar */}
        <Login />  {/* Login or signup form */}
      </>
    ),
  },
  {
    path: "/browse",
    element: (
      <>
        <AuthStatusHandler /> {/* Keeps auth state in sync */}
        <Header /> {/* Navigation bar */}
        <Browse /> {/* Main content after login */}
      </>
    ),
  },
]);

/**
 * The main application body — wraps the app
 * in the Redux store provider and router.
 */
const Body = () => (
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);

export default Body;
