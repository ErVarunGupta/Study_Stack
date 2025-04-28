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

  //fixed bottom-2 left-16 transform -translate-x-1/2 z-50

  return (
    <div className="">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md shadow-lg transition duration-300 text-md font-medium cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default HandleLogout;
