// src/utils/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing the authenticated user state.
 *
 * initialState: 
 * - Starts as `null` because no user is logged in by default.
 *
 * reducers:
 * - addUser: Stores user details (payload) in Redux state.
 * - removeUser: Clears the user state (sets it back to null).
 *
 * Why keep this in Redux?
 * - Components across the app (e.g., Header, Browse) can access user data without prop drilling.
 * - Syncs with Firebase Authentication state for a global, reactive store.
 */
const userSlice = createSlice({
  name: "user",       // Slice name for debugging & action types
  initialState: null, // Default: no user logged in
  reducers: {
    // Set user state to the payload (user object from Firebase)
    addUser: (state, action) => action.payload,

    // Clear the user state (e.g., after sign-out)
    removeUser: () => null,
  },
});

// Export actions so components can dispatch them
export const { addUser, removeUser } = userSlice.actions;

// Export reducer to include in the Redux store
export default userSlice.reducer;
