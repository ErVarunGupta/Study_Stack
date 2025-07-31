import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { IoArrowBackOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const URL = import.meta.env.VITE_URL || "http://localhost:8080";

function Faculty_Login() {
  const [loginInfo, setLoginInfo] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { identifier, password } = loginInfo;

    if (!identifier || !password) {
      return handleError("Please enter your email or registration number and password.");
    }

    try {
      const url = `${URL}/root/faculty-login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, token, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error.details?.[0]?.message || message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <div className="container bg-white p-8 sm:p-12 shadow-[8px_8px_24px_0px_rgba(66,68,90,1)] max-w-xl w-full rounded-md">

        {/* Header with Back button */}
        <div className="flex items-center justify-center mb-6 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute left-0 flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <IoArrowBackOutline />
            <span>Back</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            Faculty Login
          </h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="identifier" className="text-lg mb-1">
                Email or Contact Number
              </label>
              <input
                onChange={handleChange}
                type="text"
                autoFocus
                placeholder="Enter the email or contact number"
                name="identifier"
                value={loginInfo.identifier}
                className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic w-full"
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-lg mb-1">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                placeholder="Enter the password"
                name="password"
                value={loginInfo.password}
                className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer mt-4 w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold text-lg py-2 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>

          <span className="text-sm text-gray-600">
            Don't have an account?
            <Link to="/faculty-signup" className="text-blue-600 font-medium ml-1">
              Signup
            </Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Faculty_Login;
