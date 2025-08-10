import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 text-white bg-gradient-to-r from-black via-red-900 to-black shadow-lg">
      <h1 className="text-xl font-bold">Netflix GPT</h1>
      {user && (
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/40"}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span>{user.displayName}</span>
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
