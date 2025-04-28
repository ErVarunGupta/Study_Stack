import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import HandleLogout from '../HandleLogout.jsx';
import ViewUser from '../view.jsx';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <ViewUser/>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to the Study Stack!
      </h1>

      <h2 className="text-xl italic text-gray-600 mb-6">
        username: @{loggedInUser.toLowerCase()}
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4 items-center">
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
          onClick={() => window.location.href = '/write'}
        >
          Write
        </button>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
          onClick={() => window.location.href = '/read'}
        >
          Read
        </button>
      </div>

      {/* <HandleLogout loggedInUser={loggedInUser} /> */}
      <ToastContainer />
    </div>
  );
}

export default Home;
