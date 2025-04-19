import React from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";

function HandleLogout({ loggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("Logout successful!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-md shadow-lg transition duration-300 text-lg font-medium cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default HandleLogout;
