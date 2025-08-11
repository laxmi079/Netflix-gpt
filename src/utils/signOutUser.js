// src/utils/signOutUser.js
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { removeUser } from "./userSlice";

/**
 * Utility function to handle user sign-out.
 *
 * @param {Function} dispatch - Redux dispatch function to update the store.
 *
 * What it does:
 * 1. Calls Firebase's signOut() to terminate the session.
 * 2. Removes the user data from the Redux store using removeUser().
 * 3. Handles any errors and logs them to the console.
 *
 * Why this approach?
 * - Keeps sign-out logic DRY (Don't Repeat Yourself) by placing it in one reusable utility.
 * - Allows sign-out to be called from any component by just importing this function.
 * - Separates Firebase logic from UI components, making code cleaner and testable.
 */
export const signOutUser = async (dispatch) => {
  try {
    // Step 1: Sign out from Firebase Authentication
    await signOut(auth);

    // Step 2: Remove the user from Redux store
    dispatch(removeUser());
    
    console.log("✅ User signed out successfully");
  } catch (error) {
    // Step 3: Handle errors
    console.error("❌ Sign out error:", error.message);
  }
};
