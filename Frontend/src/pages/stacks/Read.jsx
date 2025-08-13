import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HandleLogout from '../HandleLogout.jsx';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import ViewUser from '../view.jsx';

function Read() {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, []);

  const handleSearch = () => {
    if (department && semester) {
      navigate(`/read/seen?department=${department}&semester=${semester}`);
    } else {
      alert('Please select both department and semester.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Select Department and Semester</h1>

        <select
          id="departmentSelect"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="" disabled>Choose Department</option>
          <option value="CSE">CSE</option>
          <option value="Civil">Civil</option>
          <option value="EEE">EEE</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electrical">Electrical</option>
          <option value="CSE_IOT">CSE (IoT)</option>
          <option value="Electronics">Electronics</option>
          <option value="IT">IT</option>
          <option value="FireTech">Fire Technology</option>
        </select>

        <select
          id="semesterSelect"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="" disabled>Choose Semester</option>
          <option value="1">1 Semester</option>
          <option value="2">2 Semester</option>
          <option value="3">3 Semester</option>
          <option value="4">4 Semester</option>
          <option value="5">5 Semester</option>
          <option value="6">6 Semester</option>
          <option value="7">7 Semester</option>
          <option value="8">8 Semester</option>
        </select>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition cursor-pointer"
          onClick={handleSearch}
        >
          Seen
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <div
          className="flex items-center gap-2 cursor-pointer bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition"
          onClick={() => navigate('/home')}
        >
          <IoArrowBackOutline />
          <span>Back</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer bg-gray-200 text-gray-800 hover:text-green-600 px-4 py-2 rounded-lg transition"
          onClick={() => navigate('/home')}
        >
          <IoMdHome />
          <span>Home</span>
        </div>
      </div>

      {/* <HandleLogout loggedInUser={loggedInUser} /> */}
      <ToastContainer />
      <ViewUser/>
    </div>
  );
}

export default Read;
