import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";

function Write_Book() {
    const [bookInfo, setBookInfo] = useState({
        title: '',
        author: '',
        department: '',
        semester: '',
        pdfUrl: '',
        uploadedBy: '',
        uploadDate: Date.now()
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleBook = async (e) => {
        e.preventDefault();
        const { title, author, pdfUrl } = bookInfo;
        if (!title || !author || !pdfUrl) {
            return handleError("Title, author, and PDF URL are required");
        }

        try {
            const token = localStorage.getItem('token');
            const url = "http://localhost:8080/stack/write/book";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(bookInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                handleError(error.details?.[0]?.message || "Error occurred");
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

                {/* Top Bar: Back - Title - Home */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate('/write')}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer"
                    >
                        <IoArrowBackOutline />
                        <span>Back</span>
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center">Book Info</h1>

                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-600 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer"
                    >
                        <FaBackward />
                        <span>Home</span>
                    </button>
                </div>

                <form onSubmit={handleBook} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-700">Title</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the title"
                                name="title"
                                value={bookInfo.title}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-gray-700">Author Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the author name"
                                name="author"
                                value={bookInfo.author}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-gray-700">Department</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the department"
                                name="department"
                                value={bookInfo.department}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="semester" className="block text-gray-700">Semester</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the semester"
                                name="semester"
                                value={bookInfo.semester}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="pdfUrl" className="block text-gray-700">PDF URL</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                placeholder="Enter the PDF URL"
                                name="pdfUrl"
                                value={bookInfo.pdfUrl}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 mt-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                        Submit
                    </button>
                </form>

            </div>

            <ToastContainer />
        </div>
    );
}

export default Write_Book;
