import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { IoArrowBackOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const URL = import.meta.env.VITE_URL || "http://localhost:8080";

function Faculty_Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    contact: "",
    institute: "",
    department: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, contact, institute, department, password } = signupInfo;
    if (!name || !email || !contact || !password || !institute || !department) {
      return handleError("Name, email, contact no., institute, department, and password are required");
    }

    try {
      const url = `${URL}/root/faculty-signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
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
      <div className="container bg-white p-8 sm:p-12 shadow-[8px_8px_24px_0px_rgba(66,68,90,1)] max-w-3xl w-full rounded-md">

        {/* Header with Back button */}
        <div className="flex items-center justify-center mb-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <IoArrowBackOutline />
            <span>Back</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            Faculty Signup
          </h1>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row gap-6 w-full justify-between">
            {/* Left Column */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg mb-1">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  autoFocus
                  placeholder="Enter the name"
                  name="name"
                  value={signupInfo.name}
                  className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg mb-1">Email</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the email"
                  name="email"
                  value={signupInfo.email}
                  className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="contact" className="text-lg mb-1">Contact No.</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the contact no."
                  name="contact"
                  value={signupInfo.contact}
                  className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <label htmlFor="institute" className="text-lg mb-1">Institute</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the institute"
                  name="institute"
                  value={signupInfo.institute}
                  className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="department" className="text-lg mb-1">Department</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter the department"
                  name="department"
                  value={signupInfo.department}
                  className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg mb-1">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter the password"
                  name="password"
                  value={signupInfo.password}
                  className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold text-lg py-2 rounded-lg shadow-md transition duration-300"
          >
            Signup
          </button>

          <span className="text-sm text-gray-600">
            Already have an account?
            <Link to="/faculty-login" className="text-blue-600 font-medium ml-1">
              Login
            </Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Faculty_Signup;
