import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "./utils";
import HandleLogout from './HandleLogout.jsx';
import { IoPersonSharp } from "react-icons/io5";

const ViewUser = () => {
    const [user, setUser] = useState({});
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                handleError("No token found.");
                return;
            }

            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const id = decodedToken.id;

                const response = await fetch(`http://localhost:8080/root/view/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }
                });

                const data = await response.json();
                const { success, message } = data;

                if (success) {
                    setUser(data.user || {});
                } else {
                    handleError(message || "Unexpected error.");
                }
            } catch (err) {
                console.error(err);
                handleError("Something went wrong.");
            }
        };

        fetchUser();
    }, [navigate]);

    const category = user.category || 'N/A';

    const profileHandler = () => {
        // console.log(user);
        // console.log(category);
        setShowCard(!showCard); // Toggle card visibility
    };
    // console.log("out",user);
    //edit 
    const editHandler = ()=>{
       if(category === 'faculty'){
        console.log("in : ",user);
         navigate('/faculty-edit',{ state: user});
       }
       if(category === 'student'){
        console.log("in : ",user);
         navigate('/student-edit', { state: user });
       }
    }

    return (
        <>
            <ToastContainer />
            <div className="fixed bottom-6 sm:top-4 left-8 transform -translate-x-1/2 z-50">
                <button
                    onClick={profileHandler}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-2 rounded-full shadow-lg transition duration-300 text-lg font-medium cursor-pointer"
                >
                  <IoPersonSharp />
                </button>
            </div>

            {/* Profile Card */}
            {showCard && (
                <div className="absolute top-20 left-5 w-80 bg-white border shadow-xl rounded-xl p-6 text-gray-800 z-40">
                    <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>
                    <hr className='mb-2'/>
                    
                    {category === 'faculty' && (
                        <div className="space-y-2">
                            <p><span className="font-semibold">Name:</span> {user.name || 'N/A'}</p>
                            <p><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
                            <p><span className="font-semibold">Phone:</span> {user.contact || 'N/A'}</p>
                            <p><span className="font-semibold">Institute:</span> {user.institute || 'N/A'}</p>
                            <p><span className="font-semibold">Department:</span> {user.department || 'N/A'}</p>
                            <p><span className="font-semibold">Category:</span> {user.category}</p>
                        </div>
                    )}
                    {category === 'student' && (
                        <div className="space-y-2">
                            <p><span className="font-semibold">Name:</span> {user.name || 'N/A'}</p>
                            <p><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
                            <p><span className="font-semibold">Institute:</span> {user.institute || 'N/A'}</p>
                            <p><span className="font-semibold">Department:</span> {user.department || 'N/A'}</p>
                            <p><span className="font-semibold">Semester:</span> {user.semester || 'N/A'}</p>
                            <p><span className="font-semibold">Registration No:</span> {user.registrationNumber || 'N/A'}</p>
                            <p><span className="font-semibold">Roll No:</span> {user.roll_no || 'N/A'}</p>
                            <p><span className="font-semibold">Category:</span> {user.category}</p>
                        </div>
                    )}
                    
                    <hr className='mt-6 '/>
                    <div className='flex justify-evenly mt-4'>
                        <button 
                        onClick={editHandler}
                        className=' bg-gray-600 px-7 text-white rounded-md cursor-pointer hover:bg-gray-700'>Edit</button>
                        <HandleLogout/>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewUser;
