import React from "react";
import { useDispatch, useSelector } from "react-redux"; // For accessing Redux store and dispatching actions
import { useNavigate } from "react-router-dom"; // For navigation after signout
import { signOut } from "firebase/auth"; // Firebase method to sign the user out
import { auth } from "../utils/firebase"; // Firebase auth instance
import { removeUser } from "../utils/userSlice"; // Redux action to remove user data

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing the current user from Redux store
  const user = useSelector((state) => state.user);

  // Sign Out logic
  const handleSignOut = async () => {
    await signOut(auth);       // Sign the user out from Firebase Authentication
    dispatch(removeUser());    // Remove the user from Redux store
    navigate("/");             // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center p-4 text-white bg-gradient-to-r from-black via-red-900 to-black shadow-lg">
      {/* App Title */}
      <h1 className="text-xl font-bold">Netflix GPT</h1>

      {/* If user is logged in, show profile + sign out button */}
      {user && (
        <div className="flex items-center gap-4">
          {/* User Profile Image */}
          <img
            src={
              user.photoURL || // If the user has a custom photo
              "https://via.placeholder.com/40" // fallback placeholder image
            }
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />

          {/* Display Name */}
          <span>{user.displayName}</span>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
