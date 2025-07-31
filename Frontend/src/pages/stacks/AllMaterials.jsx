import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HandleLogout from '../HandleLogout';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import { handleError, handleSuccess } from '../utils';
import ViewUser from '../view.jsx';
import { IoMdHome } from "react-icons/io";

const URL = import.meta.env.VITE_URL || "http://localhost:8080";

function SearchResult() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploader, setUploader] = useState({});
    const navigate = useNavigate();

    // Extract query params
    const query = new URLSearchParams(location.search);
    const department = query.get('department');
    const semester = query.get('semester');
    const type = query.get('type');

    useEffect(() => {
        if (department && semester && type) {
            axios
                .get(`${URL}/stack/read/search`, { params: { department, semester, type } })
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [department, semester, type]);

    // Fetch uploader's name based on user ID
    const fetchUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const url = `${URL}/root/${userId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
            });
            const result = await response.json();
            return result.name;
        } catch (err) {
            console.error("Error fetching user:", err);
            return "Unknown";
        }
    }

    useEffect(() => {
        const loadUsernames = async () => {
            const uniqueUploaderIds = [...new Set(data.map(item => item.uploadedBy))];
            const usernameMap = {};

            for (const uploaderId of uniqueUploaderIds) {
                usernameMap[uploaderId] = await fetchUser(uploaderId);
            }

            setUploader(usernameMap);
        };

        if (data.length > 0) {
            loadUsernames();
        }
    }, [data]);

    // Edit and delete handlers
    const editHandle = async (id) => {
        const token = localStorage.getItem('token');
        const type = query.get('type');
        try {
            const url = `${URL}/action/edit/${id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate(`/action/edit/${id}?type=${type}`, { state: result.data });
                }, 1000);
            } else if (error) {
                handleError(error.details?.[0]?.message || "An error occurred");
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || "An unexpected error occurred");
        }
    };

    const deleteHandle = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const url = `${URL}/action/delete/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setData(data.filter(item => item.id !== id));
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (error) {
                handleError(error.details?.[0]?.message || "An error occurred");
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || "An unexpected error occurred");
        }
    };

    //searchHandle
    const [query1, setQuery1] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        const searchQuery = query1.toLowerCase();

        if (!searchQuery) {
            setFilteredData(data);
        } else {
            const newData = data.filter(item => {
                const value = type === "book" ? item.title : item.subject;
                return value.toLowerCase().includes(searchQuery);
            });
            setFilteredData(newData);
        }
    }, [query1, data, type]);

    return (
        <div className="scroll-hide h-screen bg-gray-50 font-sans flex flex-col px-6 py-4 overflow-hidden">
            {/* Header */}
            <div className=" gap-2 2xl:w-4xl md:w-md mx-auto flex justify-between items-center h-16 sticky top-0 bg-white z-20 rounded-lg shadow-lg">
                <button className="flex items-center bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 cursor-pointer" onClick={() => navigate(-1)}>
                    <IoArrowBackOutline className="mr-2 text-xl" /> 
                </button>
                <h3 className="text-2xl font-semibold text-gray-800 text-center">{type.charAt(0).toUpperCase() + type.slice(1)}s for {department} - Semester {semester}</h3>
                <button className="flex items-center bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 cursor-pointer " onClick={() => window.location.href = '/home'}>
                    <IoMdHome className="mr-2 text-xl " /> 
                </button>
            </div>
            <div className="search 2xl:w-xl sm:w-md flex justify-center items-center border border-gray-200 rounded-lg mt-4 mx-auto p-2 shadow-md bg-white">
                <input type="text" onChange={(e) => setQuery1(e.target.value)} placeholder={`Enter the ${type} name`} className='p-2 w-full outline-none'/>
                {/* <button className='bg-slate-200 p-2 rounded-lg cursor-pointer' onClick={searchHandle}>Search</button> */}
            </div>

            {/* Content Section */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 mb-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                {loading ? (
                    <p className="text-xl text-gray-500">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => (
                                <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:translate-y-2 hover:shadow-xl flex flex-col items-center text-center" key={idx}>
                                    <img
                                        src={item.imageUrl || 'https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_1280.jpg'}
                                        alt="PDF"
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-4">{item.subject}</h3>
                                    <p className="text-sm text-gray-500 mb-4 italic">Uploaded By: {uploader[item.uploadedBy] || "Loading..."}</p>
                                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4 cursor-pointer" onClick={() => window.open(item.pdfUrl, '_blank')}>
                                        View
                                    </button>
                                    <div className="flex justify-between gap-4">
                                        <button className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 cursor-pointer" onClick={() => editHandle(item._id)}>Edit</button>
                                        <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 cursor-pointer" onClick={() => deleteHandle(item._id)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-400">No results found.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Fixed Footer (Logout) */}
            {/* <HandleLogout loggedInUser={localStorage.getItem('loggedInUser')} /> */}
            <ToastContainer />
            <ViewUser />
        </div>
    );
}

export default SearchResult;
