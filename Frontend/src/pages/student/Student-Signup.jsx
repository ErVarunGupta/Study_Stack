import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { IoArrowBackOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const URL = import.meta.env.VITE_URL || "http://localhost:8080";

function Student_Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    institute: "",
    department: "",
    semester: "",
    registration_no: "",
    roll_no: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      institute,
      department,
      semester,
      registration_no,
      roll_no,
      password,
    } = signupInfo;

    if (
      !name ||
      !email ||
      !password ||
      !institute ||
      !department ||
      !semester ||
      !registration_no ||
      !roll_no
    ) {
      return handleError(
        "Name, email, institute, department, semester, registration no., roll no. and password are required"
      );
    }

    try {
      const url = `${URL}/root/student-signup`;
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
      <div className="bg-white p-8 sm:p-12 shadow-[8px_8px_24px_0px_rgba(66,68,90,1)] max-w-4xl w-full rounded-md">

        {/* Header with back button */}
        <div className="flex items-center justify-center mb-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 flex items-center gap-2 bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <IoArrowBackOutline />
            <span>Back</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            Student Signup
          </h1>
        </div>

        <form
          onSubmit={handleSignup}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Form Inputs */}
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Institute", name: "institute" },
            { label: "Department", name: "department" },
            { label: "Semester", name: "semester" },
            { label: "Registration Number", name: "registration_no" },
            { label: "Roll Number", name: "roll_no" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type = "text" }) => (
            <div className="flex flex-col" key={name}>
              <label htmlFor={name} className="text-lg mb-1">
                {label}
              </label>
              <input
                onChange={handleChange}
                type={type}
                name={name}
                value={signupInfo[name]}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="text-lg p-2 border-b border-black outline-none placeholder:text-sm placeholder:italic"
              />
            </div>
          ))}

          <div className="md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="cursor-pointer w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold text-lg py-2 rounded-lg shadow-md transition duration-300"
            >
              Signup
            </button>

            <span className="text-sm mt-3 text-gray-600">
              Already have an account?
              <Link
                to="/student-login"
                className="text-blue-600 font-medium ml-1"
              >
                Login
              </Link>
            </span>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Student_Signup;
