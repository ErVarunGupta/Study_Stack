import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import ViewUser from '../view.jsx';

function ReadSeen() {
  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, [loggedInUser]);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const department = queryParams.get('department');
  const semester = queryParams.get('semester');

  const handleNavigation = (type) => {
    navigate(`/read/search?department=${department}&semester=${semester}&type=${type}`);
  };

  const fetchData = async (type) => {
    try {
      const response = await fetch(`/read/search?department=${department}&semester=${semester}&type=${type}`);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [department, semester]);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold text-gray-800">What do you want to read?</h1>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md mb-4 hover:bg-blue-700 transition cursor-pointer"
          onClick={() => handleNavigation('book')}
        >
          Book
        </button>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-md mb-4 hover:bg-green-700 transition cursor-pointer"
          onClick={() => handleNavigation('notebook')}
        >
          Notebook
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <div
          className="flex items-center gap-2 cursor-pointer bg-gray-200 text-gray-800 hover:text-blue-600 px-4 py-2 rounded-lg transition"
          onClick={() => window.location.href = '/read'}
        >
          <IoArrowBackOutline />
          <span>Back</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer bg-gray-200 text-gray-800 hover:text-green-600 px-4 py-2 rounded-lg transition"
          onClick={() => window.location.href = '/home'}
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

export default ReadSeen;
