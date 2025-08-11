// src/utils/appStore.js

import { configureStore } from "@reduxjs/toolkit"; 
// configureStore is a helper from Redux Toolkit that sets up the Redux store
// with good defaults like the Redux DevTools extension enabled.

import userReducer from "./userSlice"; 
// Importing our user slice reducer, which handles authentication/user-related state.

/**
 * The global Redux store for our application.
 * 
 * We only have one slice right now — `user` — 
 * but more slices can be added later (e.g., movies, search, theme).
 */
const appStore = configureStore({
  reducer: {
    // This object maps slice names to their respective reducers
    user: userReducer,
  },
});

export default appStore;
