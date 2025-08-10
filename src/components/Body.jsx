// src/components/Body.jsx
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Provider, useDispatch } from "react-redux";
import Login from "./Login";
import Browse from "./Browse";
import Header from "./Header";
import { auth } from "../utils/firebase";
import appStore from "../utils/appStore";
import { addUser, removeUser } from "../utils/userSlice";

const AuthStatusHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return null;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AuthStatusHandler />
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: "/browse",
    element: (
      <>
        <AuthStatusHandler />
        <Header />
        <Browse />
      </>
    ),
  },
]);

const Body = () => (
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);

export default Body;
