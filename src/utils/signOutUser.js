import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { removeUser } from "./userSlice";

export const signOutUser = async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(removeUser());
  } catch (error) {
    console.error("Sign out error:", error.message);
  }
};
