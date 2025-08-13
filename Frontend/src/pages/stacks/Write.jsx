
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import ViewUser from '../view';
import { useNavigate } from 'react-router-dom';

function Write() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = React.useState('');
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [loggedInUser]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="items-center bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">What do you add?</h1>
                <h2 className="text-xl text-gray-600 mb-6">username: @{loggedInUser.toLowerCase()}</h2>
                
                <div className="space-y-4">
                    <button
                        style={{ background: "#1D4ED8", color: "#fff" }}
                        onClick={() => navigate('/write/book')}
                        className="w-full py-3 rounded-lg text-white hover:bg-blue-700 transition cursor-pointer"
                    >
                        Book
                    </button>
                    <button
                        style={{ background: "#10B981", color: "#fff" }}
                        onClick={() => navigate('/write/notebook')}
                        className="w-full py-3 rounded-lg text-white hover:bg-green-700 transition cursor-pointer"
                    >
                        Notebook
                    </button>
                </div>
            </div>

            <div className="flex gap-6 mt-8">
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

export default Write;
